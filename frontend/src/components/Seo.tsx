import { Helmet } from 'react-helmet-async'

interface SeoProps {
  title?: string
  description?: string
  image?: string
  type?: string
  jsonLd?: object
  pathname?: string
}

export function Seo({
  title,
  description,
  image = '/og-image.jpg',
  type = 'website',
  jsonLd,
  pathname = '/',
}: SeoProps) {
  const siteTitle = title ? `${title} | Maison Aurelle` : 'Maison Aurelle | Luxury Hair & Beauty Salon'
  const desc =
    description ||
    'Experience world-class luxury hair, skin and beauty services. Master stylists, premium products and an unforgettable experience.'
  const url = `https://maisonaurelle.com${pathname}`

  return (
    <Helmet>
      <title>{title ? `${title} | Maison Aurelle` : 'Maison Aurelle | Luxury Hair & Beauty Salon'}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Maison Aurelie" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}

export default Seo