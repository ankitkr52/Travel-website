import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { destinationService } from '@/services/destinationService'
import type { CreateDestinationInput } from '@/types/destination'

const QUERY_KEY = ['destinations']

export function useDestinations() {
  return useQuery({ queryKey: QUERY_KEY, queryFn: destinationService.getAll })
}

export function useDestination(slug: string | undefined) {
  return useQuery({
    queryKey: [...QUERY_KEY, slug],
    queryFn: () => destinationService.getBySlug(slug!),
    enabled: !!slug,
  })
}

export function useCreateDestination() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: CreateDestinationInput) => destinationService.create(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export function useUpdateDestination() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: Partial<CreateDestinationInput> }) =>
      destinationService.update(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export function useDeleteDestination() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => destinationService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}
