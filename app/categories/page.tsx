import { getCategories } from '@/app/actions/categories.action'
import Image from 'next/image'
import Link from 'next/link'

export default async function CategoriesPage() {
  const response = await getCategories()
  const categories = response?.data ?? []

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-extrabold tracking-tighter text-center my-7'>All Categories</h1>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {categories.map((cat: any) => (
          <Link href={`/categories/${cat._id}`} key={cat._id}>
            <div className='flex flex-col items-center justify-center border rounded-xl hover:shadow-lg hover:border-black transition-all duration-300 cursor-pointer group overflow-hidden'>
              <div className='relative w-full h-40 overflow-hidden'>
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className='object-cover group-hover:scale-110 transition-transform duration-300'
                />
              </div>
              <p className='text-center font-semibold py-3 text-sm capitalize'>{cat.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}