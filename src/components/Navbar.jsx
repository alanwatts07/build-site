import { useState, useEffect } from 'react'

const navLinks = [
  { href: '#projects', label: 'Projects' },
  { href: '#workflow', label: 'Workflow' },
  { href: '#contact', label: 'Contact' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-dark-900/80 backdrop-blur-md border-b border-dark-700' : ''
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="text-lg font-semibold tracking-tight">
          <span className="text-accent-400">M</span>att Corwin
        </a>

        <ul className="flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
