import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const slides = [
  {
    title: 'Casa Vela',
    category: 'Residencial',
    copy: 'Una secuencia de imagenes pensada para mostrar materiales, luz y transiciones suaves.',
    accent: 'from-[#1a1715] via-[#44362c] to-[#9f7a59]',
    image: '/images/cym/scene-1.svg',
  },
  {
    title: 'Atelier Norte',
    category: 'Comercial',
    copy: 'Tarjetas de proyecto con mas contraste, bordes oscuros y una lectura mas dramatica.',
    accent: 'from-[#111111] via-[#37312d] to-[#745944]',
    image: '/images/cym/scene-2.svg',
  },
  {
    title: 'Casa Patio',
    category: 'Interiorismo',
    copy: 'El centro del carrusel puede funcionar como galeria de imagenes o case study visual.',
    accent: 'from-[#3a2d23] via-[#8a6447] to-[#e0c3a3]',
    image: '/images/cym/scene-3.svg',
  },
  {
    title: 'Loft Sur',
    category: 'Hospitality',
    copy: 'Una composicion de piezas con presencia mas editorial y contraste contenido.',
    accent: 'from-[#211d1b] via-[#50443b] to-[#a5886d]',
    image: '/images/cym/scene-4.svg',
  },
]

const GallerySection = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length)
  }

  const visibleIndexes = [
    (activeIndex - 1 + slides.length) % slides.length,
    activeIndex,
    (activeIndex + 1) % slides.length,
  ]

  return (
    <section id="gallery" className="page-shell section-gap">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <span className="eyebrow">Galeria de proyectos</span>
            <h2 className="section-title max-w-xl">Carrusel visual para mostrar imagenes de obra y avances.</h2>
          </div>
          <p className="section-copy lg:justify-self-end">
            La tercera referencia que compartiste queda mejor resuelta como un carrusel real. Aqui ya queda preparado
            para mover slides con flechas y para reemplazar facilmente los bloques abstractos por fotos reales.
          </p>
        </div>

        <div className="carousel-shell mt-12">
          <div className="grid gap-4 p-4 lg:grid-cols-[1fr_1.2fr_1fr] lg:p-6">
            {visibleIndexes.map((slideIndex, slotIndex) => {
              const slide = slides[slideIndex]
              const isActive = slotIndex === 1

              return (
                <motion.article
                  key={`${slide.title}-${slotIndex}`}
                  className={`project-card ${isActive ? 'lg:-mt-8' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45 }}
                >
                  <div className={`relative min-h-[420px] bg-gradient-to-br ${slide.accent} p-5 ${isActive ? 'lg:min-h-[560px]' : ''}`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.12),_transparent_20%)]" />
                    <div className="project-overlay" />
                    <div className="relative flex h-full flex-col justify-between rounded-[1.35rem] border border-white/10 p-5">
                      <div className="flex items-center justify-between text-brand-light/80">
                        <span className="text-[0.65rem] uppercase tracking-[0.3em]">0{slideIndex + 1}</span>
                        <span className="rounded-full border border-white/15 px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em]">
                          {slide.category}
                        </span>
                      </div>

                      <div className={`${isActive ? 'max-w-sm' : 'max-w-[16rem]'}`}>
                        <h3 className={`${isActive ? 'text-4xl' : 'text-3xl'} font-display text-brand-light`}>
                          {slide.title}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-brand-light/78">{slide.copy}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <img src={slide.image} alt={slide.title} className="h-20 rounded-[1rem] border border-white/10 object-cover" />
                        <img src={slide.image} alt={slide.title} className="h-28 rounded-[1rem] border border-white/10 object-cover" />
                        <img src={slide.image} alt={slide.title} className="h-20 rounded-[1rem] border border-white/10 object-cover" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>

          <div className="flex flex-col gap-5 border-t border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-3">
              <button className="carousel-nav" onClick={goToPrevious} aria-label="Anterior">
                <ArrowLeft size={18} />
              </button>
              <button className="carousel-nav" onClick={goToNext} aria-label="Siguiente">
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-10 bg-white' : 'w-2.5 bg-white/25'}`}
                  aria-label={`Ir a ${slide.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GallerySection
