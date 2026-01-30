import { useEffect, useState } from 'react'

export default function BannerHero() {
  const [time, setTime] = useState(new Date().toISOString().slice(11, 19))
  const [logIndex1, setLogIndex1] = useState(0)
  const [logIndex2, setLogIndex2] = useState(0)

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
    '[ANALYSIS] Walk-forward validation: 89.2%',
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toISOString().slice(11, 19))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex1((i) => (i + 1) % whistleblowerLogs.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex2((i) => (i + 1) % tcnLogs.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-[1584px] h-[396px] bg-[#0a0a0f] overflow-hidden font-mono">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Animated scan line */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent animate-pulse" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex">

        {/* Left sidebar - Tech Stack */}
        <div className="w-48 border-r border-indigo-500/20 p-4 flex flex-col">
          <div className="text-[10px] text-indigo-400/60 mb-2">TECH_STACK</div>
          <div className="text-xs space-y-1.5 text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">▸</span>
              <span>React 19</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">▸</span>
              <span>Next.js 15</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">▸</span>
              <span>Python</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">▸</span>
              <span>FastAPI</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">▸</span>
              <span>XGBoost</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">▸</span>
              <span>LLM-Orchestration</span>
            </div>
          </div>

          <div className="mt-auto">
            <div className="text-[10px] text-indigo-400/60 mb-1">UPTIME</div>
            <div className="text-emerald-400 text-sm font-bold tracking-wider">{time}</div>
          </div>
        </div>

        {/* Center content */}
        <div className="flex-1 flex flex-col">

          {/* Header */}
          <div className="border-b border-indigo-500/20 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-lg font-bold text-white tracking-tight">
                  MATT CORWIN
                </div>
                <div className="text-[10px] text-gray-500 tracking-widest">
                  TECHNICAL PRODUCT ARCHITECT
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">NODE:</span>
                <span className="text-indigo-400">mattcorwin.dev</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">MODE:</span>
                <span className="text-emerald-400">AI-AUGMENTED</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400">ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Project Grid */}
          <div className="flex-1 p-4 flex gap-4">

            {/* Terminal 1 - Whistleblower */}
            <div className="flex-1 border border-indigo-500/30 rounded-lg bg-black/40 overflow-hidden">
              <div className="px-3 py-1.5 border-b border-indigo-500/20 flex items-center justify-between bg-indigo-500/5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/60" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-[10px] text-gray-400">whistleblower-workbench</span>
                </div>
                <span className="text-[10px] text-emerald-400">● LIVE</span>
              </div>
              <div className="p-3 text-xs space-y-1">
                {whistleblowerLogs.slice(0, 4).map((log, i) => (
                  <div
                    key={i}
                    className={`transition-opacity duration-300 ${
                      i === logIndex1 % 4 ? 'text-emerald-400' : 'text-gray-500'
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal 2 - TCN */}
            <div className="flex-1 border border-indigo-500/30 rounded-lg bg-black/40 overflow-hidden">
              <div className="px-3 py-1.5 border-b border-indigo-500/20 flex items-center justify-between bg-indigo-500/5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/60" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-[10px] text-gray-400">tcn-trading-bot</span>
                </div>
                <span className="text-[10px] text-cyan-400">● STREAMING</span>
              </div>
              <div className="p-3 text-xs space-y-1">
                {tcnLogs.slice(0, 4).map((log, i) => (
                  <div
                    key={i}
                    className={`transition-opacity duration-300 ${
                      i === logIndex2 % 4 ? 'text-cyan-400' : 'text-gray-500'
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal 3 - Predictive Maintenance */}
            <div className="flex-1 border border-indigo-500/30 rounded-lg bg-black/40 overflow-hidden">
              <div className="px-3 py-1.5 border-b border-indigo-500/20 flex items-center justify-between bg-indigo-500/5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/60" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-[10px] text-gray-400">predictive-maintenance</span>
                </div>
                <span className="text-[10px] text-amber-400">● ML-READY</span>
              </div>
              <div className="p-3 text-xs space-y-1">
                <div className="text-gray-500">[MODEL] XGBoost classifier loaded</div>
                <div className="text-gray-500">[FEATURES] 14 vibration metrics</div>
                <div className="text-amber-400">[PREDICT] State: HEALTHY</div>
                <div className="text-gray-500">[CONF] Degradation: 8.2%</div>
              </div>
            </div>
          </div>

          {/* Bottom status bar */}
          <div className="border-t border-indigo-500/20 px-4 py-2 flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-4 text-gray-500">
              <span>RAPID MVP DEVELOPMENT</span>
              <span className="text-indigo-500">|</span>
              <span>DATA PIPELINES</span>
              <span className="text-indigo-500">|</span>
              <span>ML SYSTEMS</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-500">github.com/alanwatts07</span>
              <span className="text-indigo-400">■ ■ ■</span>
            </div>
          </div>
        </div>

        {/* Right metrics panel */}
        <div className="w-40 border-l border-indigo-500/20 p-4">
          <div className="text-[10px] text-indigo-400/60 mb-3">METRICS</div>

          <div className="space-y-3">
            <div>
              <div className="text-[10px] text-gray-500 mb-1">MODEL ACCURACY</div>
              <div className="text-lg font-bold text-emerald-400">98.2%</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 mb-1">DEPLOYMENTS</div>
              <div className="text-lg font-bold text-indigo-400">12</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 mb-1">APIS SHIPPED</div>
              <div className="text-lg font-bold text-cyan-400">8</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-[10px] text-indigo-400/60 mb-2">SIGNAL</div>
            <div className="flex items-end gap-0.5 h-8">
              {[4, 6, 3, 8, 5, 9, 7, 4, 6, 8, 5, 7].map((h, i) => (
                <div
                  key={i}
                  className="w-2 bg-indigo-500/60 rounded-sm animate-pulse"
                  style={{
                    height: `${h * 10}%`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scan line overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }}
      />
    </div>
  )
}
