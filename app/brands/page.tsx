"use client"
import { getBrand } from '@/lib/CounterSlice'
import { AppDispatch, RootState } from '@/lib/store'
import { Brand } from '@/app/types/brands.model'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'

export default function BrandsPage() {
  const { data: session } = useSession()
  const { brands, isLoading } = useSelector((state: RootState) => state.counterRed)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getBrand())
  }, [dispatch]) // ✅ added dependency array to avoid infinite loop

  if (!session) {
    return (
      <div className='text-center my-20'>
        <p className='text-2xl font-bold'>You need to Login</p>
        <Link href="/login" className='text-blue-600 underline mt-4 block'>Go to Login</Link>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='text-center my-20'>
        <p className='text-2xl'>Loading brands...</p>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-extrabold tracking-tighter text-center my-7'>Our Brands</h1>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {(brands as Brand[]).map((brand) => (
          <div
            key={brand._id}
            className='flex flex-col items-center justify-center p-4 border rounded-xl hover:shadow-lg hover:border-black transition-all duration-300 cursor-pointer group'
          >
            <div className='relative w-full h-32 overflow-hidden rounded-lg'>
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className='object-contain group-hover:scale-110 transition-transform duration-300'
              />
            </div>
            <p className='text-center font-semibold mt-3 text-sm'>{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}