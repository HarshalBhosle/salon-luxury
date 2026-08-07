import { Router } from 'express'
import {
  createAppointment,
  createContactMessage,
  subscribeNewsletter,
} from '../controllers/bookingController.js'

const router = Router()

router.post('/appointments', createAppointment)
router.post('/contact', createContactMessage)
router.post('/newsletter', subscribeNewsletter)

export default router