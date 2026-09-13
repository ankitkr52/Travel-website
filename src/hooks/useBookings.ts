import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { bookingService } from '@/services/bookingService'
import type { CreateBookingInput } from '@/types/booking'

export function useBookings(userId: string | undefined) {
  return useQuery({
    queryKey: ['bookings', userId],
    queryFn: () => bookingService.getByUserId(userId!),
    enabled: !!userId,
  })
}

export function useCreateBooking() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: CreateBookingInput) => bookingService.create(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bookings'] }),
  })
}
