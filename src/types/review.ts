export type ReviewTargetType = 'destination' | 'package' | 'hotel'

export interface Review {
  id: string
  targetType: ReviewTargetType
  targetId: string
  userId: string
  userName: string
  rating: number
  title: string
  comment: string
  createdAt: string
  flagged: boolean
}

export type CreateReviewInput = Omit<Review, 'id' | 'createdAt' | 'flagged'>
