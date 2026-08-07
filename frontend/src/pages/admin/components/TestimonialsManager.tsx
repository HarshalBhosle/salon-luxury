import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2, Loader2, Star } from 'lucide-react'
import { z } from 'zod'
import { TESTIMONIALS } from '../../../constants/stylists'
import { adminService } from '../../../services/adminService'
import { useAdminResource } from './useAdminResource'
import { AdminModal, AdminHeader, adminInputClass } from './AdminUI'
import { useToast } from '../../../hooks/useToast'
import type { Testimonial } from '../../../types'

const testimonialSchema = z.object({
  name: z.string().min(2),
  service: z.string().min(1),
  rating: z.coerce.number().min(1).max(5),
  content: z.string().min(10),
})

const testimonialApi = {
  list: () => adminService.getTestimonials(),
  create: (d: Partial<Testimonial>) => adminService.createTestimonial(d),
  update: (id: string, d: Partial<Testimonial>) => Promise.resolve(d as Testimonial),
  remove: (id: string) => adminService.deleteTestimonial(id),
}

export function TestimonialsManager() {
  const { items, loading, saving, error, refresh, create, remove } = useAdminResource<Testimonial>(testimonialApi, TESTIMONIALS)
  const { toast } = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(testimonialSchema) })

  const openCreate = () => { reset({ name: '', service: '', rating: 5, content: '' }); setModalOpen(true) }

  const onSubmit = async (data: any) => {
    await create({ ...data, id: Date.now().toString() })
    toast('Testimonial added', 'success')
    setModalOpen(false)
  }

  const handleDelete = async (t: Testimonial) => {
    if (!window.confirm('Delete this testimonial?')) return
    await remove(t._id ?? t.id)
    toast('Testimonial deleted', 'success')
  }

  const labelCls = 'block text-xs font-heading uppercase tracking-wider text-primary/60 mb-1.5'

  return (
    <div>
      <AdminHeader title="Testimonials" subtitle="Manage client reviews" onRefresh={refresh} onAdd={openCreate} addLabel="Add Testimonial" />

      {error && <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm">{error}</div>}

      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((t) => (
          <div key={t._id ?? t.id} className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 hover:border-secondary/40 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center text-primary font-display font-bold">{t.name[0]}</div>
                <div>
                  <p className="text-white font-medium">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.service}</p>
                </div>
              </div>
              <button onClick={() => handleDelete(t)} className="p-2 rounded-lg text-white/60 hover:text-red-400 hover:bg-white/10" aria-label="Delete"><Trash2 className="w-4 h-4" /></button>
            </div>
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < t.rating ? 'text-secondary fill-secondary' : 'text-white/15'}`} />
              ))}
            </div>
            <p className="text-white/60 text-sm leading-relaxed">"{t.content}"</p>
          </div>
        ))}
      </div>
      {loading && <p className="mt-4 text-white/40 text-sm">Loading…</p>}

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Testimonial">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Name</label>
              <input {...register('name')} className={adminInputClass} />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Service</label>
              <input {...register('service')} className={adminInputClass} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Rating (1–5)</label>
            <input {...register('rating')} type="number" min={1} max={5} className={adminInputClass} />
          </div>
          <div>
            <label className={labelCls}>Review</label>
            <textarea {...register('content')} rows={4} className={adminInputClass} />
            {errors.content && <p className="text-xs text-red-500 mt-1">{errors.content.message}</p>}
          </div>
          <button type="submit" disabled={saving} className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Add Testimonial
          </button>
        </form>
      </AdminModal>
    </div>
  )
}