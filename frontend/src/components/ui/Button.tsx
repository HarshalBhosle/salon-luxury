import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-heading text-sm tracking-wider uppercase transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:shadow-gold-hover',
        gold:
          'bg-gradient-to-r from-secondary to-secondary-light text-primary font-semibold shadow-gold hover:shadow-gold-hover hover:-translate-y-0.5',
        secondary:
          'border border-primary/20 text-primary hover:bg-primary hover:text-white',
        glass:
          'bg-white/60 backdrop-blur-md border border-white/40 text-primary hover:bg-white/80',
        ghost:
          'text-primary hover:bg-primary/5',
        outline:
          'border border-secondary text-secondary hover:bg-secondary hover:text-primary',
        danger:
          'bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6',
        lg: 'h-13 px-8 py-4',
        xl: 'h-14 px-10 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = 'button' as const
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }