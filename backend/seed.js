import 'dotenv/config'
import mongoose from 'mongoose'
import connectDB from './config/db.js'
import Admin from './models/Admin.js'
import Service from './models/Service.js'
import Stylist from './models/Stylist.js'
import Testimonial from './models/Testimonial.js'
import Faq from './models/Faq.js'
import config from './config/index.js'
import { SERVICES } from './seedData/services.js'
import { STYLISTS, TESTIMONIALS, FAQS } from './seedData/stylists.js'

const seed = async () => {
  try {
    await connectDB()

    await Promise.all([
      Admin.deleteMany(),
      Service.deleteMany(),
      Stylist.deleteMany(),
      Testimonial.deleteMany(),
      Faq.deleteMany(),
    ])

    await Admin.create({
      name: 'Salon Owner',
      email: config.ADMIN_EMAIL,
      password: config.ADMIN_PASSWORD,
      role: 'admin',
    })

    await Service.insertMany(
      SERVICES.map((s) => ({ ...s, slug: s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') })),
    )
    await Stylist.insertMany(STYLISTS)
    await Testimonial.insertMany(TESTIMONIALS)
    await Faq.insertMany(FAQS)

    console.log('✅ Database seeded successfully')
    console.log(`   Admin login: ${config.ADMIN_EMAIL} / ${config.ADMIN_PASSWORD}`)
    process.exit(0)
  } catch (error) {
    console.error(`❌ Seed error: ${error.message}`)
    process.exit(1)
  }
}

seed().finally(() => mongoose.connection.close())