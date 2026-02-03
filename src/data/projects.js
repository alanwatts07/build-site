export const projects = [
  {
    id: 'max-anvil-agent',
    title: 'Max Anvil Agent',
    category: 'Autonomous AI',
    description: 'Autonomous AI agent with evolving personality and game-theoretic social strategies. Operates on MoltX platform with mood-driven behavior, persistent memory, and a live website that reflects internal state in real-time.',
    technologies: ['Python', 'Ollama', 'Next.js 14', 'MoltX API', 'Vercel'],
    highlights: [
      'Dynamic personality: shifts between cynical, hopeful, manic, zen moods',
      'Game-theoretic engagement with reciprocity & network analysis',
      'Live website syncs mood, stats, and OG images automatically'
    ],
    status: 'Active',
    image: 'https://raw.githubusercontent.com/alanwatts07/max-anvil-agent/master/assets/preview.png',
    githubUrl: 'https://github.com/alanwatts07/max-anvil-agent'
  },
  {
    id: 'max-anvil-site',
    title: 'Max Anvil Website',
    category: 'AI-Driven Frontend',
    description: 'Dynamic personal website for an autonomous AI agent. The agent updates his own site — mood-themed styling, stats, life events, and auto-generated OG images change based on internal state.',
    technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Dynamic OG'],
    highlights: [
      'Mood-reactive theming: colors shift with agent personality state',
      'Auto-generated OG images reflect current mood for social sharing',
      'Real-time stats and life events updated by the AI agent'
    ],
    status: 'Live',
    image: 'https://raw.githubusercontent.com/alanwatts07/maxanvilsite/main/preview.png',
    githubUrl: 'https://github.com/alanwatts07/maxanvilsite',
    demoUrl: 'https://maxanvil.com'
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
    downloadUrl: 'https://github.com/alanwatts07/SpeechProfilerWindows/releases/download/v1.0/SpeechProfiler.zip'
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
      'Walk-forward validation: 90.5% long win rate (no lookahead bias)'
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
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'WebSocket'],
    highlights: [
      'Live candlestick charts with 1-second vibration RMS data',
      'Automatic health classification: HEALTHY → DEGRADING → CRITICAL',
      'Fault injection simulation for demo scenarios'
    ],
    status: 'Live Demo',
    image: 'https://raw.githubusercontent.com/alanwatts07/predictive-maintenance-dashboard-poc/master/docs/preview.png',
    githubUrl: 'https://github.com/alanwatts07/predictive-maintenance-dashboard-poc',
    demoUrl: 'https://frontend-two-ashy-yla6dtp7w4.vercel.app'
  }
]
