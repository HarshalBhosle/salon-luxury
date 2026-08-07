import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Layout } from './components/layout/Layout'
import { CustomCursor } from './components/layout/CustomCursor'
import { WhatsAppButton } from './components/layout/WhatsAppButton'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { AuthProvider } from './context/AuthContext'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { ServicesPage } from './pages/ServicesPage'
import { GalleryPage } from './pages/GalleryPage'
import { StylistsPage } from './pages/StylistsPage'
import { PricingPage } from './pages/PricingPage'
import { BlogPage } from './pages/BlogPage'
import { BlogPostPage } from './pages/BlogPostPage'
import { ContactPage } from './pages/ContactPage'
import { BookPage } from './pages/BookPage'
import { LoginPage } from './pages/admin/LoginPage'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { ProtectedRoute } from './routes/ProtectedRoute'

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
      <h1 className="font-display text-8xl text-secondary">404</h1>
      <p className="font-display text-2xl text-primary mt-4">The page you're looking for has left the salon.</p>
      <a href="/" className="btn-gold mt-8 inline-flex items-center gap-2">Return Home</a>
    </div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <AuthProvider>
      <CustomCursor />
      <ScrollToTop />
      <WhatsAppButton />

      <Routes location={location}>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/stylists" element={<StylistsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/book" element={<BookPage />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}