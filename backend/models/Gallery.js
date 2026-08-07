import mongoose from 'mongoose'

const GallerySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    alt: { type: String, default: '' },
    category: {
      type: String,
      enum: ['Hair', 'Makeup', 'Nails', 'Interior', 'BeforeAfter'],
      default: 'Hair',
    },
    before: { type: String, default: '' },
    after: { type: String, default: '' },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export default mongoose.model('Gallery', GallerySchema)