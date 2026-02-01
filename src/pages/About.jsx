import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const skills = {
  'Core': ['AI-Augmented Development', 'Rapid Prototyping', 'Full-Stack Architecture'],
  'Languages': ['Python', 'TypeScript', 'JavaScript', 'SQL'],
  'Frontend': ['React', 'Next.js', 'Tailwind CSS'],
  'AI/ML': ['LLM Integration', 'Claude API', 'OpenAI', 'NLP', 'Deep Learning', 'Predictive Modeling'],
  'Systems': ['REST APIs', 'Data Pipelines', 'Real-time Dashboards', 'Database Design'],
  'Tools': ['Git', 'Linux', 'Windows'],
}

const experience = [
  {
    title: 'CTO / CIO',
    company: 'New Energy Initiative',
    period: '2017 – Present',
    description: 'Leading technology strategy for green energy company pivoting into tech product marketplace.',
    highlights: [
      'Built company website, CRM integrations (GoHighLevel), and custom automation workflows',
      'Design and implement data pipelines connecting forms, CRM, and internal systems',
      'Conduct requirements discovery sessions with staff to identify pain points and build solutions',
      'Onboard and train new employees on technical workflows and systems',
    ],
  },
  {
    title: 'Independent Technical Prototyper',
    company: 'Self-Employed',
    period: '2023 – Present',
    description: 'Building functional MVPs in days—validating concepts before committing engineering resources.',
    highlights: [
      'Architect full-stack AI/ML solutions, then hand off to senior developers for production',
      'Bridge the gap between "idea" and "working demo" for industrial, financial, and analytical domains',
      'Specialize in rapid iteration and proof-of-concept development',
    ],
  },
  {
    title: 'Store Supervisor',
    company: 'Energy North Group',
    period: '2013 – 2019',
    description: 'Managed daily operations, scheduling, and profitability analysis.',
    highlights: [
      'Led hiring process and team coordination across multiple shifts',
      'Developed systems for inventory tracking and operational efficiency',
    ],
  },
  {
    title: 'Assistant, CS Graduate Admissions',
    company: 'George Washington University',
    period: '2012 – 2013',
    description: 'Processed applicant data with high accuracy and attention to detail.',
    highlights: [
      'Managed sensitive information requiring thorough verification protocols',
    ],
  },
]

function TypeWriter({ text, speed = 30 }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1))
      }, speed)
      return () => clearTimeout(timeout)
    } else {
      setDone(true)
    }
  }, [displayed, text, speed])

  return (
    <span>
      {displayed}
      {!done && <span className="animate-pulse">|</span>}
    </span>
  )
}

function SkillBadge({ skill, delay }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  return (
    <span
      className={`inline-block px-3 py-1.5 text-sm rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      {skill}
    </span>
  )
}

function ExperienceCard({ job, index }) {
  const [expanded, setExpanded] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), index * 150)
    return () => clearTimeout(timeout)
  }, [index])

  return (
    <div
      className={`relative pl-8 pb-8 border-l-2 border-indigo-500/30 last:border-l-transparent transition-all duration-500 ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
      }`}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-indigo-500 border-4 border-[#0a0a0f]" />

      <div
        className="group cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
            {job.title}
          </h3>
          <span className="text-sm text-gray-500">@ {job.company}</span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm text-indigo-400 font-mono">{job.period}</span>
          <span className="text-xs text-gray-600">
            {expanded ? '▼ collapse' : '▶ expand'}
          </span>
        </div>

        <p className="text-gray-400 mb-3">{job.description}</p>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="space-y-2 pt-2">
            {job.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function About() {
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

      {/* Back navigation */}
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
            href="/Matthew_Corwin_Resume.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-indigo-300 hover:bg-indigo-500/20 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </a>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-16">
        {/* Hero Section */}
        <header className={`mb-16 transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-400 text-sm">AVAILABLE FOR PROJECTS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            Matthew Corwin
          </h1>

          <div className="inline-block px-4 py-1 mb-6 border border-indigo-500/30 rounded-full">
            <span className="text-sm text-indigo-400 tracking-wider">TECHNICAL PRODUCT ARCHITECT</span>
          </div>

          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
            <TypeWriter
              text="Technical Product Architect who turns ideas into working MVPs fast. Years of coding fundamentals combined with AI-augmented development means I prototype in days what traditionally takes weeks—then communicate effectively with senior engineers to harden and scale."
              speed={15}
            />
          </p>

          <div className="flex items-center gap-6 mt-8 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Haverhill, MA
            </span>
            <a href="mailto:matt.n.corwin@gmail.com" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              matt.n.corwin@gmail.com
            </a>
            <a href="https://github.com/alanwatts07" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </header>

        {/* Skills Section */}
        <section className={`mb-16 transition-all duration-700 delay-200 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-indigo-400">//</span> Technical Skills
          </h2>

          <div className="space-y-6">
            {Object.entries(skills).map(([category, items], catIndex) => (
              <div key={category}>
                <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-3">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, skillIndex) => (
                    <SkillBadge
                      key={skill}
                      skill={skill}
                      delay={catIndex * 100 + skillIndex * 50 + 500}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className={`mb-16 transition-all duration-700 delay-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-indigo-400">//</span> Experience
          </h2>

          <div className="space-y-0">
            {experience.map((job, index) => (
              <ExperienceCard key={job.title + job.company} job={job} index={index} />
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className={`mb-16 transition-all duration-700 delay-400 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-indigo-400">//</span> Education
          </h2>

          <div className="border border-indigo-500/30 rounded-lg p-6 bg-black/20">
            <h3 className="text-xl font-semibold text-white mb-1">George Washington University</h3>
            <p className="text-gray-400 mb-2">Washington, DC</p>
            <p className="text-indigo-400 font-mono text-sm">Sociology Studies • 2012 – 2015</p>
          </div>
        </section>

        {/* Additional Section */}
        <section className={`mb-16 transition-all duration-700 delay-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-indigo-400">//</span> Additional
          </h2>

          <ul className="space-y-3">
            {[
              'Self-directed learner with 10+ years of hands-on technical exploration',
              'Strong communicator with experience presenting to groups (debate, theater)',
              'Background in team leadership across multiple industries',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-400">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA Section */}
        <section className={`text-center py-12 border-t border-indigo-500/20 transition-all duration-700 delay-600 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-2xl font-bold text-white mb-4">Let's Build Something</h2>
          <p className="text-gray-400 mb-8">Have an idea that needs a working prototype? Let's talk.</p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/#projects"
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-indigo-500/25"
            >
              View Projects
            </Link>
            <Link
              to="/#contact"
              className="px-6 py-3 border border-indigo-500/30 hover:border-indigo-500/60 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
