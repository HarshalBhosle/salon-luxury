import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import { fadeUp, staggerContainer } from '../../animations/variants'

interface SectionHeaderProps {
  tag?: string
  title: string
  accent?: string
  description?: string
  align?: 'center' | 'left'
  className?: string
}

export function SectionHeader({
  tag,
  title,
  accent,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={cn(
        'mb-14 sm:mb-20 max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      {tag && (
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-secondary/10 text-secondary font-heading text-[11px] font-medium tracking-[0.2em] uppercase rounded-full mb-5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          {tag}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        className="font-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-primary leading-[1.08]"
      >
        {title}
        {accent && (
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-light italic font-medium">
            {accent}
          </span>
        )}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className="mt-6 text-base sm:text-lg text-primary/60 leading-relaxed font-body"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}

export default SectionHeader