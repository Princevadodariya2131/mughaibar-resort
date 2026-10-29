import { useCallback, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import PropertyImage from '@/components/ui/PropertyImage'
import { captionFor } from '@/components/ui/Figure'
import { useMotionPreference } from '@/components/providers/MotionPreferenceProvider'
import type { ResortImage } from '@/data/images'

/**
 * Accessible image viewer.
 *  • role="dialog", aria-modal, labelled; focus moves in, Tab is trapped, Escape closes, focus returns to the thumbnail
 *  • ← / → keys and on-screen buttons; horizontal swipe on touch screens
 *  • page scroll is locked while open
 */
export default function Lightbox({
  images,
  index,
  onIndexChange,
  onClose,
}: {
  images: ResortImage[]
  index: number
  onIndexChange: (i: number) => void
  onClose: () => void
}) {
  const { prefersReducedMotion } = useMotionPreference()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const swipeStart = useRef<number | null>(null)
  const count = images.length
  const image = images[index]

  const prev = useCallback(() => onIndexChange((index - 1 + count) % count), [index, count, onIndexChange])
  const next = useCallback(() => onIndexChange((index + 1) % count), [index, count, onIndexChange])

  // Remember what had focus so it can be restored on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
      opener?.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowLeft') { prev(); return }
      if (e.key === 'ArrowRight') { next(); return }
      if (e.key !== 'Tab') return
      const items = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled])') ?? [])
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, prev, next])

  if (!image) return null

  const onPointerDown = (e: React.PointerEvent) => { swipeStart.current = e.clientX }
  const onPointerUp = (e: React.PointerEvent) => {
    if (swipeStart.current === null) return
    const dx = e.clientX - swipeStart.current
    swipeStart.current = null
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)()
  }

  const navButton =
    'flex h-12 w-12 items-center justify-center rounded-full border border-limewash/30 text-limewash transition-colors hover:border-sandstone hover:text-sandstone'

  return (
    <motion.div
      ref={dialogRef}
      className="lightbox-backdrop on-dark text-limewash"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-caption"
      initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
      onClick={onClose}
    >
      <div className="flex h-full w-full max-w-5xl flex-col justify-center px-5 py-16 sm:px-8" onClick={(e) => e.stopPropagation()}>
        <div
          className="relative mx-auto aspect-[4/3] max-h-[68svh] w-full touch-pan-y select-none bg-charcoal-50"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <PropertyImage image={image} seed={100 + index} fit="contain" />
        </div>

        <div className="mt-5 flex items-start justify-between gap-6">
          <p id="lightbox-caption" className="font-sans text-[15px] leading-snug text-limewash/90">
            {captionFor(image)}
          </p>
          <p className="shrink-0 font-sans text-[13px] tabular-nums text-limewash/70" aria-live="polite">
            {index + 1} / {count}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button type="button" onClick={prev} className={navButton} aria-label="Previous image">
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button type="button" onClick={next} className={navButton} aria-label="Next image">
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>
      </div>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className={`absolute right-4 top-4 sm:right-6 sm:top-6 ${navButton}`}
        aria-label="Close image viewer"
      >
        <X size={20} aria-hidden="true" />
      </button>
    </motion.div>
  )
}
