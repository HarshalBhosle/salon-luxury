export interface Service {
  _id?: string
  id: string
  name: string
  slug: string
  description: string
  category: ServiceCategory
  price: number
  duration: number
  image?: string
  featured?: boolean
  popular?: boolean
  benefits: string[]
  createdAt?: string
}

export type ServiceCategory =
  | 'Hair'
  | 'Skin'
  | 'Nails'
  | 'Makeup'
  | 'Spa'
  | 'Men'
  | 'Kids'

export interface Stylist {
  _id?: string
  id: string
  name: string
  role: string
  experience: number
  specialization: string[]
  awards: string[]
  image?: string
  socials: { instagram?: string; facebook?: string; twitter?: string }
  bio?: string
  featured?: boolean
}

export interface Testimonial {
  _id?: string
  id: string
  name: string
  avatar?: string
  rating: number
  service: string
  content: string
  date?: string
}

export interface GalleryItem {
  _id?: string
  id: string
  image: string
  alt: string
  category: 'Hair' | 'Makeup' | 'Nails' | 'Interior' | 'BeforeAfter'
  before?: string
  after?: string
  featured?: boolean
}

export interface BlogPost {
  _id?: string
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image?: string
  category: 'Hair Care' | 'Skin Care' | 'Trends' | 'Tips'
  author: string
  tags: string[]
  readTime: number
  publishedAt: string
  featured?: boolean
}

export interface Faq {
  _id?: string
  id: string
  question: string
  answer: string
  category?: string
  order?: number
}

export interface Offer {
  _id?: string
  id: string
  title: string
  description: string
  discount: number
  validUntil: string
  code?: string
  featured?: boolean
}

export interface MembershipPlan {
  id: string
  name: string
  price: number
  period: 'monthly' | 'yearly'
  features: string[]
  popular?: boolean
}

export interface Appointment {
  _id?: string
  name: string
  phone: string
  email: string
  service: string
  stylist?: string
  date: string
  time: string
  notes?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt?: string
}

export interface ContactMessage {
  _id?: string
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  read?: boolean
  createdAt?: string
}

export interface Statistics {
  yearsExperience: number
  happyClients: number
  professionalStylists: number
  googleRating: number
}

export interface NavItem {
  label: string
  href: string
  children?: { label: string; description: string; href: string }[]
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  total?: number
  page?: number
  pages?: number
}

export interface AuthResponse {
  token: string
  user: AdminUser
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor'
}

export interface DashboardStats {
  totalServices: number
  totalStylists: number
  totalAppointments: number
  pendingAppointments: number
  totalMessages: number
  unreadMessages: number
  totalBlogPosts: number
  totalClients: number
  recentAppointments: Appointment[]
}
