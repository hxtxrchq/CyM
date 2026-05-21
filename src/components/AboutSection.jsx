import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Counter = ({ end, duration = 2.5 }) => {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })

  useEffect(() => {
    if (!inView) return

    let start = 0
    const endNum = parseInt(end)
    const incrementTime = (duration * 1000) / endNum

    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start === endNum) clearInterval(timer)
    }, incrementTime)

    return () => clearInterval(timer)
  }, [inView, end, duration])

  return <span ref={ref}>{count}</span>
}

const AboutSection = () => {
  const { ref, inView } = useInView({ threshold: 0.22, triggerOnce: true })

  const metrics = [
    { endValue: '15', suffix: '+', label: 'diseños realizados' },
    { endValue: '10', suffix: '+', label: 'construcciones realizadas' },
  ]

  return (
    <section id="about" className="section-gap bg-white scroll-mt-24 md:scroll-mt-28 relative overflow-hidden">
      <img
        src="/images/realestate/decor-pin.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 -top-24 w-[520px] opacity-[0.12]"
        loading="lazy"
        decoding="async"
      />
      <div ref={ref} className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="/images/sections/about/about1.jpg"
                  alt="Proyectos de construcción y diseño en Trujillo"
                  className="w-full h-[520px] object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-10 md:p-12">
                <div className="text-sm uppercase tracking-widest text-brand-mid font-semibold">Sobre CyM</div>
                <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-brand-primary leading-tight">CyM Centurión & Mendoza: diseño y construcción en Trujillo</h2>
                <p className="mt-6 text-brand-primary/85 leading-7 text-[15px] md:text-base">
                  En CyM nos especializamos en diseño, construcción y supervisión de obras en Trujillo, creando espacios funcionales, estéticos y de alta calidad. Integramos creatividad, técnica y compromiso para ofrecer soluciones integrales que responden a las necesidades de cada cliente.
                </p>
                <div className="mt-6">
                  <a href="#projects" className="inline-flex items-center rounded-md bg-brand-mid text-brand-light px-6 py-3 text-sm font-semibold shadow">Ver proyectos</a>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-6">
                {metrics.slice(0,3).map((m, i) => (
                  <div key={m.label} className="text-center">
                    <div className="text-3xl md:text-4xl font-semibold text-brand-primary">
                      {m.static ? m.endValue : <Counter end={m.endValue} duration={2.5} />}{m.suffix}
                    </div>
                    <div className="mt-2 text-sm text-brand-mid">{m.label}</div>
                  </div>
                ))}
              </div>
              
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
