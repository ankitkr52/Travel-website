import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { hotelService } from '@/services/hotelService'
import type { CreateHotelInput } from '@/types/hotel'

const QUERY_KEY = ['hotels']

export function useHotels() {
  return useQuery({ queryKey: QUERY_KEY, queryFn: hotelService.getAll })
}

export function useHotel(slug: string | undefined) {
  return useQuery({
    queryKey: [...QUERY_KEY, slug],
    queryFn: () => hotelService.getBySlug(slug!),
    enabled: !!slug,
  })
}

export function useCreateHotel() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: CreateHotelInput) => hotelService.create(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export function useUpdateHotel() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: Partial<CreateHotelInput> }) =>
      hotelService.update(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export function useDeleteHotel() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => hotelService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}
