import type { GalleryItem } from '../types'

export const GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    image: '/images/gallery/g1.jpg',
    alt: 'Balayage hair coloring result',
    category: 'Hair',
    featured: true,
  },
  {
    id: 'g2',
    image: '/images/gallery/g2.jpg',
    alt: 'Bridal makeup look',
    category: 'Makeup',
  },
  {
    id: 'g3',
    image: '/images/gallery/g3.jpg',
    alt: 'Luxury nail art design',
    category: 'Nails',
  },
  {
    id: 'g4',
    image: '/images/gallery/g4.jpg',
    alt: 'Salon interior with elegant styling chairs',
    category: 'Interior',
  },
  {
    id: 'g5',
    image: '/images/gallery/g5.jpg',
    alt: 'Keratin treatment before and after',
    category: 'BeforeAfter',
    before: '/images/gallery/before1.jpg',
    after: '/images/gallery/after1.jpg',
    featured: true,
  },
  {
    id: 'g6',
    image: '/images/gallery/g6.jpg',
    alt: 'Sleek hair smoothening result',
    category: 'Hair',
  },
  {
    id: 'g7',
    image: '/images/gallery/g7.jpg',
    alt: 'Party makeup glam look',
    category: 'Makeup',
  },
  {
    id: 'g8',
    image: '/images/gallery/g8.jpg',
    alt: 'Elegant pedicure experience',
    category: 'Nails',
  },
  {
    id: 'g9',
    image: '/images/gallery/g9.jpg',
    alt: 'Relaxation massage suite',
    category: 'Interior',
  },
  {
    id: 'g10',
    image: '/images/gallery/g10.jpg',
    alt: 'Hair spa ritual experience',
    category: 'Hair',
  },
  {
    id: 'g11',
    image: '/images/gallery/g11.jpg',
    alt: 'Creative color hair art',
    category: 'Hair',
  },
  {
    id: 'g12',
    image: '/images/gallery/g12.jpg',
    alt: 'Groom makeup natural finish',
    category: 'Makeup',
  },
]

export const GALLERY_CATEGORIES = ['All', 'Hair', 'Makeup', 'Nails', 'Interior', 'BeforeAfter'] as const