import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const ProjectModal = ({ project, open, onClose }) => {
  const [index, setIndex] = useState(0)
  const closeBtnRef = useRef(null)

  const hasImages = !!project?.images?.length
  const totalImages = project?.images?.length || 0

  const next = useCallback(() => {
    if (!hasImages) return
    setIndex((i) => (i + 1) % totalImages)
  }, [hasImages, totalImages])

  const prev = useCallback(() => {
    if (!hasImages) return
    setIndex((i) => (i - 1 + totalImages) % totalImages)
  }, [hasImages, totalImages])

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = ''
      return
    }

    setIndex(0)
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => closeBtnRef.current?.focus(), 40)

    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [open, project])

  useEffect(() => {
    if (!open || !project?.images?.length) return

    project.images.forEach((src) => {
      const img = new Image()
      img.decoding = 'async'
      img.src = src
    })
  }, [open, project])

  useEffect(() => {
    if (!open) return

    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose, next, prev])

  if (!project) return null

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Cerrar modal"
            onClick={onClose}
            className="absolute inset-0 bg-[#1F2A24]/78"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            transition={{ duration: 0.24 }}
            className="relative z-10 w-full max-w-3xl max-h-[calc(100vh-2rem)] overflow-hidden rounded-[22px] border border-white/10 bg-[#1F2A24] shadow-[0_20px_60px_rgba(0,0,0,0.32)] md:max-w-4xl"
          >
            <div className="flex items-start justify-between gap-4 px-5 py-4 md:px-6">
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-[0.26em] text-[#AAB39B]">
                  {project.scope}
                </div>
                <h3 className="mt-1 text-xl font-semibold text-[#F5F1E8] md:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-white/58">{project.location}</p>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Cerrar modal"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors duration-200 hover:bg-white/10"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="relative bg-[#2D3B34]">
              <img
                src={project.images[index]}
                alt={`${project.title} en ${project.location}, vista ${index + 1}`}
                className="h-[220px] w-full object-cover md:h-[360px] lg:h-[420px]"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                width="1400"
                height="900"
                sizes="(min-width: 768px) 900px, 100vw"
              />

              {totalImages > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Imagen anterior"
                    className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-[#1F2A24]/72 text-white transition-colors duration-200 hover:bg-[#2D3B34]"
                  >
                    <FiChevronLeft size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    aria-label="Siguiente imagen"
                    className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-[#1F2A24]/72 text-white transition-colors duration-200 hover:bg-[#2D3B34]"
                  >
                    <FiChevronRight size={18} />
                  </button>
                </>
              )}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1F2A24]/45 to-transparent" />
            </div>

            <div className="px-5 py-5 md:px-6">
              <p className="max-w-2xl text-sm leading-7 text-[#F5F1E8]/78 md:text-[15px]">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-[#AAB39B]">
                <span>{project.location}</span>
                <span className="h-1 w-1 rounded-full bg-[#AAB39B]/40" />
                <span>{project.scope}</span>
                <span className="h-1 w-1 rounded-full bg-[#AAB39B]/40" />
                <span>
                  {String(index + 1).padStart(2, '0')} / {String(totalImages).padStart(2, '0')}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal