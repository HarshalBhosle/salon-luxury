import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'
import { SERVICES, SERVICE_CATEGORIES } from '../../../constants/services'
import { serviceSchema, type ServiceFormValues } from '../../../utils/validations'
import type { Service } from '../../../types'
import { adminService } from '../../../services/adminService'
import { useAdminResource } from './useAdminResource'
import { AdminModal, AdminHeader, AdminSkeleton, adminInputClass } from './AdminUI'
import { useToast } from '../../../hooks/useToast'

const serviceApi = {
  list: () => adminService.getServices(),
  create: (d: Partial<Service>) => adminService.createService(d),
  update: (id: string, d: Partial<Service>) => adminService.updateService(id, d),
  remove: (id: string) => adminService.deleteService(id),
}

export function ServicesManager() {
  const { items, loading, saving, error, refresh, create, update, remove } = useAdminResource<Service>(serviceApi, SERVICES)
  const { toast } = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Service | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
  })

  const openCreate = () => {
    setEditing(null)
    reset({ name: '', category: 'Hair', description: '', price: 0, duration: 30 })
    setModalOpen(true)
  }

  const openEdit = (s: Service) => {
    setEditing(s)
    reset({ name: s.name, category: s.category, description: s.description, price: s.price, duration: s.duration })
    setModalOpen(true)
  }

  const onSubmit = async (data: ServiceFormValues) => {
    const payload = { ...data, category: data.category as Service['category'] }
    if (editing) {
      await update(editing._id ?? editing.id, payload)
      toast('Service updated', 'success')
    } else {
      await create({ ...payload, id: data.name.toLowerCase().replace(/\s+/g, '-') })
      toast('Service created', 'success')
    }
    setModalOpen(false)
  }

  const handleDelete = async (s: Service) => {
    if (!window.confirm(`Delete "${s.name}"?`)) return
    await remove(s._id ?? s.id)
    toast('Service deleted', 'success')
  }

  const labelCls = 'block text-xs font-heading uppercase tracking-wider text-primary/60 mb-1.5'

  return (
    <div>
      <AdminHeader title="Services" subtitle="Manage your service catalogue" onRefresh={refresh} onAdd={openCreate} addLabel="Add Service" />

      {error && <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm">{error}</div>}

      <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-primary/40 uppercase text-[11px] tracking-wider border-b border-white/10">
            <tr>
              <th className="text-left p-4">Service</th>
              <th className="text-left p-4 hidden md:table-cell">Category</th>
              <th className="text-left p-4 hidden sm:table-cell">Duration</th>
              <th className="text-left p-4 text-secondary">Price</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {items.map((s) => (
              <tr key={s._id ?? s.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <p className="text-white">{s.name}</p>
                  {s.featured && <span className="text-[10px] uppercase tracking-wider text-secondary">Featured</span>}
                </td>
                <td className="p-4 hidden md:table-cell text-white/50">{s.category}</td>
                <td className="p-4 hidden sm:table-cell text-white/50">{s.duration} min</td>
                <td className="p-4 font-heading text-secondary font-semibold">${s.price}</td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(s)} className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10" aria-label="Edit"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(s)} className="p-2 rounded-lg text-white/60 hover:text-red-400 hover:bg-white/10" aria-label="Delete"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && (
          <div className="p-4"><AdminSkeleton /></div>
        )}
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Service' : 'Add Service'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className={labelCls}>Name</label>
            <input {...register('name')} className={adminInputClass} placeholder="e.g. Signature Haircut" />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Category</label>
              <select {...register('category')} className={adminInputClass}>
                {SERVICE_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Duration (min)</label>
              <input {...register('duration')} type="number" className={adminInputClass} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Price ($)</label>
            <input {...register('price')} type="number" className={adminInputClass} />
            {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>}
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea {...register('description')} rows={3} className={adminInputClass} />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
          </div>
          <button type="submit" disabled={saving} className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {editing ? 'Save Changes' : 'Create Service'}
          </button>
        </form>
      </AdminModal>
    </div>
  )
}