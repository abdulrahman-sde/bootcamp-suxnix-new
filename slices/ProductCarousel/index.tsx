"use client";

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import CartBtn from "@/componnets/CartBtn";

export type ProductCarouselProps =
  SliceComponentProps<Content.ProductCarouselSlice>;

const ProductCarousel: FC<ProductCarouselProps> = ({ slice }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="mx-auto max-w-[1200px] py-14">
      <h2 className="mb-10 text-3xl font-medium uppercase">
        {slice.primary.related_products_heading}
      </h2>

      <div className="relative overflow-visible ps-10">
        {/* Custom Arrows */}
        <button
          ref={prevRef}
          aria-label="Previous"
          className="absolute top-[40%] left-2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#b6e1ca] text-white shadow-lg transition sm:-left-6"
        >
          <Image
            src="/left.svg"
            alt="icon"
            width={40}
            height={32}
            className="ms-[30px]"
          />
        </button>

        <button
          ref={nextRef}
          aria-label="Next"
          className="absolute top-[40%] right-2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#b6e1ca] text-white shadow-lg transition sm:-right-6"
        >
          <Image
            src="/right.svg"
            alt="icon"
            width={40}
            height={32}
            className="mr-[30px]"
          />
        </button>

        <Swiper
          modules={[Navigation]}
          slidesPerView={1.1}
          spaceBetween={25}
          loop={true}
          loopAdditionalSlides={5}
          speed={600}
          centeredSlides={false}
          // pagination removed (no dots)
          onInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            640: { slidesPerView: 1.6 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
          }}
          className="overflow-visible pb-12"
        >
          {slice.primary.products.map((item, i) => (
            <SwiperSlide key={i} className="overflow-visible!">
              <div className="s relative max-w-[350px] overflow-visible border border-gray-200 p-6 px-8 transition duration-300">
                <div className="mx-auto flex items-center justify-center overflow-visible">
                  <PrismicNextImage
                    field={item.image}
                    className="h-32 w-32 overflow-visible object-contain"
                  />
                </div>

                <h3 className="mt-6 text-lg font-medium uppercase">
                  {item.name}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-600">
                  ${item.price}
                </p>

                <div className="mt-2 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className={`text-xl ${
                        index < (item.rating_value ?? 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-1 text-sm text-gray-500">
                    ({item.rating_count})
                  </span>
                </div>

                <div className="z-20 mt-4 flex w-full justify-center">
                  <CartBtn
                    product_detail={{
                      product_id: item.product_id || "",
                      name: String(item.name || ""),
                      price: Number(item.price || 0),
                      image: item.image?.url || "",
                    }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white shadow-md transition hover:bg-green-700">
                      <Image
                        src="/vector.svg"
                        alt="icon"
                        width={20}
                        height={20}
                      />
                    </div>
                  </CartBtn>
                </div>

                <PrismicNextLink
                  field={item.product_detail_link}
                  className="absolute inset-0 z-10"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductCarousel;
