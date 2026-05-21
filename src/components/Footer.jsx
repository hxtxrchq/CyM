import React from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import facebookLogo from '/images/social/facebook.png'
import instagramLogo from '/images/social/instagram.png'
import tiktokLogo from '/images/social/tiktok.png'

const Footer = () => {
  const socialLinks = [
    { label: 'Facebook', href: 'https://web.facebook.com/ceymeconstructora', icon: facebookLogo },
    { label: 'Instagram', href: 'https://www.instagram.com/cym.constructora/?__pwa=1', icon: instagramLogo },
    { label: 'TikTok', href: 'https://www.tiktok.com/@cym.constructora?is_from_webapp=1&sender_device=pc', icon: tiktokLogo },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-brand-primary/8 bg-[#F4EEE3] py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(115,122,93,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.55),rgba(244,238,227,1))]" />
      <div className="relative section-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="block h-16 w-52 overflow-hidden">
            <img
              src="/images/header-logo/CyM.png"
              alt="CyM Centurión & Mendoza Constructora"
              className="h-full w-auto origin-left object-contain"
              width="250"
              height="74"
              loading="eager"
              decoding="async"
            />
          </span>
          <p className="mt-4 max-w-xl text-sm leading-7 text-brand-primary/82">
            Diseño, construcción y supervisión de obras en Trujillo, Perú. Atención directa por WhatsApp, correo y oficina para proyectos residenciales, comerciales e institucionales.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.14em] text-brand-mid">
            <span className="rounded-full border border-brand-primary/10 bg-white/70 px-4 py-2">Construcción</span>
            <span className="rounded-full border border-brand-primary/10 bg-white/70 px-4 py-2">Supervisión</span>
            <span className="rounded-full border border-brand-primary/10 bg-white/70 px-4 py-2">Diseño</span>
          </div>

          <div className="mt-5 flex items-center gap-2">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-brand-primary/10 bg-white/80 transition-colors hover:bg-white"
              >
                <img
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-4 object-contain opacity-80"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid gap-4 rounded-[1.5rem] border border-brand-primary/10 bg-white/75 p-6 shadow-[0_20px_60px_rgba(10,10,10,0.08)] backdrop-blur-sm">
          <div className="text-[11px] uppercase tracking-[0.28em] text-brand-mid">Contacto rápido</div>
          <a href="tel:+51957217850" className="flex items-center gap-3 text-sm text-brand-primary transition-colors hover:text-brand-mid">
            <FiPhone className="shrink-0" />
            <span>+51 957 217 850</span>
          </a>
          <a href="mailto:ecenturion@ceymeconstruye.com" className="flex items-center gap-3 text-sm text-brand-primary transition-colors hover:text-brand-mid">
            <FiMail className="shrink-0" />
            <span>ecenturion@ceymeconstruye.com</span>
          </a>
          <a href="mailto:proyectos@ceymeconstruye.com" className="flex items-center gap-3 text-sm text-brand-primary transition-colors hover:text-brand-mid">
            <FiMail className="shrink-0" />
            <span>proyectos@ceymeconstruye.com</span>
          </a>
          <a href="https://www.google.com/maps/search/?api=1&query=Av.%20Los%20Colibr%C3%ADes%20Mz.%20P%20Lt.%2011%2C%202do%20piso%2C%20oficina%2023%2C%20Trujillo" target="_blank" rel="noreferrer" className="flex items-start gap-3 text-sm text-brand-primary transition-colors hover:text-brand-mid">
            <FiMapPin className="mt-0.5 shrink-0" />
            <span>Av. Los Colibríes Mz. P Lt. 11, 2do piso, oficina 23, Trujillo</span>
          </a>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
