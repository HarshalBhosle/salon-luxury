import asyncHandler from '../utils/asyncHandler.js'
import Service from '../models/Service.js'
import Stylist from '../models/Stylist.js'
import Appointment from '../models/Appointment.js'
import ContactMessage from '../models/ContactMessage.js'
import Gallery from '../models/Gallery.js'
import Testimonial from '../models/Testimonial.js'
import Faq from '../models/Faq.js'
import Blog from '../models/Blog.js'
import Newsletter from '../models/Newsletter.js'
import { ApiError } from '../middleware/errorHandler.js'

// ---------- Dashboard Stats ----------
export const getStats = asyncHandler(async (req, res) => {
  const [
    totalServices,
    totalStylists,
    totalAppointments,
    pendingAppointments,
    totalMessages,
    unreadMessages,
    totalBlogPosts,
    totalSubscribers,
    recentAppointments,
  ] = await Promise.all([
    Service.countDocuments(),
    Stylist.countDocuments(),
    Appointment.countDocuments(),
    Appointment.countDocuments({ status: 'pending' }),
    ContactMessage.countDocuments(),
    ContactMessage.countDocuments({ read: false }),
    Blog.countDocuments(),
    Newsletter.countDocuments(),
    Appointment.find().sort({ createdAt: -1 }).limit(5).lean(),
  ])

  res.json({
    success: true,
    data: {
      totalServices,
      totalStylists,
      totalAppointments,
      pendingAppointments,
      totalMessages,
      unreadMessages,
      totalBlogPosts,
      totalClients: totalSubscribers + totalAppointments,
      recentAppointments,
    },
  })
})

// ---------- Generic CRUD factory ----------
function crud(resource) {
  return {
    list: asyncHandler(async (req, res) => {
      const items = await resource.find().sort({ createdAt: -1 }).lean()
      res.json({ success: true, data: items })
    }),
    create: asyncHandler(async (req, res) => {
      const item = await resource.create(req.body)
      res.status(201).json({ success: true, data: item })
    }),
    update: asyncHandler(async (req, res) => {
      const item = await resource.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })
      if (!item) throw new ApiError(404, 'Item not found')
      res.json({ success: true, data: item })
    }),
    remove: asyncHandler(async (req, res) => {
      const item = await resource.findByIdAndDelete(req.params.id)
      if (!item) throw new ApiError(404, 'Item not found')
      res.json({ success: true, data: { deleted: true } })
    }),
  }
}

export const servicesCrud = crud(Service)
export const stylistsCrud = crud(Stylist)
export const testimonialsCrud = crud(Testimonial)
export const faqsCrud = crud(Faq)
export const blogsCrud = crud(Blog)
export const galleryCrud = crud(Gallery)

// ---------- Appointments ----------
export const listAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find().sort({ createdAt: -1 }).lean()
  res.json({ success: true, data: appointments })
})

export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { status } = req.body
  if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
    throw new ApiError(400, 'Invalid status')
  }
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true },
  )
  if (!appointment) throw new ApiError(404, 'Appointment not found')
  res.json({ success: true, data: appointment })
})

export const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id)
  if (!appointment) throw new ApiError(404, 'Appointment not found')
  res.json({ success: true, data: { deleted: true } })
})

// ---------- Messages ----------
export const listMessages = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean()
  res.json({ success: true, data: messages })
})

export const markMessageRead = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true },
  )
  if (!message) throw new ApiError(404, 'Message not found')
  res.json({ success: true, data: message })
})

export const deleteMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByIdAndDelete(req.params.id)
  if (!message) throw new ApiError(404, 'Message not found')
  res.json({ success: true, data: { deleted: true } })
})