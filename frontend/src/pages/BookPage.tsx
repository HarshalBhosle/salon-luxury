import { Helmet } from 'react-helmet-async'
import { PageHeader } from '../components/ui/PageHeader'
import { AppointmentForm } from '../components/forms/AppointmentForm'
import { Reveal } from '../components/animations/Reveal'
import { SITE } from '../constants/site'
import { Phone, Clock, MapPin } from 'lucide-react'

export function BookPage() {
  return (
    <>
      <Helmet>
        <title>Book Appointment | Maison Aurelle</title>
        <meta name="description" content="Book your appointment at Maison Aurelle — choose your service, date and time and our concierge will confirm shortly." />
      </Helmet>
      <PageHeader title="Book Your" accent="Appointment" description="Complete the form and our concierge will confirm your appointment within the hour." tag="Reserve" />

      <div className="section-container py-16 sm:py-24">
        <div className="grid lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <Reveal className="lg:col-span-2">
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-primary/5 shadow-glass p-6 sm:p-10">
              <AppointmentForm />
            </div>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.1}>
              <div className="rounded-2xl bg-primary text-white p-7">
                <h3 className="font-display text-2xl mb-5">Prefer to call?</h3>
                <div className="space-y-4 text-sm text-white/70">
                  <p className="flex items-center gap-3"><Phone className="w-4 h-4 text-secondary" /> {SITE.phone}</p>
                  <p className="flex items-center gap-3"><MapPin className="w-4 h-4 text-secondary" /> {SITE.address}</p>
                  <p className="flex items-center gap-3"><Clock className="w-4 h-4 text-secondary" /> Mon–Sun, 9 AM – 9 PM</p>
                </div>
                <a href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`} className="btn-gold w-full inline-flex items-center justify-center mt-6">
                  Call Now
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-7">
                <h4 className="font-heading text-primary font-semibold mb-2">Good to know</h4>
                <ul className="text-sm text-primary/60 space-y-2">
                  <li>• We confirm every booking personally</li>
                  <li>• Please arrive 10 minutes early</li>
                  <li>• Free consultation included</li>
                  <li>• Reschedule up to 24h before</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  )
}