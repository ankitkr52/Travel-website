import flightsData from '@/data/flights.json'
import type { Flight } from '@/types/flight'

const flights = flightsData as unknown as Flight[]

export const flightService = {
  getAll: (): Flight[] => flights,

  search: (fromCode: string, toCode: string): Flight[] =>
    flights.filter((f) => f.fromCode === fromCode && f.toCode === toCode),
}
