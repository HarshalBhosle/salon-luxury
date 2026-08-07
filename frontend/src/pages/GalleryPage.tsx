import { Helmet } from 'react-helmet-async'
import { PageHeader } from '../components/ui/PageHeader'
import { Gallery } from '../components/sections/Gallery'
import { AppointmentCTA } from '../components/sections/AppointmentCTA'

export function GalleryPage() {
  return (
    <>
      <Helmet>
        <title>Gallery | Maison Aurelle</title>
        <meta name="description" content="Browse our portfolio of hair, makeup, nail and salon transformations." />
      </Helmet>
      <PageHeader title="Our Gallery" accent="Artistry in Motion" description="A glimpse into the transformations, looks and spaces that define Maison Aurelle." tag="Portfolio" />
      <Gallery />
      <AppointmentCTA />
    </>
  )
}