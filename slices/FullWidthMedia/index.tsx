import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `FullWidthMedia`.
 */
export type FullWidthMediaProps =
  SliceComponentProps<Content.FullWidthMediaSlice>;

/**
 * Component for "FullWidthMedia" Slices.
 */
const FullWidthMedia: FC<FullWidthMediaProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-full overflow-hidden"
    >
      {/* Top Reshaper (if any) */}
      {slice.primary.top_reshaper?.url && (
        <div className="pointer-events-none absolute top-0 left-0 z-10 w-full">
          <PrismicNextImage
            field={slice.primary.top_reshaper}
            className="h-auto w-full"
          />
        </div>
      )}

      {/* Main Media Container with Dark Overlay */}
      <div className="relative h-[500px] w-full md:h-[550px] lg:h-[600px]">
        {/* Background Media Image */}
        <div className="absolute inset-0 h-full w-full">
          <PrismicNextImage
            field={slice.primary.media_image}
            className="h-full w-full object-cover"
            height={600}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 mt-0 bg-black/75"></div>
        </div>

        {/* Play Button - Centered */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <button
            className="duration-300hover:bg-[#0D9B4D] flex h-[132px] w-[132px] cursor-pointer items-center justify-center rounded-full bg-[#0D9B4D] shadow-2xl transition-all md:h-24 md:w-24 lg:h-[100px] lg:w-[100px]"
            aria-label="Play video"
          >
            {/* Play Icon Triangle */}
            <div className="ml-2 h-0 w-0 border-t-20 border-b-20 border-l-20 border-t-transparent border-b-transparent border-l-white md:border-t-14 md:border-b-14 md:border-l-24 lg:border-t-16 lg:border-b-16 lg:border-l-28"></div>
          </button>
        </div>
      </div>

      {/* Bottom White Brush Stroke Divider */}
      {slice.primary.bottom_shaper?.url && (
        <div className="pointer-events-none relative z-50 -mt-8 w-full">
          <PrismicNextImage
            field={slice.primary.bottom_shaper}
            className="h-auto w-full"
          />
        </div>
      )}

      {/* Decorative Leaves - Bottom Right */}
      {slice.primary.leaves_2?.url && (
        <div className="pointer-events-none absolute bottom-0 left-0 z-40 w-26 md:w-40 lg:w-[133px]">
          <PrismicNextImage
            field={slice.primary.leaves_2}
            className="h-auto w-full"
          />
        </div>
      )}
      {/* Decorative Leaves - Bottom Left */}
      {slice.primary.leaves_1?.url && (
        <div className="pointer-events-none absolute right-0 -bottom-2 z-50 w-26 md:w-40 lg:w-[133px]">
          <PrismicNextImage
            field={slice.primary.leaves_1}
            className="h-auto w-full"
          />
        </div>
      )}
    </section>
  );
};

export default FullWidthMedia;
