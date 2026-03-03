export default function EvidenceCard({ project, index }) {
  const daysSinceCreated = Math.floor(
    (Date.now() - new Date(project.created).getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-dark-700 bg-dark-900/50 transition-all duration-300 hover:border-dark-600 hover:bg-dark-800/50"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white group-hover:text-accent-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-gray-400 mt-1">{project.oneLiner}</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
              >
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                Live
              </a>
            )}
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg bg-dark-700/50 border border-dark-700 text-gray-400 hover:text-white hover:border-dark-600 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Code
            </a>
          </div>
        </div>

        {/* Velocity bar */}
        <div className="flex flex-wrap items-center gap-4 mb-6 p-3 rounded-lg bg-dark-800/50 border border-dark-700/50">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Created {project.created}
          </div>
          <span className="text-dark-700">|</span>
          <span className="text-sm font-medium text-indigo-400">
            {project.velocityStat}
          </span>
        </div>

        {/* Two-column: I Decided vs Claude Executed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-lg border-l-2 border-indigo-500/60 bg-indigo-500/5 p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-3">
              I Decided
            </h4>
            <ul className="space-y-2">
              {project.iDid.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border-l-2 border-emerald-500/60 bg-emerald-500/5 p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3">
              Claude Executed
            </h4>
            <ul className="space-y-2">
              {project.claudeDid.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Evidence links */}
        {project.keyLinks.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.keyLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full bg-dark-700/50 border border-dark-700 text-gray-400 hover:text-white hover:border-indigo-500/40 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Hover gradient accent */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </article>
  )
}
