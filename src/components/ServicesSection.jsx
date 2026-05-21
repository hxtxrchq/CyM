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
      image: '/images/sections/services/sect1.jpg',
      intro:
        'Creamos propuestas arquitectónicas y de interiorismo para proyectos en Trujillo que resuelven necesidades reales con una imagen contemporánea y funcional.',
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
      image: '/images/sections/services/sect4.jpg',
      intro:
        'Ejecutamos obras en Trujillo con orden técnico, planificación y control para lograr resultados sólidos, eficientes y bien terminados.',
      items: [
        'Presupuesto y cronograma de obra',
        'Expediente municipal',
        'Gestión de licencia de construcción',
        'Ejecución de obra civil y acabados',
      ],
    },
    {
      title: 'Supervisión',
      image: '/images/sections/services/sect5.jpg',
      intro:
        'Acompañamos la obra para verificar que el diseño, la calidad y los tiempos se cumplan correctamente en cada etapa.',
      items: [
        'Supervisión de cumplimiento del diseño',
        'Supervisión de calidad constructiva',
        'Supervisión de plazos',
        'Supervisión de seguridad en obra',
      ],
    },
  ]

  return (
    <section id="services" className="section-gap bg-white text-[#2f352b] scroll-mt-24 md:scroll-mt-28 relative overflow-hidden">
      <img
        src="/images/realestate/decor-key.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-6 w-[520px] opacity-[0.22] blur-[0.2px]"
        loading="lazy"
        decoding="async"
      />
      <img
        src="/images/realestate/decor-pin.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-10 w-[460px] opacity-[0.18]"
        loading="lazy"
        decoding="async"
      />
      <div className="section-shell" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="mb-12">
            <motion.h2 className="text-4xl md:text-5xl font-semibold leading-none" variants={itemVariants}>
              Diseño, construcción y supervisión de obras en Trujillo
            </motion.h2>
            <motion.p className="mt-4 max-w-2xl text-brand-primary/80" variants={itemVariants}>
              Acompañamos cada proyecto con una visión integral, desde la idea inicial hasta la ejecución y supervisión final en Trujillo, Perú.
            </motion.p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {serviceCards.map((service, index) => (
              <motion.article
                key={service.title}
                custom={index}
                variants={cardVariants}
                className="group card-soft relative overflow-hidden bg-white/94 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(10,10,10,0.10)]"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={service.image}
                    alt={`${service.title} en Trujillo`}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A24]/78 via-[#1F2A24]/30 to-transparent" />
                  <div className="absolute left-4 top-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#F8F4EC]/90">
                    0{index + 1}
                  </div>
                </div>

                <div className="p-6 md:p-7">
                  <h3 className="text-2xl font-semibold text-brand-primary">{service.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-brand-primary/82">{service.intro}</p>

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
