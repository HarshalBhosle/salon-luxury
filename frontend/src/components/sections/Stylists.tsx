import { motion } from 'framer-motion'
import { Award, ArrowRight } from 'lucide-react'
import { InstagramIcon, FacebookIcon, TwitterIcon } from '../ui/SocialIcons'
import { Link } from 'react-router-dom'
import { STYLISTS } from '../../constants/stylists'
import { SectionHeader } from '../ui/SectionHeader'

const socialIcons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  twitter: TwitterIcon,
}

export function Stylists() {
  return (
    <section id="stylists" className="relative py-24 sm:py-32 bg-gradient-to-b from-accent-muted/50 to-white">
      <div className="section-container">
        <SectionHeader
          tag="Meet Our Team"
          title="The Artists"
          accent="Behind The Magic"
          description="A collective of internationally trained masters devoted to your beauty."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STYLISTS.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-white/70 backdrop-blur-xl border border-primary/5 shadow-elegant hover:shadow-elegant-hover transition-all duration-500 hover:-translate-y-1.5"
            >
              <div className="relative aspect-[4/5] bg-gradient-to-br from-primary-light to-primary overflow-hidden">
                {s.image ? (
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.25),transparent_60%)]" />
                )}
                {s.featured && (
                  <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-gradient-to-r from-secondary to-secondary-light text-primary text-[10px] font-bold uppercase tracking-wider z-10">
                    Founder
                  </span>
                )}
                <div className="absolute inset-0 flex items-end justify-center pb-6">
                  <div className="flex gap-3 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                    {Object.entries(s.socials).map(([key, href]) => {
                      const Icon = socialIcons[key as keyof typeof socialIcons]
                      if (!Icon || !href) return null
                      return (
                        <a
                          key={key}
                          href={href}
                          aria-label={`${s.name} on ${key}`}
                          className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-primary flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-display text-lg text-primary">{s.name}</h3>
                <p className="text-sm text-secondary font-heading mb-3">{s.role}</p>
                <p className="flex items-center gap-1.5 text-xs text-primary/60">
                  <Award className="w-3.5 h-3.5 text-secondary" />
                  {s.experience} years experience
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {s.specialization.slice(0, 2).map((sp) => (
                    <span key={sp} className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-[11px]">
                      {sp}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/book"
            className="btn-gold inline-flex items-center gap-2"
          >
            Book with a Stylist <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}