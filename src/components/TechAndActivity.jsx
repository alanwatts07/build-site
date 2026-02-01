import { lazy, Suspense } from 'react'

const TechStack3D = lazy(() => import('./TechStack3D'))
const GitHubActivity = lazy(() => import('./GitHubActivity'))

function LoadingPlaceholder({ height = 'h-[400px]' }) {
  return (
    <div className={`${height} flex items-center justify-center`}>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
    </div>
  )
}

export default function TechAndActivity() {
  return (
    <section className="px-6 py-24 bg-[#0a0a0f]">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Tech Stack & Activity
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            The tools I use to build fast, and what I've been shipping lately.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-start">
          {/* 3D Tech Stack */}
          <div className="relative">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-indigo-400">//</span> Tech Stack
            </h3>
            <div className="border border-indigo-500/20 rounded-xl overflow-hidden bg-black/20">
              <Suspense fallback={<LoadingPlaceholder height="h-[500px]" />}>
                <TechStack3D />
              </Suspense>
            </div>
          </div>

          {/* GitHub Activity Feed */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-indigo-400">//</span> Recent Commits
            </h3>
            <div className="border border-indigo-500/20 rounded-xl p-4 bg-black/20 max-h-[540px] overflow-y-auto">
              <Suspense fallback={<LoadingPlaceholder height="h-[400px]" />}>
                <GitHubActivity />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
