import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Crown, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { OFFERS, WEDDING_PACKAGES, MEMBERSHIP_PLANS, PRICE_LIST } from '../../constants/pricing'
import { SectionHeader } from '../ui/SectionHeader'
import { Reveal } from '../animations/Reveal'

export function Pricing() {
  const [activePackage, setActivePackage] = useState('Bride')

  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-white">
      <div className="absolute -top-20 left-1/3 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[120px]" aria-hidden />
      <div className="section-container">
        <SectionHeader
          tag="Pricing & Plans"
          title="Transparent"
          accent="Luxury Pricing"
          description="Premium service, honest pricing, and exclusive memberships for our most valued guests."
        />

        {/* Price list */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {PRICE_LIST.map((group) => (
            <Reveal key={group.category}>
              <div className="p-6 rounded-2xl bg-white/60 border border-primary/5 hover:border-secondary/30 transition-colors h-full">
                <h3 className="font-display text-lg text-secondary mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4" /> {group.category}
                </h3>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item.name} className="flex items-center justify-between gap-4 group">
                      <span className="text-primary/75 text-sm group-hover:text-primary transition-colors">{item.name}</span>
                      <span className="flex-1 border-b border-dotted border-primary/15" />
                      <span className="font-heading font-semibold text-primary">${item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Wedding packages */}
        <div className="mb-24">
          <h3 className="font-display text-3xl text-center text-primary mb-2">Wedding Collections</h3>
          <p className="text-center text-primary/50 mb-10">Complete bridal journeys, curated to perfection.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {WEDDING_PACKAGES.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 0.1}>
                <div
                  onMouseEnter={() => setActivePackage(pkg.name.split(' ').pop()!)}
                  className={`relative p-8 rounded-3xl border transition-all duration-500 h-full ${
                    pkg.popular
                      ? 'bg-gradient-to-br from-primary to-primary-light text-white border-secondary/40 shadow-gold-hover scale-[1.03]'
                      : 'bg-white/60 border-primary/5 text-primary hover:border-secondary/30 hover:-translate-y-1'
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-secondary to-secondary-light text-primary text-[10px] font-bold uppercase tracking-wider">
                      <Crown className="w-3 h-3" /> Popular
                    </span>
                  )}
                  <h3 className={`font-display text-2xl mb-1 ${pkg.popular ? 'text-secondary' : 'text-primary'}`}>{pkg.name}</h3>
                  <p className={`text-sm mb-5 ${pkg.popular ? 'text-white/60' : 'text-primary/50'}`}>{pkg.description}</p>
                  <div className={`font-display text-4xl mb-5 ${pkg.popular ? 'text-white' : 'text-primary'}`}>
                    ${pkg.price.toLocaleString()}
                  </div>
                  <ul className={`space-y-2.5 mb-7 ${pkg.popular ? 'text-white/80' : 'text-primary/70'}`}>
                    {pkg.inclusions.map((inc) => (
                      <li key={inc} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-secondary shrink-0" /> {inc}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/book"
                    className={`inline-flex items-center justify-center w-full py-3 rounded-full font-heading text-sm uppercase tracking-wider transition-all ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-secondary to-secondary-light text-primary hover:shadow-gold'
                        : 'border border-primary/20 text-primary hover:bg-primary hover:text-white'
                    }`}
                  >
                    Reserve This Ritual
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Offers */}
        <div className="mb-24">
          <h3 className="font-display text-3xl text-center text-primary mb-2">Current Offers</h3>
          <p className="text-center text-primary/50 mb-10">Limited-time indulgence, yours to enjoy.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {OFFERS.map((offer) => (
              <div key={offer.id} className="relative p-6 rounded-2xl bg-primary text-white overflow-hidden group hover:-translate-y-1 transition-all duration-500">
                <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-secondary/20 blur-2xl" />
                <div className="font-display text-5xl text-secondary mb-3">{offer.discount}%</div>
                <h4 className="font-heading text-white font-semibold mb-1">{offer.title}</h4>
                <p className="text-sm text-white/50 mb-4">{offer.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/40">Use code</span>
                  <span className="px-2.5 py-1 rounded-md bg-white/10 text-secondary text-xs font-mono">{offer.code}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Memberships */}
        <div className="max-w-4xl mx-auto">
          <h3 className="font-display text-3xl text-center text-primary mb-2">Aurelle Memberships</h3>
          <p className="text-center text-primary/50 mb-10">Unlock exclusive privileges every single month.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {MEMBERSHIP_PLANS.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 0.1}>
                <div className={`h-full p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-1.5 ${
                  plan.popular ? 'bg-gradient-to-br from-secondary to-secondary-light text-primary border-secondary shadow-gold' : 'bg-white/60 border-primary/5'
                }`}>
                  <h3 className={`font-display text-2xl mb-1 ${plan.popular ? 'text-primary' : 'text-primary'}`}>{plan.name}</h3>
                  <p className={`text-sm mb-4 ${plan.popular ? 'text-primary/70' : 'text-primary/50'}`}>{plan.period} membership</p>
                  <div className={`flex items-end gap-1 mb-6 ${plan.popular ? 'text-primary' : 'text-primary'}`}>
                    <span className="font-display text-4xl">${plan.price}</span>
                    <span className={`text-sm mb-1.5 ${plan.popular ? 'text-primary/60' : 'text-primary/40'}`}>/month</span>
                  </div>
                  <ul className={`space-y-2.5 mb-7 ${plan.popular ? 'text-primary/80' : 'text-primary/70'}`}>
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-secondary shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/book"
                    className={`inline-flex items-center justify-center w-full py-3 rounded-full font-heading text-sm uppercase tracking-wider transition-all ${
                      plan.popular ? 'bg-primary text-white hover:bg-primary-light' : 'border border-primary/20 text-primary hover:bg-primary hover:text-white'
                    }`}
                  >
                    Join Membership
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence />
    </section>
  )
}