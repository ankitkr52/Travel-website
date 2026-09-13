import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { reviewService } from '@/services/reviewService'
import type { CreateReviewInput, Review } from '@/types/review'

export function useReviews(targetType: Review['targetType'], targetId: string | undefined) {
  return useQuery({
    queryKey: ['reviews', targetType, targetId],
    queryFn: () => reviewService.getByTarget(targetType, targetId!),
    enabled: !!targetId,
  })
}

export function useCreateReview() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: CreateReviewInput) => reviewService.create(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reviews'] }),
  })
}

export function useSetReviewFlagged() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, flagged }: { id: string; flagged: boolean }) =>
      reviewService.setFlagged(id, flagged),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reviews'] }),
  })
}
