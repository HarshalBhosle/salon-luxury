import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Calendar, CheckCircle2, Loader2 } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { SERVICES } from '../../constants/services'
import { STYLISTS } from '../../constants/stylists'
import { appointmentSchema, type AppointmentFormValues } from '../../utils/validations'
import { appointmentApi } from '../../services/clientApi'
import { useToast } from '../../hooks/useToast'
import { cn } from '../../utils/cn'

const TIME_SLOTS = [
  '09:00', '09:45', '10:30', '11:15', '12:00', '12:45',
  '13:30', '14:15', '15:00', '15:45', '16:30', '17:15',
  '18:00', '18:45', '19:30',
]

export function AppointmentForm({ compact = false }: { compact?: boolean }) {
  const [searchParams] = useSearchParams()
  const { toast } = useToast()
  const [submitted, setSubmitted] = useState(false)

  const defaultService = useMemo(() => {
    const slug = searchParams.get('service')
    if (!slug) return ''
    const found = SERVICES.find((s) => s.slug === slug)
    return found ? found.name : ''
  }, [searchParams])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { service: defaultService },
  })

  const onSubmit = async (data: AppointmentFormValues) => {
    try {
      await appointmentApi.create(data)
      setSubmitted(true)
      toast('Appointment request received! We\'ll confirm shortly.', 'success')
    } catch {
      toast('Unable to submit. Please try again.', 'error')
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center"
        >
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </motion.div>
        <h3 className="font-display text-2xl text-primary mt-4 mb-2">Thank You!</h3>
        <p className="text-primary/60">
          Your appointment request has been received. Our team will contact you shortly to confirm.
        </p>
      </div>
    )
  }

  const inputClass = (err?: { message?: string }) =>
    cn(
      'w-full px-4 py-3 rounded-xl border bg-white/70 backdrop-blur text-primary placeholder:text-primary/40 focus:outline-none focus:ring-2 transition-all',
      err ? 'border-red-500/50 focus:ring-red-500/30' : 'border-primary/10 focus:ring-secondary/50',
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-heading uppercase tracking-wider text-primary/60 mb-1.5">Name</label>
          <input {...register('name')} placeholder="Your full name" className={inputClass(errors.name)} />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-heading uppercase tracking-wider text-primary/60 mb-1.5">Phone</label>
          <input {...register('phone')} placeholder="+1 (555) 000-0000" className={inputClass(errors.phone)} />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-heading uppercase tracking-wider text-primary/60 mb-1.5">Email</label>
        <input {...register('email')} type="email" placeholder="you@email.com" className={inputClass(errors.email)} />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-heading uppercase tracking-wider text-primary/60 mb-1.5">Service</label>
        <select {...register('service')} className={inputClass(errors.service)}>
          <option value="">Select a service</option>
          {SERVICES.map((s) => (
            <option key={s.id} value={s.name}>{s.name} — ${s.price}</option>
          ))}
        </select>
        {errors.service && <p className="text-xs text-red-500 mt-1">{errors.service.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-heading uppercase tracking-wider text-primary/60 mb-1.5">Stylist (optional)</label>
        <select {...register('stylist')} className={inputClass()}>
          <option value="">Any available stylist</option>
          {STYLISTS.map((s) => (
            <option key={s.id} value={s.name}>{s.name} — {s.role}</option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-heading uppercase tracking-wider text-primary/60 mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> Date
          </label>
          <input {...register('date')} type="date" className={inputClass(errors.date)} />
          {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-heading uppercase tracking-wider text-primary/60 mb-1.5">Time</label>
          <select {...register('time')} className={inputClass(errors.time)}>
            <option value="">Select a time</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-heading uppercase tracking-wider text-primary/60 mb-1.5">Special Notes (optional)</label>
        <textarea
          {...register('notes')}
          rows={compact ? 2 : 3}
          placeholder="Tell us anything we should know…"
          className={inputClass()}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
        {isSubmitting ? 'Submitting…' : 'Request Appointment'}
      </button>
    </form>
  )
}