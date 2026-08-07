import { CalendarCheck, Sparkles, Clock, ShieldCheck } from 'lucide-react'
import { AppointmentForm } from '../forms/AppointmentForm'
import { SectionHeader } from '../ui/SectionHeader'
import { Reveal } from '../animations/Reveal'

export function AppointmentCTA() {
  return (
    <section id="book" className="relative py-24 sm:py-32 bg-gradient-to-b from-primary to-primary-light text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] noise-overlay" aria-hidden />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-secondary/15 blur-[150px]" aria-hidden />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary/10 blur-[120px]" aria-hidden />

      <div className="section-container relative">
        <SectionHeader
          tag="Reserve Your Ritual"
          title="Book Your"
          accent="Moment of Luxury"
          description="Complete the form and our concierge will confirm your appointment within the hour."
        />

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <Reveal className="lg:col-span-2 space-y-5">
            {[
              { icon: CalendarCheck, title: 'Instant Confirmation', text: 'Get a callback to confirm within 60 minutes during opening hours.' },
              { icon: Sparkles, title: 'Personalized Service', text: 'Tell us your preferences and we will tailor the ritual to you.' },
              { icon: Clock, title: 'Flexible Scheduling', text: 'Morning, evening and weekend slots available every day.' },
              { icon: ShieldCheck, title: 'Secure & Private', text: 'Your details are always kept confidential and secure.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:border-secondary/30 transition-colors">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-secondary/25 to-secondary/5 border border-secondary/30 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-heading text-white font-semibold">{item.title}</h3>
                  <p className="text-sm text-white/60 mt-0.5">{item.text}</p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-3xl bg-white/95 backdrop-blur-xl border border-white/40 shadow-glass p-6 sm:p-10">
              <div className="mb-6 pb-6 border-b border-primary/5">
                <h3 className="font-display text-2xl text-primary">Request an Appointment</h3>
                <p className="text-sm text-primary/50 mt-1">Fields marked * are required</p>
              </div>
              <AppointmentForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}