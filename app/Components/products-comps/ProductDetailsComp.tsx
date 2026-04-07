"use client"
import { ProductDetails } from '@/app/types/productDetails.model'
import React from 'react'
import { StarRating } from 'react-flexible-star-rating';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';



export default function ProductDetailsComp({ProductDetails} : {ProductDetails : ProductDetails}) {


      console.log(ProductDetails);

      if (!ProductDetails) return <div>Loading...</div>;

  return (
    <div className="flex justify-between items-center gap-5 my-30 mx-20">
        <div className='w-full md:w-1/2 px-2'>
              <Swiper
                   slidesPerView={1}
                   spaceBetween={10}
                   navigation={true}
                   pagination={{
                     clickable: true,
                   }}
                   modules={[Navigation, Pagination]}
                   className="mySwiper"
                 >
           
                   {ProductDetails.images.map((src, index)=> <>
                    <SwiperSlide key={index}>
                 <div className="relative w-full h-100 md:h-125 lg:h-75 rounded-xl">
                     <Image src={src} className='object-contain' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px" alt="slider" priority loading="eager"/>     
                     </div>
                   </SwiperSlide>
                   </>
                   )}
           
                 </Swiper>


        </div>
        <div className='w-full md:w-1/2'>
            <h2 className='text-3xl font-bold tracking-tighter my-7'>{ProductDetails.title}</h2>
            <p className='text-slate-700 text-2xl tracking-tighter my-7'>{ProductDetails.description}</p>

            <div className="flex justify-between items-center">
                <div className="catPrice">
                    <p className='text-lg my-4'>{ProductDetails.category.name}</p>
                    <p className='text-lg my-4'>${ProductDetails.price.toFixed(2)} EGP</p>
                </div>
                <div className='flex gap-2'>
                      <StarRating initialRating={Math.round(ProductDetails.ratingsAverage * 2) / 2} dimension={5} />
                </div>
            </div>
                      <button className='w-full py-2 items-center text-2xl text-center text-white bg-black my-5 rounded-2xl'>+ Add to cart</button>
        </div>
    </div>
  )
}
