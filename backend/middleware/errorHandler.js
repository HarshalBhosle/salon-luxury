export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
  }
}

export const notFound = (req, res, next) => {
  res.status(404)
  next(new ApiError(404, `Route not found: ${req.originalUrl}`))
}

export const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message = 'Server Error' } = err

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    message = `Resource not found (invalid id)`
    statusCode = 404
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    message = 'Duplicate value provided'
    statusCode = 400
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map((e) => e.message).join(', ')
    statusCode = 400
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  })
}