import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Mail, Loader2, ArrowLeft } from 'lucide-react'
import { loginSchema, type LoginFormValues } from '../../utils/validations'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../hooks/useToast'
import { cn } from '../../utils/cn'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data: LoginFormValues) => {
    setError('')
    try {
      await login(data.email, data.password)
      toast('Welcome back!', 'success')
      navigate('/admin')
    } catch {
      setError('Invalid email or password.')
    }
  }

  const inputClass = (err?: { message?: string }) =>
    cn(
      'w-full px-4 py-3 rounded-xl border bg-white/70 text-primary placeholder:text-primary/40 focus:outline-none focus:ring-2 transition-all',
      err ? 'border-red-500/50 focus:ring-red-500/30' : 'border-primary/10 focus:ring-secondary/50',
    )

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute -top-32 left-1/4 w-[400px] h-[400px] rounded-full bg-secondary/15 blur-[140px]" aria-hidden />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-secondary/10 blur-[120px]" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-secondary transition-colors mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to website
        </Link>

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-glass">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center text-primary mb-4">
              <span className="font-display font-bold text-xl">M</span>
            </div>
            <h1 className="font-display text-2xl text-primary">Admin Portal</h1>
            <p className="text-sm text-primary/50 mt-1">Sign in to manage Maison Aurelle</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm">{error}</div>
            )}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider text-primary/60 mb-1.5">
                <Mail className="w-3.5 h-3.5" /> Email
              </label>
              <input {...register('email')} type="email" placeholder="admin@maisonaurelle.com" className={inputClass(errors.email)} />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider text-primary/60 mb-1.5">
                <Lock className="w-3.5 h-3.5" /> Password
              </label>
              <input {...register('password')} type="password" placeholder="••••••••" className={inputClass(errors.password)} />
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-60">
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-4 h-4" />}
              {isSubmitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}