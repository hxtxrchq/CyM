import React from 'react'

const mapUrl =
  'https://www.google.com/maps?q=-8.125327,-79.040073&z=18&output=embed'
const directionsUrl =
  'https://www.google.com/maps/search/?api=1&query=-8.125327,-79.040073'

const LocationSection = () => {
  return (
    <section
      id="location"
      className="section-gap bg-transparent overflow-hidden scroll-mt-24 md:scroll-mt-28"
    >
      <div className="section-shell">
        <div className="mb-5">
          <h2 className="text-2xl font-semibold text-brand-primary md:text-3xl">
            Ubicación
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-[1rem] border border-brand-primary/10 bg-[#E6D9C4] shadow-editorial">
          <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(255,248,236,0.18),rgba(230,217,196,0.10))]" />
          
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="absolute right-4 top-4 z-20 rounded-full bg-brand-primary px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-brand-light shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-transform hover:-translate-y-0.5"
          >
            Abrir en Maps
          </a>
          <iframe
            title="Ubicación de CyM Centurión & Mendoza Constructora"
            src={mapUrl}
            className="pointer-events-none relative z-10 h-[380px] w-full border-0 md:h-[500px]"
            style={{
              filter: 'sepia(0.22) saturate(0.72) hue-rotate(350deg) brightness(1.03) contrast(0.96)',
            }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}

export default LocationSection