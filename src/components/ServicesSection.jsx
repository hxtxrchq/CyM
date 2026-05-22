import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiHome, FiTool, FiPlusSquare, FiShield } from 'react-icons/fi'

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
      title: 'Remodelación',
      description:
        'Renovamos viviendas, edificios y locales con una propuesta funcional, estética y adaptada a nuevas necesidades.',
      image: '/images/sections/services/sect1.png',
      icon: FiHome,
    },
    {
      title: 'Construcción',
      description:
        'Desarrollamos obras residenciales y comerciales con orden técnico, control y una ejecución eficiente.',
      image: '/images/sections/services/sect2.jpg',
      icon: FiTool,
    },
    {
      title: 'Ampliación',
      description:
        'Optimizamos el crecimiento de espacios existentes para ganar área útil sin perder coherencia ni confort.',
      image: '/images/sections/services/sect3.jpg',
      icon: FiPlusSquare,
    },
    {
      title: 'Supervisión',
      description:
        'Controlamos calidad, seguridad, plazos y cumplimiento técnico durante toda la ejecución de obra.',
      image: '/images/sections/services/sect4.jpg',
      icon: FiShield,
    },
  ]

  const leftServices = serviceCards.slice(0, 2)
  const rightServices = serviceCards.slice(2)

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
              Diseño, construcción y supervisión de obras
            </motion.h2>
            <motion.p className="mt-4 max-w-2xl text-brand-primary/80" variants={itemVariants}>
              Acompañamos cada proyecto con una visión integral, desde la idea inicial hasta la ejecución final.
            </motion.p>
          </div>

          <div className="grid items-center gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(320px,460px)_minmax(0,1fr)]">
            <div className="grid gap-6">
              {leftServices.map((service, index) => (
                <motion.article
                  key={service.title}
                  custom={index}
                  variants={cardVariants}
                  className="group card-soft relative overflow-hidden bg-white/94 p-6 shadow-[0_10px_30px_rgba(10,10,10,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(10,10,10,0.10)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-mid/18 text-brand-primary">
                      <service.icon size={26} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-2xl font-semibold text-brand-primary">{service.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-brand-primary/82">{service.description}</p>
                    </div>
                  </div>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="mt-5 h-40 w-full rounded-[20px] object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.article>
              ))}
            </div>

            <motion.div variants={cardVariants} custom={0} className="relative mx-auto w-full max-w-[460px]">
              <div className="relative overflow-hidden rounded-[42px] border border-brand-primary/10 bg-[#f8f4ea] p-4 shadow-[0_24px_70px_rgba(10,10,10,0.12)]">
                <div className="grid grid-cols-2 gap-3 overflow-hidden rounded-[32px] bg-white p-3">
                  {serviceCards.map((service) => (
                    <div key={service.title} className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A24]/35 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 rounded-full bg-white/90 px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-primary shadow-[0_8px_20px_rgba(10,10,10,0.10)]">
                        {service.title}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pointer-events-none absolute -left-5 -top-6 h-28 w-28 rounded-full border border-white/80 bg-[#4f4b24] text-white shadow-[0_16px_40px_rgba(10,10,10,0.18)]">
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <span className="text-4xl font-semibold leading-none">+15</span>
                    <span className="mt-1 text-[13px] font-semibold uppercase leading-none tracking-[0.12em]">
                      diseños
                    </span>
                    <span className="text-[13px] font-semibold uppercase leading-none tracking-[0.12em]">
                      realizados
                    </span>
                  </div>
                </div>

                <div className="pointer-events-none absolute -bottom-5 -right-5 h-32 w-32 rounded-full border border-white/80 bg-[#efe2c0] text-brand-primary shadow-[0_16px_40px_rgba(10,10,10,0.14)]">
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <span className="text-4xl font-semibold leading-none">+10</span>
                    <span className="mt-1 text-[11px] font-semibold uppercase leading-none tracking-[0.12em]">
                      construcciones
                    </span>
                    <span className="text-[11px] font-semibold uppercase leading-none tracking-[0.12em]">
                      realizadas
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid gap-6">
              {rightServices.map((service, index) => (
                <motion.article
                  key={service.title}
                  custom={index + 2}
                  variants={cardVariants}
                  className="group card-soft relative overflow-hidden bg-white/94 p-6 shadow-[0_10px_30px_rgba(10,10,10,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(10,10,10,0.10)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-mid/18 text-brand-primary">
                      <service.icon size={26} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-2xl font-semibold text-brand-primary">{service.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-brand-primary/82">{service.description}</p>
                    </div>
                  </div>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="mt-5 h-40 w-full rounded-[20px] object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
