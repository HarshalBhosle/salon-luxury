import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Clock, Tag, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SERVICES, SERVICE_CATEGORIES, CATEGORY_META } from '../../constants/services'
import type { Service, ServiceCategory } from '../../types'
import { SectionHeader } from '../ui/SectionHeader'

type Filter = ServiceCategory | 'All'

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group relative h-full p-7 rounded-2xl bg-white/70 backdrop-blur-xl border border-primary/5 shadow-elegant hover:shadow-elegant-hover hover:-translate-y-1.5 transition-all duration-500 overflow-hidden flex flex-col">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-secondary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-secondary/15 to-secondary/5 border border-secondary/25 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <Sparkles className="w-5 h-5 text-secondary" />
        </div>
        {service.featured && (
          <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-secondary to-secondary-light text-primary text-[10px] font-bold uppercase tracking-wider">
            Featured
          </span>
        )}
      </div>

      <h3 className="font-display text-xl text-primary group-hover:text-secondary transition-colors mb-2">
        {service.name}
      </h3>
      <p className="text-sm text-primary/60 leading-relaxed mb-5 flex-1">{service.description}</p>

      <div className="flex items-center gap-4 text-sm text-primary/70 mb-5">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-secondary" /> {service.duration} min
        </span>
        <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
          <Tag className="w-4 h-4 text-secondary" /> ${service.price}
        </span>
      </div>

      <Link
        to={`/book?service=${service.slug}`}
        className="inline-flex items-center gap-2 text-sm font-heading text-secondary font-semibold hover:gap-3 transition-all group-hover:text-secondary"
      >
        Book Now <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  )
}

export function Services() {
  const [active, setActive] = useState<Filter>('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    let list = SERVICES
    if (active !== 'All') list = list.filter((s) => s.category === active)
    if (query.trim()) {
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.description.toLowerCase().includes(query.toLowerCase()),
      )
    }
    return list
  }, [active, query])

  const meta = CATEGORY_META[active]

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-white">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[120px]" aria-hidden />
      <div className="section-container">
        <SectionHeader
          tag="Our Services"
          title="Curated Rituals"
          accent="For Every Indulgence"
          description={meta.blurb}
        />

        <div className="mb-12 space-y-6">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services…"
                aria-label="Search services"
                className="w-full pl-11 pr-4 py-3.5 rounded-full border border-primary/10 bg-white/70 backdrop-blur-md text-primary placeholder:text-primary/40 focus:outline-none focus:ring-2 focus:ring-secondary/50"
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={
                  active === cat
                    ? 'px-5 py-2.5 rounded-full bg-gradient-to-r from-secondary to-secondary-light text-primary font-heading text-xs uppercase tracking-wider font-semibold shadow-gold transition-all'
                    : 'px-5 py-2.5 rounded-full bg-white/50 border border-primary/10 text-primary/70 font-heading text-xs uppercase tracking-wider hover:border-secondary/40 hover:text-secondary transition-all'
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-primary/50 py-16">No services found. Try a different search.</p>
        )}
      </div>
    </section>
  )
}