import type { CreateHotelInput, Hotel } from '@/types/hotel'
import { readStorage, writeStorage } from '@/lib/storage'

const KEY = 'hotels'

export const hotelService = {
  getAll: (): Hotel[] => readStorage<Hotel[]>(KEY, []),

  getBySlug: (slug: string): Hotel | null =>
    hotelService.getAll().find((h) => h.slug === slug) ?? null,

  getById: (id: string): Hotel | null => hotelService.getAll().find((h) => h.id === id) ?? null,

  getByDestinationId: (destinationId: string): Hotel[] =>
    hotelService.getAll().filter((h) => h.destinationId === destinationId),

  create: (input: CreateHotelInput): Hotel => {
    const hotel: Hotel = { ...input, id: crypto.randomUUID() }
    writeStorage(KEY, [...hotelService.getAll(), hotel])
    return hotel
  },

  update: (id: string, input: Partial<CreateHotelInput>): Hotel | null => {
    const all = hotelService.getAll()
    const index = all.findIndex((h) => h.id === id)
    if (index === -1) return null
    all[index] = { ...all[index], ...input }
    writeStorage(KEY, all)
    return all[index]
  },

  delete: (id: string): void => {
    writeStorage(
      KEY,
      hotelService.getAll().filter((h) => h.id !== id),
    )
  },
}
