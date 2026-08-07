import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, animate, useScroll } from 'framer-motion'
import {
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Phone,
  ArrowRight,
} from 'lucide-react'
import { cn } from '../../utils/cn'
import { NAV_ITEMS, SITE } from '../../constants/site'
import { useTheme } from '../../context/ThemeContext'
import { Button } from '../ui/Button'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMega, setActiveMega] = useState<number | null>(null)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll()
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveMega(null)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleNavigate = (href: string) => {
    const [path, hash] = href.split('#')
    if (hash && path === '') {
      navigate('/', { state: { scrollTo: hash } })
    } else {
      navigate(href)
    }
  }

  return (
    <>
      <motion.header
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary via-secondary-light to-secondary origin-left z-[60]"
        aria-hidden
      />

      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500',
          scrolled
            ? 'py-2.5 bg-white/70 backdrop-blur-xl shadow-glass border-b border-white/30'
            : 'py-5 bg-transparent',
        )}
      >
        <nav className="section-container flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group" aria-label={SITE.name}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center text-primary">
              <span className="font-display font-bold text-lg">M</span>
            </div>
            <div className="leading-none">
              <span className="font-display text-xl tracking-wide text-primary">
                Maison <span className="text-secondary">Aurelle</span>
              </span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-primary/50 mt-1">
                Luxury Salon
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item, i) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveMega(i)}
                  onMouseLeave={() => setActiveMega(null)}
                >
                  <button
                    className="px-4 py-2 text-sm font-heading text-primary/80 hover:text-primary transition-colors flex items-center gap-1.5"
                    onClick={() => handleNavigate(item.href)}
                  >
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <motion.div
                    initial={false}
                    animate={activeMega === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 12, pointerEvents: 'none' }}
                    transition={{ duration: 0.25 }}
                    className="absolute top-full left-0 w-[520px] bg-white/90 backdrop-blur-xl border border-white/40 shadow-glass rounded-2xl p-5 grid grid-cols-2 gap-2"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        onClick={() => setActiveMega(null)}
                        className="group/mega p-3 rounded-xl hover:bg-secondary/5 transition-colors"
                      >
                        <span className="text-sm font-semibold text-primary group-hover/mega:text-secondary transition-colors">
                          {child.label}
                        </span>
                        <span className="block text-xs text-primary/55 mt-0.5">
                          {child.description}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="px-4 py-2 text-sm font-heading text-primary/80 hover:text-primary transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-secondary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </Link>
              ),
            )}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`}
              className="hidden md:inline-flex items-center gap-2 text-sm text-primary/70 hover:text-secondary transition-colors"
            >
              <Phone className="w-4 h-4" />
              {SITE.phone}
            </a>

            <Button variant="gold" size="sm" className="hidden sm:inline-flex" onClick={() => handleNavigate('/book')}>
              <span className="flex items-center gap-2">Book Now <ArrowRight className="w-3.5 h-3.5" /></span>
            </Button>

            <button
              className="lg:hidden w-11 h-11 rounded-full border border-primary/15 flex flex-col items-center justify-center gap-1.5 text-primary"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span className="w-5 h-px bg-current" />
              <span className="w-5 h-px bg-current" />
              <span className="w-3 h-px bg-current self-center" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 inset-y-0 w-[85%] max-w-sm bg-white/95 backdrop-blur-xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-primary/5">
                <span className="font-display text-lg text-primary">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-full hover:bg-primary/5" aria-label="Close menu">
                  <X className="w-6 h-6 text-primary" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                  >
                    <button
                      className="w-full text-left py-3 text-lg font-heading text-primary flex items-center justify-between"
                      onClick={() => handleNavigate(item.href)}
                    >
                      {item.label}
                      {item.children && <ChevronDown className="w-4 h-4" />}
                    </button>
                    {item.children && (
                      <div className="ml-4 flex flex-col gap-1 pb-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="py-2 text-sm text-primary/60 hover:text-secondary"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="p-6 border-t border-primary/5">
                <Button variant="gold" className="w-full" onClick={() => handleNavigate('/book')}>
                  Book Appointment
                </Button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}