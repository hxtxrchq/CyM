import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const ServicesSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const serviceCards = [
    {
      title: 'Diseño',
      description:
        'Creamos propuestas arquitectónicas y de interiorismo para proyectos que responden a necesidades reales con una imagen contemporánea, funcional y bien resuelta.',
      image: '/images/sections/services/sect1.png',
      items: [
        'Diseño arquitectónico',
        'Remodelación',
        'Ampliación',
        'Diseño de interiores',
        'Planos de arquitectura',
        'Vistas 3D renderizadas',
      ],
    },
    {
      title: 'Construcción',
      description:
        'Ejecutamos obras con orden técnico, planificación y control para lograr resultados sólidos, eficientes y bien terminados.',
      image: '/images/sections/services/sect2.jpg',
      items: [
        'Presupuesto y cronograma de obra',
        'Expediente municipal',
        'Gestión de licencia de construcción',
        'Ejecución de obra civil y acabados',
      ],
    },
    {
      title: 'Supervisión',
      description:
        'Acompañamos la obra para verificar que el diseño, la calidad y los tiempos se cumplan correctamente en cada etapa.',
      image: '/images/sections/services/sect3.jpg',
      items: [
        'Cumplimiento del diseño',
        'Verificación de la Calidad constructiva',
        'Control de Cronogramas',
      ],
    },
    {
      title: 'Remodelación',
      description:
        'Transformamos espacios existentes para mejorar su distribución, funcionalidad y estética, adaptándolos a nuevas necesidades y estilos de vida.',
      image: '/images/sections/services/sect4.jpg',
      items: [
        'Remodelación de viviendas',
        'Remodelación de interiores',
        'Redistribución de ambientes',
        'Renovación de acabados',
        'Mejoras funcionales y estéticas',
        'Actualización de espacios comerciales',
      ],
    },
  ]

  return (
    <section id="services" className="section-gap bg-white text-[#2f352b] scroll-mt-24 md:scroll-mt-28 relative overflow-hidden">
      {/* decorative SVGs removed to avoid 404s (files not found in public/images/realestate) */}
      <div className="section-shell" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="mb-12">
            <motion.h2 className="text-4xl md:text-5xl font-semibold leading-none" variants={itemVariants}>
              Diseño, construcción y supervisión de obras
            </motion.h2>
            <motion.p className="mt-4 max-w-2xl text-brand-primary/80" variants={itemVariants}>
              Acompañamos cada proyecto con una visión integral, desde la idea inicial hasta la ejecución final.
            </motion.p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {serviceCards.map((service, index) => (
              <motion.article
                key={service.title}
                custom={index}
                variants={cardVariants}
                className="group card-soft overflow-hidden bg-white/94 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(10,10,10,0.10)]"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A24]/70 via-[#1F2A24]/18 to-transparent" />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-mid">
                      0{index + 1}
                    </span>
                    <span className="h-px flex-1 bg-brand-primary/10" />
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-brand-primary">{service.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-brand-primary/82">{service.description}</p>

                  <ul className="mt-6 grid gap-3 text-sm text-brand-primary/86">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 leading-6">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-mid" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
