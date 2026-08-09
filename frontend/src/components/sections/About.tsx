import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Award, Gem, HeartHandshake, Target, Eye, ArrowRight } from 'lucide-react'
import { Reveal } from '../animations/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { Button } from '../ui/Button'
import { SmartImage } from '../ui/SmartImage'

const milestones = [
  { year: '2011', title: 'The Vision', text: 'Aurora Vance opens a single-chair atelier in Beverly Hills.' },
  { year: '2015', title: 'Master Team', text: 'Award-winning stylists and colorists join the family.' },
  { year: '2019', title: 'Signature Rituals', text: 'Launch of our exclusive hair spa and facial rituals.' },
  { year: '2023', title: 'Award of Excellence', text: 'Named Best Luxury Salon on the West Coast.' },
  { year: '2026', title: 'Sanctuary of Beauty', text: 'A world-class experience, today and always.' },
]

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-secondary/10 blur-[120px]" aria-hidden />
      <div className="section-container">
        <SectionHeader
          tag="Our Story"
          title="A Sanctuary of"
          accent="Timeless Beauty"
          description="Fifteen years of artistry, integrity and a relentless pursuit of perfection — this is the heart of Maison Aurelle."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image composition */}
          <Reveal className="relative">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-elegant">
                <SmartImage src="/images/gallery/g4.jpg" alt="Maison Aurelle interior" className="w-full h-full object-cover aspect-[4/5]" />
              </div>
              <div className="absolute -bottom-6 -right-4 sm:-right-8 w-40 h-52 sm:w-48 sm:h-64 rounded-2xl overflow-hidden border-4 border-white shadow-glass z-10">
                <SmartImage src="/images/gallery/g9.jpg" alt="Relaxation suite" eager className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-6 -left-4 sm:-left-6 rounded-2xl px-6 py-4 glass-card border border-secondary/20 z-10">
                <Award className="w-8 h-8 text-secondary mb-1" />
                <p className="font-display text-lg text-primary">Award Winner</p>
                <p className="text-xs text-primary/60">15+ Years of Excellence</p>
              </div>
            </div>
          </Reveal>

          {/* Content */}
          <div>
            <Reveal>
              <p className="text-primary/70 leading-relaxed text-lg mb-6">
                Founded by <span className="font-semibold text-primary">Aurora Vance</span>, Maison Aurelle was born
                from a simple belief: a salon should feel like a sanctuary. Today, our intimate atelier blends
                European technique with modern artistry to create beauty that feels effortless.
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: Target, title: 'Our Mission', text: 'To transform beauty into a meaningful, personalized experience for every guest.' },
                { icon: Eye, title: 'Our Vision', text: 'To become the world\'s most beloved luxury hair & skincare atelier.' },
                { icon: HeartHandshake, title: 'Our Values', text: 'Integrity, precision, warmth and a passion for detail in everything we do.' },
                { icon: Gem, title: 'Our Craft', text: 'Continuously evolving techniques using only the world\'s premium products.' },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-2xl bg-white/50 border border-primary/5 hover:border-secondary/30 transition-colors group">
                  <item.icon className="w-6 h-6 text-secondary mb-3" />
                  <h3 className="font-heading text-primary font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-primary/60 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <Link to="/about">
              <Button variant="secondary">
                <span className="flex items-center gap-2">Discover Our Journey <ArrowRight className="w-4 h-4" /></span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Timeline */}
        <Reveal className="mt-24">
          <div className="relative">
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {milestones.map((m) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="pt-8 relative group"
                >
                  <span className="absolute top-0 left-0 h-3 w-3 -translate-y-1.5 rounded-full bg-secondary ring-4 ring-secondary/20 group-hover:scale-125 transition-transform" />
                  <span className="font-display text-secondary text-xl">{m.year}</span>
                  <h4 className="font-heading text-primary font-semibold mt-2">{m.title}</h4>
                  <p className="text-sm text-primary/60 mt-1 leading-relaxed">{m.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}