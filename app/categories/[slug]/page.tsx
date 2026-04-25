import ProductsGridSystem from '@/app/Components/products-comps/ProductsGridSystem'
import axios from 'axios'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = await params // ✅ await params first

  const response = await axios.get(`https://dummyjson.com/products/category/${slug}`)
  const products = response.data.products ?? []

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-10 capitalize">
        {slug.replace(/-/g, ' ')}
      </h1>
      <ProductsGridSystem products={products} />
    </div>
  )
}