import { AnimatePresence, motion } from 'framer-motion'
import { X, Plus, RefreshCw } from 'lucide-react'
import type { ReactNode } from 'react'

interface AdminModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function AdminModal({ open, onClose, title, children }: AdminModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-primary/5 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="font-heading text-lg text-primary font-semibold">{title}</h3>
              <button onClick={onClose} className="p-1.5 rounded-full hover:bg-primary/5 text-primary" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface AdminFieldProps {
  label: string
  children: ReactNode
  required?: boolean
}

export function AdminField({ label, children, required }: AdminFieldProps) {
  return (
    <div>
      <label className="block text-xs font-heading uppercase tracking-wider text-primary/60 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  )
}

export const adminInputClass =
  'w-full px-4 py-2.5 rounded-xl border border-primary/10 bg-white/70 text-primary placeholder:text-primary/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all'

export function AdminSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-14 rounded-xl bg-white/5 animate-pulse" />
      ))}
    </div>
  )
}

export function AdminEmpty({ label }: { label: string }) {
  return (
    <div className="py-12 text-center">
      <p className="text-white/50 text-sm">{label}</p>
    </div>
  )
}

interface AdminHeaderProps {
  title: string
  subtitle?: string
  onRefresh?: () => void
  onAdd?: () => void
  addLabel?: string
}

export function AdminHeader({ title, subtitle, onRefresh, onAdd, addLabel }: AdminHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 className="font-display text-2xl text-white">{title}</h2>
        {subtitle && <p className="text-white/50 text-sm mt-1">{subtitle}</p>}
      </div>
      <div className="flex gap-2">
        {onRefresh && (
          <button onClick={onRefresh} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-colors">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        )}
        {onAdd && (
          <button onClick={onAdd} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-secondary to-secondary-light text-primary text-sm font-heading font-semibold hover:shadow-gold transition-all">
            <Plus className="w-4 h-4" /> {addLabel ?? 'Add'}
          </button>
        )}
      </div>
    </div>
  )
}