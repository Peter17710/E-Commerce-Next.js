import ProductsGridSystem from '@/app/Components/products-comps/ProductsGridSystem'
import { getCategories } from '@/app/actions/categories.action'
import axios from 'axios'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // ✅ get category name from _id to display in title
  const categoriesRes = await getCategories()
  const categories = categoriesRes?.data ?? []
  const category = categories.find((cat: any) => cat._id === slug)

  const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${slug}`)
  const products = response.data.data ?? []

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-10 capitalize">
        {category?.name ?? slug}
      </h1>
      <ProductsGridSystem products={products} />
    </div>
  )
}