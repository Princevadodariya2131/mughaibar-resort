import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import PageLoader from '@/components/ui/PageLoader'
import AppErrorBoundary from '@/components/ui/AppErrorBoundary'
import MotionPreferenceProvider from '@/components/providers/MotionPreferenceProvider'
import ScrollToTop from '@/components/ui/ScrollToTop'

const HomePage        = lazy(() => import('@/pages/HomePage'))
const StayPage        = lazy(() => import('@/pages/StayPage'))
const ExperiencesPage = lazy(() => import('@/pages/ExperiencesPage'))
const GalleryPage     = lazy(() => import('@/pages/GalleryPage'))
const LocationPage    = lazy(() => import('@/pages/LocationPage'))
const ContactPage     = lazy(() => import('@/pages/ContactPage'))
const NotFoundPage    = lazy(() => import('@/pages/NotFoundPage'))

function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"           element={<HomePage />} />
        <Route path="/stay"       element={<StayPage />} />
        <Route path="/experiences" element={<ExperiencesPage />} />
        <Route path="/gallery"    element={<GalleryPage />} />
        <Route path="/location"   element={<LocationPage />} />
        <Route path="/contact"    element={<ContactPage />} />
        <Route path="*"           element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <MotionPreferenceProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <AppErrorBoundary>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] btn-sand">
            Skip to main content
          </a>
          <div className="min-h-screen flex flex-col bg-limewash">
            <SiteHeader />
            <main id="main-content" className="flex-1">
              <Suspense fallback={<PageLoader />}>
                <AppRoutes />
              </Suspense>
            </main>
            <SiteFooter />
          </div>
        </AppErrorBoundary>
      </BrowserRouter>
    </MotionPreferenceProvider>
  )
}
