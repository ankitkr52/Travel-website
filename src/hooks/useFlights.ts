import { useQuery } from '@tanstack/react-query'
import { flightService } from '@/services/flightService'
import { airportService } from '@/services/airportService'

export function useFlights() {
  return useQuery({ queryKey: ['flights'], queryFn: flightService.getAll })
}

export function useFlightSearch(fromCode: string, toCode: string) {
  return useQuery({
    queryKey: ['flights', 'search', fromCode, toCode],
    queryFn: () => flightService.search(fromCode, toCode),
    enabled: !!fromCode && !!toCode,
  })
}

export function useAirports() {
  return useQuery({ queryKey: ['airports'], queryFn: airportService.getAll })
}
