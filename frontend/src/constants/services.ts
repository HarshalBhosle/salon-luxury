import type { Service, ServiceCategory } from '../types'

export const SERVICE_CATEGORIES: (ServiceCategory | 'All')[] = [
  'All',
  'Hair',
  'Skin',
  'Nails',
  'Makeup',
  'Spa',
  'Men',
  'Kids',
]

export const SERVICES: Service[] = [
  // Hair
  {
    id: 'haircut',
    name: 'Signature Haircut',
    slug: 'signature-haircut',
    category: 'Hair',
    description: 'Precision cut tailored to your face shape, bone structure and lifestyle by a master stylist.',
    price: 40,
    duration: 45,
    benefits: ['Consultation & styling', 'Shampoo & conditioning', 'Finish with premium products'],
    popular: true,
  },
  {
    id: 'hair-spa',
    name: 'Hair Spa Ritual',
    slug: 'hair-spa',
    category: 'Hair',
    description: 'Deep-nourishing scalp therapy that revives dull, stressed hair with steam and essential oils.',
    price: 199,
    duration: 60,
    benefits: ['Deep scalp cleanse', 'Steam therapy', 'Head massage'],
  },
  {
    id: 'hair-coloring',
    name: 'Hair Coloring',
    slug: 'hair-coloring',
    category: 'Hair',
    description: 'Global color, balayage, highlights and creative color with ammonia-free premium pigments.',
    price: 449,
    duration: 120,
    benefits: ['Ammonia-free color', 'Glossy finish', 'Fade-resistant'],
    popular: true,
  },
  {
    id: 'smoothening',
    name: 'Hair Smoothening',
    slug: 'hair-smoothening',
    category: 'Hair',
    description: 'Tame frizz and add mirror-like shine with our frizz-free smoothing treatment.',
    price: 599,
    duration: 150,
    benefits: ['Frizz control', 'Mirror shine', 'Up to 3 months'],
  },
  {
    id: 'straightening',
    name: 'Hair Straightening',
    slug: 'hair-straightening',
    category: 'Hair',
    description: 'Restructure unruly curls into sleek, pin-straight, manageable hair.',
    price: 749,
    duration: 180,
    benefits: ['Sleek finish', 'Long-lasting', 'Reduce styling time'],
  },
  {
    id: 'keratin',
    name: 'Keratin Treatment',
    slug: 'keratin-treatment',
    category: 'Hair',
    description: 'Formaldehyde-free keratin infusion that repairs and fortifies every strand.',
    price: 899,
    duration: 180,
    benefits: ['Repairs damage', 'Humidity resistance', 'Up to 6 months'],
    featured: true,
  },

  // Skin
  {
    id: 'facial',
    name: 'Luxury Facial',
    slug: 'luxury-facial',
    category: 'Skin',
    description: 'Deep-cleansing, rejuvenating and glow-boosting facial tailored to your skin type.',
    price: 349,
    duration: 60,
    benefits: ['Deep cleanse', 'Anti-aging boost', 'Instant glow'],
    popular: true,
  },
  {
    id: 'cleanup',
    name: 'Signature Cleanup',
    slug: 'signature-cleanup',
    category: 'Skin',
    description: 'A quick, refreshing maintenance session to keep your skin clear, bright and balanced.',
    price: 199,
    duration: 40,
    benefits: ['Exfoliation', 'Hydration', 'De-tan'],
  },
  {
    id: 'waxing',
    name: 'Premium Waxing',
    slug: 'premium-waxing',
    category: 'Skin',
    description: 'Gentle, low-pain waxing with vegan wax for silky-smooth, hair-free skin.',
    price: 249,
    duration: 45,
    benefits: ['Low-pain formula', 'Smooth finish', 'Skin soother'],
  },
  {
    id: 'threading',
    name: 'Threading & Shaping',
    slug: 'threading-shaping',
    category: 'Skin',
    description: 'Precise eyebrow and facial threading for a perfectly defined look.',
    price: 99,
    duration: 20,
    benefits: ['Precise shaping', 'Quick & clean', 'Natural finish'],
  },

  // Nails
  {
    id: 'manicure',
    name: 'Luxury Manicure',
    slug: 'luxury-manicure',
    category: 'Nails',
    description: 'Cuticle care, gentle exfoliation and a flawless finish in a calming ritual.',
    price: 149,
    duration: 45,
    benefits: ['Cuticle care', 'Massage', 'High-gloss polish'],
  },
  {
    id: 'pedicure',
    name: 'Luxury Pedicure',
    slug: 'luxury-pedicure',
    category: 'Nails',
    description: 'A restorative foot treatment with soak, scrub, massage and polish.',
    price: 199,
    duration: 60,
    benefits: ['Soothing soak', 'Foot massage', 'Sterilized tools'],
    popular: true,
  },
  {
    id: 'nail-art',
    name: 'Nail Art Studio',
    slug: 'nail-art',
    category: 'Nails',
    description: 'Custom gel designs, 3D art, chrome and French tips by our nail artists.',
    price: 299,
    duration: 75,
    benefits: ['Custom design', 'Long-lasting gel', 'Trend-forward'],
    featured: true,
  },

  // Makeup
  {
    id: 'bridal-makeup',
    name: 'Bridal Makeup',
    slug: 'bridal-makeup',
    category: 'Makeup',
    description: 'HD photography-ready bridal looks with lasting, radiant long-wear products.',
    price: 1499,
    duration: 120,
    benefits: ['HD finish', 'Photography-proof', 'Long-wear 12h+'],
    featured: true,
    popular: true,
  },
  {
    id: 'party-makeup',
    name: 'Party Makeup',
    slug: 'party-makeup',
    category: 'Makeup',
    description: 'Glamorous occasion makeup designed to glow under any light.',
    price: 599,
    duration: 60,
    benefits: ['Glam finish', 'Smudge-proof', 'On-trend'],
  },
  {
    id: 'groom-makeup',
    name: 'Groom Makeup',
    slug: 'groom-makeup',
    category: 'Makeup',
    description: 'Subtle, natural-looking skin perfection for picture-perfect groom photos.',
    price: 399,
    duration: 45,
    benefits: ['Natural finish', 'HD ready', 'Skincare prep'],
  },

  // Spa
  {
    id: 'massage',
    name: 'Therapy Massage',
    slug: 'therapy-massage',
    category: 'Spa',
    description: 'Full-body relaxation massage with warm oils to melt away tension.',
    price: 449,
    duration: 60,
    benefits: ['Relaxes muscles', 'Warm oils', 'Deep relaxation'],
    featured: true,
  },
  {
    id: 'head-massage',
    name: 'Head Massage',
    slug: 'head-massage',
    category: 'Spa',
    description: 'A royal 30-minute therapeutic head, neck and shoulder massage.',
    price: 149,
    duration: 30,
    benefits: ['Relieves stress', 'Boosts circulation', 'Improves sleep'],
    popular: true,
  },

  // Men
  {
    id: 'beard-styling',
    name: 'Beard Styling',
    slug: 'beard-styling',
    category: 'Men',
    description: 'Precision beard shape, trim and conditioning for a sharp, defined look.',
    price: 199,
    duration: 30,
    benefits: ['Precision trim', 'Steam relaxation', 'Beard oils'],
    popular: true,
  },
  {
    id: 'shaving',
    name: 'Royal Shave',
    slug: 'royal-shave',
    category: 'Men',
    description: 'Traditional hot-towel straight razor shave for the closest possible finish.',
    price: 149,
    duration: 30,
    benefits: ['Hot towel prep', 'Straight razor', 'Cooling balm'],
  },

  // Kids
  {
    id: 'kids-haircut',
    name: 'Kids Haircut',
    slug: 'kids-haircut',
    category: 'Kids',
    description: 'A fun, patient, gentle haircut experience your little one will love.',
    price: 99,
    duration: 30,
    benefits: ['Child-friendly', 'Patient stylists', 'Treat included'],
  },
]

export type NoticeCategory = import('../types').ServiceCategory | 'All'

export const CATEGORY_META: Record<NoticeCategory, { label: string; blurb: string }> = {
  All: { label: 'All Services', blurb: 'Explore our complete catalogue of luxury treatments' },
  Hair: { label: 'Hair Studio', blurb: 'Cuts, color, spa and transformative treatments' },
  Skin: { label: 'Skin & Facial', blurb: 'Advanced skincare rituals for radiant skin' },
  Nails: { label: 'Nail Studio', blurb: 'Manicure, pedicure and bespoke nail art' },
  Makeup: { label: 'Makeup Atelier', blurb: 'Bridal, party and groom perfection' },
  Spa: { label: 'Spa & Massage', blurb: 'Therapeutic rituals for body and mind' },
  Men: { label: `Men's Grooming`, blurb: 'Beard, shave and exclusive men\'s rituals' },
  Kids: { label: 'Kids Salon', blurb: 'Gentle care for the youngest clients' },
}

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}

export function getRelatedServices(slug: string, limit = 3): Service[] {
  const current = getServiceBySlug(slug)
  if (!current) return SERVICES.slice(0, limit)
  return SERVICES.filter((s) => s.category === current.category && s.id !== current.id).slice(0, limit)
}

export const popularServices = SERVICES.filter((s) => s.popular)
export const featuredServices = SERVICES.filter((s) => s.featured)