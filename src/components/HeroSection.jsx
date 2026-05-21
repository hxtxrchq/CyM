import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

const slides = [
  {
    src: '/images/sections/hero/photo1.jpg',
    alt: 'Proyecto residencial en Trujillo para diseño y construcción',
  },
  {
    src: '/images/sections/hero/photo2.jpg',
    alt: 'Diseño interior y arquitectura de una constructora en Trujillo',
  },
  {
    src: '/images/sections/hero/photo3.jpg',
    alt: 'Supervisión de obras en Trujillo para proyectos de construcción',
  },
]

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 5200)

    return () => window.clearInterval(timer)
  }, [])

  const currentSlide = useMemo(() => slides[activeSlide], [activeSlide])

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-[#1F2A24] pt-20"
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide.src}
            src={currentSlide.src}
            alt={currentSlide.alt}
            className="h-full w-full object-cover"
            loading={activeSlide === 0 ? 'eager' : 'lazy'}
            decoding="async"
            width="1920"
            height="1080"
            sizes="100vw"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,20,17,0.82)_0%,rgba(16,20,17,0.66)_24%,rgba(16,20,17,0.34)_46%,rgba(16,20,17,0.10)_70%,rgba(16,20,17,0.04)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,12,11,0.10)_0%,rgba(10,12,11,0.12)_42%,rgba(10,12,11,0.38)_100%)]" />
      </div>

      <div className="relative section-shell flex min-h-[calc(100svh-5rem)] items-center py-10 lg:py-16">
        <motion.div
          className="max-w-[760px]"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow mb-5 text-white/85">CyM Centurión & Mendoza Constructora en Trujillo</p>

          <h1 className="max-w-[11ch] text-[clamp(3.1rem,7vw,6.2rem)] font-semibold leading-[0.93] tracking-[-0.045em] text-[#FAF6EE] drop-shadow-[0_10px_24px_rgba(0,0,0,0.22)]">
            Constructora en Trujillo para diseño, construcción y supervisión.
          </h1>

          <p className="mt-6 max-w-[34rem] text-base leading-7 text-white md:text-xl md:leading-8">
            Diseñamos, construimos y supervisamos proyectos residenciales y comerciales con
            soluciones funcionales, técnicas y de alta calidad para Trujillo y la región.
</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#F5F1E8] px-6 py-3 text-sm font-semibold text-[#1F2A24] shadow-[0_10px_22px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white"
            >
              Solicitar cotización
              <FiArrowRight className="ml-3" />
            </a>

            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full border border-white/28 bg-transparent px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10"
            >
              Portafolio
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection