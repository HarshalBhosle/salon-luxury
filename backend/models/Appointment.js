import mongoose from 'mongoose'

const AppointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    service: { type: String, required: true },
    stylist: { type: String, default: '' },
    date: { type: String, required: true },
    time: { type: String, required: true },
    notes: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true },
)

AppointmentSchema.index({ date: 1, time: 1 })

export default mongoose.model('Appointment', AppointmentSchema)