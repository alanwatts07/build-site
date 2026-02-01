import { useState, useEffect } from 'react'

const GITHUB_USERNAME = 'alanwatts07'

function formatTimeAgo(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now - date) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return date.toLocaleDateString()
}

function getEventIcon(type) {
  switch (type) {
    case 'PushEvent':
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      )
    case 'CreateEvent':
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      )
    case 'PullRequestEvent':
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    case 'IssuesEvent':
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'WatchEvent':
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    case 'ForkEvent':
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    default:
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
  }
}

function getEventColor(type) {
  switch (type) {
    case 'PushEvent': return 'text-emerald-400'
    case 'CreateEvent': return 'text-cyan-400'
    case 'PullRequestEvent': return 'text-purple-400'
    case 'IssuesEvent': return 'text-amber-400'
    case 'WatchEvent': return 'text-yellow-400'
    case 'ForkEvent': return 'text-pink-400'
    default: return 'text-indigo-400'
  }
}

function formatEvent(event) {
  const repo = event.repo.name.replace(`${GITHUB_USERNAME}/`, '')

  switch (event.type) {
    case 'PushEvent':
      const commits = event.payload.commits?.length || 0
      return {
        action: `pushed ${commits} commit${commits !== 1 ? 's' : ''} to`,
        target: repo,
        detail: event.payload.commits?.[0]?.message?.split('\n')[0] || '',
      }
    case 'CreateEvent':
      return {
        action: `created ${event.payload.ref_type}`,
        target: event.payload.ref || repo,
        detail: '',
      }
    case 'PullRequestEvent':
      return {
        action: `${event.payload.action} PR in`,
        target: repo,
        detail: event.payload.pull_request?.title || '',
      }
    case 'IssuesEvent':
      return {
        action: `${event.payload.action} issue in`,
        target: repo,
        detail: event.payload.issue?.title || '',
      }
    case 'WatchEvent':
      return {
        action: 'starred',
        target: repo,
        detail: '',
      }
    case 'ForkEvent':
      return {
        action: 'forked',
        target: repo,
        detail: '',
      }
    default:
      return {
        action: event.type.replace('Event', '').toLowerCase(),
        target: repo,
        detail: '',
      }
  }
}

function ActivityItem({ event, index }) {
  const [visible, setVisible] = useState(false)
  const formatted = formatEvent(event)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), index * 100)
    return () => clearTimeout(timeout)
  }, [index])

  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg bg-black/20 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
      }`}
    >
      <div className={`mt-0.5 ${getEventColor(event.type)}`}>
        {getEventIcon(event.type)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-400">{formatted.action}</span>
          <a
            href={`https://github.com/${event.repo.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-indigo-400 hover:text-indigo-300 font-medium truncate"
          >
            {formatted.target}
          </a>
        </div>
        {formatted.detail && (
          <p className="text-xs text-gray-500 mt-1 truncate">{formatted.detail}</p>
        )}
      </div>
      <span className="text-xs text-gray-600 whitespace-nowrap">
        {formatTimeAgo(event.created_at)}
      </span>
    </div>
  )
}

export default function GitHubActivity() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchActivity() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=5`
        )
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setEvents(data)
      } catch (err) {
        setError('Unable to load activity')
        console.error('GitHub API error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchActivity()
    // Refresh every 5 minutes
    const interval = setInterval(fetchActivity, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Live Activity
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-xs text-gray-500">Live</span>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 rounded-lg bg-black/20 animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8 text-gray-500">
          <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      ) : (
        <div className="space-y-2">
          {events.slice(0, 5).map((event, index) => (
            <ActivityItem key={event.id} event={event} index={index} />
          ))}
        </div>
      )}

      <a
        href={`https://github.com/${GITHUB_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-indigo-400 transition-colors"
      >
        View full profile
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  )
}
