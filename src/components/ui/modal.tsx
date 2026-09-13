import type { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

export function Modal({ isOpen, onClose, title, size = 'md', children }: ModalProps) {
  const reduceMotion = useReducedMotion()

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                role="dialog"
                className={cn(
                  'fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2',
                  'rounded bg-surface p-6 shadow-lg outline-none',
                  sizeClasses[size],
                )}
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.95 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
              >
                {title ? (
                  <Dialog.Title className="mb-4 text-lg font-semibold text-text-primary">
                    {title}
                  </Dialog.Title>
                ) : (
                  <Dialog.Title className="sr-only">Dialog</Dialog.Title>
                )}
                {children}
                <Dialog.Close
                  aria-label="Close"
                  className="absolute top-4 right-4 rounded text-text-muted hover:text-text-primary focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <X className="size-5" />
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
