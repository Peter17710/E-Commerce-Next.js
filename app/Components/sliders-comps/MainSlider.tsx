"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

const slides = [
  {
    image: "/Sliders/cosmetic-male-beauty-products-with-display.jpg",
    badge: "New Arrival",
    title: "Summer Collection",
    description: "Discover the latest trends in men's grooming and beauty products.",
    link: "/products"
  },
  {
    image: "/Sliders/fe98ace6-3ce8-4a6b-bdea-95e138dfef67.jpg",
    badge: "Best Sellers",
    title: "Top Picks For You",
    description: "Shop our most loved products handpicked just for you.",
    link: "/products"
  },
  {
    image: "/Sliders/empty-white-cosmetics-tube-bamboo-plate.jpg",
    badge: "Eco Friendly",
    title: "Natural & Organic",
    description: "Clean beauty products made with natural ingredients.",
    link: "/categories"
  },
]

export default function MainSlider() {
  return (
    <div className='container px-15 py-5 mx-auto'>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }} // ✅ autoplay
        loop={true} // ✅ infinite loop
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper"
        style={{ paddingBottom: '40px' }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[400px] md:h-[550px] overflow-hidden rounded-2xl">
              
              {/* Image with dark overlay */}
              <Image
                src={slide.image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                alt={slide.title}
                className="object-cover"
                priority
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/40 rounded-2xl" /> {/* ✅ dark overlay */}

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 gap-4">
                
                {/* Badge */}
                <span className="w-fit bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1 rounded-full border border-white/30">
                  {slide.badge}
                </span>

                {/* Title */}
                <h2 className="font-extrabold text-white text-3xl md:text-5xl tracking-tight max-w-lg leading-tight">
                  {slide.title}
                </h2>

                {/* Description */}
                <p className="text-white/80 text-base md:text-lg max-w-md">
                  {slide.description}
                </p>

                {/* Button */}
                <Link href={slide.link}>
                  <Button className='w-fit px-8 py-5 text-base bg-white text-black hover:bg-black hover:text-white transition-all duration-300 rounded-full'>
                    Shop Now <MoveRight className="ml-2" />
                  </Button>
                </Link>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}