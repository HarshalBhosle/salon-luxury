import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'
import { STYLISTS } from '../../../constants/stylists'
import { stylistSchema, type StylistFormValues } from '../../../utils/validations'
import type { Stylist } from '../../../types'
import { adminService } from '../../../services/adminService'
import { useAdminResource } from './useAdminResource'
import { AdminModal, AdminHeader, AdminSkeleton, adminInputClass } from './AdminUI'
import { useToast } from '../../../hooks/useToast'

const stylistApi = {
  list: () => adminService.getStylists(),
  create: (d: Partial<Stylist>) => adminService.createStylist(d),
  update: (id: string, d: Partial<Stylist>) => adminService.updateStylist(id, d),
  remove: (id: string) => adminService.deleteStylist(id),
}

export function StylistsManager() {
  const { items, loading, saving, error, refresh, create, update, remove } = useAdminResource<Stylist>(stylistApi, STYLISTS)
  const { toast } = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Stylist | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<StylistFormValues>({
    resolver: zodResolver(stylistSchema),
  })

  const openCreate = () => {
    setEditing(null)
    reset({ name: '', role: '', experience: 0, specialization: '', bio: '' })
    setModalOpen(true)
  }

  const openEdit = (s: Stylist) => {
    setEditing(s)
    reset({ name: s.name, role: s.role, experience: s.experience, specialization: s.specialization.join(', '), bio: s.bio })
    setModalOpen(true)
  }

  const onSubmit = async (data: StylistFormValues) => {
    const payload = {
      ...data,
      specialization: data.specialization.split(',').map((s) => s.trim()).filter(Boolean),
      socials: editing?.socials ?? {},
    }
    if (editing) {
      await update(editing._id ?? editing.id, payload)
      toast('Stylist updated', 'success')
    } else {
      await create({ ...payload, id: data.name.toLowerCase().replace(/\s+/g, '-'), awards: [] })
      toast('Stylist created', 'success')
    }
    setModalOpen(false)
  }

  const handleDelete = async (s: Stylist) => {
    if (!window.confirm(`Remove ${s.name}?`)) return
    await remove(s._id ?? s.id)
    toast('Stylist removed', 'success')
  }

  const labelCls = 'block text-xs font-heading uppercase tracking-wider text-primary/60 mb-1.5'

  return (
    <div>
      <AdminHeader title="Stylists" subtitle="Manage your artist team" onRefresh={refresh} onAdd={openCreate} addLabel="Add Stylist" />

      {error && <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm">{error}</div>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((s) => (
          <div key={s._id ?? s.id} className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 hover:border-secondary/40 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center text-primary font-display font-bold">
                {s.name[0]}
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => openEdit(s)} className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10" aria-label="Edit"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(s)} className="p-2 rounded-lg text-white/60 hover:text-red-400 hover:bg-white/10" aria-label="Delete"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <h3 className="font-heading text-white font-semibold">{s.name}</h3>
            <p className="text-secondary text-sm">{s.role}</p>
            <p className="text-white/50 text-xs mt-1">{s.experience} years experience</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {s.specialization.map((sp) => (
                <span key={sp} className="px-2 py-0.5 rounded-full bg-white/5 text-white/60 text-[11px]">{sp}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {loading && <div className="mt-4"><AdminSkeleton /></div>}

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Stylist' : 'Add Stylist'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Name</label>
              <input {...register('name')} className={adminInputClass} />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Role</label>
              <input {...register('role')} className={adminInputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Experience (years)</label>
              <input {...register('experience')} type="number" className={adminInputClass} />
            </div>
            <div>
              <label className={labelCls}>Specialization</label>
              <input {...register('specialization')} className={adminInputClass} placeholder="Color, Cuts (comma separated)" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Bio</label>
            <textarea {...register('bio')} rows={3} className={adminInputClass} />
          </div>
          <button type="submit" disabled={saving} className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {editing ? 'Save Changes' : 'Add Stylist'}
          </button>
        </form>
      </AdminModal>
    </div>
  )
}