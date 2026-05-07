"use client"
import { useWishlist } from '@/app/context/WishlistContext'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()

  if (wishlist.length === 0) {
    return (
      <div className='text-center my-20'>
        <h2 className='text-2xl font-bold mb-4'>Your wishlist is empty</h2>
        <Link href="/" className='text-blue-600 underline'>Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-extrabold tracking-tighter text-center my-7'>My Wishlist</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {wishlist.map(product => (
          <div key={product._id} className='border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300'>
            <div className='relative w-full h-48'>
              <Image
                src={product.imageCover}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className='object-cover'
              />
            </div>
            <div className='p-4'>
              <h3 className='font-semibold text-lg line-clamp-1'>{product.title}</h3>
              <p className='text-gray-500 text-sm mb-3'>{product.category.name}</p>
              <div className='flex items-center justify-between'>
                <span className='font-bold'>{product.price.toFixed(2)} EGP</span>
                <button
                  onClick={() => {
                    removeFromWishlist(product._id)
                    toast.success("Removed from wishlist")
                  }}
                  className='text-red-500 hover:text-red-700'
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <Link href={`/products/${product._id}`}>
                <button className='w-full mt-3 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors'>
                  View Product
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}