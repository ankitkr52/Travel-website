export interface PackageItineraryDay {
  day: number
  title: string
  description: string
}

export interface TourPackage {
  id: string
  slug: string
  name: string
  destinationId: string
  category: string
  shortDescription: string
  description: string
  heroImage: string
  images: string[]
  durationDays: number
  durationNights: number
  price: number
  rating: number
  reviewCount: number
  maxGroupSize: number
  inclusions: string[]
  exclusions: string[]
  itinerary: PackageItineraryDay[]
}

export type CreatePackageInput = Omit<TourPackage, 'id'>
