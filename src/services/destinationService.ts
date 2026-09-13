import type { CreateDestinationInput, Destination } from '@/types/destination'
import { readStorage, writeStorage } from '@/lib/storage'

const KEY = 'destinations'

export const destinationService = {
  getAll: (): Destination[] => readStorage<Destination[]>(KEY, []),

  getBySlug: (slug: string): Destination | null =>
    destinationService.getAll().find((d) => d.slug === slug) ?? null,

  getById: (id: string): Destination | null =>
    destinationService.getAll().find((d) => d.id === id) ?? null,

  create: (input: CreateDestinationInput): Destination => {
    const destination: Destination = { ...input, id: crypto.randomUUID() }
    writeStorage(KEY, [...destinationService.getAll(), destination])
    return destination
  },

  update: (id: string, input: Partial<CreateDestinationInput>): Destination | null => {
    const all = destinationService.getAll()
    const index = all.findIndex((d) => d.id === id)
    if (index === -1) return null
    all[index] = { ...all[index], ...input }
    writeStorage(KEY, all)
    return all[index]
  },

  delete: (id: string): void => {
    writeStorage(
      KEY,
      destinationService.getAll().filter((d) => d.id !== id),
    )
  },
}
