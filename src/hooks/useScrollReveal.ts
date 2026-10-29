import { useEffect, useRef } from 'react'
import { useMotionPreference } from '@/components/providers/MotionPreferenceProvider'

interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {},
) {
  const ref = useRef<T>(null)
  const { prefersReducedMotion } = useMotionPreference()
  const { threshold = 0.15, rootMargin = '0px 0px -60px 0px', once = true } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Immediately reveal if user prefers reduced motion
    if (prefersReducedMotion) {
      element.classList.add('revealed')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.remove('revealed')
          }
        })
      },
      { threshold, rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once, prefersReducedMotion])

  return ref
}
