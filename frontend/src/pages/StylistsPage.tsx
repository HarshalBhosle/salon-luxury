import { Helmet } from 'react-helmet-async'
import { PageHeader } from '../components/ui/PageHeader'
import { Stylists } from '../components/sections/Stylists'
import { Testimonials } from '../components/sections/Testimonials'

export function StylistsPage() {
  return (
    <>
      <Helmet>
        <title>Our Stylists | Maison Aurelle</title>
        <meta name="description" content="Meet the award-winning artists behind Maison Aurelle — internationally trained hair, makeup and spa specialists." />
      </Helmet>
      <PageHeader title="Meet Our" accent="Master Stylists" description="A collective of internationally trained artists devoted to your beauty." tag="The Team" />
      <Stylists />
      <Testimonials />
    </>
  )
}