"use client";

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

/**
 * Component for "Testimonials" Slices.
 */
const Testimonials: FC<TestimonialsProps> = ({ slice }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Helper function to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-2xl text-amber-400">
          ★
        </span>,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-2xl text-amber-400">
          ⯨
        </span>,
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-2xl text-gray-500">
          ★
        </span>,
      );
    }

    return stars;
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-full overflow-hidden"
    >
      {/* Top Reshaper (if any) */}
      {/* {slice.primary.top_reshaper?.url && (
        <div className="pointer-events-none absolute top-0 left-0 z-10 w-full">
          <PrismicNextImage
            field={slice.primary.top_reshaper}
            className="h-auto w-full"
          />
        </div>
      )} */}

      {/* Main Content Container with Background and Overlay */}
      <div className="relative h-[500px] w-full md:h-[550px] md:py-24 lg:h-[600px] lg:py-28">
        {/* Background Image */}
        <div className="absolute inset-0 h-full w-full">
          <PrismicNextImage
            field={slice.primary.background}
            className="h-full w-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 mt-0 bg-black/75"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-20 mx-auto max-w-7xl px-4">
          {/* Testimonials Slider */}
          <div className="relative mx-auto max-w-4xl">
            {/* Custom Navigation Arrows */}
            <button
              ref={prevRef}
              aria-label="Previous testimonial"
              className="absolute top-1/2 left-0 z-10 flex h-20 w-20 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-lg sm:-left-16"
            >
              <PrismicNextImage
                field={slice.primary.left_icon_with_bg}
                className="h-20 w-20"
              />
            </button>

            <button
              ref={nextRef}
              aria-label="Next testimonial"
              className="absolute top-1/2 right-0 z-10 flex h-20 w-20 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-lg sm:-right-16"
            >
              <PrismicNextImage
                field={slice.primary.right_icon_with_bg}
                className="h-20 w-20"
              />
            </button>

            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              speed={600}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet !bg-gray-400",
                bulletActiveClass: "swiper-pagination-bullet-active !bg-white",
              }}
              onInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              className="pb-16"
            >
              {slice.primary.testimonial_data.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-col items-center px-8 text-center sm:px-12">
                    {/* Star Rating */}
                    <div className="mb-6 flex items-center gap-1">
                      {renderStars(item.rating || 5)}
                    </div>

                    {/* Testimonial Text */}
                    <p className="mb-8 text-[17px] leading-relaxed text-white italic sm:text-[18px] md:text-[20px]">
                      {item.testimonial_description}
                    </p>

                    {/* Reviewer Image */}
                    <div className="mb-4 h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-lg sm:h-24 sm:w-24">
                      <PrismicNextImage
                        field={item.reviewer}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Reviewer Name */}
                    <h4 className="mb-16 text-base font-bold tracking-wider text-white uppercase sm:text-lg">
                      {item.name}
                    </h4>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Bottom Reshaper */}
      {slice.primary.bottom_shaper?.url && (
        <div className="pointer-events-none relative z-50 -mt-8 w-full">
          <PrismicNextImage
            field={slice.primary.bottom_shaper}
            className="h-auto w-full"
          />
        </div>
      )}
    </section>
  );
};

export default Testimonials;
