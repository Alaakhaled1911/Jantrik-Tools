export interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  rating: number
  discount: number
  image: string
  images?: string[]
  category?: "new" | "featured" | "rated"
  description?: string
  stock?: number
  reviews?: number
}
