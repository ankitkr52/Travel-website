export interface RoomType {
  id: string
  name: string
  pricePerNight: number
  capacity: number
  amenities: string[]
}

export interface Hotel {
  id: string
  slug: string
  name: string
  destinationId: string
  city: string
  address: string
  shortDescription: string
  description: string
  heroImage: string
  images: string[]
  starRating: number
  rating: number
  reviewCount: number
  pricePerNight: number
  amenities: string[]
  roomTypes: RoomType[]
}

export type CreateHotelInput = Omit<Hotel, 'id'>
