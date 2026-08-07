import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'

interface LenisContextValue {
  lenis: Lenis | null
}

const LenisContext = createContext<LenisContextValue | undefined>(undefined)

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenisInstance = new Lenis({
      duration: 0.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    })

    setLenis(lenisInstance)

    let rafId: number
    const raf = (time: number) => {
      lenisInstance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenisInstance.destroy()
    }
  }, [])

  return <LenisContext.Provider value={{ lenis }}>{children}</LenisContext.Provider>
}

export function useLenis() {
  const ctx = useContext(LenisContext)
  if (!ctx) throw new Error('useLenis must be used within LenisProvider')
  return ctx
}