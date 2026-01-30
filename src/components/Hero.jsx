export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6">
      {/* Subtle background element */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent-400">
          Matt Corwin
        </p>

        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          Technical Product Architect
          <span className="block text-gray-400">
            Rapid MVP Development & Data Pipelines
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400">
          I transform complex technical requirements into production-ready MVPs.
          Specializing in data-intensive applications, AI/ML integration, and
          scalable backend architectures.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="rounded-lg bg-accent-500 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-500/25"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-dark-700 bg-dark-800 px-6 py-3 text-sm font-medium text-gray-300 transition-all hover:border-dark-600 hover:bg-dark-700"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-dark-700 p-2">
          <div className="h-2 w-1 animate-bounce rounded-full bg-accent-400" />
        </div>
      </div>
    </section>
  )
}
