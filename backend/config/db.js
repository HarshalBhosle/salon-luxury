import mongoose from 'mongoose'
import config from './index.js'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    })
    console.log(`MongoDB Connected: ${conn.connection.host} | DB: ${conn.connection.name}`)
    return conn
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB