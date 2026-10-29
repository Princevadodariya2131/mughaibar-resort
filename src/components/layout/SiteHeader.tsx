import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'
import { RESORT } from '@/data/resort'
import { useMotionPreference } from '@/components/providers/MotionPreferenceProvider'

const NAV_LINKS = [
  { to: '/stay', label: 'Stay' },
  { to: '/experiences', label: 'Experiences' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/location', label: 'Location' },
]

/** Every route opens on an ivory ground, so the header ink is always umber. */
export default function SiteHeader() {
  const { prefersReducedMotion } = useMotionPreference()
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLButtonElement>(null)
  const lastY = useRef(0)

  useEffect(() => { setOpen(false); setHidden(false) }, [pathname])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setSolid(y > 40)
      // hide while travelling down the page, return on any upward movement
      if (y > 240 && y > lastY.current + 4) setHidden(true)
      else if (y < lastY.current - 4) setHidden(false)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: focus moves in, Tab stays inside, Escape closes, focus returns to the button.
  useEffect(() => {
    if (!open) return
    const opener = openerRef.current
    const focusables = () =>
      Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])
    focusables()[0]?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); return }
      if (e.key !== 'Tab') return
      const items = focusables()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      opener?.focus()
    }
  }, [open])

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 text-umber transition-colors duration-300 ${solid ? 'bg-limewash/95 shadow-[0_1px_0_rgba(37,31,26,0.14)]' : 'bg-transparent'}`}
        animate={{ y: hidden && !open ? '-100%' : 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <div className="container-resort flex h-16 items-center justify-between lg:h-20">
          <Link to="/" className="flex items-baseline gap-2" aria-label="Mughaibar Fort Resort, home">
            <span className="display-fraunces text-xl lg:text-2xl">Mughaibar</span>
            <span className="hidden font-sans text-[13px] text-hajar sm:inline">Fort Resort</span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `font-sans text-[15px] underline-offset-[6px] decoration-1 transition-colors hover:text-dam ${isActive ? 'underline' : ''}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-bronze !min-h-[44px] !px-5 !text-sm">
              Enquire
            </Link>
          </nav>

          <button
            ref={openerRef}
            className="min-h-[44px] px-1 font-sans text-[15px] font-medium underline decoration-1 underline-offset-[6px] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-[60] flex flex-col bg-limewash text-umber"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.7, 0, 0.2, 1] }}
          >
            <div className="container-resort flex h-16 items-center justify-between">
              <span className="display-fraunces text-xl">Mughaibar</span>
              <button className="flex min-h-[44px] items-center gap-2 text-[15px] font-medium" onClick={() => setOpen(false)}>
                Close <X size={18} aria-hidden="true" />
              </button>
            </div>
            <nav className="container-resort flex flex-1 flex-col justify-center gap-1" aria-label="Mobile navigation">
              {[{ to: '/', label: 'Home' }, ...NAV_LINKS, { to: '/contact', label: 'Send an enquiry' }].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ y: prefersReducedMotion ? 0 : 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.2 + i * 0.05, duration: prefersReducedMotion ? 0 : 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <NavLink to={l.to} end={l.to === '/'} className="display-fraunces block py-2 text-[clamp(2.2rem,9vw,3.4rem)] leading-tight aria-[current=page]:text-dam">
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="container-resort pb-8 font-sans text-[15px]">
              <a href={RESORT.contact.phoneHref} className="underline underline-offset-4">{RESORT.contact.phone}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
