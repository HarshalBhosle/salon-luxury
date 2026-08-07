import { useQuery } from '@tanstack/react-query'
import { adminService } from '../../../services/adminService'
import { AdminHeader } from './AdminUI'
import { useToast } from '../../../hooks/useToast'
import type { Appointment } from '../../../types'
import { cn } from '../../../utils/cn'

const STATUS_VALUES: Appointment['status'][] = ['pending', 'confirmed', 'completed', 'cancelled']

const statusStyle: Record<Appointment['status'], string> = {
  pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  confirmed: 'bg-emerald-500/20 text-emerald-700 border-emerald-500/30',
  completed: 'bg-secondary/20 text-primary border-secondary/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
}

export function AppointmentsManager() {
  const { toast } = useToast()
  const { data: appointments = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-appointments'],
    queryFn: adminService.getAppointments,
  })

  const setStatus = async (a: Appointment, status: Appointment['status']) => {
    try {
      await adminService.updateAppointmentStatus(a._id!, status)
      toast(`Appointment marked ${status}`, 'success')
      void refetch()
    } catch {
      toast('Unable to update status', 'error')
    }
  }

  return (
    <div>
      <AdminHeader title="Appointments" subtitle="View and manage booking requests" onRefresh={() => refetch()} />

      <div className="rounded-2xl bg-white/[0.04] border border-white/10 divide-y divide-white/5">
        {isLoading && <p className="p-6 text-white/40 text-sm">Loading…</p>}
        {!isLoading && appointments.length === 0 && <p className="p-6 text-white/40 text-sm">No appointments yet.</p>}
        {appointments.map((a: Appointment) => (
          <div key={a._id} className="p-4 flex flex-wrap items-center gap-4 hover:bg-white/5 transition-colors">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center text-primary font-display font-bold">
              {a.name?.[0] ?? '?'}
            </div>
            <div className="flex-1 min-w-[160px]">
              <p className="text-white font-medium">{a.name}</p>
              <p className="text-white/50 text-xs">{a.service} · {a.date} · {a.time}</p>
              {a.notes && <p className="text-white/40 text-xs mt-1 italic">"{a.notes}"</p>}
            </div>
            <span className={`px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wider border ${statusStyle[a.status]}`}>
              {a.status}
            </span>
            <div className="flex gap-1.5">
              {STATUS_VALUES.map((st) => (
                <button
                  key={st}
                  onClick={() => setStatus(a, st)}
                  disabled={a.status === st}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs transition-colors disabled:cursor-not-allowed',
                    a.status === st ? 'bg-secondary text-primary font-semibold' : 'bg-white/5 text-white/50 hover:bg-white/15',
                  )}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}