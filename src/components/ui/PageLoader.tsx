import { motion } from 'motion/react'

/** Shown while a route's code loads. Ivory like the pages themselves, so there is no dark flash. */
export default function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-limewash text-umber"
      role="status"
      aria-label="Loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, delay: 0.12 }}
    >
      <span className="display-fraunces text-2xl">Mughaibar</span>
      <div className="relative h-px w-28 overflow-hidden bg-umber/15">
        <motion.div
          className="absolute inset-y-0 left-0 bg-dam"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.1 }}
          style={{ width: '50%' }}
        />
      </div>
    </motion.div>
  )
}
