import { publicApi } from '../api/client'
import type { Appointment, AuthResponse, ContactMessage } from '../types'

export const appointmentApi = {
  create: (data: Partial<Appointment>) =>
    publicApi.post<Appointment>('/appointments', data),
}

export const contactApi = {
  send: (data: Partial<ContactMessage>) =>
    publicApi.post<ContactMessage>('/contact', data),
}

export const newsletterApi = {
  subscribe: (email: string) =>
    publicApi.post<{ subscribed: boolean }>('/newsletter', { email }),
}

export const authApi = {
  login: async (email: string, password: string) => {
    const data = await publicApi.post<AuthResponse>('/auth/login', { email, password })
    return data
  },
}