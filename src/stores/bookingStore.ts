import { create } from 'zustand'

export type BookingDraftType = 'package' | 'hotel' | 'flight'

interface BookingState {
  type: BookingDraftType | null
  step: number
  draft: Record<string, unknown>
  start: (type: BookingDraftType) => void
  setStep: (step: number) => void
  updateDraft: (patch: Record<string, unknown>) => void
  reset: () => void
}

const initialState = { type: null, step: 0, draft: {} } satisfies Pick<
  BookingState,
  'type' | 'step' | 'draft'
>

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,
  start: (type) => set({ type, step: 0, draft: {} }),
  setStep: (step) => set({ step }),
  updateDraft: (patch) => set((state) => ({ draft: { ...state.draft, ...patch } })),
  reset: () => set(initialState),
}))
