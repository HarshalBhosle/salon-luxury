import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
import asyncHandler from '../utils/asyncHandler.js'
import { ApiError } from '../middleware/errorHandler.js'

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'aurelle_super_secret_key_change_me', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new ApiError(400, 'Please provide email and password')
  }

  const user = await Admin.findOne({ email }).select('+password')

  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(401, 'Invalid email or password')
  }

  res.json({
    success: true,
    data: {
      token: signToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  })
})

export const getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  })
})