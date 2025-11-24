import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Container from "@/componnets/Container";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `ContentSideImageHighlight`.
 */
export type ContentSideImageHighlightProps =
  SliceComponentProps<Content.ContentSideImageHighlightSlice>;

/**
 * Component for "ContentSideImageHighlight" Slices.
 */
const ContentSideImageHighlight: FC<ContentSideImageHighlightProps> = ({
  slice,
}) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative mx-auto mt-[-70px] max-w-[1250px] overflow-hidden px-6"
    >
      {/* Background decorative pattern */}
      <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 opacity-30">
        <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-gradient-to-br from-gray-200 to-transparent blur-3xl" />
        <div className="absolute top-1/3 right-1/3 h-96 w-96">
          <div className="grid grid-cols-8 gap-2 opacity-20">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="h-2 w-2 rounded-full bg-gray-300" />
            ))}
          </div>
        </div>
      </div>

      <Container>
        <div className="relative py-12 md:py-16 lg:py-20 xl:py-24">
          <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            {/* Left Content Section */}
            <div className="order-2">
              {/* Eyebrow Text */}
              {slice.primary.eyebrow_text && (
                <div className="inline-block">
                  <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-[#63AF21] uppercase md:text-[14px]">
                    {slice.primary.eyebrow_text}
                  </p>
                </div>
              )}

              {/* Headline */}
              {slice.primary.headline && (
                <h2 className="mb-[25px] max-w-xl text-3xl leading-tight font-semibold tracking-tight text-gray-900 uppercase sm:text-4xl md:text-5xl lg:text-5xl xl:text-[48px]">
                  {slice.primary.headline}
                </h2>
              )}

              {/* Description */}
              {slice.primary.description && (
                <p className="mb-[35px] max-w-xl text-sm text-[15px] leading-relaxed text-[#777777]">
                  {slice.primary.description}
                </p>
              )}

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  className="group inline-flex transform items-center justify-center rounded-full px-8 py-3.5 text-sm font-bold tracking-wide text-white uppercase shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl md:px-10 md:py-4"
                  style={{
                    background:
                      "linear-gradient(to right, #94BE26, #65B021, #94BE26)",
                  }}
                >
                  <span>View More</span>
                </button>
              </div>
            </div>

            {/* Right Image Section */}
            <div className="relative order-1 lg:order-2">
              {/* Background Image (decorative) */}
              {slice.primary.background && (
                <div className="absolute inset-0 -z-10 opacity-40">
                  <PrismicNextImage
                    field={slice.primary.background}
                    width={560}
                    height={340}
                    className="object-contain"
                  />
                </div>
              )}

              {/* Main Product Image */}
              {slice.primary.main_image && (
                <div className="relative z-10 flex items-center justify-center lg:justify-end">
                  <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
                    <PrismicNextImage
                      field={slice.primary.main_image}
                      width={660}
                      height={440}
                      className="max-h-[440px] max-w-[660px] transform object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContentSideImageHighlight;
