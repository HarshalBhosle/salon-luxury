import mongoose from 'mongoose'

const StylistSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    experience: { type: Number, default: 0 },
    specialization: { type: [String], default: [] },
    awards: { type: [String], default: [] },
    image: { type: String, default: '' },
    bio: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    socials: {
      instagram: { type: String, default: '' },
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
    },
  },
  { timestamps: true },
)

export default mongoose.model('Stylist', StylistSchema)