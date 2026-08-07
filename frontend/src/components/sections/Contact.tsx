import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Loader2, Send, Navigation } from 'lucide-react'
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from '../ui/SocialIcons'
import { SITE } from '../../constants/site'
import { contactSchema, type ContactFormValues } from '../../utils/validations'
import { contactApi } from '../../services/clientApi'
import { useToast } from '../../hooks/useToast'
import { SectionHeader } from '../ui/SectionHeader'
import { Reveal } from '../animations/Reveal'
import { cn } from '../../utils/cn'

export function Contact() {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await contactApi.send(data)
      toast('Message sent! We\'ll be in touch soon.', 'success')
      reset()
    } catch {
      toast('Unable to send your message. Please try again.', 'error')
    }
  }

  const inputClass = (err?: { message?: string }) =>
    cn(
      'w-full px-4 py-3 rounded-xl border bg-white/70 text-primary placeholder:text-primary/40 focus:outline-none focus:ring-2 transition-all',
      err ? 'border-red-500/50 focus:ring-red-500/30' : 'border-primary/10 focus:ring-secondary/50',
    )

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-gradient-to-b from-accent-muted/50 to-white">
      <div className="section-container">
        <SectionHeader
          tag="Contact Us"
          title="We'd Love"
          accent="To Hear From You"
          description="Visit our atelier, call, or send a message — however you reach out, we're here."
        />

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Info + Map */}
          <div className="space-y-6">
            <Reveal>
              <div className="rounded-3xl overflow-hidden shadow-elegant border border-primary/5">
                <iframe
                  title="Maison Aurelle location map"
                  src={`https://www.google.com/maps?q=${SITE.mapsQuery}&output=embed`}
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: MapPin, title: 'Visit Us', lines: [SITE.address] },
                  { icon: Clock, title: 'Opening Hours', lines: ['Mon–Fri: 9 AM – 8 PM', 'Sat: 9–9 · Sun: 10–6'] },
                  { icon: Phone, title: 'Call Us', lines: [SITE.phone] },
                  { icon: Mail, title: 'Email', lines: [SITE.email] },
                ].map((c) => (
                  <div key={c.title} className="p-5 rounded-2xl bg-white/70 border border-primary/5 hover:border-secondary/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mb-3">
                      <c.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <h3 className="font-heading text-primary font-semibold mb-1 text-sm">{c.title}</h3>
                    {c.lines.map((l, i) => (
                      <p key={i} className="text-sm text-primary/60">{l}</p>
                    ))}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${SITE.mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4" /> Get Directions
                </a>
                <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
                  <WhatsAppIcon /> WhatsApp
                </a>
                {[
                  { icon: InstagramIcon, href: SITE.instagram },
                  { icon: FacebookIcon, href: SITE.facebook },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label="Social link" className="w-12 h-12 rounded-full border border-primary/15 flex items-center justify-center text-primary hover:bg-secondary hover:border-secondary transition-all">
                    <s.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl bg-white/80 backdrop-blur-xl border border-primary/5 shadow-glass p-6 sm:p-10 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading uppercase tracking-wider text-primary/60 mb-1.5">Name</label>
                  <input {...register('name')} placeholder="Your name" className={inputClass(errors.name)} />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-heading uppercase tracking-wider text-primary/60 mb-1.5">Email</label>
                  <input {...register('email')} type="email" placeholder="you@email.com" className={inputClass(errors.email)} />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-xs font-heading uppercase tracking-wider text-primary/60 mb-1.5">Subject</label>
                <input {...register('subject')} placeholder="How can we help?" className={inputClass()} />
              </div>
              <div>
                <label className="block text-xs font-heading uppercase tracking-wider text-primary/60 mb-1.5">Message</label>
                <textarea {...register('message')} rows={5} placeholder="Write your message…" className={inputClass(errors.message)} />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-60">
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}