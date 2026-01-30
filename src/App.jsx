import { lazy, Suspense } from 'react'
import LiveHero from './components/LiveHero'
import BannerHero from './components/BannerHero'

// Code split below-fold sections to optimize initial load
const Showcase = lazy(() => import('./components/Showcase'))
const Workflow = lazy(() => import('./components/Workflow'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function SectionLoader() {
  return (
    <div className="flex justify-center py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent-500 border-t-transparent" />
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
    <div className="min-h-screen bg-[#0a0a0f]">
      <main>
        <LiveHero />
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
