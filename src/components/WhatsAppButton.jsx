import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import whatsappLogo from '/images/social/whatsapp.png'

const WhatsAppButton = () => {
  const [showHint, setShowHint] = useState(false)
  const phoneNumber = '51957217850'
  const whatsappLink = `https://wa.me/${phoneNumber}?text=Hola%20CyM,%20quiero%20una%20cotizaci%C3%B3n%20para%20un%20proyecto.`

  useEffect(() => {
    const revealHint = () => {
      setShowHint(true)
      window.setTimeout(() => setShowHint(false), 5200)
    }

    const startTimer = window.setTimeout(revealHint, 2600)
    const intervalId = window.setInterval(revealHint, 18000)

    return () => {
      window.clearTimeout(startTimer)
      window.clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-5 z-40 sm:bottom-8 sm:right-8">
      <div className="relative flex items-center justify-end">
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, x: 14, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 10, y: 0 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-none absolute right-full top-[44%] mr-3 w-[min(240px,calc(100vw-6.5rem))] -translate-y-1/2 rounded-2xl border border-[#8D9571]/35 bg-[#F5F1E8] px-4 py-3 text-[13px] leading-5 text-[#2F352B] shadow-[0_12px_28px_rgba(0,0,0,0.14)]"
            >
              ¡Escríbenos por WhatsApp para solicitar un presupuesto!
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-[#737A5D] text-white shadow-2xl transition-all hover:shadow-lg"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          title="Contactar por WhatsApp"
        >
          <img src={whatsappLogo} alt="WhatsApp de CyM Centurión & Mendoza" className="h-8 w-8 object-contain" />
        </motion.a>
      </div>
    </div>
  )
}

export default WhatsAppButton