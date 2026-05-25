import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiAlertCircle, FiCheckCircle, FiLoader, FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi'
import facebookLogo from '/images/social/facebook.png'
import instagramLogo from '/images/social/instagram.png'
import tiktokLogo from '/images/social/tiktok.png'

const formspreeEndpoint = 'https://formspree.io/f/mlgvnpvq'

const ContactSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  })
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')

  const canSubmit = useMemo(
    () => formData.name.trim() && formData.company.trim() && formData.email.trim() && formData.phone.trim() && formData.message.trim(),
    [formData]
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!canSubmit || status === 'submitting') return

    setStatus('submitting')
    setFeedback('')

    const structuredMessage = `Nuevo mensaje desde CyM Perú\n\nNombre: ${formData.name}\nEmpresa: ${formData.company}\nCorreo: ${formData.email}\nTeléfono: ${formData.phone}\n\nServicios de interés:\n${formData.message}`

    const payload = {
      _subject: 'Nuevo lead desde CyM Perú',
      company_identifier: 'CyM',
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      message: structuredMessage,
    }

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(result?.error || 'No se pudo enviar el formulario.')
      }

      setStatus('success')
      setFeedback('Tu mensaje fue enviado. Te responderemos pronto.')
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
      })
    } catch (error) {
      setStatus('error')
      setFeedback(error.message || 'Ocurrió un error al enviar el formulario.')
    }
  }

  const details = [
    { icon: FiPhone, label: 'Teléfono', value: '957 217 850', link: 'tel:+51957217850' },
    { icon: FiMail, label: 'Correo', value: 'ecenturion@ceymeconstruye.com', link: 'mailto:ecenturion@ceymeconstruye.com' },
    { icon: FiMail, label: 'Proyectos', value: 'proyectos@ceymeconstruye.com', link: 'mailto:proyectos@ceymeconstruye.com' },
    { icon: FiMapPin, label: 'Oficina', value: 'Av. Los Colibríes Mz. P Lt. 11, 2do piso, oficina 23', link: 'https://www.google.com/maps/search/?api=1&query=Av.%20Los%20Colibr%C3%ADes%20Mz.%20P%20Lt.%2011%2C%202do%20piso%2C%20oficina%2023' },
  ]

  const socials = [
    { label: 'Facebook', href: 'https://web.facebook.com/ceymeconstructora', icon: facebookLogo },
    { label: 'Instagram', href: 'https://www.instagram.com/cym.constructora/?__pwa=1', icon: instagramLogo },
    { label: 'TikTok', href: 'https://www.tiktok.com/@cym.constructora?is_from_webapp=1&sender_device=pc', icon: tiktokLogo },
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
              src="/images/sections/about/about1.jpeg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-[0.14]"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-light/80 via-brand-light/60 to-brand-primary/10" />
            {/* decorative SVG removed to avoid 404 (file not found in public/images/realestate) */}
            <div className="relative z-10 flex flex-col h-full justify-center">
              <div className="eyebrow mb-6 text-brand-mid">Contacto</div>
              <h2 className="text-4xl md:text-5xl font-semibold text-brand-primary leading-[1.1] mb-6">
                Cotiza con nuestra constructora
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
              src="/images/sections/hero/photo2.jpeg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-[0.10]"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/92 to-white" />
            <div className="relative z-10">
              <form className="grid gap-7" onSubmit={handleSubmit} noValidate>
                <input type="hidden" name="_subject" value="Nuevo lead desde CyM Perú" />
                <input type="hidden" name="company_identifier" value="CyM" />

                {feedback ? (
                  <div
                    className={`flex items-start gap-3 rounded-2xl border px-4 py-4 text-sm leading-6 ${
                      status === 'success'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                        : 'border-rose-200 bg-rose-50 text-rose-900'
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    {status === 'success' ? <FiCheckCircle size={18} className="mt-0.5 shrink-0" /> : <FiAlertCircle size={18} className="mt-0.5 shrink-0" />}
                    <span>{feedback}</span>
                  </div>
                ) : null}

                <div className="grid gap-3">
                  <label htmlFor="contact-name" className="text-[11px] uppercase tracking-[0.3em] text-brand-mid font-bold ml-1.5">Nombre completo</label>
                  <input
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className="w-full rounded-2xl border border-brand-soft/30 bg-brand-light/50 px-7 py-5 text-brand-primary outline-none transition-all placeholder:text-brand-mid/40 focus:border-brand-mid/60 focus:bg-white focus:ring-1 focus:ring-brand-mid/20 text-base"
                    placeholder="Escribe tu nombre y apellidos"
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="contact-company" className="text-[11px] uppercase tracking-[0.3em] text-brand-mid font-bold ml-1.5">Empresa</label>
                  <input
                    id="contact-company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    autoComplete="organization"
                    className="w-full rounded-2xl border border-brand-soft/30 bg-brand-light/50 px-7 py-5 text-brand-primary outline-none transition-all placeholder:text-brand-mid/40 focus:border-brand-mid/60 focus:bg-white focus:ring-1 focus:ring-brand-mid/20 text-base"
                    placeholder="Nombre de tu empresa o negocio"
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="contact-phone" className="text-[11px] uppercase tracking-[0.3em] text-brand-mid font-bold ml-1.5">Teléfono</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    autoComplete="tel"
                    type="tel"
                    className="w-full rounded-2xl border border-brand-soft/30 bg-brand-light/50 px-7 py-5 text-brand-primary outline-none transition-all placeholder:text-brand-mid/40 focus:border-brand-mid/60 focus:bg-white focus:ring-1 focus:ring-brand-mid/20 text-base"
                    placeholder="Ej. 957 217 850"
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="contact-email" className="text-[11px] uppercase tracking-[0.3em] text-brand-mid font-bold ml-1.5">Correo electrónico</label>
                  <input
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="w-full rounded-2xl border border-brand-soft/30 bg-brand-light/50 px-7 py-5 text-brand-primary outline-none transition-all placeholder:text-brand-mid/40 focus:border-brand-mid/60 focus:bg-white focus:ring-1 focus:ring-brand-mid/20 text-base"
                    placeholder="tu@email.com"
                    type="email"
                  />
                </div>
                
                <div className="grid gap-3">
                  <label htmlFor="contact-message" className="text-[11px] uppercase tracking-[0.3em] text-brand-mid font-bold ml-1.5">Mensaje</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full rounded-2xl border border-brand-soft/30 bg-brand-light/50 px-7 py-5 text-brand-primary outline-none transition-all placeholder:text-brand-mid/40 focus:border-brand-mid/60 focus:bg-white resize-none focus:ring-1 focus:ring-brand-mid/20 text-base"
                    placeholder="Cuéntanos qué servicios necesitas y cualquier detalle importante"
                  />
                </div>

                <div className="mt-3 flex flex-col gap-4">
                  <button
                    type="submit"
                    disabled={!canSubmit || status === 'submitting'}
                    className="inline-flex items-center justify-center rounded-full bg-brand-primary px-8 py-5 text-[13px] font-black uppercase tracking-widest text-brand-light transition-all duration-500 hover:-translate-y-1.5 shadow-md w-full disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {status === 'submitting' ? (
                      <>
                        ENVIANDO
                        <FiLoader className="ml-3 animate-spin" />
                      </>
                    ) : (
                      <>
                        ENVIAR SOLICITUD
                        <FiArrowRight className="ml-3" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[9px] uppercase tracking-[0.4em] text-brand-mid/70">
                    Respuesta garantizada en menos de 24 horas
                  </p>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection
