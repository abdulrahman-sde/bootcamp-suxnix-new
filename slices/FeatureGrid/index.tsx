import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `FeatureGrid`.
 */
export type FeatureGridProps = SliceComponentProps<Content.FeatureGridSlice>;

/**
 * Component for "FeatureGrid" Slices.
 */
const FeatureGrid: FC<FeatureGridProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#FAFAFA] py-16 md:py-20 lg:py-24 xl:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-6">
        {/* Header Section */}
        <div className="mb-12 text-center md:mb-16 lg:mb-20">
          <p className="mb-1 text-[15px] font-semibold tracking-[3px] text-[#63AF21] uppercase lg:text-base">
            {slice.primary.eyebrow}
          </p>
          <h1 className="font-oswald mb-16 text-[22px] font-semibold uppercase lg:text-[48px]">
            {slice.primary.title}
          </h1>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {slice.primary.features.map((item, index) => (
            <div
              key={index}
              className="group text-centertransition-all text relative flex flex-col items-center border-[1.5px] border-gray-100 bg-white px-10 pt-10 pb-6 duration-300 hover:-translate-y-1"
            >
              {/* Background Number */}
              <div
                className="font-roboto pointer-events-none absolute top-2 right-2 text-[80px] leading-none font-bold text-transparent opacity-50 transition-all duration-300 select-none md:text-[120px]"
                style={{
                  WebkitTextStroke: "1px #e5e7eb", // gray-200 color for subtle border
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Icon */}
              <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-linear-120 from-[#94BE26] to-[#65B021] text-white transition-transform duration-300">
                <PrismicNextImage
                  field={item.icon}
                  alt=""
                  width={42}
                  height={32}
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="mb-4 text-xl font-medium tracking-tight text-gray-900 uppercase md:text-[24px]">
                {item.title}
              </h3>

              {/* Description */}
              <div className="mb-8 max-w-xs text-center text-[16px] leading-relaxed text-[#777777]">
                <p>{item.description}</p>
              </div>

              {/* Read More Link */}
              <div className="mt-auto">
                <PrismicNextLink
                  field={item.link}
                  className="group/link font-roboto inline-flex items-center text-sm font-bold tracking-wide text-gray-800 uppercase transition-colors hover:text-[#63AF21]"
                >
                  <span className="mr-2 rounded-full bg-[#63AF21] p-1 text-white transition-colors group-hover/link:bg-[#52911b]">
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                  Read More
                </PrismicNextLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
