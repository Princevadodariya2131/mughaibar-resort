import { type ReactNode } from 'react'
import { motion } from 'motion/react'
import { useMotionPreference } from '@/components/providers/MotionPreferenceProvider'

/** Opacity-only route transition. The exit is kept short so navigation never feels held back. */
export default function PageTransition({ children }: { children: ReactNode }) {
  const { prefersReducedMotion } = useMotionPreference()

  if (prefersReducedMotion) {
    return <div>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
