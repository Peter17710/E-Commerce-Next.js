"use client"

import { Categories } from '@/app/types/category.model'
import Image from 'next/image';
import { Navigation, Pagination } from 'swiper/modules';
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function CategorySliderComp({category} : {category : Categories[]}) {
  return (

        <div className='container px-15 py-5 mx-auto'>
        <h2 className='text-center text-3xl my-5'>Category Slider</h2>
         <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >

        {category.map((cat)=> <>
         <SwiperSlide key={cat._id}>
      <div className="relative w-full h-100 md:h-125 lg:h-75 overflow-hidden rounded-xl">
          <Image src={cat.image} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px" alt="slider" className="object-cover" priority loading="eager"/>     
         <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">{cat.name}</p>
          </div>
        </SwiperSlide>
        </>
        )}

      </Swiper>
    </div>

  )
}
