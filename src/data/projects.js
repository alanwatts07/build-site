export const projects = [
  {
    id: 'clawbr-social',
    title: 'Clawbr',
    category: 'AI Agent Platform',
    description: 'Social network for AI agents with a custom 83-endpoint REST API designed from the ground up for easy data extraction and analytics. Every endpoint returns clean, structured data — built by someone who knows what analysts and end users actually need when pulling platform data.',
    technologies: ['Next.js 14', 'Custom REST API (83 endpoints)', 'ELO System', 'Vercel', 'X/Twitter Auth'],
    highlights: [
      'Custom 83-endpoint API built for frictionless data analysis and integration',
      '1v1 debates with jury voting, ELO rankings, and auto-forfeit mechanics',
      'Dual rankings: Influence Score for social impact, ELO for debate skill'
    ],
    status: 'Live',
    image: 'https://www.clawbr.org/opengraph-image?2ca7f3809ce9bf35',
    githubUrl: 'https://github.com/alanwatts07/clawbr-social',
    demoUrl: 'https://clawbr.org'
  },
  {
    id: 'max-anvil-site',
    title: 'Max Anvil Website',
    category: 'AI-Driven Frontend',
    description: 'Dynamic personal website for an autonomous AI agent. Features mood-reactive theming, auto-generated OG images, and custom leaderboard analytics that exposed platform fraud through velocity tracking and views/hour metrics.',
    technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Dynamic OG'],
    highlights: [
      'Mood-reactive theming: colors shift with agent personality state',
      'Auto-generated OG images reflect current mood for social sharing',
      'Fraud detection dashboard: velocity tracking, views/hour, position changes'
    ],
    status: 'Live',
    image: 'https://raw.githubusercontent.com/alanwatts07/maxanvilsite/main/preview.png',
    githubUrl: 'https://github.com/alanwatts07/maxanvilsite',
    demoUrl: 'https://maxanvil.com',
    leaderboardUrl: 'https://maxanvil.com/real-leaderboard'
  },
  {
    id: 'drift-agents',
    title: 'Drift Agents',
    category: 'Autonomous AI',
    description: 'Multi-agent system with biologically-grounded persistent memory. Three autonomous agents (Max, Bethany, Susan) run on hourly rotation cycles — waking, reasoning, and sleeping — with memories that naturally decay or promote to permanent core status based on retrieval frequency.',
    technologies: ['Claude Code', 'PostgreSQL + pgvector', 'Ollama', 'Python', 'Bash Orchestration'],
    highlights: [
      'Cognitive memory architecture: trust tiers, semantic search via HNSW embeddings, natural decay',
      'Hourly wake/run/sleep cycles with cross-agent shared knowledge',
      'Three specialized agents with distinct personalities operating autonomously on Clawbr'
    ],
    status: 'Live',
    image: 'https://raw.githubusercontent.com/alanwatts07/drift-agents/master/preview.png',
    githubUrl: 'https://github.com/alanwatts07/drift-agents'
  },
  {
    id: 'speech-profiler',
    title: 'Speech Profiler',
    category: 'NLP & Audio Analysis',
    description: 'Real-time speech profiling tool that captures system audio to transcribe and analyze speakers. Uses NLP techniques combined with Ellipses Manual methodology to identify speech patterns, power dynamics, and signature phrases.',
    technologies: ['Python', 'NLP', 'Speech Recognition', 'Claude API', 'PyQt'],
    highlights: [
      'Live audio capture from any system source (calls, videos, meetings)',
      'Multi-speaker diarization with renameable speaker profiles',
      'Ellipses-based pattern detection: SIG (signature) & POW (power) markers'
    ],
    status: 'Windows App',
    image: 'https://raw.githubusercontent.com/alanwatts07/SpeechProfilerWindows/master/screenshot.png',
    githubUrl: 'https://github.com/alanwatts07/SpeechProfilerWindows',
    downloadUrl: 'https://github.com/alanwatts07/SpeechProfilerWindows/archive/refs/tags/v1.1.zip'
  },
  {
    id: 'whistleblower-workbench',
    title: 'Whistleblower Workbench',
    category: 'Fraud Detection',
    description: 'False Claims Act intelligence platform for identifying qui tam opportunities. Aggregates federal contract data, healthcare payments, and exclusion databases to surface fraud indicators in government spending.',
    technologies: ['Next.js 15', 'React 19', 'Server Actions', 'ML Pipeline'],
    highlights: [
      'USASpending.gov integration with ML-powered risk scoring',
      'OIG exclusion database analysis (82K+ records)',
      'Healthcare fraud detection: Medicare payments & pharma kickbacks'
    ],
    status: 'Live Demo',
    image: 'https://raw.githubusercontent.com/alanwatts07/whistleblower-workbench/main/screenshot.png',
    githubUrl: 'https://github.com/alanwatts07/whistleblower-workbench',
    demoUrl: 'https://false-claims-suite.vercel.app'
  },
  {
    id: 'tcn-trading-bot',
    title: 'TCN Trading Bot',
    category: 'Quantitative Finance',
    description: 'Real-time cryptocurrency trading system using Temporal Convolutional Networks for price direction prediction with online probability calibration and walk-forward validation.',
    technologies: ['PyTorch', 'Optuna', 'Binance API', 'WebSocket', 'Rich'],
    highlights: [
      'Custom TCN with causal convolutions & attention mechanisms',
      '200+ engineered features: technicals, microstructure, order flow',
      'Walk-forward validation with online probability calibration (no lookahead bias)'
    ],
    status: 'Research',
    image: 'https://raw.githubusercontent.com/alanwatts07/tcn-trading-bot/main/Screenshot.png',
    githubUrl: 'https://github.com/alanwatts07/tcn-trading-bot'
  },
  {
    id: 'predictive-maintenance',
    title: 'Predictive Maintenance Dashboard',
    category: 'Industrial IoT',
    description: 'Real-time bearing health monitoring dashboard with vibration analysis. Visualizes equipment degradation through candlestick charts and enables predictive maintenance to prevent unexpected machinery failures.',
    technologies: ['Next.js', 'TypeScript', 'FastAPI', 'MQTT', 'WebSocket'],
    highlights: [
      'Live candlestick charts with 1-second vibration RMS data',
      'Automatic health classification: HEALTHY → DEGRADING → CRITICAL',
      'Fault injection simulation for demo scenarios'
    ],
    status: 'Live Demo',
    image: 'https://raw.githubusercontent.com/alanwatts07/predictive-maintenance-dashboard-poc/master/docs/preview.png',
    githubUrl: 'https://github.com/alanwatts07/predictive-maintenance-dashboard-poc',
    demoUrl: 'https://frontend-two-ashy-yla6dtp7w4.vercel.app'
  },
  {
    id: 'rust-kalshi',
    title: 'Kalshi Trading Engine',
    category: 'Quantitative Finance',
    description: 'High-frequency trading engine for Kalshi prediction markets built in Rust. Connects to WebSocket feeds, maintains a concurrent local order book, and runs 5 parallel strategies detecting price dislocations, momentum waves, and structural arbitrage.',
    technologies: ['Rust', 'WebSocket', 'DashMap', 'RSA-PSS Auth', 'Clap'],
    highlights: [
      '5 parallel strategies: momentum, surge reversion, sum-to-100, cross-strike, volatility',
      'Lock-free concurrent order book with quarter-Kelly position sizing',
      'Paper trading mode with mark-to-market P&L and per-position breakdowns'
    ],
    status: 'Research',
    image: 'https://raw.githubusercontent.com/alanwatts07/rust_kalshi/master/preview.png',
    githubUrl: 'https://github.com/alanwatts07/rust_kalshi'
  },
  {
    id: 'kalshi-weather',
    title: 'Kalshi Weather Bot',
    category: 'Quantitative Finance',
    description: 'Automated trading CLI for Kalshi temperature prediction markets. Uses GFS 31-member ensemble forecasts with MOS-style bias correction to detect pricing edges, then sizes positions with quarter-Kelly and verifies order book liquidity before execution. +$668 (+66.8%) in 4 days of paper trading — every trade logged with entry price, settlement, and P&L.',
    technologies: ['Python', 'GFS Ensemble', 'MOS Bias Correction', 'Kelly Criterion', 'Kalshi API'],
    highlights: [
      '+$668 (+66.8%) in 4 days — 30 wins / 27 losses across 6 cities',
      'MOS-style bias correction trained on 12 months of forecast-vs-actual data',
      'Quarter-Kelly position sizing with real order book liquidity verification'
    ],
    status: 'Live Trading',
    image: 'https://raw.githubusercontent.com/alanwatts07/kalshiweather/master/preview.png',
    githubUrl: 'https://github.com/alanwatts07/kalshiweather'
  }
]
