import { Helmet } from 'react-helmet-async'
import { Services } from '../components/sections/Services'
import { AppointmentCTA } from '../components/sections/AppointmentCTA'

export function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Our Services | Maison Aurelle Luxury Salon</title>
        <meta name="description" content="Explore our complete catalogue of luxury services — haircuts, hair spa, coloring, keratin, facials, nails, bridal makeup and more." />
      </Helmet>
      <div className="pt-32 pb-8 bg-primary text-center">
        <h1 className="font-display text-5xl sm:text-6xl text-white">Our Services</h1>
        <p className="text-white/50 mt-4 max-w-xl mx-auto px-6">A complete catalogue of luxury rituals crafted for every indulgence.</p>
      </div>
      <Services />
      <AppointmentCTA />
    </>
  )
}