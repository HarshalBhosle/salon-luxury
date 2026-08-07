import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 40 })
  const springY = useSpring(y, { stiffness: 500, damping: 40 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    setEnabled(true)
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target as HTMLElement
      setHovering(!!target.closest('a, button, [role="button"], input, select, textarea, [data-hover]'))
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      setEnabled(false)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        style={{ x: springX, y: springY }}
        className="pointer-events-none fixed top-0 left-0 z-[90] w-2.5 h-2.5 rounded-full bg-secondary -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      />
      <motion.div
        style={{ x: springX, y: springY }}
        animate={{ scale: hovering ? 1.6 : 1 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none fixed top-0 left-0 z-[89] w-9 h-9 rounded-full border border-secondary/50 -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      />
    </>
  )
}