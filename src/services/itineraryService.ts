import prebuiltData from '@/data/itineraries.json'
import type { CreateCustomItineraryInput, CustomItinerary, Itinerary } from '@/types/itinerary'
import { readStorage, writeStorage } from '@/lib/storage'

const prebuilt = prebuiltData as Itinerary[]
const KEY = 'itineraries'

export const itineraryService = {
  getPrebuilt: (): Itinerary[] => prebuilt,

  getPrebuiltBySlug: (slug: string): Itinerary | null =>
    prebuilt.find((i) => i.slug === slug) ?? null,

  getCustomByUserId: (userId: string): CustomItinerary[] =>
    readStorage<CustomItinerary[]>(KEY, []).filter((i) => i.userId === userId),

  getCustomById: (id: string): CustomItinerary | null =>
    readStorage<CustomItinerary[]>(KEY, []).find((i) => i.id === id) ?? null,

  createCustom: (input: CreateCustomItineraryInput): CustomItinerary => {
    const itinerary: CustomItinerary = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    const all = readStorage<CustomItinerary[]>(KEY, [])
    writeStorage(KEY, [...all, itinerary])
    return itinerary
  },

  updateCustom: (id: string, input: Partial<CreateCustomItineraryInput>): CustomItinerary | null => {
    const all = readStorage<CustomItinerary[]>(KEY, [])
    const index = all.findIndex((i) => i.id === id)
    if (index === -1) return null
    all[index] = { ...all[index], ...input }
    writeStorage(KEY, all)
    return all[index]
  },

  deleteCustom: (id: string): void => {
    writeStorage(
      KEY,
      readStorage<CustomItinerary[]>(KEY, []).filter((i) => i.id !== id),
    )
  },
}
