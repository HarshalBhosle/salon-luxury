import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { GALLERY, GALLERY_CATEGORIES } from '../../constants/gallery'
import type { GalleryItem } from '../../types'
import { SectionHeader } from '../ui/SectionHeader'
import { SmartImage } from '../ui/SmartImage'

type Filter = (typeof GALLERY_CATEGORIES)[number]

function BeforeAfterSlider({ item }: { item: GalleryItem }) {
  const [pos, setPos] = useState(50)
  if (!item.before || !item.after) return null
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl select-none">
      <SmartImage src={item.after} alt={item.alt} className="absolute inset-0 w-full h-full object-cover" />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <SmartImage src={item.before} alt="Before" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -translate-x-1/2 w-px bg-white" style={{ left: 0 }} />
        <span className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-primary text-xs">
          ⇄
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        aria-label="Drag to compare before and after"
      />
      <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest bg-black/50 text-white px-2 py-1 rounded-full">Before</span>
      <span className="absolute top-3 right-3 text-[10px] uppercase tracking-widest bg-secondary text-primary px-2 py-1 rounded-full">After</span>
    </div>
  )
}

export function Gallery() {
  const [filter, setFilter] = useState<Filter>('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = useMemo(
    () => (filter === 'All' ? GALLERY : GALLERY.filter((g) => g.category === filter)),
    [filter],
  )

  const current = lightbox !== null ? filtered[lightbox] : null

  const navigate = (dir: 1 | -1) => {
    if (lightbox === null) return
    const next = (lightbox + dir + filtered.length) % filtered.length
    setLightbox(next)
  }

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-white">
      <div className="section-container">
        <SectionHeader
          tag="Our Gallery"
          title="Portfolio of"
          accent="Artistry & Elegance"
          description="A glimpse into the transformations, looks and spaces that define Maison Aurelle."
        />

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={
                filter === cat
                  ? 'px-5 py-2.5 rounded-full bg-gradient-to-r from-secondary to-secondary-light text-primary font-heading text-xs uppercase tracking-wider font-semibold shadow-gold'
                  : 'px-5 py-2.5 rounded-full bg-white/50 border border-primary/10 text-primary/70 font-heading text-xs uppercase tracking-wider hover:border-secondary/40 hover:text-secondary'
              }
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="mb-5 break-inside-avoid"
              >
                {item.category === 'BeforeAfter' && item.before ? (
                  <div onClick={() => setLightbox(i)} role="button" className="cursor-pointer">
                    <BeforeAfterSlider item={item} />
                  </div>
                ) : (
                  <button
                    onClick={() => setLightbox(i)}
                    className="group relative w-full overflow-hidden rounded-2xl block"
                    aria-label={`Open ${item.alt}`}
                  >
                    <div className="relative aspect-[3/4]">
                      <SmartImage
                        src={item.image}
                        alt={item.alt}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="p-3 rounded-full bg-white/90 text-primary"><ZoomIn className="w-5 h-5" /></span>
                    </div>
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/40 text-white text-[10px] uppercase tracking-widest">
                      {item.category}
                    </span>
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20" onClick={() => setLightbox(null)} aria-label="Close">
              <X className="w-6 h-6" />
            </button>
            <button
              className="absolute left-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); navigate(-1) }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-h-[80vh] rounded-2xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[60vh] w-[85vw] max-w-4xl overflow-hidden rounded-2xl">
              <SmartImage src={current.image} alt={current.alt} eager className="w-full h-full object-contain" />
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">{current.alt}</p>
            </div>
            </motion.div>
            <button
              className="absolute right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); navigate(1) }}
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}