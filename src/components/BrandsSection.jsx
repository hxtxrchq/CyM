import React from 'react'
import { motion } from 'framer-motion'

const brands = [
  { src: '/images/brands/brand-1.png', alt: 'Marca aliada 1' },
  { src: '/images/brands/brand-2.png', alt: 'Marca aliada 2' },
  { src: '/images/brands/brand-3.png', alt: 'Marca aliada 3' },
  { src: '/images/brands/brand-4.png', alt: 'Marca aliada 4' },
  { src: '/images/brands/brand-5.png', alt: 'Marca aliada 5' },
  { src: '/images/brands/brand-6.png', alt: 'Marca aliada 6' },
]

const BrandsSection = () => {
  return (
    <section id="brands" className="page-shell section-gap bg-brand-light text-brand-dark">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <span className="eyebrow text-brand-dark/55">Confían en nosotros</span>
            <h2 className="section-title text-brand-dark">Marcas y aliados que respaldan nuestro trabajo.</h2>
          </div>
          <p className="section-copy text-brand-dark/70 lg:justify-self-end">
            La sección de confianza sigue la estética de la referencia: limpia, amplia y centrada en los logos. Aquí ya
            quedan listos los archivos que tienes dentro de <span className="font-semibold">public/images/brands</span>.
          </p>
        </div>

        <div className="mt-12 rounded-[2.5rem] border border-brand-dark/10 bg-white p-6 shadow-[0_24px_90px_rgba(0,0,0,0.08)] sm:p-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.src}
                className="group flex items-center justify-center rounded-[1.25rem] border border-brand-dark/10 bg-brand-light px-4 py-6 transition duration-300 hover:-translate-y-1 hover:border-brand-primary/30 hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
              >
                <img
                  src={brand.src}
                  alt={brand.alt}
                  className="max-h-16 w-full object-contain opacity-85 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrandsSection