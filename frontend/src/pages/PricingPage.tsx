import { Helmet } from 'react-helmet-async'
import { PageHeader } from '../components/ui/PageHeader'
import { Pricing } from '../components/sections/Pricing'
import { Faq } from '../components/sections/Faq'

export function PricingPage() {
  return (
    <>
      <Helmet>
        <title>Pricing & Membership | Maison Aurelle</title>
        <meta name="description" content="Transparent luxury pricing, wedding collections, current offers and Aurelle memberships." />
      </Helmet>
      <PageHeader title="Pricing &" accent="Membership Plans" description="Premium service, honest pricing, and exclusive privileges for our most valued guests." tag="Pricing" />
      <Pricing />
      <Faq />
    </>
  )
}