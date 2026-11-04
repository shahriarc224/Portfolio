import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiActivity, FiBookOpen, FiCode, FiGitCommit, FiGitPullRequest, FiStar, FiUsers } from 'react-icons/fi'
import type { GitHubActivity } from '../types/github'

const metrics = [
  { key: 'repositoryCount', label: 'Repositories', icon: FiBookOpen },
  { key: 'commits', label: 'Commits', icon: FiGitCommit },
  { key: 'pullRequests', label: 'Pull requests', icon: FiGitPullRequest },
  { key: 'stars', label: 'Stars received', icon: FiStar },
  { key: 'followers', label: 'Followers', icon: FiUsers },
] as const

function contributionLevel(count: number) {
  if (count === 0) return 'level-0'
  if (count < 3) return 'level-1'
  if (count < 6) return 'level-2'
  if (count < 10) return 'level-3'
  return 'level-4'
}

export default function GithubActivity() {
  const [activity, setActivity] = useState<GitHubActivity | null>(null)
  const [error, setError] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/github-activity', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('GitHub activity is not configured.')
        return response.json() as Promise<GitHubActivity>
      })
      .then(setActivity)
      .catch((reason: unknown) => {
        if (reason instanceof Error && reason.name === 'AbortError') return
        setError(true)
      })
    return () => controller.abort()
  }, [])

  const reveal = { initial: { opacity: 0, y: reduceMotion ? 0 : 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: reduceMotion ? 0 : 0.45 } }
  const headlineReveal = { initial: { opacity: 0, y: reduceMotion ? 0 : 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.45 }, transition: { duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] as const } }
  const days = activity?.calendar.weeks.map((week) => week.contributionDays) ?? []
  const monthLabels = activity?.calendar.weeks.map((week, index) => {
    const firstDay = week.contributionDays[0]
    if (!firstDay) return ''
    const date = new Date(`${firstDay.date}T12:00:00`)
    const currentMonth = date.getMonth()
    const previous = index > 0 ? activity.calendar.weeks[index - 1].contributionDays[0] : undefined
    const previousMonth = previous ? new Date(`${previous.date}T12:00:00`).getMonth() : -1
    return currentMonth !== previousMonth ? new Intl.DateTimeFormat('en', { month: 'short' }).format(date) : ''
  }) ?? []

  return <section id="github-activity" className="github-activity-section section-anchor">
    <motion.div className="github-activity-heading" {...reveal}><div><span className="section-kicker">BUILDING · LEARNING · SHIPPING</span><motion.h2 {...headlineReveal}><FiCode aria-hidden="true" /> GITHUB ACTIVITY<span>.</span></motion.h2></div><a href="https://github.com/shahriarc224" target="_blank" rel="noopener noreferrer">OPEN GITHUB <span aria-hidden="true">↗</span></a></motion.div>

    {activity ? <>
      <div className="github-metrics">{metrics.map(({ key, label, icon: Icon }, index) => <motion.div className="github-metric" key={key} {...reveal} transition={{ ...reveal.transition, delay: reduceMotion ? 0 : index * 0.05 }}><Icon aria-hidden="true"/><strong>{activity[key].toLocaleString()}</strong><span>{label}</span></motion.div>)}</div>

      <div className="github-dashboard">
        <div className="github-main-column">
          <motion.article className="github-panel github-contributions" {...reveal}>
            <div className="github-panel-heading"><motion.h3 {...headlineReveal}>{activity.calendar.totalContributions.toLocaleString()} contributions in the last year</motion.h3><span>LAST 12 MONTHS</span></div>
            <div className="contribution-scroll"><div className="contribution-months" aria-hidden="true">{monthLabels.map((month, index) => <span key={index}>{month}</span>)}</div><div className="contribution-grid" role="img" aria-label={`${activity.calendar.totalContributions} GitHub contributions over the last year`}>{days.map((week, weekIndex) => <div className="contribution-week" key={weekIndex}>{week.map((day) => <span key={day.date} className={`contribution-cell ${contributionLevel(day.contributionCount)}`} title={`${day.contributionCount} contributions on ${day.date}`} />)}</div>)}</div></div>
            <div className="contribution-legend"><span>Less</span><i className="level-0"/><i className="level-1"/><i className="level-2"/><i className="level-3"/><i className="level-4"/><span>More</span></div>
          </motion.article>

          <motion.article className="github-panel github-repositories" {...reveal}>
            <div className="github-panel-heading"><motion.h3 {...headlineReveal}><FiBookOpen aria-hidden="true"/> Pinned repositories</motion.h3><a href="https://github.com/shahriarc224?tab=repositories" target="_blank" rel="noopener noreferrer">VIEW ALL ↗</a></div>
            {activity.pinnedRepositories.length ? <div className="pinned-repo-grid">{activity.pinnedRepositories.map((repository) => <a className="pinned-repo" href={repository.url} key={repository.name} target="_blank" rel="noopener noreferrer"><strong>{repository.name}</strong><p>{repository.description || 'No description provided.'}</p><span>{repository.primaryLanguage && <><i style={{ backgroundColor: repository.primaryLanguage.color }} />{repository.primaryLanguage.name}</>}<span><FiStar aria-hidden="true"/>{repository.stargazerCount}</span><span><FiGitPullRequest aria-hidden="true"/>{repository.forkCount}</span></span></a>)}</div> : <p className="github-empty">No pinned public repositories were returned by GitHub.</p>}
          </motion.article>
        </div>

        <div className="github-side-column">
          <motion.article className="github-panel github-languages" {...reveal}>
            <div className="github-panel-heading"><motion.h3 {...headlineReveal}><FiCode aria-hidden="true"/> Most used languages</motion.h3></div>
            {activity.languages.length ? <div className="language-list">{activity.languages.map((language) => <div className="language-item" key={language.name}><div><span><i style={{ backgroundColor: language.color }}/>{language.name}</span><span>{language.percentage}%</span></div><div className="language-bar"><i style={{ width: `${language.percentage}%`, backgroundColor: language.color }}/></div></div>)}</div> : <p className="github-empty">Language data is not available yet.</p>}
          </motion.article>
          <motion.article className="github-panel github-streak" {...reveal}>
            <div className="github-panel-heading"><motion.h3 {...headlineReveal}><FiActivity aria-hidden="true"/> Contribution streak</motion.h3></div>
            <div className="streak-count"><span aria-hidden="true">🔥</span><strong>{activity.currentStreak}</strong><small>current days</small></div><div className="longest-streak"><span>Longest streak</span><strong>{activity.longestStreak} days</strong></div>
          </motion.article>
        </div>
      </div>
      <div className="github-section-foot"><span>04 — OPEN SOURCE</span><span>LIVE FROM GITHUB <i /></span></div>
    </> : <motion.div className={`github-setup-state ${error ? 'is-error' : ''}`} {...reveal} role="status">{error ? <>Add <code>GITHUB_TOKEN</code> to the server environment to load live stats. See the setup steps in the README.</> : 'Connecting to GitHub…'}</motion.div>}
  </section>
}
