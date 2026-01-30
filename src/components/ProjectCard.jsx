export default function ProjectCard({ project }) {
  const { title, category, description, technologies, highlights, status } = project

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-dark-700 bg-dark-900/50 p-6 transition-all duration-300 hover:border-dark-600 hover:bg-dark-800/50">
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
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-dark-700/50 px-2.5 py-1 text-xs font-medium text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Hover gradient accent */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </article>
  )
}
