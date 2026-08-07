import { Helmet } from 'react-helmet-async'
import { SITE } from '../constants/site'
import { Hero } from '../components/sections/Hero'
import { Brands } from '../components/sections/Brands'
import { About } from '../components/sections/About'
import { WhyChooseUs } from '../components/sections/WhyChooseUs'
import { Services } from '../components/sections/Services'
import { SalonInterior } from '../components/sections/SalonInterior'
import { Stylists } from '../components/sections/Stylists'
import { Gallery } from '../components/sections/Gallery'
import { Testimonials } from '../components/sections/Testimonials'
import { Pricing } from '../components/sections/Pricing'
import { Blog } from '../components/sections/Blog'
import { Faq } from '../components/sections/Faq'
import { AppointmentCTA } from '../components/sections/AppointmentCTA'
import { Contact } from '../components/sections/Contact'

export function HomePage() {
  return (
    <>
<Helmet>
        <title>Maison Aurelle | Luxury Hair & Beauty Salon</title>
        <meta name="description" content="Experience world-class luxury hair, skin and beauty services. Master stylists, premium products and an unforgettable experience." />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BeautySalon',
            name: 'Maison Aurelle',
            description: 'Luxury hair & beauty salon offering premium services.',
            telephone: SITE.phone,
            email: SITE.email,
            address: { '@type': 'PostalAddress', streetAddress: SITE.address },
            openingHours: SITE.openingHours.map((o) => `${o.day} ${o.time}`),
            aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '12000' },
            priceRange: '$$$',
          })}
        </script>
      </Helmet>
      <Hero />
      <Brands />
      <About />
      <WhyChooseUs />
      <Services />
      <Gallery />
      <SalonInterior />
      <Stylists />
      <Testimonials />
      <Pricing />
      <Blog />
      <Faq />
      <AppointmentCTA />
      <Contact />
    </>
  )
}