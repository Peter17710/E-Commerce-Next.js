export interface CategoryRef {
    _id: string
    name: string
    slug: string
    category?: string
    image?: string
}

export interface Products {
    _id: string
    title: string
    slug: string
    description: string
    price: number
    quantity: number
    sold: number
    images: string[]
    imageCover: string
    category: CategoryRef
    brand: CategoryRef
    subcategory: CategoryRef[]
    ratingsAverage: number
    ratingsQuantity: number
    createdAt: string
    updatedAt: string
}