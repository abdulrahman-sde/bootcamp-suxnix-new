import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `Brands`.
 */
export type BrandsProps = SliceComponentProps<Content.BrandsSlice>;

/**
 * Component for "Brands" Slices.
 */
const Brands: FC<BrandsProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
    >
      {/* Top Reshaper - Rough Edge */}
      <div className="w-full">
        <PrismicNextImage
          field={slice.primary.top_reshaper}
          className="block w-full"
        />
      </div>

      {/* Main Green Section */}
      <div className="relative">
        {/* Background Image (if needed) */}
        <div className="absolute inset-0">
          <PrismicNextImage
            field={slice.primary.background}
            className="h-full w-full object-cover opacity-100"
          />
        </div>

        {/* /* Content Grid */}
        <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 py-24 md:grid-cols-2">
          {/* Features Section */}
          <div className="z-10 grid gap-8 sm:grid-cols-2">
            {slice.primary.features?.map((item: any, i: number) => (
              <div key={i} className="flex flex-col items-start space-y-3">
                {item.icon?.url && (
                  <div className="inline-block rounded-full bg-[#007f32] p-3">
                    <PrismicNextImage field={item.icon} className="h-8 w-8" />
                  </div>
                )}
                <h2 className="text-lg font-bold tracking-wide uppercase">
                  {item.heading}
                </h2>
                <p className="max-w-xs text-sm text-white/90">
                  {item.sub_heading}
                </p>
              </div>
            ))}
          </div>

          {/* Herbal Product Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#008f39] opacity-40 blur-3xl"></div>
              {slice.primary.herbal_product?.url && (
                <PrismicNextImage
                  field={slice.primary.herbal_product}
                  className="relative h-[350px] w-[350px] object-contain drop-shadow-2xl md:h-[500px] md:w-[500px]"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Reshaper - Rough Edge */}
      <div className="w-full">
        <PrismicNextImage
          field={slice.primary.bottom_shaper}
          className="block w-full"
        />
      </div>
    </section>
  );
};

export default Brands;
