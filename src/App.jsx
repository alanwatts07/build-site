import { lazy, Suspense } from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'

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
  return (
    <div className="gradient-mesh min-h-screen">
      <Navbar />
      <main>
        <Hero />
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
