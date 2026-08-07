import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import {
  getStats,
  servicesCrud,
  stylistsCrud,
  testimonialsCrud,
  faqsCrud,
  blogsCrud,
  galleryCrud,
  listAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  listMessages,
  markMessageRead,
  deleteMessage,
} from '../controllers/adminController.js'

const router = Router()

router.use(protect)

router.get('/stats', getStats)

router.get('/services', servicesCrud.list)
router.post('/services', servicesCrud.create)
router.put('/services/:id', servicesCrud.update)
router.delete('/services/:id', servicesCrud.remove)

router.get('/stylists', stylistsCrud.list)
router.post('/stylists', stylistsCrud.create)
router.put('/stylists/:id', stylistsCrud.update)
router.delete('/stylists/:id', stylistsCrud.remove)

router.get('/testimonials', testimonialsCrud.list)
router.post('/testimonials', testimonialsCrud.create)
router.put('/testimonials/:id', testimonialsCrud.update)
router.delete('/testimonials/:id', testimonialsCrud.remove)

router.get('/faqs', faqsCrud.list)
router.post('/faqs', faqsCrud.create)
router.put('/faqs/:id', faqsCrud.update)
router.delete('/faqs/:id', faqsCrud.remove)

router.get('/blogs', blogsCrud.list)
router.post('/blogs', blogsCrud.create)
router.put('/blogs/:id', blogsCrud.update)
router.delete('/blogs/:id', blogsCrud.remove)

router.get('/gallery', galleryCrud.list)
router.post('/gallery', galleryCrud.create)
router.delete('/gallery/:id', galleryCrud.remove)

router.get('/appointments', listAppointments)
router.put('/appointments/:id', updateAppointmentStatus)
router.delete('/appointments/:id', deleteAppointment)

router.get('/messages', listMessages)
router.put('/messages/:id', markMessageRead)
router.delete('/messages/:id', deleteMessage)

export default router