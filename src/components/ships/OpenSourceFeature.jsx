export default function OpenSourceFeature({ contribution }) {
  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
            Open Source Contribution
          </span>
          <h3 className="text-lg font-semibold text-white">
            {contribution.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-300 font-mono mb-6 px-3 py-2 rounded-lg bg-dark-900/50 border border-dark-700/50">
        {contribution.description}
      </p>

      {/* Problem → Fix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-2">Problem</h4>
          <p className="text-sm text-gray-400">{contribution.problem}</p>
        </div>
        <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">Fix</h4>
          <p className="text-sm text-gray-400">{contribution.fix}</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
        <span className="flex items-center gap-2 text-gray-400">
          <span className="font-semibold text-white">{contribution.stats.commits}</span> commits
        </span>
        <span className="text-dark-700">|</span>
        <span className="flex items-center gap-2 text-gray-400">
          <span className="font-semibold text-emerald-400">+{contribution.stats.additions}</span> additions
        </span>
        <span className="text-dark-700">|</span>
        {contribution.stats.reviewComments && (
          <>
            <span className="flex items-center gap-2 text-gray-400">
              <span className="font-semibold text-white">{contribution.stats.reviewComments}</span> review comments
            </span>
            <span className="text-dark-700">|</span>
          </>
        )}
        <span className="text-gray-400">
          Co-authored with <span className="text-indigo-400">{contribution.stats.coAuthored}</span>
        </span>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-3">
        <a
          href={contribution.pr}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Pull Request
        </a>
        <a
          href={contribution.issue}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-dark-700/50 border border-dark-700 text-gray-400 hover:text-white hover:border-dark-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          View Issue
        </a>
      </div>
    </div>
  )
}
