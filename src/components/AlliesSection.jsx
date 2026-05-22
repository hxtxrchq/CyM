import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const MonochromeLogo = ({ src, alt, color = '#414833', className }) => {
  const [outSrc, setOutSrc] = useState(null)

  useEffect(() => {
    let isCanceled = false
    const image = new Image()

    image.onload = () => {
      if (isCanceled) return

      const maxW = 600
      const scale = image.naturalWidth > maxW ? maxW / image.naturalWidth : 1
      const width = Math.max(1, Math.round(image.naturalWidth * scale))
      const height = Math.max(1, Math.round(image.naturalHeight * scale))

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) {
        setOutSrc(src)
        return
      }

      ctx.clearRect(0, 0, width, height)
      ctx.drawImage(image, 0, 0, width, height)

      const data = ctx.getImageData(0, 0, width, height)
      const pixels = data.data

      let lumSum = 0
      let count = 0

      for (let i = 0; i < pixels.length; i += 4) {
        const a = pixels[i + 3] / 255
        if (a < 0.02) continue

        const r = pixels[i] / 255
        const g = pixels[i + 1] / 255
        const b = pixels[i + 2] / 255
        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b

        lumSum += lum
        count += 1
      }

      const avgLum = count ? lumSum / count : 0.5
      const isMostlyDark = avgLum < 0.5

      const cr = parseInt(color.slice(1, 3), 16)
      const cg = parseInt(color.slice(3, 5), 16)
      const cb = parseInt(color.slice(5, 7), 16)

      for (let i = 0; i < pixels.length; i += 4) {
        const a = pixels[i + 3] / 255
        if (a < 0.02) {
          pixels[i + 3] = 0
          continue
        }

        const r = pixels[i] / 255
        const g = pixels[i + 1] / 255
        const b = pixels[i + 2] / 255
        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b

        let matte = isMostlyDark ? 1 - lum : lum
        matte = Math.min(1, Math.max(0, (matte - 0.08) / 0.92))
        matte = Math.pow(matte, 0.85)

        pixels[i] = cr
        pixels[i + 1] = cg
        pixels[i + 2] = cb
        pixels[i + 3] = Math.round(255 * matte * a)
      }

      ctx.putImageData(data, 0, 0)

      try {
        const url = canvas.toDataURL('image/png')
        setOutSrc(url)
      } catch {
        setOutSrc(src)
      }
    }

    image.onerror = () => {
      if (!isCanceled) setOutSrc(src)
    }

    image.src = src

    return () => {
      isCanceled = true
    }
  }, [src, color])

  return (
    <img
      src={outSrc || src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
    />
  )
}

const AlliesSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  })

  const brands = [
    
    {
      id: 2,
      name: 'ECEL Ingeniería & Construcción',
      logo: '/images/brands/brand-2.png',
      size: 'w-[150px] h-[100px] md:w-[220px] md:h-[250px]',
    },
    {
      id: 3,
      name: 'GCEL Ingeniería y Construcción',
      logo: '/images/brands/brand-3.png',
      size: 'w-[150px] h-[100px] md:w-[220px] md:h-[100px]',
    },
    {
      id: 4,
      name: 'Hoteles Costa del Sol',
      logo: '/images/brands/brand-4.png',
      size: 'w-[125px] h-[40px] md:w-[180px] md:h-[70px]',
    },
    {
      id: 5,
      name: 'Corte Superior de Justicia',
      logo: '/images/brands/brand-5.png',
      size: 'w-[145px] h-[100px] md:w-[210px] md:h-[140px]',
    },
    {
      id: 6,
      name: 'UCT Universidad Católica',
      logo: '/images/brands/brand-6.png',
      size: 'w-[135px] h-[70px] md:w-[200px] md:h-[90px]',
    },
  ]

  const marqueeItems = useMemo(() => [...brands, ...brands], [brands])
  const monoColor = '#414833'

  return (
    <section
      id="allies"
      className="section-gap scroll-mt-24 bg-white py-14 md:scroll-mt-28 md:py-16"
    >
      <div ref={ref} className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="eyebrow mb-2 text-brand-mid">Nuestros aliados</div>
              <h2 className="text-2xl font-semibold text-brand-primary md:text-3xl">
                Empresas que confían en nosotros
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-2 max-w-2xl text-[11px] leading-5 text-brand-mid md:text-xs"
            >
              Colaboramos con clientes y aliados que confían en nuestra experiencia,
              compromiso y visión para desarrollar proyectos con respaldo técnico y
              resultados sólidos.
            </motion.p>
          </div>

          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent md:w-24" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent md:w-24" />

            <motion.div
              className="flex w-max items-center gap-10 md:gap-16"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {marqueeItems.map((brand, idx) => (
                <div
                  key={`${brand.id}-${idx}`}
                  className="flex h-[88px] w-[180px] shrink-0 items-center justify-center md:h-[110px] md:w-[250px]"
                >
                  <MonochromeLogo
                    src={brand.logo}
                    alt={brand.name}
                    color={monoColor}
                    className={`block object-contain object-center opacity-80 transition-opacity duration-300 hover:opacity-100 ${brand.size}`}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AlliesSection