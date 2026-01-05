
"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroSlider = () => {
  const slides = [
    { id: 1, img: "/images/slide1.jpg", title: "New Collection" },
    { id: 2, img: "/images/slide2.jpg", title: "Flash Sale 50% Off" },
    { id: 3, img: "/images/slide3.jpg", title: "Baby Essentials" },
    { id: 4, img: "/images/slide4.jpg", title: "Mom's Special" },
  ];

  return (
   
    <div className="w-full h-62.5 sm:h-87.5 md:h-112.5 lg:h-137.5 my-6">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        className="h-full w-full rounded-xl overflow-hidden shadow-md"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image 
                src={slide.img} 
                alt={slide.title} 
                fill 
                priority
                className="object-cover md:object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
              />
           
              <div className="absolute inset-0 bg-black/10 flex items-center justify-start p-10">
                <h2 className="text-white text-xl md:text-4xl font-bold bg-pink-600/50 px-4 py-2 rounded">
                   {slide.title}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;