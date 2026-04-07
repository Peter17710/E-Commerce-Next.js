"use client"
import React from 'react'
import { useRef, useState } from 'react';
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



export default function MainSlider() {
  return (
    <div className='container px-15 py-5 mx-auto'>
         <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >

        
        <SwiperSlide>
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[500px] overflow-hidden rounded-xl">
<Image src="/Sliders/cosmetic-male-beauty-products-with-display.jpg" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px" alt="slider" className="object-cover" priority loading="eager"/>     

<div className="absolute text-lg top-[200px] left-[40px]">
                <h2 className="font-bold text-white text-xl my-7">Summer Collection</h2>
                <p className="font-bold text-white text-xl my-7">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, facere?</p>
                <Button className='px-10 my-3'>Shop now <MoveRight></MoveRight></Button>
            </div>
          </div>
        </SwiperSlide>


        <SwiperSlide>
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[500px] overflow-hidden rounded-xl">
<Image src="/Sliders/fe98ace6-3ce8-4a6b-bdea-95e138dfef67.jpg" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px" alt="slider" className="object-cover" priority loading="eager"/>     
            <div className="absolute text-lg top-[200px] left-[40px]">
                <h2 className="font-bold text-white text-xl my-7">Summer Collection</h2>
                <p className="font-bold text-white text-xl my-7">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, facere?</p>
                <Button className='px-10 my-3'>Shop now <MoveRight></MoveRight></Button>
            </div>
          </div>
        </SwiperSlide>


        <SwiperSlide>
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[500px] overflow-hidden rounded-xl">
<Image src="/Sliders/empty-white-cosmetics-tube-bamboo-plate.jpg" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px" alt="slider" className="object-cover" priority loading="eager"/>     
            <div className="absolute text-lg top-[200px] left-[40px]">
                <h2 className="font-bold text-white text-xl my-7">Summer Collection</h2>
                <p className="font-bold text-white text-xl my-7">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, facere?</p>
                <Button className='px-10 my-3'>Shop now <MoveRight></MoveRight></Button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
