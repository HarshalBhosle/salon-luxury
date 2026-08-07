import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import {
  Scissors,
  Users,
  CalendarCheck,
  MessageSquare,
  FileText,
  Star,
  TrendingUp,
  Hourglass,
} from 'lucide-react'
import { adminService } from '../../../services/adminService'

const fallback = {
  totalServices: 22,
  totalStylists: 4,
  totalAppointments: 0,
  pendingAppointments: 0,
  totalMessages: 0,
  unreadMessages: 0,
  totalBlogPosts: 4,
  totalClients: 12000,
  recentAppointments: [],
}

export function StatsOverview() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: adminService.getStats,
  })

  const s = stats ?? fallback

  const cards = [
    { label: 'Total Services', value: s.totalServices, icon: Scissors, color: 'from-secondary to-secondary-light' },
    { label: 'Stylists', value: s.totalStylists, icon: Users, color: 'from-emerald to-emerald-light' },
    { label: 'Appointments', value: s.totalAppointments, icon: CalendarCheck, color: 'from-champagne to-secondary/70' },
    { label: 'Pending', value: s.pendingAppointments, icon: Hourglass, color: 'from-rose-gold to-secondary/50' },
    { label: 'Messages', value: s.totalMessages, icon: MessageSquare, color: 'from-secondary/60 to-secondary/30' },
    { label: 'Unread', value: s.unreadMessages, icon: FileText, color: 'from-secondary to-secondary-dark' },
    { label: 'Blog Posts', value: s.totalBlogPosts, icon: FileText, color: 'from-emerald-light to-emerald' },
    { label: 'Happy Clients', value: s.totalClients, icon: Star, color: 'from-champagne to-secondary' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl text-white">Welcome back</h1>
        <p className="text-white/50 mt-1 text-sm">Here's what's happening at Maison Aurelle today.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 hover:border-secondary/40 transition-colors"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-primary mb-3`}>
              <card.icon className="w-5 h-5" />
            </div>
            <p className="text-3xl font-display text-white">
              {isLoading ? '—' : Number(card.value).toLocaleString()}
            </p>
            <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">{card.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
          <h3 className="font-heading text-white font-semibold mb-5 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-secondary" /> Recent Appointments
          </h3>
          {s.recentAppointments.length === 0 ? (
            <p className="text-white/40 text-sm">No appointments yet.</p>
          ) : (
            <ul className="space-y-3">
              {s.recentAppointments.slice(0, 5).map((a) => (
                <li key={a._id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-white">{a.name}</p>
                    <p className="text-white/40 text-xs">{a.service}</p>
                  </div>
                  <span className="text-white/50 text-xs">{a.date} · {a.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-secondary to-secondary-light p-6 text-primary">
          <h3 className="font-heading font-semibold mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Manage Services', 'Appointments', 'Blog Posts', 'Gallery'].map((a) => (
              <a
                key={a}
                href="#"
                className="rounded-xl bg-primary/10 backdrop-blur px-4 py-3 text-sm font-heading hover:bg-primary hover:text-white transition-colors text-center"
              >
                {a}
              </a>
            ))}
          </div>
          <p className="text-xs text-primary/60 mt-4">
            Tip: Use the sidebar to navigate and manage all content.
          </p>
        </div>
      </div>
    </div>
  )
}