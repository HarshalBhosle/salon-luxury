import { z } from 'zod'

export const appointmentSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  phone: z.string().min(10, 'Please enter a valid phone number').max(15),
  email: z.string().email('Please enter a valid email address'),
  service: z.string().min(1, 'Please select a service'),
  stylist: z.string().optional(),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  notes: z.string().max(500, 'Notes must be under 500 characters').optional(),
})

export type AppointmentFormValues = z.infer<typeof appointmentSchema>

export const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number').optional().or(z.literal('')),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormValues = z.infer<typeof contactSchema>

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email'),
})

export type NewsletterFormValues = z.infer<typeof newsletterSchema>

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const serviceSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(10, 'Description is required'),
  price: z.coerce.number().min(0, 'Price must be positive'),
  duration: z.coerce.number().min(5, 'Duration must be at least 5'),
  image: z.string().optional(),
})

export type ServiceFormValues = z.infer<typeof serviceSchema>

export const stylistSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  role: z.string().min(2, 'Role is required'),
  experience: z.coerce.number().min(0),
  specialization: z.string().min(1, 'Add at least one specialization'),
  bio: z.string().optional(),
  image: z.string().optional(),
})

export type StylistFormValues = z.infer<typeof stylistSchema>

export const blogSchema = z.object({
  title: z.string().min(5, 'Title is required'),
  category: z.string().min(1),
  excerpt: z.string().min(10, 'Excerpt is required'),
  content: z.string().min(20, 'Content is required'),
  image: z.string().optional(),
  author: z.string().min(2),
  tags: z.string().optional(),
})

export type BlogFormValues = z.infer<typeof blogSchema>

export const appointmentAdminSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  service: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  status: z.string(),
})