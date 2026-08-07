import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
import { ApiError } from './errorHandler.js'

export const protect = async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(new ApiError(401, 'Not authorized, no token'))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'aurelle_super_secret_key_change_me')
    req.user = await Admin.findById(decoded.id).select('-password')
    next()
  } catch (error) {
    return next(new ApiError(401, 'Not authorized, invalid token'))
  }
}