import React, { Suspense, lazy, useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Footer from './components/Footer'

const AboutSection = lazy(() => import('./components/AboutSection'))
const AlliesSection = lazy(() => import('./components/AlliesSection'))
const ServicesSection = lazy(() => import('./components/ServicesSection'))
const ProjectsSection = lazy(() => import('./components/ProjectsSection'))
const FAQSection = lazy(() => import('./components/FAQSection'))
const ContactSection = lazy(() => import('./components/ContactSection'))
const LocationSection = lazy(() => import('./components/LocationSection'))
const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'))

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const animationFrameRef = useRef(null)
  const isTickingRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (isTickingRef.current) {
        return
      }

      isTickingRef.current = true
      animationFrameRef.current = window.requestAnimationFrame(() => {
        const nextState = window.scrollY > 18
        setIsScrolled((current) => (current === nextState ? current : nextState))
        isTickingRef.current = false
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-transparent text-brand-primary overflow-x-hidden">
      <Navbar isScrolled={isScrolled} />
      <main>
        <HeroSection />
        <Suspense fallback={<div className="h-24" aria-hidden="true" />}>
          <AboutSection />
          <ServicesSection />
          <ProjectsSection />
          <AlliesSection />
          <FAQSection />
          <ContactSection />
          <LocationSection />
        </Suspense>
        <Footer />
      </main>
      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
    </div>
  )
}

export default App
