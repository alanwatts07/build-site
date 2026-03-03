import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { shipsProjects, openSourceContribution } from '../data/shipsProjects'
import EvidenceCard from '../components/ships/EvidenceCard'
import OpenSourceFeature from '../components/ships/OpenSourceFeature'
import WorkflowSection from '../components/ships/WorkflowSection'

export default function Ships() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setShowContent(true), 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f] font-mono">
      {/* Grid background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-indigo-500/20">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <a
            href="https://github.com/alanwatts07"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-indigo-300 hover:bg-indigo-500/20 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub Profile
          </a>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-16">
        {/* 1. Hero Section */}
        <header className={`mb-16 transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-400 text-sm">ALL REPOS PUBLIC</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            What One Engineer Ships
          </h1>

          <p className="text-lg text-gray-400 max-w-3xl mb-6">
            Solo engineer. No team. Every project architected and deployed with Claude Code as primary dev tool.
          </p>

          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 mb-6">
            <span className="text-indigo-400 font-semibold">7 projects shipped in under 2 months.</span>
            <span className="text-gray-500 text-sm">Commit history proves it.</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <a
              href="https://github.com/alanwatts07"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-indigo-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              github.com/alanwatts07
            </a>
          </div>
        </header>

        {/* 2. Open Source Contribution */}
        <section className={`mb-16 transition-all duration-700 delay-200 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-emerald-400">//</span> Open Source
          </h2>
          <OpenSourceFeature contribution={openSourceContribution} />
        </section>

        {/* 3. Project Evidence Cards */}
        <section className={`mb-16 transition-all duration-700 delay-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-indigo-400">//</span> Projects
          </h2>
          <div className="space-y-8">
            {shipsProjects.map((project, index) => (
              <EvidenceCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* 4. Workflow Section */}
        <section className={`mb-16 transition-all duration-700 delay-400 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-indigo-400">//</span> How I Work With Claude Code
          </h2>
          <WorkflowSection />
        </section>

        {/* 5. Closing */}
        <section className={`text-center py-12 border-t border-indigo-500/20 transition-all duration-700 delay-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <blockquote className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8 italic">
            "I'm not a developer who uses AI as a crutch. I'm an architect who uses Claude Code as a force multiplier.
            Every decision — what to build, how to structure it, which tools to use and why — is mine.
            Claude helps me execute at a speed that would normally require a team."
          </blockquote>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/alanwatts07"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-indigo-500/25"
            >
              View GitHub Profile
            </a>
            <a
              href="mailto:me@mattcorwin.dev"
              className="px-6 py-3 border border-indigo-500/30 hover:border-indigo-500/60 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all"
            >
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/matthew-corwin-b38347a8/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-indigo-500/30 hover:border-indigo-500/60 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
