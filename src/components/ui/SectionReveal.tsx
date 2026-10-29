import { type ReactNode } from 'react'
import { motion } from 'motion/react'
import { useMotionPreference } from '@/components/providers/MotionPreferenceProvider'

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  once?: boolean
  role?: string
  distance?: number
}

export default function SectionReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  once = true,
  role,
  distance = 32,
}: SectionRevealProps) {
  const { prefersReducedMotion } = useMotionPreference()

  const variants = {
    hidden: prefersReducedMotion
      ? { opacity: 1, x: 0, y: 0 }
      : {
          opacity: 0,
          y: direction === 'up' ? distance : 0,
          x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
        },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.85,
        ease: [0.16, 1, 0.3, 1] as [number,number,number,number],
        delay: prefersReducedMotion ? 0 : delay,
      },
    },
  }

  return (
    <motion.div
      className={className}
      role={role}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
    >
      {children}
    </motion.div>
  )
}
