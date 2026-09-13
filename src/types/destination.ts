export interface Destination {
  id: string
  slug: string
  name: string
  state: string
  region: string
  shortDescription: string
  description: string
  heroImage: string
  images: string[]
  rating: number
  reviewCount: number
  startingPrice: number
  bestTimeToVisit: string
  tags: string[]
  highlights: string[]
}

export type CreateDestinationInput = Omit<Destination, 'id'>
