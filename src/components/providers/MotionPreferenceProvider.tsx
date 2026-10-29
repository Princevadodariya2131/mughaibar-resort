import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface MotionPreferenceContextValue {
  prefersReducedMotion: boolean
}

const MotionPreferenceContext = createContext<MotionPreferenceContextValue>({
  prefersReducedMotion: false,
})

export function useMotionPreference() {
  return useContext(MotionPreferenceContext)
}

interface Props {
  children: ReactNode
}

export default function MotionPreferenceProvider({ children }: Props) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <MotionPreferenceContext.Provider value={{ prefersReducedMotion }}>
      {children}
    </MotionPreferenceContext.Provider>
  )
}
