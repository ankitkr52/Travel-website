import { motion, useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'

/**
 * Enter-only fade+slide on route change. An exit animation was deliberately
 * dropped: AnimatePresence's `mode="wait"` combined with nested route guards
 * proved unstable (guards saw a live location mid-exit, and separately the
 * transition could deadlock on ordinary client-side navigation) — revisit if
 * a future phase needs a fuller transition.
 */
export function AnimatedOutlet() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeOut' }}
    >
      <Outlet />
    </motion.div>
  )
}
