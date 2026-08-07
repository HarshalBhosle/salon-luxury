import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'
import authRoutes from './routes/authRoutes.js'
import contentRoutes from './routes/contentRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

const app = express()

connectDB()

app.use(helmet())
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  }),
)
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
})

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api', limiter)

app.get('/api/health', (req, res) => res.json({ success: true, message: 'Maison Aurelle API running' }))

app.use('/api/auth', authLimiter, authRoutes)
app.use('/api', contentRoutes)
app.use('/api', bookingRoutes)
app.use('/api/admin', adminRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
})