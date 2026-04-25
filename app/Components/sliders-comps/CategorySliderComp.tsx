"use client"
import { Categories } from '@/app/types/category.model'
import { Navigation, Pagination } from 'swiper/modules';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Link from 'next/link' // ✅ add this
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function CategorySliderComp({ category }: { category: Categories[] }) {

  if (!category || category.length === 0) return null;

  return (
    <div className='container px-15 py-5 mx-auto'>
      <h2 className='text-center text-3xl my-5'>Shop by Category</h2>

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
          <SwiperSlide key={cat.slug}>
            <Link href={`/categories/${cat.slug}`}> {/* ✅ navigates to category page */}
              <div className="flex items-center justify-center h-24 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 hover:from-black hover:to-slate-700 cursor-pointer transition-all duration-300 group border border-slate-200 hover:border-black">
                <p className="text-center font-semibold text-slate-800 group-hover:text-white px-3 capitalize transition-colors duration-300">
                  {cat.name}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}