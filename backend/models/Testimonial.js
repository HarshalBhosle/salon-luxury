import mongoose from 'mongoose'

const TestimonialSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    avatar: { type: String, default: '' },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    service: { type: String, default: '' },
    content: { type: String, required: true },
  },
  { timestamps: true },
)

export default mongoose.model('Testimonial', TestimonialSchema)