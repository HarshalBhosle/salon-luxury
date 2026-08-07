import nodemailer from 'nodemailer'
import config from '../config/index.js'

const transporter = nodemailer.createTransport({
  host: config.SMTP.host,
  port: config.SMTP.port,
  secure: false,
  auth: config.SMTP.user
    ? { user: config.SMTP.user, pass: config.SMTP.pass }
    : undefined,
})

const from = config.SMTP.user || 'no-reply@maisonaurelle.com'

export async function sendAppointmentEmail(appointment) {
  await transporter.sendMail({
    from,
    to: config.ADMIN_EMAIL,
    subject: `New Appointment Request: ${appointment.name}`,
    html: `
      <h2>New Appointment Request</h2>
      <p><strong>Name:</strong> ${appointment.name}</p>
      <p><strong>Phone:</strong> ${appointment.phone}</p>
      <p><strong>Email:</strong> ${appointment.email}</p>
      <p><strong>Service:</strong> ${appointment.service}</p>
      <p><strong>Stylist:</strong> ${appointment.stylist || 'Any'}</p>
      <p><strong>Date:</strong> ${appointment.date}</p>
      <p><strong>Time:</strong> ${appointment.time}</p>
      ${appointment.notes ? `<p><strong>Notes:</strong> ${appointment.notes}</p>` : ''}
    `,
  })
}

export async function sendContactEmail(contact) {
  await transporter.sendMail({
    from,
    to: config.ADMIN_EMAIL,
    subject: `New Contact Message from ${contact.name}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      ${contact.phone ? `<p><strong>Phone:</strong> ${contact.phone}</p>` : ''}
      ${contact.subject ? `<p><strong>Subject:</strong> ${contact.subject}</p>` : ''}
      <p style="white-space:pre-wrap"><strong>Message:</strong> ${contact.message}</p>
    `,
  })
}