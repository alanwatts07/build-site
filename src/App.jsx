import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LiveHero from './components/LiveHero'
import BannerHero from './components/BannerHero'

// Code split below-fold sections to optimize initial load
const Showcase = lazy(() => import('./components/Showcase'))
const GitHubActivity = lazy(() => import('./components/GitHubActivity'))
const Workflow = lazy(() => import('./components/Workflow'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
const About = lazy(() => import('./pages/About'))

function SectionLoader() {
  return (
    <div className="flex justify-center py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent-500 border-t-transparent" />
    </div>
  )
}

function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <main>
        <LiveHero />
        <section className="px-6 py-8 bg-[#0a0a0f]">
          <div className="mx-auto max-w-2xl">
            <Suspense fallback={<SectionLoader />}>
              <GitHubActivity />
            </Suspense>
          </div>
        </section>
        <Suspense fallback={<SectionLoader />}>
          <Showcase />
          <Workflow />
          <Contact />
          <Footer />
        </Suspense>
      </main>
    </div>
  )
}

export default function App() {
  // Check for ?banner in URL to show LinkedIn banner screenshot mode
  const showBanner = window.location.search.includes('banner')

  if (showBanner) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-8">
        <BannerHero />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<SectionLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
