import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useLenis } from '../../context/LenisContext'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ToastProvider } from '../../context/ToastContext'

export function Layout() {
  const location = useLocation()
  const { lenis } = useLenis()

  useEffect(() => {
    if (!lenis) return
    const state = location.state as { scrollTo?: string } | null
    if (state?.scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(state.scrollTo!)
        if (el) {
          lenis.scrollTo(el, { offset: -80 })
        }
      }, 100)
    } else {
      lenis.scrollTo(0, { immediate: true })
    }
  }, [location, lenis])

  return (
    <div className="min-h-screen bg-white text-primary overflow-x-hidden">
      <ToastProvider>
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        <Footer />
      </ToastProvider>
    </div>
  )
}