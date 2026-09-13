export interface ItineraryActivity {
  id: string
  time?: string
  title: string
  description: string
  destinationId?: string
  hotelId?: string
  cost: number
}

export interface ItineraryDay {
  day: number
  activities: ItineraryActivity[]
}

export interface Itinerary {
  id: string
  slug: string
  title: string
  description: string
  heroImage: string
  durationDays: number
  destinationIds: string[]
  days: ItineraryDay[]
  estimatedCost: number
}

export interface CustomItinerary {
  id: string
  userId: string
  title: string
  destinationIds: string[]
  days: ItineraryDay[]
  estimatedCost: number
  createdAt: string
}

export type CreateCustomItineraryInput = Omit<CustomItinerary, 'id' | 'createdAt'>
