import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'editor'], default: 'admin' },
  },
  { timestamps: true },
)

AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

AdminSchema.methods.matchPassword = function (entered) {
  return bcrypt.compare(entered, this.password)
}

export default mongoose.model('Admin', AdminSchema)