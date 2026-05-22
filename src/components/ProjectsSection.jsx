import React, { Suspense, lazy, useCallback, useMemo, useState, memo } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const ProjectModal = lazy(() => import('./ProjectModal'))

const featuredProjects = [
  {
    title: 'Edificio Multifamiliar IG',
    location: 'Perú',
    scope: 'Residencial',
    description:
      'Proyecto residencial integral con diseño arquitectónico, especialidades, interiores y visualización 3D.',
    images: [
      '/images/sections/projects/PROYECTO_EDIFICIO MULTIFAMILIAR IG/principal.png',
      '/images/sections/projects/PROYECTO_EDIFICIO MULTIFAMILIAR IG/3.png',
      '/images/sections/projects/PROYECTO_EDIFICIO MULTIFAMILIAR IG/4.png',
      '/images/sections/projects/PROYECTO_EDIFICIO MULTIFAMILIAR IG/6.jpg',
      '/images/sections/projects/PROYECTO_EDIFICIO MULTIFAMILIAR IG/7.jpg',
      '/images/sections/projects/PROYECTO_EDIFICIO MULTIFAMILIAR IG/8.jpg',
      '/images/sections/projects/PROYECTO_EDIFICIO MULTIFAMILIAR IG/9.jpg',
      '/images/sections/projects/PROYECTO_EDIFICIO MULTIFAMILIAR IG/10.jpg',
      '/images/sections/projects/PROYECTO_EDIFICIO MULTIFAMILIAR IG/11.jpg',
      '/images/sections/projects/PROYECTO_EDIFICIO MULTIFAMILIAR IG/12.jpg',
    ],
  },
  {
    title: 'Interiorismo Fam. IG',
    location: 'Perú',
    scope: 'Interiorismo',
    description:
      'Propuesta de interiorismo cálida y ordenada, pensada para mejorar la experiencia del espacio.',
    images: [
      '/images/sections/projects/PROYECTO_INTERIORISMO FAM. IG/principal.png',
      '/images/sections/projects/PROYECTO_INTERIORISMO FAM. IG/PLANO_PLANTA INTERIORISMO FAM. IG.jpeg',
      '/images/sections/projects/PROYECTO_INTERIORISMO FAM. IG/INTERIORISMO FAM. IG 01.jpeg',
    ],
  },
  {
    title: 'Diseño de Cocina Aida',
    location: 'Perú',
    scope: 'Interiorismo',
    description:
      'Diseño de cocina con materialidad cálida, orden visual y soluciones prácticas para el día a día.',
    images: [
      '/images/sections/projects/PROYECTO_DISEÑO COCINA AIDA/principal.jpeg',
      '/images/sections/projects/PROYECTO_DISEÑO COCINA AIDA/1.jpeg',
      '/images/sections/projects/PROYECTO_DISEÑO COCINA AIDA/2.jpeg',
      '/images/sections/projects/PROYECTO_DISEÑO COCINA AIDA/3.jpeg',
      '/images/sections/projects/PROYECTO_DISEÑO COCINA AIDA/4.jpeg',
      '/images/sections/projects/PROYECTO_DISEÑO COCINA AIDA/5.jpeg',
      '/images/sections/projects/PROYECTO_DISEÑO COCINA AIDA/6.jpeg',
      '/images/sections/projects/PROYECTO_DISEÑO COCINA AIDA/7.jpeg',
    ],
  },
  {
    title: 'Vivienda Unifamiliar J&R',
    location: 'Perú',
    scope: 'Residencial',
    description:
      'Vivienda unifamiliar proyectada con criterio arquitectónico, confort y distribución eficiente.',
    images: [
      '/images/sections/projects/PROYECTO_VIVIENDA UNIFAMILIAR J&R/principal.jpeg',
      '/images/sections/projects/PROYECTO_VIVIENDA UNIFAMILIAR J&R/1.jpeg',
      '/images/sections/projects/PROYECTO_VIVIENDA UNIFAMILIAR J&R/2.jpeg',
      '/images/sections/projects/PROYECTO_VIVIENDA UNIFAMILIAR J&R/3.jpeg',
      '/images/sections/projects/PROYECTO_VIVIENDA UNIFAMILIAR J&R/4.jpeg',
      '/images/sections/projects/PROYECTO_VIVIENDA UNIFAMILIAR J&R/5.jpeg',
      '/images/sections/projects/PROYECTO_VIVIENDA UNIFAMILIAR J&R/6.jpeg',
      '/images/sections/projects/PROYECTO_VIVIENDA UNIFAMILIAR J&R/7.jpeg',
    ],
  },
  {
    title: 'Fachada Local Comercial OL',
    location: 'Av. América Oeste',
    scope: 'Comercial',
    description:
      'Proyecto comercial con arquitectura, expediente técnico y ejecución de obra civil y acabados.',
    images: [
      '/images/sections/projects/FACHADA LOCAL COMERCIAL OL/principal.jpeg',
    ],
  },
]

const cardEnter = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.08,
    },
  }),
}

const ProjectCard = memo(function ProjectCard({
  project,
  index,
  inView,
  isActive,
  onHover,
  onOpen,
}) {
  const handleMouseEnter = useCallback(() => {
    if (window.innerWidth >= 768) onHover(index)
  }, [index, onHover])

  const handleClick = useCallback(() => {
    onOpen(project)
  }, [onOpen, project])

  return (
    <motion.article
      custom={index}
      variants={cardEnter}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className="group relative min-h-[380px] cursor-pointer overflow-hidden rounded-[22px] bg-[#22231d] md:min-h-0 md:h-[540px]"
    >
      <img
        src={project.images[0]}
        alt={`${project.title} en ${project.location}`}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        width="1200"
        height="1600"
        sizes="(min-width: 768px) 24vw, 100vw"
        style={{ willChange: 'transform' }}
      />

      <div className="absolute inset-0 bg-black/28 transition-opacity duration-300 group-hover:bg-black/42" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/18 to-black/10" />

      <div className="absolute right-5 top-5 z-20">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white/88 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:bg-white/14">
          <span className="text-lg leading-none">↗</span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-7">
        <div
          className={`transition-all duration-300 ${
            isActive ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-[0.92]'
          }`}
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#a4ac86]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="h-px w-10 bg-white/20" />
            <span className="text-[11px] uppercase tracking-[0.24em] text-white/58">
              {project.scope}
            </span>
          </div>

          <h3 className="max-w-[14ch] text-2xl font-semibold leading-tight text-[#ebe3d2] md:text-[2rem]">
            {project.title}
          </h3>

          <p className="mt-2 text-sm text-white/70">{project.location}</p>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              isActive
                ? 'mt-4 max-h-64 opacity-100 md:max-h-44'
                : 'mt-0 max-h-0 opacity-0'
            }`}
          >
            <p className="max-w-sm text-sm leading-6 text-white/78">
              {project.description}
            </p>

            <div className="mt-5 inline-flex items-center rounded-full border border-white/28 bg-white/18 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_4px_16px_rgba(0,0,0,0.24)]">
              Ver galería
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
})

const ProjectsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  })

  const [activeCard, setActiveCard] = useState(null)
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(0)

  const handleHover = useCallback((index) => {
    setHovered((prev) => (prev === index ? prev : index))
  }, [])

  const handleOpen = useCallback((project) => {
    setActiveCard(project)
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const renderedProjects = useMemo(
    () =>
      featuredProjects.map((project, index) => (
        <ProjectCard
          key={project.title}
          project={project}
          index={index}
          inView={inView}
          isActive={hovered === index}
          onHover={handleHover}
          onOpen={handleOpen}
        />
      )),
    [inView, hovered, handleHover, handleOpen]
  )

  return (
    <section
      id="projects"
      className="section-gap relative overflow-hidden bg-[#161713] text-white scroll-mt-24 md:scroll-mt-28"
    >
      <div className="section-shell" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.65 }}
        >
          <div className="mb-10 md:mb-14">
            <div className="eyebrow text-[#a4ac86]">Portafolio</div>
            <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                    <h2 className="text-4xl font-semibold tracking-tight text-[#ebe3d2] md:text-5xl">
                      Proyectos destacados de construcción y diseño
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/68 md:text-base">
                      Una selección curada de proyectos residenciales, interiores y comerciales que
                      reflejan nuestra experiencia en diseño, construcción y supervisión de obras.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {renderedProjects}
          </div>

          <Suspense fallback={null}>
            {activeCard ? <ProjectModal project={activeCard} open={open} onClose={handleClose} /> : null}
          </Suspense>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection