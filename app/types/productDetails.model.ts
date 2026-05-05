import { Products } from './products.model'

export interface Review {
    _id?: string
    rating?: number
    comment?: string
    user?: string
    createdAt?: string
}

// ✅ extends Products so it's compatible with addToCart
export interface ProductDetails extends Products {
    reviews: Review[]
}