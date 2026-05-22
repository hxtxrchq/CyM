import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

const slides = [
  {
    src: '/images/sections/hero/photo1.jpeg',
    alt: 'Proyecto residencial para diseño y construcción',
    className: 'object-cover object-center',
  },
  {
    src: '/images/sections/hero/photo2.jpeg',
    alt: 'Diseño interior y arquitectura de una constructora',
    className: 'object-cover object-[50%_15%]',
  },
  {
    src: '/images/sections/hero/photo3.jpeg',
    alt: 'Supervisión de obras para proyectos de construcción',
    className: 'object-cover object-[50%_10%]',
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

      <div className="relative section-shell flex min-h-[calc(100svh-5rem)] items-start py-8 sm:py-10 lg:items-center lg:py-14">
        <motion.div
          className="max-w-[700px] pt-6 sm:pt-8 lg:pt-0"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow mb-3 text-white/85">CyM Centurión & Mendoza Constructora</p>

          <h1 className="max-w-[12ch] text-[clamp(2.35rem,5.4vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-[#FAF6EE] drop-shadow-[0_10px_24px_rgba(0,0,0,0.22)]">
            Arquitectura que inspira, ingeniería que trasciende
          </h1>

          <p className="mt-4 max-w-[34rem] text-[0.98rem] leading-7 text-white sm:text-base md:text-lg md:leading-8">
            Diseñamos, construimos y supervisamos proyectos residenciales y comerciales con
            soluciones funcionales, técnicas y de alta calidad para todo el pais.
</p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#F5F1E8] px-5 py-3 text-sm font-semibold text-[#1F2A24] shadow-[0_10px_22px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white sm:px-6"
            >
              Solicitar presupuesto
              <FiArrowRight className="ml-3" />
            </a>

            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full border border-white/28 bg-transparent px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10 sm:px-6"
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