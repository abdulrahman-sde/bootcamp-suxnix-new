import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `TestimonialList`.
 */
export type TestimonialListProps =
  SliceComponentProps<Content.TestimonialListSlice>;

/**
 * Component for "TestimonialList" Slices.
 */
const TestimonialList: FC<TestimonialListProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#63AE24] py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-6">
        {/* Header Section */}
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-[14px] font-semibold tracking-[2px] text-white/80 uppercase">
            {slice.primary.eye}
          </p>
          <h2 className="font-oswald text-3xl font-semibold text-white uppercase md:text-[48px]">
            {slice.primary.title}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-6 px-24 md:grid-cols-2 lg:gap-8">
          {slice.primary.testimonials.map((item, index) => (
            <div
              key={index}
              className="flex max-w-[520px] flex-col items-center gap-6 rounded-[30px] bg-white p-[20px] shadow-lg sm:flex-row sm:items-start"
            >
              {/* Image */}
              <div className="shrink-0">
                <div className="h-[154px] w-[145px] overflow-hidden rounded-3xl bg-gray-100">
                  <PrismicNextImage
                    field={item.image}
                    className="h-full w-full object-cover"
                    width={145}
                    height={154}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="mt-2 mb-1 flex flex-col text-center sm:text-left">
                {/* Rating */}
                <div className="flex justify-center sm:justify-start">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4.5 w-4.5 ${
                        i < (item.rating || 5)
                          ? "text-[#70B42C]"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Headline */}
                <h3 className="font-oswald mb-1 text-[18px] font-semibold text-[#1F1F1F] uppercase">
                  {item.headline}
                </h3>

                {/* Description */}
                <p className="mb-4 leading-relaxed text-[#777777]">
                  {item.description}
                </p>

                {/* Author Info */}
                <div className="mt-auto flex items-center justify-center gap-2 text-[13px] sm:justify-start">
                  <span className="font-bold text-[#1F1F1F]">
                    {item.author_name}
                  </span>
                  <span className="text-[#94BE26]">•</span>
                  <span className="text-[#777777]">{item.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialList;
