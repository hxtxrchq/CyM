import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, Menu, X } from 'lucide-react'

const links = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Nosotros', href: '#about' },
  { label: 'Servicios', href: '#services' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contact' },
]

const Navbar = ({ isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 24)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrolled = isScrolled || hasScrolled

  const logoSrc = scrolled
    ? '/images/header-logo/CyM.png'
    : '/images/header-logo/CyM_white.png'

  const logoClassName = scrolled
    ? 'h-[3.25rem] w-auto object-contain sm:h-[3.75rem] md:h-[4.75rem] lg:h-[5.75rem] transition-all duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.10)]'
    : 'h-[3.25rem] w-auto object-contain sm:h-[3.75rem] md:h-[4.75rem] lg:h-[5.75rem] transition-all duration-300 drop-shadow-[0_3px_8px_rgba(0,0,0,0.28)]'

  const goTo = (href) => {
    const target = document.querySelector(href)

    if (!target) {
      setIsOpen(false)
      return
    }

    const offset = 92
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset)

    window.scrollTo({ top, behavior: 'smooth' })
    window.history.replaceState(null, '', href)
    setIsOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ease-in-out ${
        scrolled
          ? 'border-[#6F7D60]/22 bg-[#E7DDC9] backdrop-blur-none shadow-[0_12px_30px_rgba(0,0,0,0.10)]'
          : 'border-transparent bg-transparent backdrop-blur-none'
      }`}
    >
      {/* El gradiente oscuro superior solo aparece si NO se ha hecho scroll */}
      <div 
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-black/38 via-black/10 to-transparent transition-opacity duration-500 ${
          scrolled ? 'opacity-0' : 'opacity-100'
        }`} 
      />

      <div className="section-shell relative z-10">
        <div className="flex min-h-24 items-center justify-between gap-4 py-2 md:min-h-28">
          <button
            onClick={() => goTo('#hero')}
            className="group flex items-center text-left"
            aria-label="Ir al inicio"
          >
            <img
              src={logoSrc}
              alt="CyM Centurión & Mendoza Constructora"
              className={logoClassName}
              loading="eager"
              decoding="async"
            />
          </button>

          <nav
            className={`hidden items-center gap-8 text-sm lg:flex transition-colors duration-300 ${
              scrolled ? 'text-[#2F352B]' : 'text-[#F8F4EC]/90'
            }`}
          >
            {links.map((item) => (
              <button
                key={item.href}
                onClick={() => goTo(item.href)}
                className={`transition-colors duration-300 ${
                  scrolled
                    ? 'hover:text-[#6F7D60]'
                    : 'hover:text-[#EADBC8]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <button
              onClick={() => goTo('#contact')}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                scrolled
                  ? 'border border-[#6F7D60]/20 bg-[#8E9472] text-white hover:bg-[#7D8464]'
                  : 'border border-white/25 bg-white/10 text-[#F8F4EC] hover:bg-white/15'
              }`}
            >
              Solicitar Presupuesto <ChevronRight size={15} />
            </button>
          </div>

          <button
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] lg:hidden transition-all duration-300 ${
              scrolled
                ? 'border border-[#6F7D60]/20 bg-[#8E9472] text-white'
                : 'border border-white/15 bg-white/10 text-[#F8F4EC]'
            }`}
            onClick={() => setIsOpen((value) => !value)}
            aria-label="Abrir menu"
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
            Menú
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="pb-5 lg:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="overflow-hidden rounded-[24px] border border-[#6F7D60]/18 bg-[#E7DDC9] p-3 shadow-[0_18px_45px_rgba(0,0,0,0.10)]">
                <div className="grid gap-2">
                  {links.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => goTo(item.href)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium text-[#2F352B] transition-colors hover:bg-white/35"
                    >
                      {item.label}
                      <ChevronRight size={16} className="text-[#6F7D60]" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Navbar
