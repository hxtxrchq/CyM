import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi'
import facebookLogo from '/images/social/facebook.png'
import instagramLogo from '/images/social/instagram.png'

const ContactSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  const details = [
    { icon: FiPhone, label: 'Teléfono', value: '957 217 850', link: 'tel:+51957217850' },
    { icon: FiMail, label: 'Correo', value: 'ecenturion@ceymeconstruye.com', link: 'mailto:ecenturion@ceymeconstruye.com' },
    { icon: FiMail, label: 'Proyectos', value: 'proyectos@ceymeconstruye.com', link: 'mailto:proyectos@ceymeconstruye.com' },
    { icon: FiMapPin, label: 'Oficina', value: 'Av. Los Colibríes Mz. P Lt. 11, 2do piso, oficina 23, Trujillo', link: 'https://www.google.com/maps/search/?api=1&query=Av.%20Los%20Colibr%C3%ADes%20Mz.%20P%20Lt.%2011%2C%202do%20piso%2C%20oficina%2023%2C%20Trujillo' },
  ]

  const socials = [
    { label: 'Facebook', href: 'https://www.facebook.com/', icon: facebookLogo },
    { label: 'Instagram', href: 'https://www.instagram.com/', icon: instagramLogo },
  ]

  return (
    <section id="contact" className="section-gap bg-transparent overflow-hidden scroll-mt-24 md:scroll-mt-28">
      <div ref={ref} className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.7 }}
          className="grid gap-8 lg:grid-cols-2 lg:items-center"
        >
          <div className="relative rounded-[1rem] overflow-hidden flex flex-col min-h-[500px] md:min-h-[600px] bg-brand-light p-8 md:p-12 border border-brand-soft/20 shadow-editorial">
            <img
              src="/images/sections/about/about1.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-[0.14]"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-light/80 via-brand-light/60 to-brand-primary/10" />
            <img
              src="/images/realestate/decor-pin.svg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-36 -top-28 w-[520px] opacity-[0.10]"
              loading="lazy"
              decoding="async"
            />
            <div className="relative z-10 flex flex-col h-full justify-center">
              <div className="eyebrow mb-6 text-brand-mid">Contacto</div>
              <h2 className="text-4xl md:text-5xl font-semibold text-brand-primary leading-[1.1] mb-6">
                Cotiza con nuestra constructora en Trujillo
              </h2>
              <p className="max-w-md text-base leading-relaxed text-brand-mid mb-10">
                Completa el formulario y nos pondremos en contacto para brindarte una propuesta personalizada de diseño, construcción o supervisión.
              </p>

              <div className="space-y-6">
                {details.map((item) => (
                  <div key={item.label} className="flex items-center gap-4 group">
                    <div className="rounded-full border border-white/10 bg-black/30 p-2.5 text-brand-light flex-shrink-0 transition-colors group-hover:bg-white/10 group-hover:border-white/20">
                      {item.logo ? (
                        <img 
                          src={item.logo} 
                          alt={item.label} 
                          className="w-5 h-5 object-contain brightness-0 invert" 
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }} 
                        />
                      ) : (
                        <item.icon size={18} className="opacity-80" />
                      )}
                    </div>
                    <div>
                        <div className="text-[10px] uppercase tracking-[0.18em] text-brand-mid font-semibold mb-0.5">
                          {item.label}
                        </div>
                        {item.link ? (
                          <a href={item.link} className="text-[14px] text-brand-primary hover:underline transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-[14px] text-brand-primary">
                            {item.value}
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-10 flex items-center gap-3">
                {socials.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="group grid h-12 w-12 place-items-center rounded-full border border-brand-primary/12 bg-white/70 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white"
                  >
                    <img
                      src={item.icon}
                      alt=""
                      aria-hidden="true"
                      className="h-5 w-5 object-contain opacity-80 grayscale group-hover:grayscale-0"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative rounded-[1rem] border border-brand-soft/20 bg-white p-10 md:p-14 shadow-editorial self-center text-gray-900 overflow-hidden">
            <img
              src="/images/sections/hero/photo2.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-[0.10]"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/92 to-white" />
            <div className="relative z-10">
            <div className="grid gap-7">
              <div className="grid gap-3">
                <label className="text-[11px] uppercase tracking-[0.3em] text-brand-mid font-bold ml-1.5">Nombre completo</label>
                <input
                  className="w-full rounded-2xl border border-brand-soft/30 bg-brand-light/50 px-7 py-5 text-brand-primary outline-none transition-all placeholder:text-brand-mid/40 focus:border-brand-mid/60 focus:bg-white focus:ring-1 focus:ring-brand-mid/20 text-base"
                  placeholder="Escribe tu nombre y apellidos"
                />
              </div>
              <div className="grid gap-3">
                <label className="text-[11px] uppercase tracking-[0.3em] text-brand-mid font-bold ml-1.5">Empresa</label>
                <input
                  className="w-full rounded-2xl border border-brand-soft/30 bg-brand-light/50 px-7 py-5 text-brand-primary outline-none transition-all placeholder:text-brand-mid/40 focus:border-brand-mid/60 focus:bg-white focus:ring-1 focus:ring-brand-mid/20 text-base"
                  placeholder="Nombre de tu organización"
                />
              </div>
              <div className="grid gap-3">
                <label className="text-[11px] uppercase tracking-[0.3em] text-brand-mid font-bold ml-1.5">Correo electrónico</label>
                <input
                  className="w-full rounded-2xl border border-brand-soft/30 bg-brand-light/50 px-7 py-5 text-brand-primary outline-none transition-all placeholder:text-brand-mid/40 focus:border-brand-mid/60 focus:bg-white focus:ring-1 focus:ring-brand-mid/20 text-base"
                  placeholder="tu@email.com"
                  type="email"
                />
              </div>
              
              <div className="grid gap-3">
                <label className="text-[11px] uppercase tracking-[0.3em] text-brand-mid font-bold ml-1.5">Descripción</label>
                <textarea
                  rows="4"
                  className="w-full rounded-2xl border border-brand-soft/30 bg-brand-light/50 px-7 py-5 text-brand-primary outline-none transition-all placeholder:text-brand-mid/40 focus:border-brand-mid/60 focus:bg-white resize-none focus:ring-1 focus:ring-brand-mid/20 text-base"
                  placeholder="Cuéntanos brevemente sobre tu proyecto"
                />
              </div>
            </div>

              <div className="mt-10 flex flex-col gap-4">
              <button className="inline-flex items-center justify-center rounded-full bg-brand-primary text-brand-light px-8 py-5 text-[13px] font-black uppercase tracking-widest transition-all duration-500 hover:-translate-y-1.5 shadow-md w-full">
                ENVIAR SOLICITUD
                <FiArrowRight className="ml-3" />
              </button>
              <p className="text-center text-[9px] uppercase tracking-[0.4em] text-brand-mid/70">
                Respuesta garantizada en menos de 24 horas
              </p>
            </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection
