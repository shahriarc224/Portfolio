export type ContributionDay = { date: string; contributionCount: number }

export type GitHubActivity = {
  login: string
  name: string | null
  followers: number
  repositoryCount: number
  stars: number
  commits: number
  pullRequests: number
  calendar: { totalContributions: number; weeks: { contributionDays: ContributionDay[] }[] }
  currentStreak: number
  longestStreak: number
  languages: { name: string; color: string; percentage: number; size: number }[]
  pinnedRepositories: { name: string; description: string | null; url: string; stargazerCount: number; forkCount: number; primaryLanguage: { name: string; color: string } | null }[]
  updatedAt: string
}
