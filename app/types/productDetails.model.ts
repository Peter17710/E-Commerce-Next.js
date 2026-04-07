export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}

export interface Review {
    _id?: string;
    rating?: number;
    comment?: string;
    user?: string;
    createdAt?: string;
}

export interface ProductDetails {
    _id: string;
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    imageCover: string;
    images: string[];
    category: Category;
    subcategory: Subcategory[];
    brand: Brand;
    ratingsAverage: number;
    ratingsQuantity: number;
    reviews: Review[];
    quantity: number;
    sold: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}