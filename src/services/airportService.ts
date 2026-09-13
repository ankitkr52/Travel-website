import airports from '@/data/airports.json'
import type { Airport } from '@/types/flight'

export const airportService = {
  getAll: (): Airport[] => airports,

  getByCode: (code: string): Airport | null => airports.find((a) => a.code === code) ?? null,
}
