import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Scissors,
  Users,
  CalendarCheck,
  Image as ImageIcon,
  Star,
  HelpCircle,
  FileText,
  LogOut,
  ArrowLeft,
  Menu,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { StatsOverview } from './components/StatsOverview'
import { ServicesManager } from './components/ServicesManager'
import { AppointmentsManager } from './components/AppointmentsManager'
import { MessagesManager } from './components/MessagesManager'
import { StylistsManager } from './components/StylistsManager'
import { GalleryManager } from './components/GalleryManager'
import { TestimonialsManager } from './components/TestimonialsManager'
import { FaqsManager } from './components/FaqsManager'
import { BlogManager } from './components/BlogManager'
import { cn } from '../../utils/cn'

type Tab =
  | 'overview'
  | 'services'
  | 'appointments'
  | 'messages'
  | 'stylists'
  | 'gallery'
  | 'testimonials'
  | 'faqs'
  | 'blog'

const TABS: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'services', label: 'Services', icon: Scissors },
  { id: 'stylists', label: 'Stylists', icon: Users },
  { id: 'appointments', label: 'Appointments', icon: CalendarCheck },
  { id: 'messages', label: 'Messages', icon: FileText },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon },
  { id: 'testimonials', label: 'Testimonials', icon: Star },
  { id: 'faqs', label: 'FAQs', icon: HelpCircle },
  { id: 'blog', label: 'Blog', icon: FileText },
]

const TAB_BASE =
  'w-full flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm transition-colors text-left'
const TAB_IDLE = 'text-white/70 hover:text-white hover:bg-white/5'
const TAB_ACTIVE =
  'bg-gradient-to-r from-secondary to-secondary-light text-primary font-semibold'

export function AdminDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const renderContent = () => {
    switch (tab) {
      case 'overview': return <StatsOverview />
      case 'services': return <ServicesManager />
      case 'appointments': return <AppointmentsManager />
      case 'messages': return <MessagesManager />
      case 'stylists': return <StylistsManager />
      case 'gallery': return <GalleryManager />
      case 'testimonials': return <TestimonialsManager />
      case 'faqs': return <FaqsManager />
      case 'blog': return <BlogManager />
      default: return null
    }
  }

  const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
    <>
      <Link
        to="/"
        className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> View Website
      </Link>
      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => { setTab(t.id); onNavigate?.() }}
          className={cn(TAB_BASE, tab === t.id ? TAB_ACTIVE : TAB_IDLE)}
        >
          <t.icon className="w-4 h-4" />
          <span className="flex-1 text-left">{t.label}</span>
          {tab === t.id && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
        </button>
      ))}
    </>
  )

  return (
    <div className="min-h-screen bg-primary text-white flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/10 bg-primary-light/40 fixed inset-y-0">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center text-primary font-display font-bold">M</div>
            <div>
              <p className="font-display text-white text-sm">Maison Aurelle</p>
              <p className="text-[10px] uppercase tracking-widest text-white/40">Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="p-3 flex-1 flex flex-col gap-1 overflow-y-auto">
          <NavLinks />
        </nav>
        <div className="p-4 border-t border-white/10 flex items-center justify-between">
          <div>
            <p className="text-sm text-white">{user?.name ?? 'Admin'}</p>
            <p className="text-[11px] text-white/50 capitalize">{user?.role ?? 'admin'}</p>
          </div>
          <button onClick={handleLogout} aria-label="Logout" className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-primary-light/95 backdrop-blur border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center text-primary font-display font-bold text-sm">M</div>
          <span className="font-display text-white text-sm">Admin Panel</span>
        </div>
        <button onClick={() => setSidebarOpen(true)} className="p-2 text-white/70" aria-label="Open menu"><Menu className="w-5 h-5" /></button>
      </div>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 inset-y-0 w-72 bg-primary-light flex flex-col">
            <div className="p-5 flex items-center justify-between border-b border-white/10">
              <span className="font-display text-white">Menu</span>
              <button onClick={() => setSidebarOpen(false)} className="text-white/70 p-1" aria-label="Close menu"><Menu className="w-5 h-5" /></button>
            </div>
            <nav className="p-3 flex flex-col gap-1 flex-1 overflow-y-auto">
              <NavLinks onNavigate={() => setSidebarOpen(false)} />
            </nav>
            <div className="p-4 border-t border-white/10 flex items-center justify-between">
              <p className="text-sm text-white">{user?.name ?? 'Admin'}</p>
              <button onClick={handleLogout} className="p-2 text-white/60 hover:text-white" aria-label="Logout"><LogOut className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-64">
        <div className="p-4 sm:p-8 max-w-6xl mx-auto pt-20 lg:pt-8">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </main>
    </div>
  )
}