import type { Offer, MembershipPlan } from '../types'

export const OFFERS: Offer[] = [
  {
    id: 'o1',
    title: 'Bridal Glow Package',
    description: 'Signature facial, hair spa, luxury manicure & pedicure — one complete ritual.',
    discount: 15,
    validUntil: '2026-12-31',
    code: 'BRIDAL15',
    featured: true,
  },
  {
    id: 'o2',
    title: 'Couple\'s Retreat',
    description: 'Two therapy massages + two signature haircuts for the ultimate together experience.',
    discount: 20,
    validUntil: '2026-12-31',
    code: 'COUPLE20',
  },
  {
    id: 'o3',
    title: 'Keratin & Color Combo',
    description: 'Full keratin treatment paired with global color at a members-preference price.',
    discount: 10,
    validUntil: '2026-09-30',
    code: 'KERATIN10',
  },
  {
    id: 'o4',
    title: 'First Visit Welcome',
    description: 'A complimentary signature cleanup with your first hair or facial session.',
    discount: 25,
    validUntil: '2026-08-31',
    code: 'WELCOME25',
  },
]

export const WEDDING_PACKAGES = [
  {
    id: 'w1',
    name: 'The Bride',
    description: 'A complete bridal journey — consultations, trial, HD makeup, hairstyling, facial, manicure, pedicure & draping.',
    price: 4999,
    inclusions: ['Bridal makeup & hair', 'Trial session', 'Luxury facial', 'Mani + pedi', 'Touch-up kit'],
    popular: true,
  },
  {
    id: 'w2',
    name: 'The Groom',
    description: 'Sharp, dapper and effortlessly confident for your big day.',
    price: 2499,
    inclusions: ['Groom makeup', 'Signature haircut', 'Beard styling', 'Royal shave', 'Skin ritual'],
  },
  {
    id: 'w3',
    name: 'The Family',
    description: 'The entire bridal party, styled beautifully and efficiently together.',
    price: 9999,
    inclusions: ['4 bridesmaids', 'Makeup & hair', 'Mani + pedi', 'Group styling suite', 'Priority booking'],
  },
]

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'm1',
    name: 'Aurelle Signature',
    price: 349,
    period: 'monthly',
    features: ['Monthly luxury facial', '15% off all services', 'Priority booking', 'Free head massage', 'Exclusive offers'],
    popular: true,
  },
  {
    id: 'm2',
    name: 'Aurelle Platinum',
    price: 649,
    period: 'monthly',
    features: ['Monthly hair spa', '2 facials / month', '25% off all services', 'VIP lounge access', 'Priority booking', 'Free product refresh'],
  },
  {
    id: 'm3',
    name: 'Aurelle Elite',
    price: 1200,
    period: 'monthly',
    features: ['Unlimited services', '40% off premium range', 'Personal stylist', 'Annual gift', '24/7 concierge'],
  },
]

export const PRICE_LIST = [
  { category: 'Hair', items: [
    { name: 'Signature Haircut', price: 40 },
    { name: 'Hair Spa Ritual', price: 199 },
    { name: 'Hair Coloring', price: 449 },
    { name: 'Hair Smoothening', price: 599 },
    { name: 'Hair Straightening', price: 749 },
    { name: 'Keratin Treatment', price: 899 },
  ]},
  { category: 'Skin', items: [
    { name: 'Luxury Facial', price: 349 },
    { name: 'Signature Cleanup', price: 199 },
    { name: 'Premium Waxing', price: 249 },
    { name: 'Threading & Shaping', price: 99 },
  ]},
  { category: 'Nails', items: [
    { name: 'Luxury Manicure', price: 149 },
    { name: 'Luxury Pedicure', price: 199 },
    { name: 'Nail Art Studio', price: 299 },
  ]},
  { category: 'Makeup', items: [
    { name: 'Bridal Makeup', price: 1499 },
    { name: 'Party Makeup', price: 599 },
    { name: 'Groom Makeup', price: 399 },
  ]},
  { category: 'Spa', items: [
    { name: 'Therapy Massage', price: 449 },
    { name: 'Head Massage', price: 149 },
  ]},
  { category: 'Men & Kids', items: [
    { name: 'Beard Styling', price: 199 },
    { name: 'Royal Shave', price: 149 },
    { name: 'Kids Haircut', price: 99 },
  ]},
]