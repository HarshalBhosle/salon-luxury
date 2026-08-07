import { Helmet } from 'react-helmet-async'
import { PageHeader } from '../components/ui/PageHeader'
import { Contact } from '../components/sections/Contact'
import { Faq } from '../components/sections/Faq'

export function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us | Maison Aurelle</title>
        <meta name="description" content="Visit our atelier, call, or send a message. We're here to help you book the perfect experience." />
      </Helmet>
      <PageHeader title="Get in" accent="Touch" description="Visit our atelier, call, or send a message — however you reach out, we're here." tag="Contact" />
      <Contact />
      <Faq />
    </>
  )
}