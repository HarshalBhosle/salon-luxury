import { publicApi } from '../api/client'
import type { BlogPost, Faq, GalleryItem, Service, Stylist, Testimonial } from '../types'

export const contentApi = {
  getServices: () => publicApi.get<Service[]>('/services'),
  getService: (slug: string) => publicApi.get<Service>(`/services/${slug}`),
  getStylists: () => publicApi.get<Stylist[]>('/stylists'),
  getGallery: () => publicApi.get<GalleryItem[]>('/gallery'),
  getTestimonials: () => publicApi.get<Testimonial[]>('/testimonials'),
  getFaqs: () => publicApi.get<Faq[]>('/faqs'),
  getBlogPosts: () => publicApi.get<BlogPost[]>('/blogs'),
  getBlogPost: (slug: string) => publicApi.get<BlogPost>(`/blogs/${slug}`),
}