import 'dotenv/config'

const monogUri = process.env.MONGO_URI || process.env.MONGODB_URI

const config = {
  PORT: Number(process.env.PORT) || 5000,
  MONGO_URI:
    monogUri && monogUri !== 'mongodb://127.0.0.1:27017/maison_aurelle'
      ? `${monogUri.replace(/\/$/, '')}/maison_aurelle?retryWrites=true&w=majority`
      : monogUri || 'mongodb://127.0.0.1:27017/maison_aurelle',
  JWT_SECRET: process.env.JWT_SECRET || 'aurelle_super_secret_key_change_me',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  SMTP: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@maisonaurelle.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123',
  CLOUDINARY: {
    cloud_name: process.env.CLOUDINARY_NAME || '',
    api_key: process.env.CLOUDINARY_KEY || '',
    api_secret: process.env.CLOUDINARY_SECRET || '',
  },
}

export default config