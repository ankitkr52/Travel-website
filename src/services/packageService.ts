import type { CreatePackageInput, TourPackage } from '@/types/package'
import { readStorage, writeStorage } from '@/lib/storage'

const KEY = 'packages'

export const packageService = {
  getAll: (): TourPackage[] => readStorage<TourPackage[]>(KEY, []),

  getBySlug: (slug: string): TourPackage | null =>
    packageService.getAll().find((p) => p.slug === slug) ?? null,

  getById: (id: string): TourPackage | null =>
    packageService.getAll().find((p) => p.id === id) ?? null,

  getByDestinationId: (destinationId: string): TourPackage[] =>
    packageService.getAll().filter((p) => p.destinationId === destinationId),

  create: (input: CreatePackageInput): TourPackage => {
    const tourPackage: TourPackage = { ...input, id: crypto.randomUUID() }
    writeStorage(KEY, [...packageService.getAll(), tourPackage])
    return tourPackage
  },

  update: (id: string, input: Partial<CreatePackageInput>): TourPackage | null => {
    const all = packageService.getAll()
    const index = all.findIndex((p) => p.id === id)
    if (index === -1) return null
    all[index] = { ...all[index], ...input }
    writeStorage(KEY, all)
    return all[index]
  },

  delete: (id: string): void => {
    writeStorage(
      KEY,
      packageService.getAll().filter((p) => p.id !== id),
    )
  },
}
