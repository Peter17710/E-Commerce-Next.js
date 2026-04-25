export interface ProductDetails {
    id: number
    title: string
    description: string
    price: number
    thumbnail: string
    images: string[]
    rating: number
    stock: number
    brand: string
    category: string
    tags: string[]
    discountPercentage: number
    reviews: Review[]
}

export interface Review {
    rating: number
    comment: string
    reviewerName: string
    reviewerEmail: string
    date: string
}