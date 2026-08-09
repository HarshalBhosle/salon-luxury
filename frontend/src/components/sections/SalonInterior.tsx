import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Sofa, Footprints, Lock, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'

const slides = [
  {
    id: 1,
    title: 'The Reception Lounge',
    text: 'A serene, candlelit welcome space designed to calm the senses from the moment you arrive.',
    image: '/images/gallery/g4.jpg',
    hotspots: [
      { x: '25%', y: '35%', label: 'Signature Welcome Bar', icon: Sparkles },
    ],
  },
  {
    id: 2,
    title: 'Styling Suites',
    text: 'Private, mirror-lined ateliers with premium seating and ambient lighting.',
    image: '/images/gallery/g6.jpg',
    hotspots: [
      { x: '70%', y: '40%', label: 'Champagne on arrival', icon: Sofa },
    ],
  },
  {
    id: 3,
    title: 'Aurelle Spa Room',
    text: 'A tranquil sanctuary for head and body therapies, bathed in soft golden light.',
    image: '/images/gallery/g9.jpg',
    hotspots: [
      { x: '30%', y: '50%', label: 'Therapy Suite', icon: Footprints },
      { x: '60%', y: '60%', label: 'Relaxation Corner', icon: Sparkles },
    ],
  },
]

export function SalonInterior() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [])

  const slide = slides[current]

  return (
    <section id="interior" className="relative py-24 sm:py-32 bg-white overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[120px]" aria-hidden />
      <div className="section-container">
        <SectionHeader
          tag="Our Space"
          title="Step Inside"
          accent="The Atelier"
          description="Explore the world we've crafted for you — a seamless blend of design, warmth and light."
        />

        <div className="relative rounded-3xl overflow-hidden aspect-[16/9] max-h-[70vh] shadow-glass group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-primary to-primary" />

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            </motion.div>
          </AnimatePresence>

          {/* Caption */}
          <motion.div
            key={`caption-${slide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 text-white"
          >
            <h3 className="font-display text-3xl sm:text-4xl mb-2">{slide.title}</h3>
            <p className="text-white/70 max-w-lg">{slide.text}</p>
          </motion.div>

          {/* Hotspots */}
          {slide.hotspots.map((h, i) => (
            <motion.button
              key={h.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.2 }}
              style={{ left: h.x, top: h.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group/hotspot"
              aria-label={h.label}
            >
              <span className="relative flex w-12 h-12 items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-secondary opacity-60 animate-ping" />
                <span className="relative inline-flex w-10 h-10 rounded-full bg-secondary/90 backdrop-blur border border-white/40 items-center justify-center text-primary">
                  <h.icon className="w-4 h-4" />
                </span>
              </span>
            </motion.button>
          ))}

          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4">
            <button
              onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
              className="p-2.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4">
            <button
              onClick={() => setCurrent((current + 1) % slides.length)}
              className="p-2.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}