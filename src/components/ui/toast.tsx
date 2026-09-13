import * as ToastPrimitive from '@radix-ui/react-toast'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'
import { useToastStore, type ToastType } from '@/stores/toastStore'
import { cn } from '@/lib/utils'

const icons: Record<ToastType, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const colors: Record<ToastType, string> = {
  success: 'text-success',
  error: 'text-error',
  warning: 'text-warning',
  info: 'text-primary',
}

/** Mount once near the app root; toasts are triggered imperatively via `toast.success(...)` etc. */
export function Toaster() {
  const { toasts, dismiss } = useToastStore()

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = icons[t.type]
          return (
            <ToastPrimitive.Root
              key={t.id}
              duration={t.duration}
              onOpenChange={(open) => !open && dismiss(t.id)}
              asChild
              forceMount
            >
              <motion.li
                layout
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 rounded border border-border bg-surface p-4 shadow-lg"
              >
                <Icon className={cn('size-5 shrink-0', colors[t.type])} aria-hidden />
                <ToastPrimitive.Description className="text-sm text-text-primary">
                  {t.message}
                </ToastPrimitive.Description>
              </motion.li>
            </ToastPrimitive.Root>
          )
        })}
      </AnimatePresence>
      <ToastPrimitive.Viewport className="fixed top-4 right-4 z-[100] flex w-full max-w-sm list-none flex-col gap-2 outline-none" />
    </ToastPrimitive.Provider>
  )
}
