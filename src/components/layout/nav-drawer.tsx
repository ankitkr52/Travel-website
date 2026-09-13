import type { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { Overlay } from '@/components/ui/overlay'

export interface NavDrawerProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

/** Full-height right-side slide-in drawer — mobile nav (Header) and mobile admin sidebar share this. */
export function NavDrawer({ isOpen, onClose, title, children }: NavDrawerProps) {
  const reduceMotion = useReducedMotion()

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Overlay />
            <Dialog.Content asChild forceMount>
              <motion.div
                className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col bg-surface p-6 shadow-lg outline-none"
                initial={{ x: reduceMotion ? 0 : '100%' }}
                animate={{ x: 0 }}
                exit={{ x: reduceMotion ? 0 : '100%' }}
                transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <Dialog.Title className="text-base font-semibold text-text-primary">
                    {title}
                  </Dialog.Title>
                  <Dialog.Close
                    aria-label="Close menu"
                    className="rounded text-text-muted hover:text-text-primary focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <X className="size-5" />
                  </Dialog.Close>
                </div>
                {children}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
