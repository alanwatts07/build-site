export const projects = [
  {
    id: 'whistleblower-workbench',
    title: 'Whistleblower Workbench',
    category: 'Fraud Detection',
    description: 'Secure platform for analyzing and managing whistleblower submissions with automated fraud pattern detection and case management workflows.',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'React'],
    highlights: [
      'End-to-end encrypted submission pipeline',
      'ML-powered anomaly detection',
      'Automated risk scoring engine'
    ],
    status: 'Production MVP'
  },
  {
    id: 'tcn-risk-map',
    title: 'TCN-Risk-Map',
    category: 'FinTech',
    description: 'Real-time counterparty risk visualization platform using temporal convolutional networks for predictive risk assessment in financial networks.',
    technologies: ['Python', 'TensorFlow', 'Neo4j', 'D3.js', 'FastAPI'],
    highlights: [
      'Graph-based risk propagation modeling',
      'Sub-second inference latency',
      'Interactive network visualization'
    ],
    status: 'Prototype'
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
    githubUrl: 'https://github.com/alanwatts07/predictive-maintenance-dashboard-poc',
    demoUrl: 'https://frontend-two-ashy-yla6dtp7w4.vercel.app'
  }
]
