import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-heading text-[11px] font-medium uppercase tracking-widest transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-secondary/10 text-secondary border border-secondary/20',
        gold: 'bg-gradient-to-r from-secondary to-secondary-light text-primary border border-secondary/40',
        dark: 'bg-primary text-white border border-white/10',
        outline: 'border border-primary/15 text-primary',
        success: 'bg-emerald/10 text-emerald border border-emerald/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }