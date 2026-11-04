type ApiRequest = {
  method?: string
}

type ApiResponse = {
  setHeader(name: string, value: string): void
  status(code: number): ApiResponse
  json(body: unknown): void
}

type GitHubRepository = {
  name: string
  description: string | null
  url: string
  stargazerCount: number
  forkCount: number
  primaryLanguage: { name: string; color: string } | null
  languages: { edges: { size: number; node: { name: string; color: string | null } }[] }
}

type GitHubUser = {
  login: string
  name: string | null
  followers: { totalCount: number }
  repositories: { totalCount: number; nodes: GitHubRepository[] }
  pinnedItems: { nodes: GitHubRepository[] }
  contributionsCollection: {
    totalCommitContributions: number
    totalPullRequestContributions: number
    contributionCalendar: { totalContributions: number; weeks: { contributionDays: { date: string; contributionCount: number }[] }[] }
  }
}

type GitHubGraphQLResult = { errors?: unknown[]; data?: { user?: GitHubUser | null } }
type GraphQLFetch = (url: string, init: { method: string; headers: Record<string, string>; body: string }) => Promise<{ ok: boolean; json(): Promise<GitHubGraphQLResult> }>

declare const process: { env: Record<string, string | undefined> }
declare const fetch: GraphQLFetch

const query = `
  query PortfolioGithubActivity($login: String!) {
    user(login: $login) {
      login
      name
      followers { totalCount }
      repositories(ownerAffiliations: OWNER, privacy: PUBLIC, first: 100, orderBy: { field: UPDATED_AT, direction: DESC }) {
        totalCount
        nodes {
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage { name color }
          languages(first: 10) { edges { size node { name color } } }
        }
      }
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage { name color }
          }
        }
      }
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount } }
        }
      }
    }
  }
`

export default async function githubActivityHandler(req: ApiRequest, res: ApiResponse) {
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = process.env.GITHUB_TOKEN
  if (!token) return res.status(503).json({ error: 'GitHub activity is not configured yet.' })

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Shahriar-Portfolio',
      },
      body: JSON.stringify({ query, variables: { login: 'shahriarc224' } }),
    })

    if (!response.ok) return res.status(502).json({ error: 'GitHub could not provide activity data.' })
    const result = await response.json()
    if (result.errors?.length || !result.data?.user) return res.status(502).json({ error: 'GitHub activity data is unavailable.' })

    const user = result.data.user
    const repositories = user.repositories.nodes
    const languageTotals = new Map<string, { size: number; color: string }>()
    for (const repository of repositories) {
      for (const { size, node } of repository.languages.edges) {
        const current = languageTotals.get(node.name) ?? { size: 0, color: node.color ?? '#888888' }
        current.size += size
        languageTotals.set(node.name, current)
      }
    }

    const allLanguages = [...languageTotals.entries()]
      .map(([name, value]) => ({ name, color: value.color, percentage: 0, size: value.size }))
      .sort((a, b) => b.size - a.size)
    const totalLanguageBytes = allLanguages.reduce((total, language) => total + language.size, 0)
    const languages = allLanguages.slice(0, 7)
    for (const language of languages) language.percentage = totalLanguageBytes ? Math.round(language.size / totalLanguageBytes * 100) : 0

    const days = user.contributionsCollection.contributionCalendar.weeks.flatMap((week) => week.contributionDays)
    const recent = [...days].reverse()
    let currentStreak = 0
    const today = new Date().toISOString().slice(0, 10)
    const streakStart = recent[0]?.date === today && recent[0].contributionCount === 0 ? 1 : 0
    for (const day of recent.slice(streakStart)) {
      if (day.contributionCount === 0) break
      currentStreak += 1
    }
    let longestStreak = 0
    let runningStreak = 0
    for (const day of days) {
      runningStreak = day.contributionCount > 0 ? runningStreak + 1 : 0
      longestStreak = Math.max(longestStreak, runningStreak)
    }

    return res.status(200).json({
      login: user.login,
      name: user.name,
      followers: user.followers.totalCount,
      repositoryCount: user.repositories.totalCount,
      stars: repositories.reduce((total, repository) => total + repository.stargazerCount, 0),
      commits: user.contributionsCollection.totalCommitContributions,
      pullRequests: user.contributionsCollection.totalPullRequestContributions,
      calendar: user.contributionsCollection.contributionCalendar,
      currentStreak,
      longestStreak,
      languages,
      pinnedRepositories: user.pinnedItems.nodes,
      updatedAt: new Date().toISOString(),
    })
  } catch {
    return res.status(502).json({ error: 'GitHub activity could not be loaded.' })
  }
}
