"use client";

import React, { useRef } from "react";
import { PrismicNextImage } from "@prismicio/next";
import type { KeyTextField, NumberField, ImageField } from "@prismicio/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useCart } from "@/contexts/CartContext";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Product {
  img_with_bg: ImageField;
  title: KeyTextField;
  price: NumberField;
  rating: NumberField;
  reviews: NumberField;
  cihp: KeyTextField;
  cart_icon: ImageField;
  discount?: KeyTextField;
}

export default function RelatedProductsClient({
  products,
  leftIcon,
  rightIcon,
}: {
  products: Product[];
  leftIcon: ImageField;
  rightIcon: ImageField;
}) {
  const swiperRef = useRef<SwiperType | null>(null);
  const { dispatch } = useCart();

  // Duplicate products for better loop functionality
  const duplicatedProducts = [...products, ...products];

  const handleAddToCart = (item: Product) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        product_id: item.cihp || "",
        name: item.title || "",
        price: item.price || 0,
        quantity: 1,
        image: item.img_with_bg?.url || "",
      },
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`h-4 w-4 ${
              star <= Math.floor(rating)
                ? "fill-[#F5A623]"
                : star - 0.5 <= rating
                  ? "fill-[#F5A623]"
                  : "fill-gray-300"
            }`}
            viewBox="0 0 20 20"
          >
            {star - 0.5 <= rating && star > Math.floor(rating) ? (
              <>
                <defs>
                  <linearGradient id={`half-${star}`}>
                    <stop offset="50%" stopColor="#F5A623" />
                    <stop offset="50%" stopColor="#D1D5DB" />
                  </linearGradient>
                </defs>
                <path
                  fill={`url(#half-${star})`}
                  d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                />
              </>
            ) : (
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            )}
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 py-8">
      <div className="flex items-center gap-6">
        {/* Left Arrow */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="group shrink-0 cursor-pointer transition-all duration-300 hover:scale-110"
          aria-label="Previous products"
        >
          <PrismicNextImage
            field={leftIcon}
            className="h-[50px] w-[50px] transition-transform group-hover:-translate-x-1"
          />
        </button>

        {/* Swiper Container */}
        <div className="flex-1 overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            slidesPerGroup={1}
            loop={true}
            loopAdditionalSlides={3}
            speed={800}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
              bulletClass: "swiper-pagination-bullet-custom",
              bulletActiveClass: "swiper-pagination-bullet-active-custom",
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="pb-4"
          >
            {duplicatedProducts.map((item, index) => (
              <SwiperSlide key={`product-${index}`}>
                <div className="group mb-4 overflow-hidden border border-gray-100 bg-white px-5 pb-6 shadow-[0_2px_10px_rgb(0,0,0,0.12)] transition-all duration-300">
                  {/* Product Image with Circle Background */}
                  <div className="relative pt-[75%]">
                    {/* Discount Badge */}
                    {item.discount && (
                      <div className="absolute top-3 left-3 z-10 rounded bg-[#FF4444] px-2.5 py-1 text-xs font-bold text-white">
                        {item.discount}
                      </div>
                    )}

                    {/* Circular Background */}
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div
                        className={`flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105`}
                      >
                        <div className="relative">
                          <PrismicNextImage
                            field={item.img_with_bg}
                            width={205}
                            height={190}
                            className="h-[190px] w-[205px] object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="px-6 pt-0">
                    {/* Product Title */}
                    <h3 className="line-clamp-1 text-[20px] font-medium tracking-tight text-gray-900 uppercase">
                      {item.title}
                    </h3>

                    {/* Price */}
                    <p className="price mb-3 text-[20px] font-bold text-gray-900">
                      ${item.price ?? 0}
                    </p>

                    {/* Rating and Reviews */}
                    <div className="mb-4 flex items-center gap-2">
                      {renderStars(item.rating ?? 0)}
                      <span className="text-xs text-gray-600">
                        ({item.reviews ?? 0})
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex h-12 w-12 transform items-center justify-center rounded-full bg-[#0D9B4D] shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#1B5E20] hover:shadow-lg"
                      aria-label="Add to cart"
                    >
                      <PrismicNextImage
                        field={item.cart_icon}
                        className="h-5 w-5"
                      />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="group shrink-0 cursor-pointer transition-all duration-300 hover:scale-110"
          aria-label="Next products"
        >
          <PrismicNextImage
            field={rightIcon}
            className="h-12 w-12 transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>

      {/* Custom Pagination Dots */}
      <div className="custom-pagination mt-6 flex justify-center gap-2"></div>

      <style jsx global>{`
        .swiper-pagination-bullet-custom {
          width: 8px;
          height: 8px;
          background: #ffd4b8;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.3s;
          opacity: 1;
        }

        .swiper-pagination-bullet-custom:hover {
          background: #ffc299;
        }

        .swiper-pagination-bullet-active-custom {
          width: 32px;
          background: #ff9966;
        }
      `}</style>
    </div>
  );
}
