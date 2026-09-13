import * as Dialog from '@radix-ui/react-dialog'
import { motion, useReducedMotion } from 'framer-motion'

/** Shared fade-in backdrop for Dialog-based components (Modal, NavDrawer). */
export function Overlay() {
  const reduceMotion = useReducedMotion()

  return (
    <Dialog.Overlay asChild forceMount>
      <motion.div
        className="fixed inset-0 z-50 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.2 }}
      />
    </Dialog.Overlay>
  )
}
