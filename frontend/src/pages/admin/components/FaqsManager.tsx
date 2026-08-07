import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'
import { z } from 'zod'
import { FAQS } from '../../../constants/faqs'
import { adminService } from '../../../services/adminService'
import { useAdminResource } from './useAdminResource'
import { AdminModal, AdminHeader, adminInputClass } from './AdminUI'
import { useToast } from '../../../hooks/useToast'
import type { Faq } from '../../../types'

const faqSchema = z.object({
  question: z.string().min(5, 'Question is required'),
  answer: z.string().min(10, 'Answer is required'),
  category: z.string(),
})

const faqApi = {
  list: () => adminService.getFaqs(),
  create: (d: Partial<Faq>) => adminService.createFaq(d),
  update: (id: string, d: Partial<Faq>) => adminService.updateFaq(id, d),
  remove: (id: string) => adminService.deleteFaq(id),
}

export function FaqsManager() {
  const { items, loading, saving, error, refresh, create, update, remove } = useAdminResource<Faq>(faqApi, FAQS)
  const { toast } = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Faq | null>(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(faqSchema) })

  const openCreate = () => { setEditing(null); reset({ question: '', answer: '', category: 'General' }); setModalOpen(true) }
  const openEdit = (f: Faq) => { setEditing(f); reset({ question: f.question, answer: f.answer, category: f.category ?? 'General' }); setModalOpen(true) }

  const onSubmit = async (data: any) => {
    if (editing) {
      await update(editing._id ?? editing.id, data)
      toast('FAQ updated', 'success')
    } else {
      await create({ ...data, id: Date.now().toString() })
      toast('FAQ created', 'success')
    }
    setModalOpen(false)
  }

  const handleDelete = async (f: Faq) => {
    if (!window.confirm('Delete this FAQ?')) return
    await remove(f._id ?? f.id)
    toast('FAQ deleted', 'success')
  }

  const labelCls = 'block text-xs font-heading uppercase tracking-wider text-primary/60 mb-1.5'

  return (
    <div>
      <AdminHeader title="FAQs" subtitle="Manage frequently asked questions" onRefresh={refresh} onAdd={openCreate} addLabel="Add FAQ" />

      {error && <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm">{error}</div>}

      <div className="space-y-3">
        {items.map((f) => (
          <div key={f._id ?? f.id} className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 hover:border-secondary/40 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-white font-medium">{f.question}</h3>
                <p className="text-white/50 text-sm mt-1">{f.answer}</p>
                <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-secondary/20 text-secondary text-[11px] uppercase tracking-wider">{f.category}</span>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button onClick={() => openEdit(f)} className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10" aria-label="Edit"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(f)} className="p-2 rounded-lg text-white/60 hover:text-red-400 hover:bg-white/10" aria-label="Delete"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && <p className="mt-4 text-white/40 text-sm">Loading…</p>}

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit FAQ' : 'Add FAQ'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className={labelCls}>Question</label>
            <input {...register('question')} className={adminInputClass} />
            {errors.question && <p className="text-xs text-red-500 mt-1">{errors.question.message}</p>}
          </div>
          <div>
            <label className={labelCls}>Answer</label>
            <textarea {...register('answer')} rows={4} className={adminInputClass} />
            {errors.answer && <p className="text-xs text-red-500 mt-1">{errors.answer.message}</p>}
          </div>
          <div>
            <label className={labelCls}>Category</label>
            <select {...register('category')} className={adminInputClass}>
              {['Booking', 'Services', 'Pricing', 'General'].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button type="submit" disabled={saving} className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} {editing ? 'Save Changes' : 'Add FAQ'}
          </button>
        </form>
      </AdminModal>
    </div>
  )
}