import { Products } from '@/app/types/products.model'
import React from 'react'
import ProductCard from './ProductCard'

export default function ProductsGridSystem({ products }: { products: Products[] }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-4xl tracking-tighter font-extrabold text-center my-7">Our Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {products.map((product) => (
                    <ProductCard key={product.id} productData={product} /> // ✅ fixed
                ))}
            </div>
        </div>
    )
}