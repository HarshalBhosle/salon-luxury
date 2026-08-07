import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'
import { FAQS, FAQ_CATEGORIES } from '../../constants/faqs'
import { SectionHeader } from '../ui/SectionHeader'

export function Faq() {
  const [open, setOpen] = useState<string | null>(FAQS[0]?.id ?? null)
  const [active, setActive] = useState<string>('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    let list = FAQS
    if (active !== 'All') list = list.filter((f) => f.category === active)
    if (query.trim()) {
      list = list.filter(
        (f) =>
          f.question.toLowerCase().includes(query.toLowerCase()) ||
          f.answer.toLowerCase().includes(query.toLowerCase()),
      )
    }
    return list
  }, [active, query])

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-white">
      <div className="section-container max-w-3xl">
        <SectionHeader
          tag="FAQ"
          title="Questions,"
          accent="Answered"
          description="Everything you might want to know before your visit."
        />

        <div className="mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search FAQs…"
            aria-label="Search FAQs"
            className="w-full pl-11 pr-4 py-3.5 rounded-full border border-primary/10 bg-white/70 text-primary placeholder:text-primary/40 focus:outline-none focus:ring-2 focus:ring-secondary/50"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={
                active === cat
                  ? 'px-4 py-2 rounded-full bg-gradient-to-r from-secondary to-secondary-light text-primary text-xs font-heading uppercase tracking-wider font-semibold'
                  : 'px-4 py-2 rounded-full bg-white/50 border border-primary/10 text-primary/70 text-xs font-heading uppercase tracking-wider hover:border-secondary/40'
              }
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((faq) => {
            const isOpen = open === faq.id
            return (
              <motion.div
                key={faq.id}
                layout
                className="rounded-2xl border border-primary/10 bg-white/60 overflow-hidden hover:border-secondary/30 transition-colors"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-primary font-medium">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <p className="px-5 pb-5 text-primary/60 leading-relaxed text-sm">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}