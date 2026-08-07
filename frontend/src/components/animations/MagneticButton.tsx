import * as React from 'react'
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion'
import { cn } from '../../utils/cn'

interface MagneticButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  strength?: number
  className?: string
}

export function MagneticButton({
  children,
  strength = 0.4,
  className,
  ...props
}: MagneticButtonProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15 })
  const springY = useSpring(y, { stiffness: 200, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('inline-flex items-center justify-center', className)}
      whileTap={{ scale: 0.96 }}
      {...(props as object)}
    >
      {children}
    </motion.button>
  )
}

export default MagneticButton