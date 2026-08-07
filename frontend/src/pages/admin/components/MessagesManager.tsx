import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mail, Phone, Trash2, Check } from 'lucide-react'
import { adminService } from '../../../services/adminService'
import { AdminHeader } from './AdminUI'
import { useToast } from '../../../hooks/useToast'
import type { ContactMessage } from '../../../types'

export function MessagesManager() {
  const { toast } = useToast()
  const qc = useQueryClient()
  const { data: messages = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-messages'],
    queryFn: adminService.getMessages,
  })

  const markRead = useMutation({
    mutationFn: (id: string) => adminService.markMessageRead(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-messages'] }); toast('Marked as read', 'success') },
  })

  const removeMsg = useMutation({
    mutationFn: (id: string) => adminService.deleteMessage(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-messages'] }); toast('Message deleted', 'success') },
  })

  return (
    <div>
      <AdminHeader title="Messages" subtitle="Inquiries from the contact form" onRefresh={() => refetch()} />

      <div className="space-y-3">
        {isLoading && <p className="text-white/40 text-sm">Loading…</p>}
        {!isLoading && messages.length === 0 && <p className="text-white/40 text-sm">No messages yet.</p>}
        {messages.map((m: ContactMessage) => (
          <div key={m._id} className={`rounded-2xl border ${m.read ? 'border-white/10 bg-white/[0.02]' : 'border-secondary/30 bg-white/[0.06]'}`}>
            <div className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <div>
                  <p className="text-white font-medium">{m.name}</p>
                  <div className="flex flex-wrap gap-4 text-white/50 text-xs mt-1">
                    <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {m.email}</span>
                    {m.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {m.phone}</span>}
                  </div>
                </div>
                {!m.read ? (
                  <span className="px-2.5 py-1 rounded-full bg-secondary/20 text-secondary text-[11px] uppercase tracking-wider border border-secondary/30">New</span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/50 text-[11px] uppercase tracking-wider">Read</span>
                )}
              </div>
              {m.subject && <p className="text-primary font-semibold">{m.subject}</p>}
              <p className="text-white/70 text-sm mt-2 leading-relaxed">{m.message}</p>
              <div className="flex justify-end gap-2 mt-4">
                {!m.read && (
                  <button onClick={() => markRead.mutate(m._id!)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-white/60 hover:text-white text-xs">
                    <Check className="w-3.5 h-3.5" /> Mark read
                  </button>
                )}
                <button onClick={() => removeMsg.mutate(m._id!)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-white/60 hover:text-red-400 text-xs">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}