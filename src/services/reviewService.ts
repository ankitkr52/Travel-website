import type { CreateReviewInput, Review } from '@/types/review'
import { readStorage, writeStorage } from '@/lib/storage'

const KEY = 'reviews'

export const reviewService = {
  getAll: (): Review[] => readStorage<Review[]>(KEY, []),

  getByTarget: (targetType: Review['targetType'], targetId: string): Review[] =>
    reviewService
      .getAll()
      .filter((r) => r.targetType === targetType && r.targetId === targetId && !r.flagged),

  create: (input: CreateReviewInput): Review => {
    const review: Review = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      flagged: false,
    }
    writeStorage(KEY, [...reviewService.getAll(), review])
    return review
  },

  setFlagged: (id: string, flagged: boolean): void => {
    const all = reviewService.getAll()
    const index = all.findIndex((r) => r.id === id)
    if (index === -1) return
    all[index] = { ...all[index], flagged }
    writeStorage(KEY, all)
  },

  delete: (id: string): void => {
    writeStorage(
      KEY,
      reviewService.getAll().filter((r) => r.id !== id),
    )
  },
}
