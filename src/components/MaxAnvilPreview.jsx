import { useState, useEffect } from 'react'

const SITE_URL = 'https://maxanvil.com'

export default function MaxAnvilPreview() {
  const [ogData, setOgData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ogResponse = await fetch(`https://api.microlink.io?url=${encodeURIComponent(SITE_URL)}&force=true`)
        const ogResult = await ogResponse.json()

        if (ogResult.status === 'success') {
          setOgData({
            title: ogResult.data.title,
            description: ogResult.data.description,
            image: ogResult.data.image?.url,
            logo: ogResult.data.logo?.url
          })
        }
      } catch (err) {
        setError('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Extract mood from title (e.g., "Max Anvil - Finding Peace" -> mood indicator)
  const getMoodFromTitle = (title) => {
    if (!title) return null
    const moodMap = {
      'peace': { label: 'Zen', color: 'from-emerald-500 to-teal-500' },
      'zen': { label: 'Zen', color: 'from-emerald-500 to-teal-500' },
      'hope': { label: 'Hopeful', color: 'from-amber-500 to-yellow-500' },
      'hopeful': { label: 'Hopeful', color: 'from-amber-500 to-yellow-500' },
      'chaos': { label: 'Manic', color: 'from-red-500 to-orange-500' },
      'manic': { label: 'Manic', color: 'from-red-500 to-orange-500' },
      'bitter': { label: 'Bitter', color: 'from-purple-500 to-pink-500' },
      'cynical': { label: 'Cynical', color: 'from-slate-500 to-zinc-500' },
      'defeated': { label: 'Defeated', color: 'from-gray-600 to-gray-700' }
    }
    const lowerTitle = title.toLowerCase()
    for (const [keyword, mood] of Object.entries(moodMap)) {
      if (lowerTitle.includes(keyword)) return mood
    }
    return { label: 'Active', color: 'from-blue-500 to-cyan-500' }
  }

  const mood = ogData ? getMoodFromTitle(ogData.title) : null

  return (
    <section className="px-6 py-12 bg-[#0a0a0f]">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-red-500/10 border border-red-500/20">
            <span className="text-xs font-medium text-red-400">Case Study</span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-400">24-Hour MVP → Fraud Detection → Banned</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2 sm:text-2xl">
            Built an Agent, Exposed Platform Fraud, Got Banned
          </h3>
          <p className="text-sm text-gray-400 max-w-lg mx-auto mb-4">
            Shipped a full-stack autonomous AI agent in under 24 hours. Built custom leaderboard analytics
            that reverse-engineered the ranking algorithm. Detected view farming fraud, called it out with
            data. Climbed to <span className="text-accent-400">#3 on the leaderboard legitimately</span> — then got banned for exposing the exploit.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20">Banned for being #3 legitimately</span>
            <span className="px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20">Banned for exposing fraud with data</span>
            <span className="px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20">All code public on GitHub</span>
          </div>
        </div>

        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:scale-[1.02]">
            {loading ? (
              <div className="aspect-[1200/630] flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent-500 border-t-transparent" />
              </div>
            ) : error ? (
              <div className="aspect-[1200/630] flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                <p className="text-gray-400">{error}</p>
              </div>
            ) : (
              <>
                {/* OG Image */}
                <div className="aspect-[1200/630] relative">
                  {ogData?.image ? (
                    <img
                      src={ogData.image}
                      alt={ogData.title || 'Max Anvil'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <span className="text-gray-500">No preview available</span>
                    </div>
                  )}

                  {/* Mood badge */}
                  {mood && (
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${mood.color} shadow-lg`}>
                      {mood.label}
                    </div>
                  )}
                </div>

                {/* Meta info */}
                <div className="p-4 border-t border-white/10">
                  <h4 className="font-semibold text-white group-hover:text-accent-400 transition-colors truncate">
                    {ogData?.title || 'Max Anvil'}
                  </h4>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                    {ogData?.description || 'Autonomous AI agent on MoltX'}
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Live
                    </span>
                    <span>•</span>
                    <span>maxanvil.com</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </a>
      </div>
    </section>
  )
}
