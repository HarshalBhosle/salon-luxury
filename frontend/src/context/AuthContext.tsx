import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { authApi } from '../services/clientApi'
import type { AdminUser } from '../types'

interface AuthContextValue {
  user: AdminUser | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [token, setToken] = useState<string | null>(() => window.localStorage.getItem('ma_token'))
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (token) {
      const stored = window.localStorage.getItem('ma_user')
      if (stored) {
        try {
          setUser(JSON.parse(stored))
        } catch {
          setUser(null)
        }
      }
    }
  }, [token])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const res = await authApi.login(email, password)
      setToken(res.token)
      setUser(res.user)
      window.localStorage.setItem('ma_token', res.token)
      window.localStorage.setItem('ma_user', JSON.stringify(res.user))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    window.localStorage.removeItem('ma_token')
    window.localStorage.removeItem('ma_user')
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, isAuthenticated: !!user && !!token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}