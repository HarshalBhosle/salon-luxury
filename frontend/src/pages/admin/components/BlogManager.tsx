import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BLOG_POSTS } from '../../../constants/blog'
import { blogSchema, type BlogFormValues } from '../../../utils/validations'
import { adminService } from '../../../services/adminService'
import { useAdminResource } from './useAdminResource'
import { AdminModal, AdminHeader, adminInputClass } from './AdminUI'
import { useToast } from '../../../hooks/useToast'
import type { BlogPost } from '../../../types'

const blogApi = {
  list: () => adminService.getBlogPosts(),
  create: (d: Partial<BlogPost>) => adminService.createBlogPost(d),
  update: (id: string, d: Partial<BlogPost>) => adminService.updateBlogPost(id, d),
  remove: (id: string) => adminService.deleteBlogPost(id),
}

export function BlogManager() {
  const { items, loading, saving, error, refresh, create, update, remove } = useAdminResource<BlogPost>(blogApi, BLOG_POSTS)
  const { toast } = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<BlogPost | null>(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BlogFormValues>({ resolver: zodResolver(blogSchema) })

  const openCreate = () => { setEditing(null); reset({ title: '', category: 'Hair Care', excerpt: '', content: '', author: '', tags: '' }); setModalOpen(true) }
  const openEdit = (p: BlogPost) => {
    setEditing(p)
    reset({ title: p.title, category: p.category, excerpt: p.excerpt, content: p.content, author: p.author, tags: p.tags.join(', ') })
    setModalOpen(true)
  }

  const onSubmit = async (data: BlogFormValues) => {
    const payload = {
      ...data,
      category: data.category as BlogPost['category'],
      tags: (data.tags ?? '').split(',').map((t) => t.trim()).filter(Boolean),
    }
    if (editing) {
      await update(editing._id ?? editing.id, payload)
      toast('Post updated', 'success')
    } else {
      await create({
        ...payload,
        id: Date.now().toString(),
        slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        readTime: Math.ceil(data.content.split(' ').length / 200),
        publishedAt: new Date().toISOString(),
      })
      toast('Post published', 'success')
    }
    setModalOpen(false)
  }

  const handleDelete = async (p: BlogPost) => {
    if (!window.confirm('Delete this post?')) return
    await remove(p._id ?? p.id)
    toast('Post deleted', 'success')
  }

  const labelCls = 'block text-xs font-heading uppercase tracking-wider text-primary/60 mb-1.5'

  return (
    <div>
      <AdminHeader title="Blog Posts" subtitle="Create and manage articles" onRefresh={refresh} onAdd={openCreate} addLabel="New Post" />

      {error && <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm">{error}</div>}

      <div className="space-y-3">
        {items.map((p) => (
          <div key={p._id ?? p.id} className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 hover:border-secondary/40 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-secondary/20 text-secondary text-[11px] uppercase tracking-wider">{p.category}</span>
                  <span className="text-white/40 text-xs">{p.readTime} min read</span>
                  {p.featured && <span className="text-[11px] uppercase tracking-wider text-white/40">Featured</span>}
                </div>
                <h3 className="text-white font-medium">{p.title}</h3>
                <p className="text-white/50 text-sm mt-1 line-clamp-2">{p.excerpt}</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <Link to={`/blog/${p.slug}`} className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-xs">View</Link>
                <button onClick={() => openEdit(p)} className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10" aria-label="Edit"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(p)} className="p-2 rounded-lg text-white/60 hover:text-red-400 hover:bg-white/10" aria-label="Delete"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && <p className="mt-4 text-white/40 text-sm">Loading…</p>}

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Post' : 'New Post'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className={labelCls}>Title</label>
            <input {...register('title')} className={adminInputClass} />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Category</label>
              <select {...register('category')} className={adminInputClass}>
                {['Hair Care', 'Skin Care', 'Trends', 'Tips'].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Author</label>
              <input {...register('author')} className={adminInputClass} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Excerpt</label>
            <input {...register('excerpt')} className={adminInputClass} />
            {errors.excerpt && <p className="text-xs text-red-500 mt-1">{errors.excerpt.message}</p>}
          </div>
          <div>
            <label className={labelCls}>Content</label>
            <textarea {...register('content')} rows={5} className={adminInputClass} placeholder="Write your article… (blank lines create paragraphs)" />
            {errors.content && <p className="text-xs text-red-500 mt-1">{errors.content.message}</p>}
          </div>
          <div>
            <label className={labelCls}>Tags (comma separated)</label>
            <input {...register('tags')} className={adminInputClass} placeholder="hair, trends, care" />
          </div>
          <button type="submit" disabled={saving} className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} {editing ? 'Save Changes' : 'Publish'}
          </button>
        </form>
      </AdminModal>
    </div>
  )
}