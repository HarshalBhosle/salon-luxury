import asyncHandler from '../utils/asyncHandler.js'
import Service from '../models/Service.js'
import Stylist from '../models/Stylist.js'
import Gallery from '../models/Gallery.js'
import Testimonial from '../models/Testimonial.js'
import Faq from '../models/Faq.js'
import Blog from '../models/Blog.js'
import { ApiError } from '../middleware/errorHandler.js'

export const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ price: 1 }).lean()
  res.json({ success: true, data: services })
})

export const getServiceBySlug = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug }).lean()
  if (!service) throw new ApiError(404, 'Service not found')
  res.json({ success: true, data: service })
})

export const getStylists = asyncHandler(async (req, res) => {
  const stylists = await Stylist.find().sort({ featured: -1 }).lean()
  res.json({ success: true, data: stylists })
})

export const getGallery = asyncHandler(async (req, res) => {
  const gallery = await Gallery.find().sort({ featured: -1 }).lean()
  res.json({ success: true, data: gallery })
})

export const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 }).lean()
  res.json({ success: true, data: testimonials })
})

export const getFaqs = asyncHandler(async (req, res) => {
  const faqs = await Faq.find().sort({ order: 1 }).lean()
  res.json({ success: true, data: faqs })
})

export const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().sort({ publishedAt: -1 }).lean()
  res.json({ success: true, data: blogs })
})

export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug }).lean()
  if (!blog) throw new ApiError(404, 'Blog post not found')
  res.json({ success: true, data: blog })
})