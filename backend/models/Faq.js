import mongoose from 'mongoose'

const FaqSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, default: 'General' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export default mongoose.model('Faq', FaqSchema)