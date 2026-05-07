"use client"
import { Categories } from '@/app/types/category.model'
import { Navigation, Pagination } from 'swiper/modules';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function CategorySliderComp({ category }: { category: Categories[] }) {

  if (!category || category.length === 0) return null;

  return (
    <div className='container px-15 py-5 mx-auto'>
      <h2 className='text-4xl tracking-tighter font-extrabold text-center my-7'>Shop by Category</h2>

      <style>{`
        .category-swiper .swiper-button-next,
        .category-swiper .swiper-button-prev {
          top: calc(50% - 20px);
        }
      `}</style>

      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="mySwiper category-swiper"
        style={{ paddingBottom: '40px' }}
        breakpoints={{
          0:    { slidesPerView: 2 },
          768:  { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {category.map((cat) => (
          <SwiperSlide key={cat._id}>
            <div className="relative w-full h-48 overflow-hidden rounded-xl cursor-pointer group">
              <Image
                src={cat.image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                alt={cat.name}
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                priority
              />
              <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 font-semibold">
                {cat.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}