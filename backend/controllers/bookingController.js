import asyncHandler from '../utils/asyncHandler.js'
import Appointment from '../models/Appointment.js'
import ContactMessage from '../models/ContactMessage.js'
import Newsletter from '../models/Newsletter.js'
import { sendAppointmentEmail, sendContactEmail } from '../services/emailService.js'

export const createAppointment = asyncHandler(async (req, res) => {
  const { name, phone, email, service, stylist, date, time, notes } = req.body

  if (!name || !phone || !email || !service || !date || !time) {
    return res.status(400).json({
      success: false,
      message: 'Name, phone, email, service, date and time are required',
    })
  }

  const appointment = await Appointment.create({
    name,
    phone,
    email,
    service,
    stylist: stylist || '',
    date,
    time,
    notes: notes || '',
    status: 'pending',
  })

  sendAppointmentEmail(appointment).catch(() => {})

  res.status(201).json({ success: true, data: appointment })
})

export const createContactMessage = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email and message are required',
    })
  }

  const contact = await ContactMessage.create({
    name,
    email,
    phone: phone || '',
    subject: subject || '',
    message,
  })

  sendContactEmail(contact).catch(() => {})

  res.status(201).json({ success: true, data: contact })
})

export const subscribeNewsletter = asyncHandler(async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' })
  }

  const existing = await Newsletter.findOne({ email })
  if (existing) {
    return res.json({ success: true, data: { subscribed: true, already: true } })
  }

  await Newsletter.create({ email })
  res.status(201).json({ success: true, data: { subscribed: true } })
})