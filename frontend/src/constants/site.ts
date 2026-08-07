import type { NavItem, Statistics } from '../types'

export const SITE = {
  name: 'Maison Aurelle',
  tagline: 'Luxury Hair & Beauty Salon',
  phone: '+1 (555) 012-3456',
  whatsapp: '+15550123456',
  email: 'hello@maisonaurelle.com',
  address: '128 Rodeo Drive, Beverly Hills, CA 90210',
  instagram: 'https://instagram.com/maisonaurelle',
  facebook: 'https://facebook.com/maisonaurelle',
  twitter: 'https://twitter.com/maisonaurelle',
  mapsQuery: 'Beverly+Hills+Los+Angeles',
  openingHours: [
    { day: 'Monday – Friday', time: '9:00 AM – 8:00 PM' },
    { day: 'Saturday', time: '9:00 AM – 9:00 PM' },
    { day: 'Sunday', time: '10:00 AM – 6:00 PM' },
  ],
}

export const STATISTICS: Statistics = {
  yearsExperience: 15,
  happyClients: 12000,
  professionalStylists: 32,
  googleRating: 4.9,
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    href: '/#home',
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Hair Services', description: 'Cuts, color, spa & treatments', href: '/services#hair' },
      { label: 'Skin & Facial', description: 'Advanced skincare rituals', href: '/services#skin' },
      { label: 'Makeup', description: 'Bridal, party & groom', href: '/services#makeup' },
      { label: 'Nail Studio', description: 'Manicure, pedicure & art', href: '/services#nails' },
      { label: 'Spa & Massage', description: 'Head & full-body therapies', href: '/services#spa' },
      { label: 'Men\'s Grooming', description: 'Beard & clean shave', href: '/services#men' },
    ],
  },
  {
    label: 'Gallery',
    href: '/gallery',
  },
  {
    label: 'Stylists',
    href: '/stylists',
  },
  {
    label: 'Pricing',
    href: '/pricing',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
]

export const BRANDS = [
  'L\'Oreal',
  'Kérastase',
  'Shu Uemura',
  'Olaplex',
  'Redken',
  'Moroccanoil',
  'Erica',
  'Kérastin',
  'Wella',
  'Davines',
]