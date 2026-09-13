import type { Booking, BookingStatus, CreateBookingInput } from '@/types/booking'
import { readStorage, writeStorage } from '@/lib/storage'

const KEY = 'bookings'
const ID_PREFIX: Record<Booking['type'], string> = { package: 'PKG', hotel: 'HTL', flight: 'FLT' }

function generateBookingId(type: Booking['type']): string {
  const random = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `${ID_PREFIX[type]}-${Date.now()}-${random}`
}

export const bookingService = {
  getAll: (): Booking[] => readStorage<Booking[]>(KEY, []),

  getByUserId: (userId: string): Booking[] =>
    bookingService.getAll().filter((b) => b.userId === userId),

  create: (input: CreateBookingInput): Booking => {
    const booking: Booking = {
      ...input,
      id: generateBookingId(input.type),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    }
    writeStorage(KEY, [...bookingService.getAll(), booking])
    return booking
  },

  updateStatus: (id: string, status: BookingStatus): void => {
    const all = bookingService.getAll()
    const index = all.findIndex((b) => b.id === id)
    if (index === -1) return
    all[index] = { ...all[index], status }
    writeStorage(KEY, all)
  },
}
