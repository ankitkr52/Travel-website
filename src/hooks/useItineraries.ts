import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { itineraryService } from '@/services/itineraryService'
import type { CreateCustomItineraryInput } from '@/types/itinerary'

export function usePrebuiltItineraries() {
  return useQuery({ queryKey: ['itineraries', 'prebuilt'], queryFn: itineraryService.getPrebuilt })
}

export function usePrebuiltItinerary(slug: string | undefined) {
  return useQuery({
    queryKey: ['itineraries', 'prebuilt', slug],
    queryFn: () => itineraryService.getPrebuiltBySlug(slug!),
    enabled: !!slug,
  })
}

export function useCustomItineraries(userId: string | undefined) {
  return useQuery({
    queryKey: ['itineraries', 'custom', userId],
    queryFn: () => itineraryService.getCustomByUserId(userId!),
    enabled: !!userId,
  })
}

export function useCreateCustomItinerary() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: CreateCustomItineraryInput) => itineraryService.createCustom(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['itineraries', 'custom'] }),
  })
}
