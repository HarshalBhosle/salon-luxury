import type { Faq } from '../types'

export const FAQS: Faq[] = [
  {
    id: 'f1',
    question: 'Do I need to book an appointment in advance?',
    answer: 'We highly recommend booking in advance to secure your preferred stylist and time, especially for bridal makeup and keratin treatments. Walk-ins are welcome when availability allows.',
    category: 'Booking',
  },
  {
    id: 'f2',
    question: 'How do I book an appointment?',
    answer: 'You can book online through our appointment form, call us directly, or message us on WhatsApp. Our team confirms every booking personally.',
    category: 'Booking',
  },
  {
    id: 'f3',
    question: 'What is your cancellation policy?',
    answer: 'We kindly ask for at least 24 hours\' notice if you need to reschedule or cancel. This allows us to offer the slot to another guest.',
    category: 'Booking',
  },
  {
    id: 'f4',
    question: 'Which premium products do you use?',
    answer: 'We exclusively use professional-grade products from brands like Kérastase, Olaplex, L\'Oreal, and Moroccanoil for hair, and medical-grade skincare lines.',
    category: 'Services',
  },
  {
    id: 'f5',
    question: 'How long does bridal makeup take?',
    answer: 'A full bridal makeup and hair session takes approximately 2–3 hours, including skincare prep and a trial session arranged beforehand.',
    category: 'Services',
  },
  {
    id: 'f6',
    question: 'Is your salon accessible?',
    answer: 'Yes, our salon is fully wheelchair accessible with step-free entry and spacious styling suites designed for comfort.',
    category: 'General',
  },
  {
    id: 'f7',
    question: 'Do you offer memberships?',
    answer: 'Yes, we offer Aurelle Signature, Platinum and Elite memberships with exclusive discounts, priority booking and monthly rituals.',
    category: 'Pricing',
  },
  {
    id: 'f8',
    question: 'Are your products hygiene-tested?',
    answer: 'Absolutely. We follow strict hygiene protocols, sterilize all tools, and use single-use disposables where required.',
    category: 'Services',
  },
]

export const FAQ_CATEGORIES = ['All', 'Booking', 'Services', 'Pricing', 'General'] as const