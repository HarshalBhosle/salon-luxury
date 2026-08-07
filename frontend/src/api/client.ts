import axios from 'axios'
import type { ApiResponse } from '../types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('ma_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      window.localStorage.removeItem('ma_token')
      window.localStorage.removeItem('ma_user')
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  },
)

async function get<T>(url: string): Promise<T> {
  const res = await api.get<{ data: T }>(url)
  return res.data.data
}

async function post<T>(url: string, body?: unknown): Promise<T> {
  const res = await api.post<{ data: T }>(url, body)
  return res.data.data
}

async function put<T>(url: string, body?: unknown): Promise<T> {
  const res = await api.put<{ data: T }>(url, body)
  return res.data.data
}

async function del<T>(url: string): Promise<T> {
  const res = await api.delete<{ data: T }>(url)
  return res.data.data
}

export const publicApi = { get, post }
export const adminApi = { get, post, put, del }