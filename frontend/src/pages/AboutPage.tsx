import { Helmet } from 'react-helmet-async'
import { PageHeader } from '../components/ui/PageHeader'
import { About } from '../components/sections/About'
import { Testimonials } from '../components/sections/Testimonials'
import { WhyChooseUs } from '../components/sections/WhyChooseUs'

export function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | Maison Aurelle Luxury Salon</title>
        <meta name="description" content="Discover the story, mission and values behind Maison Aurelle — fifteen years of luxury hair and beauty artistry." />
      </Helmet>
      <PageHeader title="Our Story" accent="A Legacy of Beauty" description="Fifteen years of artistry, integrity and an uncompromising pursuit of perfection." tag="About Us" />
      <About />
      <WhyChooseUs />
      <Testimonials />
    </>
  )
}