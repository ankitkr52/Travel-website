import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastItem {
  id: string
  type: ToastType
  message: string
  duration: number
}

interface ToastState {
  toasts: ToastItem[]
  show: (type: ToastType, message: string, duration?: number) => void
  dismiss: (id: string) => void
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  show: (type, message, duration = 5000) =>
    set((state) => ({
      toasts: [...state.toasts, { id: crypto.randomUUID(), type, message, duration }],
    })),
  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))

export const toast = {
  success: (message: string, duration?: number) =>
    useToastStore.getState().show('success', message, duration),
  error: (message: string, duration?: number) =>
    useToastStore.getState().show('error', message, duration),
  warning: (message: string, duration?: number) =>
    useToastStore.getState().show('warning', message, duration),
  info: (message: string, duration?: number) =>
    useToastStore.getState().show('info', message, duration),
}
