import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import { staggerChild } from '../../animations/variants'

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  gold?: boolean
  animate?: boolean
  tilt?: boolean
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hover = true, gold, animate, tilt, children, ...props }, ref) => {
    const Comp = animate ? motion.div : 'div'
    const animationProps = animate ? { variants: staggerChild, initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-40px' } } : {}

    return (
      <Comp
        ref={ref}
        className={cn(
          'rounded-2xl border backdrop-blur-xl transition-all duration-500',
          gold
            ? 'bg-white/70 border-secondary/20 shadow-glass hover:shadow-gold-hover'
            : 'bg-white/60 border-white/30 shadow-glass hover:shadow-glass-hover',
          hover && 'hover:-translate-y-1.5',
          className,
        )}
        {...animationProps}
        {...(props as object)}
      >
        {children}
      </Comp>
    )
  },
)
GlassCard.displayName = 'GlassCard'

export default GlassCard