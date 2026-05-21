import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiChevronDown } from 'react-icons/fi'

const faqs = [
  {
    question: '¿CyM realiza diseño y construcción en Trujillo?',
    answer:
      'Sí. CyM Centurión & Mendoza Constructora desarrolla diseño arquitectónico, construcción y supervisión de obras en Trujillo, Perú.',
  },
  {
    question: '¿También supervisan obras en Trujillo?',
    answer:
      'Sí. Ofrecemos supervisión técnica para verificar calidad, seguridad, plazos y cumplimiento del proyecto en obra.',
  },
  {
    question: '¿Cómo solicito una cotización?',
    answer:
      'Puedes escribir por WhatsApp al +51 957 217 850 o enviar un correo a proyectos@ceymeconstruye.com para recibir una atención directa.',
  },
  {
    question: '¿Dónde está ubicada la oficina?',
    answer:
      'La oficina está en Av. Los Colibríes Mz. P Lt. 11, 2do piso, oficina 23, Trujillo, Perú.',
  },
]

const FAQSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="faq" className="section-gap bg-white scroll-mt-24 md:scroll-mt-28">
      <div ref={ref} className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl">
            <div className="eyebrow">FAQ SEO</div>
            <h2 className="mt-4 text-4xl font-semibold leading-none md:text-5xl">
              Preguntas frecuentes sobre constructora en Trujillo
            </h2>
            <p className="mt-4 text-brand-primary/78 leading-7">
              Resolvemos las consultas más comunes sobre diseño, construcción y supervisión de obras en Trujillo para facilitar la decisión de nuevos clientes.
            </p>
          </div>

          <div className="mt-10 grid gap-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-[1.25rem] border border-brand-primary/10 bg-brand-light/40 p-6 shadow-[0_14px_40px_rgba(10,10,10,0.05)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-brand-primary">
                  <span>{faq.question}</span>
                  <FiChevronDown className="shrink-0 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-brand-primary/78">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQSection