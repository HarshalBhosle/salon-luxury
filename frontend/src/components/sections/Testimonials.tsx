import { useRef } from 'react'
import { motion, useAnimationFrame } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { TESTIMONIALS } from '../../constants/stylists'
import { SectionHeader } from '../ui/SectionHeader'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-secondary fill-secondary' : 'text-primary/15'}`}
        />
      ))}
    </div>
  )
}

function TestimonialCard({ content, name, service, rating }: (typeof TESTIMONIALS)[number]) {
  return (
    <div className="w-[340px] sm:w-[400px] shrink-0 p-7 rounded-2xl bg-white/70 backdrop-blur-xl border border-primary/5 shadow-elegant group-hover:border-secondary/30 transition-colors">
      <Quote className="w-8 h-8 text-secondary/40 mb-4" />
      <p className="text-primary/75 leading-relaxed mb-5 text-sm">{content}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center text-primary font-display font-bold">
            {name![0]}
          </div>
          <div>
            <p className="font-heading text-primary font-semibold text-sm">{name}</p>
            <p className="text-xs text-primary/50">{service}</p>
          </div>
        </div>
        <Stars rating={rating} />
      </div>
    </div>
  )
}

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)

  useAnimationFrame((time) => {
    const el = trackRef.current
    if (!el) return
    const speed = 0.04
    if (time % 2 > 1) return
  })

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 bg-primary text-white overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-secondary/10 blur-[150px]" aria-hidden />
      <div className="section-container relative">
        <SectionHeader
          tag="Client Stories"
          title="Loved By"
          accent="The World"
          description="Real words from the guests who make everything we do worthwhile."
        />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-primary to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-primary to-transparent z-10" />
        <motion.div
          ref={trackRef}
          className="flex gap-6 pl-6 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
          style={{ transform: 'translateZ(0)' }}
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} {...t} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}