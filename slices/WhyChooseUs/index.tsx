import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Image from "next/image";

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
      className="relative overflow-hidden py-20 text-white"
      style={{
        backgroundImage: `url(${slice.primary.background.url})`,
        backgroundSize: "contain",
      }}
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
      <div className="mx-auto flex max-w-[1320] items-center gap-14 px-6 py-16">
        {/* Left Content */}
        <div className="space-y-6">
          <p className="text-primary text-[14px] font-bold tracking-widest uppercase">
            {slice.primary.tagline}
          </p>
          <h2 className="text-4xl leading-tight font-medium uppercase md:text-[50px]">
            {slice.primary.heading}
          </h2>

          {/* Benefits List */}
          <ul className="mt-6 space-y-3">
            {slice.primary.befen?.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-0.5 text-lg font-bold text-orange-400">
                  <Image
                    src="/right_arrow.svg fill.svg"
                    width={16}
                    height={16}
                    alt="Right Arrow"
                    className="mt-0.5"
                  />
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
                className="font-roboto inline-block rounded-full bg-[#FAA432] px-8 py-3 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-orange-500"
              >
                Know More
              </PrismicNextLink>
            </div>
          )}
        </div>

        {/* Right Circular Image */}
        <div className="ms-3 hidden justify-center lg:flex lg:justify-end">
          <div className="overflow-hidden">
            <PrismicNextImage
              field={slice.primary.image}
              className=""
              width={600}
              height={520}
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
