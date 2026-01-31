import { useEffect, useState } from 'react'

export default function LiveHero() {
  const [time, setTime] = useState('--:--:--')
  const [logIndex1, setLogIndex1] = useState(0)
  const [logIndex2, setLogIndex2] = useState(0)
  const [logIndex3, setLogIndex3] = useState(0)

  const whistleblowerLogs = [
    '[INFO] Scanning OIG exclusion records...',
    '[DATA] 82,709 providers loaded',
    '[SCAN] Cross-referencing Medicare payments...',
    '[ALERT] High-risk entity detected: z-score 3.2',
    '[ML] Risk model inference: 94.2% confidence',
    '[INFO] USASpending.gov sync complete',
  ]

  const tcnLogs = [
    '[STREAM] BTC-USD WebSocket connected',
    '[FEATURE] 216 indicators computed',
    '[MODEL] TCN inference: LONG signal',
    '[PROB] Calibrated confidence: 0.847',
    '[RISK] Position size: 2.3% portfolio',
    '[VALIDATE] Walk-forward: 89.2% win rate',
  ]

  const maintenanceLogs = [
    '[MODEL] XGBoost classifier loaded',
    '[SENSOR] Vibration data streaming...',
    '[EXTRACT] 14 features computed',
    '[PREDICT] State: HEALTHY',
    '[CONF] Degradation: 8.2%',
    '[ALERT] Monitoring bearing #3...',
  ]

  // Real-time clock (client-side only to avoid SSR mismatch)
  useEffect(() => {
    setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }))
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Animated logs
  useEffect(() => {
    const i1 = setInterval(() => setLogIndex1((i) => (i + 1) % whistleblowerLogs.length), 2000)
    const i2 = setInterval(() => setLogIndex2((i) => (i + 1) % tcnLogs.length), 1800)
    const i3 = setInterval(() => setLogIndex3((i) => (i + 1) % maintenanceLogs.length), 2200)
    return () => { clearInterval(i1); clearInterval(i2); clearInterval(i3) }
  }, [])

  return (
    <section className="relative min-h-screen bg-[#0a0a0f] overflow-hidden font-mono">
      {/* Static grid background */}
      <div className="absolute inset-0 opacity-10">
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

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Top status bar */}
        <div className="relative flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-indigo-500/20">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-400 text-xs sm:text-sm">SYSTEM ACTIVE</span>
            </div>
          </div>
          {/* Centered on desktop */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 absolute left-1/2 -translate-x-1/2">
            <span>LOCAL:</span>
            <span className="text-emerald-400 font-bold tracking-wider">{time}</span>
          </div>
          {/* Right side on mobile */}
          <div className="flex sm:hidden items-center text-xs text-gray-500">
            <span>LOCAL: <span className="text-emerald-400 font-bold tracking-wider">{time}</span></span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs">
            <span className="text-gray-500">NODE: <span className="text-indigo-400">mattcorwin.dev</span></span>
            <span className="text-gray-500">MODE: <span className="text-cyan-400">AI-AUGMENTED</span></span>
          </div>
        </div>

        {/* Hero content */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 mb-4 border border-indigo-500/30 rounded-full">
            <span className="text-xs text-indigo-400 tracking-widest">TECHNICAL PRODUCT ARCHITECT</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Matt Corwin
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Rapid MVP Development & Data Pipelines
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-indigo-500/25"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-indigo-500/30 hover:border-indigo-500/60 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Live Terminal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

          {/* Terminal 1 - Whistleblower */}
          <div className="border border-indigo-500/30 rounded-lg bg-black/40 overflow-hidden">
            <div className="px-3 py-2 border-b border-indigo-500/20 flex items-center justify-between bg-indigo-500/5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
                </div>
                <span className="text-xs text-gray-400">whistleblower-workbench</span>
              </div>
              <span className="text-[10px] text-emerald-400">● LIVE</span>
            </div>
            <div className="p-3 text-xs space-y-1.5 h-32">
              {whistleblowerLogs.slice(0, 5).map((log, i) => (
                <div
                  key={i}
                  className={`transition-all duration-500 ${
                    i === logIndex1 % 5 ? 'text-emerald-400 translate-x-1' : 'text-gray-600'
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Terminal 2 - TCN */}
          <div className="border border-indigo-500/30 rounded-lg bg-black/40 overflow-hidden">
            <div className="px-3 py-2 border-b border-indigo-500/20 flex items-center justify-between bg-indigo-500/5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
                </div>
                <span className="text-xs text-gray-400">tcn-trading-bot</span>
              </div>
              <span className="text-[10px] text-cyan-400">● STREAMING</span>
            </div>
            <div className="p-3 text-xs space-y-1.5 h-32">
              {tcnLogs.slice(0, 5).map((log, i) => (
                <div
                  key={i}
                  className={`transition-all duration-500 ${
                    i === logIndex2 % 5 ? 'text-cyan-400 translate-x-1' : 'text-gray-600'
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Terminal 3 - Predictive Maintenance */}
          <div className="border border-indigo-500/30 rounded-lg bg-black/40 overflow-hidden">
            <div className="px-3 py-2 border-b border-indigo-500/20 flex items-center justify-between bg-indigo-500/5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
                </div>
                <span className="text-xs text-gray-400">predictive-maintenance</span>
              </div>
              <span className="text-[10px] text-amber-400">● ML-READY</span>
            </div>
            <div className="p-3 text-xs space-y-1.5 h-32">
              {maintenanceLogs.slice(0, 5).map((log, i) => (
                <div
                  key={i}
                  className={`transition-all duration-500 ${
                    i === logIndex3 % 5 ? 'text-amber-400 translate-x-1' : 'text-gray-600'
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech stack bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500">
          <span className="text-indigo-400/60">STACK:</span>
          {['React 19', 'Next.js 15', 'Python', 'FastAPI', 'XGBoost', 'WebSocket', 'LLM-Orchestration'].map((tech, i) => (
            <span key={tech} className="flex items-center gap-2">
              {i > 0 && <span className="text-indigo-500/40">•</span>}
              <span className="text-gray-400">{tech}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-indigo-500/30 p-2">
          <div className="h-2 w-1 animate-bounce rounded-full bg-indigo-400" />
        </div>
      </div>

    </section>
  )
}
