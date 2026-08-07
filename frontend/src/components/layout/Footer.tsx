import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  ArrowUp,
  Send,
  Clock,
} from 'lucide-react'
import { InstagramIcon, FacebookIcon, TwitterIcon } from '../ui/SocialIcons'
import { SITE } from '../../constants/site'
import { newsletterApi } from '../../services/clientApi'
import { newsletterSchema } from '../../utils/validations'
import { useToast } from '../../hooks/useToast'
import { Button } from '../ui/Button'

export function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = newsletterSchema.safeParse({ email })
    if (!parsed.success) {
      toast('Please enter a valid email address', 'error')
      return
    }
    setLoading(true)
    try {
      await newsletterApi.subscribe(email)
      toast('Welcome to the Aurelle circle!', 'success')
      setEmail('')
    } catch {
      toast('Something went wrong. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-primary text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] grain-overlay" aria-hidden />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary/20 blur-[120px]" aria-hidden />

      <div className="relative section-container pt-20 pb-10">
        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card-gold p-8 sm:p-12 mb-16 rounded-3xl text-center bg-white/[0.03] border border-white/10"
        >
          <h3 className="font-display text-3xl sm:text-4xl text-white mb-3">
            Join the <span className="text-secondary">Aurelle</span> Circle
          </h3>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Receive exclusive offers, seasonal trends and members-only invitations.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              aria-label="Email address"
              className="flex-1 px-5 py-3.5 rounded-full bg-white/5 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/60"
            />
            <Button type="submit" variant="gold" disabled={loading}>
              <span className="flex items-center gap-2">{loading ? 'Joining…' : 'Subscribe'} <Send className="w-4 h-4" /></span>
            </Button>
          </form>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center text-primary">
                <span className="font-display font-bold text-lg">M</span>
              </div>
              <span className="font-display text-xl text-white">
                Maison <span className="text-secondary">Aurelle</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              A sanctuary of beauty where artistry, precision and elegance come together for an unforgettable experience.
            </p>
            <div className="flex gap-3">
              {[InstagramIcon, FacebookIcon, TwitterIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:bg-secondary hover:border-secondary hover:text-primary transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm uppercase tracking-widest text-secondary mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'Gallery', 'Stylists', 'Pricing', 'Blog'].map((l) => (
                <li key={l}>
                  <Link to={l === 'Home' ? '/' : `/${l.toLowerCase()}`} className="text-white/60 hover:text-secondary transition-colors text-sm">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm uppercase tracking-widest text-secondary mb-5">Services</h4>
            <ul className="space-y-3">
              {['Hair Studio', 'Skin & Facial', 'Makeup Atelier', 'Nail Studio', 'Spa & Massage', "Men's Grooming"].map((l) => (
                <li key={l}>
                  <Link to="/services" className="text-white/60 hover:text-white transition-colors text-sm">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm uppercase tracking-widest text-secondary mb-5">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                {SITE.address}
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                <a href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`} className="hover:text-white">{SITE.phone}</a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a>
              </li>
              <li className="flex gap-3">
                <Clock className="w-4 h-4 text-secondary shrink-0" />
                <span>Mon–Fri: 9–8 · Sat: 9–9 · Sun: 10–6</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <button
            onClick={handleScrollTop}
            aria-label="Back to top"
            className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:bg-secondary hover:text-primary hover:border-secondary transition-all"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}