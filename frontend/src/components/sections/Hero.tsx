import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, animate } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, Star, Sparkles } from 'lucide-react'
import { STATISTICS } from '../../constants/site'
import { useCountUp } from '../../hooks/useCountUp'
import { Button } from '../ui/Button'

function Counter({ target, suffix, start }: { target: number; suffix?: string; start: boolean }) {
  const value = useCountUp(target, 2200, start)
  return (
    <span className="font-display text-4xl sm:text-5xl text-white">
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [countersStart, setCountersStart] = useState(false)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersStart(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-primary"
    >
      {/* Background layer */}
      <motion.div style={{ y }} className="absolute inset-0">
        <img src="/images/gallery/g1.jpg" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/70 to-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.18),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.10),transparent_50%)]" />
        <div className="absolute inset-0 opacity-10 noise-overlay" />
        {/* Floating orbs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-secondary/15 blur-[140px]" aria-hidden />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[120px]" aria-hidden />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative section-container pt-32 pb-20 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/15 rounded-full text-white/80 text-xs tracking-widest uppercase mb-8"
        >
          <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
          Rated 4.9 / 5 by 12,000+ clients
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-[9rem] leading-[0.95] text-white tracking-tight"
          >
            Beauty, Elevated
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-display italic text-4xl sm:text-5xl lg:text-6xl mt-4 text-transparent bg-clip-text bg-gradient-to-r from-secondary via-secondary-light to-secondary"
          >
            Where Artistry Meets Elegance
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-xl mx-auto mt-8 text-white/60 text-base sm:text-lg leading-relaxed"
        >
          Experience a world-class luxury salon crafted for those who demand perfection.
          Master stylists, premium products, and an atmosphere of pure indulgence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/book">
            <Button variant="gold" size="lg">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Book Appointment
              </span>
            </Button>
          </Link>
          <Link to="/services">
            <Button variant="glass" size="lg">
              <span className="flex items-center gap-2">
                Explore Services <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px mt-24 rounded-2xl overflow-hidden border border-white/10 bg-white/10"
        >
          {[
            { label: 'Years of Experience', value: STATISTICS.yearsExperience, suffix: '+' },
            { label: 'Happy Clients', value: STATISTICS.happyClients, suffix: '+' },
            { label: 'Professional Stylists', value: STATISTICS.professionalStylists, suffix: '' },
            { label: 'Google Rating', value: STATISTICS.googleRating, suffix: '' },
          ].map((stat) => (
            <div key={stat.label} className="bg-primary/60 backdrop-blur-md px-6 py-8 text-center">
              <Counter target={stat.value} suffix={stat.suffix} start={countersStart} />
              <p className="mt-2 text-xs uppercase tracking-widest text-white/50">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}