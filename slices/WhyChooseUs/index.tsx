import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `WhyChooseUs`.
 */
export type WhyChooseUsProps = SliceComponentProps<Content.WhyChooseUsSlice>;

/**
 * Server Component for "WhyChooseUs" Slice.
 */
const WhyChooseUs: FC<WhyChooseUsProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden bg-[#15A34A] py-20 text-white"
    >
      {/* === Top Shaper Image === */}
      {slice.primary.top_reshaper?.url && (
        <div className="absolute top-0 left-0 w-full">
          <PrismicNextImage
            field={slice.primary.top_reshaper}
            className="w-full object-cover"
          />
        </div>
      )}

      {/* === Content Wrapper === */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        {/* Left Content */}
        <div className="space-y-6">
          <p className="text-sm tracking-widest text-yellow-200 uppercase">
            {slice.primary.tagline}
          </p>
          <h2 className="text-4xl leading-tight font-extrabold md:text-5xl">
            {slice.primary.heading}
          </h2>

          {/* Benefits List */}
          <ul className="mt-6 space-y-3">
            {slice.primary.befen?.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-[2px] text-lg font-bold text-orange-400">
                  ›
                </span>
                <p className="text-base text-white/90">{item.benefit}</p>
              </li>
            ))}
          </ul>

          {/* Know More Button */}
          {slice.primary.know_more && (
            <div className="pt-6">
              <PrismicNextLink
                field={slice.primary.know_more}
                className="inline-block rounded-full bg-orange-400 px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-orange-500"
              >
                Know More
              </PrismicNextLink>
            </div>
          )}
        </div>

        {/* Right Circular Image */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative h-72 w-72 overflow-hidden rounded-full border-[10px] border-green-700 shadow-lg md:h-96 md:w-96">
            <PrismicNextImage
              field={slice.primary.image}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* === Bottom Shaper Image === */}
      {slice.primary.bottom_shaper?.url && (
        <div className="absolute bottom-0 left-0 w-full">
          <PrismicNextImage
            field={slice.primary.bottom_shaper}
            className="w-full object-cover"
          />
        </div>
      )}
    </section>
  );
};

export default WhyChooseUs;
