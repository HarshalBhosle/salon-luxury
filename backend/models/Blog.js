import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: '' },
    category: {
      type: String,
      enum: ['Hair Care', 'Skin Care', 'Trends', 'Tips'],
      default: 'Tips',
    },
    author: { type: String, default: 'Maison Aurelle' },
    tags: { type: [String], default: [] },
    readTime: { type: Number, default: 4 },
    featured: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

BlogSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }
  next()
})

export default mongoose.model('Blog', BlogSchema)