import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";

/**
 * Props for `FeatureMediaContent`.
 */
export type FeatureMediaContentProps =
  SliceComponentProps<Content.FeatureMediaContentSlice>;

/**
 * Component for "FeatureMediaContent" Slices.
 */
const FeatureMediaContent: FC<FeatureMediaContentProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative mb-[100px] overflow-hidden"
      style={{
        background: "linear-gradient(to top, #94BE26, #62AF21)",
      }}
    >
      <div className="mx-auto max-w-[1270px] px-6">
        <div className="relative pt-32 lg:pb-48">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            {/* Left Media Section */}
            <div className="order-1 mx-auto w-full max-w-[350px] md:max-w-[500px] lg:mx-0 lg:max-w-none">
              {slice.primary.media_image && (
                <div className="group relative">
                  {/* White border frame */}
                  <div className="relative overflow-hidden border-8 border-white shadow-2xl">
                    <PrismicNextImage
                      field={slice.primary.media_image}
                      width={704}
                      height={452}
                      className="h-auto max-h-[452px] w-full max-w-[704px] object-cover"
                    />

                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-end justify-end bg-black/10 transition-all duration-300 group-hover:bg-black/20">
                      <button
                        className="flex items-center justify-center bg-linear-to-b from-[#94BE26] to-[#65B021] shadow-xl transition-all duration-300 hover:scale-110 hover:bg-white md:h-20 md:w-20"
                        aria-label="Play video"
                      >
                        <svg
                          className="ml-1 h-8 w-8 text-white md:h-10 md:w-10"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Content Section */}
            <div className="order-2">
              {/* Eyebrow Text */}
              {slice.primary.eyebrow && (
                <div className="inline-block">
                  <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-white uppercase md:text-[14px]">
                    {slice.primary.eyebrow}
                  </p>
                </div>
              )}

              {/* Title/Headline */}
              {slice.primary.title && (
                <h2 className="mb-[25px] max-w-lg text-3xl leading-[1.2] font-semibold tracking-tight text-white uppercase sm:text-4xl md:text-[52px]">
                  {slice.primary.title}
                </h2>
              )}

              {/* Description 1 */}
              {slice.primary.description && (
                <p className="mb-[2] max-w-xl leading-relaxed text-white/90">
                  {slice.primary.description}
                </p>
              )}

              {/* Description 2 */}
              {slice.primary.description_2 && (
                <p className="mb-[35px] max-w-xl leading-relaxed text-white/90">
                  {slice.primary.description_2}
                </p>
              )}

              {/* CTA Button */}
              {slice.primary.cta && (
                <div className="pt-2">
                  <PrismicNextLink
                    field={slice.primary.cta}
                    className="group inline-flex transform items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-bold tracking-wide text-[#94BE26] uppercase shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-xl md:px-10 md:py-4"
                  >
                    <span>View More</span>
                  </PrismicNextLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Shaper */}
      {slice.primary.bottom_shaper && (
        <div className="absolute right-0 bottom-0 left-0 z-10 h-auto w-full">
          <PrismicNextImage
            field={slice.primary.bottom_shaper}
            className="h-auto w-full object-cover"
          />
        </div>
      )}
    </section>
  );
};

export default FeatureMediaContent;
