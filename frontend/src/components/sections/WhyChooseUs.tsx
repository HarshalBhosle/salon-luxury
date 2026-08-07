import {
  Award,
  Gem,
  Armchair,
  ShieldCheck,
  Users,
  HandCoins,
  Heart,
  type LucideIcon,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionHeader } from '../ui/SectionHeader'
import { TiltCard } from '../animations/TiltCard'
import { staggerContainer, staggerChild } from '../../animations/variants'

interface Reason {
  icon: LucideIcon
  title: string
  text: string
}

const reasons: Reason[] = [
  { icon: Award, title: 'Certified Stylists', text: 'Internationally trained masters who never stop perfecting their craft.' },
  { icon: Gem, title: 'Premium Products', text: 'Only the world\'s finest brands touch your hair and skin.' },
  { icon: Armchair, title: 'Luxury Interior', text: 'A serene, design-led sanctuary designed for pure relaxation.' },
  { icon: ShieldCheck, title: 'Impeccable Hygiene', text: 'Hospital-grade sterilization and single-use tools, always.' },
  { icon: Users, title: 'Experienced Team', text: 'A collaborative collective of award-winning artists.' },
  { icon: HandCoins, title: 'Affordable Luxury', text: 'World-class excellence with honest, transparent pricing.' },
  { icon: Heart, title: 'Guest Obsessed', text: 'Every detail of your visit is tailored to you.' },
]

export function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-24 sm:py-32 bg-gradient-to-b from-primary to-primary-light text-white overflow-hidden">
      <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[140px]" aria-hidden />
      <div className="absolute bottom-0 -left-32 w-96 h-96 rounded-full bg-secondary/10 blur-[120px]" aria-hidden />
      <div className="section-container">
        <SectionHeader
          tag="Why Maison Aurelle"
          title="An Experience"
          accent="Beyond Ordinary"
          description="Seven reasons the world's most discerning guests choose us."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {reasons.map((reason, i) => (
            <motion.div key={reason.title} variants={staggerChild} className="group h-full">
              <TiltCard className="h-full">
                <div className="h-full p-7 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md group-hover:border-secondary/40 transition-colors duration-500 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/25 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                    <reason.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-heading text-lg text-white font-semibold mb-2">{reason.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{reason.text}</p>
                  <span className="absolute bottom-4 right-5 font-display italic text-secondary/20 text-4xl">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.div variants={staggerChild} className="group">
            <div className="h-full p-7 rounded-2xl bg-gradient-to-br from-secondary to-secondary-light text-primary flex flex-col justify-center">
              <h3 className="font-display text-2xl mb-3">Ready to be pampered?</h3>
              <p className="text-sm text-primary/70 mb-6 leading-relaxed">
                Reserve your ritual today and discover the Aurelle difference.
              </p>
              <a
                href="/book"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-heading text-xs uppercase tracking-widest hover:bg-primary-light transition-colors w-fit"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}