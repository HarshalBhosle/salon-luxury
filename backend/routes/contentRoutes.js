import { Router } from 'express'
import {
  getServices,
  getServiceBySlug,
  getStylists,
  getGallery,
  getTestimonials,
  getFaqs,
  getBlogs,
  getBlogBySlug,
} from '../controllers/contentController.js'

const router = Router()

router.get('/services', getServices)
router.get('/services/:slug', getServiceBySlug)
router.get('/stylists', getStylists)
router.get('/gallery', getGallery)
router.get('/testimonials', getTestimonials)
router.get('/faqs', getFaqs)
router.get('/blogs', getBlogs)
router.get('/blogs/:slug', getBlogBySlug)

export default router