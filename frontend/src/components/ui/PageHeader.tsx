import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface PageHeaderProps {
  title: string
  accent?: string
  description?: string
  tag?: string
  className?: string
}

export function PageHeader({ title, accent, description, tag, className }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn('pt-36 pb-16 sm:pb-20 bg-primary relative overflow-hidden', className)}
    >
      <div className="absolute inset-0 opacity-[0.03] noise-overlay" aria-hidden />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-secondary/20 blur-[140px]" aria-hidden />
      <div className="relative section-container text-center">
        {tag && (
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/15 text-secondary font-heading text-[11px] tracking-[0.2em] uppercase rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            {tag}
          </span>
        )}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-tight">
          {title}
          {accent && (
            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-light font-medium">
              {accent}
            </span>
          )}
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-white/60 font-body">{description}</p>
        )}
      </div>
    </motion.div>
  )
}