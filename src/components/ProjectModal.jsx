import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const ProjectModal = ({ project, open, onClose }) => {
  const [index, setIndex] = useState(0)
  const closeBtnRef = useRef(null)

  const hasImages = !!project?.images?.length
  const totalImages = project?.images?.length || 0
  const currentImage = project?.images?.[index]

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

    const sources = [currentImage]

    if (totalImages > 1) {
      sources.push(project.images[(index + 1) % totalImages])
      sources.push(project.images[(index - 1 + totalImages) % totalImages])
    }

    sources
      .filter(Boolean)
      .filter((src, sourceIndex, allSources) => allSources.indexOf(src) === sourceIndex)
      .forEach((src) => {
      const img = new Image()
      img.decoding = 'async'
      img.src = src
      })
  }, [open, project, currentImage, index, totalImages])

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
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-5"
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
            className="relative z-10 flex w-full max-w-[840px] max-h-[84vh] flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[#1F2A24] shadow-[0_20px_60px_rgba(0,0,0,0.32)]"
          >
            <div className="flex items-start justify-between gap-4 px-5 py-3 md:px-6 md:py-4">
              <div className="min-w-0">
                <h3 className="text-xl font-semibold leading-tight text-[#F5F1E8] md:text-[1.7rem]">
                  {project.title}
                </h3>
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

            <div className="relative shrink-0 bg-[#121713] p-2 md:p-3">
              <img
                src={currentImage}
                alt={`${project.title}, vista ${index + 1}`}
                className="h-[220px] w-full object-contain object-center sm:h-[250px] md:h-[300px] lg:h-[340px]"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                width="1400"
                height="900"
                sizes="(min-width: 768px) 820px, 100vw"
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

            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 md:px-6 md:py-5">
              <p className="max-w-2xl text-sm leading-7 text-[#F5F1E8]/78 md:text-[15px]">
                {project.description}
              </p>

              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.2em] text-[#AAB39B]">
                  <span>Alcance</span>
                  <span>
                    {String(index + 1).padStart(2, '0')} / {String(totalImages).padStart(2, '0')}
                  </span>
                </div>

                <ul className="grid gap-2 sm:grid-cols-2">
                  {project.scope.map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3 text-sm leading-6 text-[#F5F1E8]/84"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal