import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2, Loader2 } from 'lucide-react'
import { GALLERY } from '../../../constants/gallery'
import { z } from 'zod'
import { adminService } from '../../../services/adminService'
import { useAdminResource } from './useAdminResource'
import { AdminModal, AdminHeader, adminInputClass } from './AdminUI'
import { useToast } from '../../../hooks/useToast'
import type { GalleryItem } from '../../../types'

const gallerySchema = z.object({
  image: z.string().min(1, 'Image URL is required'),
  alt: z.string().min(2, 'Alt text is required'),
  category: z.enum(['Hair', 'Makeup', 'Nails', 'Interior', 'BeforeAfter']),
})

const galleryApi = {
  list: () => adminService.getGallery(),
  create: (d: Partial<GalleryItem>) => adminService.uploadImage({ image: d.image } as unknown as FormData),
  update: (id: string, d: Partial<GalleryItem>) => Promise.resolve(d as GalleryItem),
  remove: (id: string) => adminService.deleteImage(id),
}

export function GalleryManager() {
  const { items, loading, saving, error, refresh, create, remove } = useAdminResource<GalleryItem>(galleryApi, GALLERY)
  const { toast } = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(gallerySchema),
  })

  const openCreate = () => { reset({ image: '', alt: '', category: 'Hair' }); setModalOpen(true) }

  const onSubmit = async (data: any) => {
    await create({ ...data, id: Date.now().toString() })
    toast('Image added', 'success')
    setModalOpen(false)
  }

  const handleDelete = async (g: GalleryItem) => {
    if (!window.confirm('Remove this image?')) return
    await remove(g._id ?? g.id)
    toast('Image removed', 'success')
  }

  const labelCls = 'block text-xs font-heading uppercase tracking-wider text-primary/60 mb-1.5'

  return (
    <div>
      <AdminHeader title="Gallery" subtitle="Manage gallery images" onRefresh={refresh} onAdd={openCreate} addLabel="Add Image" />

      {error && <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm">{error}</div>}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((g) => (
          <div key={g._id ?? g.id} className="group relative rounded-2xl overflow-hidden bg-white/[0.04] border border-white/10 aspect-[3/4]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-light to-primary" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/40 text-white text-[10px] uppercase tracking-wider">{g.category}</span>
            <button
              onClick={() => handleDelete(g)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white/80 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all"
              aria-label="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <span className="absolute bottom-2 left-2 right-2 text-white/80 text-xs truncate">{g.alt}</span>
          </div>
        ))}
      </div>
      {loading && <p className="mt-4 text-white/40 text-sm">Loading…</p>}

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Gallery Image">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className={labelCls}>Image URL</label>
            <input {...register('image')} className={adminInputClass} placeholder="https://…" />
            {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image.message}</p>}
          </div>
          <div>
            <label className={labelCls}>Alt Text</label>
            <input {...register('alt')} className={adminInputClass} placeholder="Describe the image" />
            {errors.alt && <p className="text-xs text-red-500 mt-1">{errors.alt.message}</p>}
          </div>
          <div>
            <label className={labelCls}>Category</label>
            <select {...register('category')} className={adminInputClass}>
              {['Hair', 'Makeup', 'Nails', 'Interior', 'BeforeAfter'].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button type="submit" disabled={saving} className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Add Image
          </button>
        </form>
      </AdminModal>
    </div>
  )
}