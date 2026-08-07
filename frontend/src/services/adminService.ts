import { adminApi } from '../api/client'
import type {
  Appointment,
  BlogPost,
  ContactMessage,
  DashboardStats,
  Faq,
  GalleryItem,
  Service,
  Stylist,
  Testimonial,
} from '../types'

export const adminService = {
  login: (email: string, password: string) =>
    adminApi.post<{ token: string; user: unknown }>('/auth/login', { email, password }),

  getStats: () => adminApi.get<DashboardStats>('/admin/stats'),

  // Services
  getServices: () => adminApi.get<Service[]>('/admin/services'),
  createService: (data: Partial<Service>) => adminApi.post<Service>('/admin/services', data),
  updateService: (id: string, data: Partial<Service>) => adminApi.put<Service>(`/admin/services/${id}`, data),
  deleteService: (id: string) => adminApi.del<{ deleted: boolean }>(`/admin/services/${id}`),

  // Stylists
  getStylists: () => adminApi.get<Stylist[]>('/admin/stylists'),
  createStylist: (data: Partial<Stylist>) => adminApi.post<Stylist>('/admin/stylists', data),
  updateStylist: (id: string, data: Partial<Stylist>) => adminApi.put<Stylist>(`/admin/stylists/${id}`, data),
  deleteStylist: (id: string) => adminApi.del<{ deleted: boolean }>(`/admin/stylists/${id}`),

  // Appointments
  getAppointments: () => adminApi.get<Appointment[]>('/admin/appointments'),
  updateAppointmentStatus: (id: string, status: Appointment['status']) =>
    adminApi.put<Appointment>(`/admin/appointments/${id}`, { status }),
  deleteAppointment: (id: string) => adminApi.del<{ deleted: boolean }>(`/admin/appointments/${id}`),

  // Messages
  getMessages: () => adminApi.get<ContactMessage[]>('/admin/messages'),
  markMessageRead: (id: string) => adminApi.put<ContactMessage>(`/admin/messages/${id}`, { read: true }),
  deleteMessage: (id: string) => adminApi.del<{ deleted: boolean }>(`/admin/messages/${id}`),

  // Gallery
  getGallery: () => adminApi.get<GalleryItem[]>('/admin/gallery'),
  uploadImage: (data: FormData) => adminApi.post<GalleryItem>('/admin/gallery', data),
  deleteImage: (id: string) => adminApi.del<{ deleted: boolean }>(`/admin/gallery/${id}`),

  // Blog
  getBlogPosts: () => adminApi.get<BlogPost[]>('/admin/blogs'),
  createBlogPost: (data: Partial<BlogPost>) => adminApi.post<BlogPost>('/admin/blogs', data),
  updateBlogPost: (id: string, data: Partial<BlogPost>) => adminApi.put<BlogPost>(`/admin/blogs/${id}`, data),
  deleteBlogPost: (id: string) => adminApi.del<{ deleted: boolean }>(`/admin/blogs/${id}`),

  // Testimonials
  getTestimonials: () => adminApi.get<Testimonial[]>('/admin/testimonials'),
  createTestimonial: (data: Partial<Testimonial>) => adminApi.post<Testimonial>('/admin/testimonials', data),
  deleteTestimonial: (id: string) => adminApi.del<{ deleted: boolean }>(`/admin/testimonials/${id}`),

  // FAQs
  getFaqs: () => adminApi.get<Faq[]>('/admin/faqs'),
  createFaq: (data: Partial<Faq>) => adminApi.post<Faq>('/admin/faqs', data),
  updateFaq: (id: string, data: Partial<Faq>) => adminApi.put<Faq>(`/admin/faqs/${id}`, data),
  deleteFaq: (id: string) => adminApi.del<{ deleted: boolean }>(`/admin/faqs/${id}`),
}