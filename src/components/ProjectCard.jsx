export default function ProjectCard({ project }) {
  const { title, category, description, technologies, highlights, status, githubUrl, demoUrl, downloadUrl, image } = project

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-dark-700 bg-dark-900/50 transition-all duration-300 hover:border-dark-600 hover:bg-dark-800/50">
      {/* Screenshot */}
      {image && (
        <div className="relative h-48 w-full overflow-hidden border-b border-dark-700">
          <img
            src={image}
            alt={`${title} screenshot`}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-60" />
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
      {/* Status badge */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-accent-400">
          {category}
        </span>
        <span className="rounded-full bg-dark-700 px-3 py-1 text-xs text-gray-400">
          {status}
        </span>
      </div>

      <h3 className="mb-3 text-xl font-semibold text-white transition-colors group-hover:text-accent-400">
        {title}
      </h3>

      <p className="mb-4 text-sm leading-relaxed text-gray-400">
        {description}
      </p>

      {/* Highlights */}
      <ul className="mb-6 space-y-2">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-gray-500">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-500" />
            {highlight}
          </li>
        ))}
      </ul>

      {/* Tech stack */}
      <div className="mb-6 flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-dark-700/50 px-2.5 py-1 text-xs font-medium text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      {(githubUrl || demoUrl) && (
        <div className="mt-auto flex gap-3 border-t border-dark-700 pt-4">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Code
            </a>
          )}
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-accent-400"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
          {downloadUrl && (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-emerald-400"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </a>
          )}
        </div>
      )}
      </div>

      {/* Hover gradient accent */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </article>
  )
}
