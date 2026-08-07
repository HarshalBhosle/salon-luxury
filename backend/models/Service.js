import mongoose from 'mongoose'

const ServiceSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['Hair', 'Skin', 'Nails', 'Makeup', 'Spa', 'Men', 'Kids'],
      required: true,
    },
    price: { type: Number, required: true, min: 0 },
    duration: { type: Number, required: true, min: 5 },
    image: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    popular: { type: Boolean, default: false },
    benefits: { type: [String], default: [] },
  },
  { timestamps: true },
)

ServiceSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  }
  next()
})

export default mongoose.model('Service', ServiceSchema)