import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Container from "@/componnets/Container";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `FeaturedProducts`.
 */
export type FeaturedProductsProps =
  SliceComponentProps<Content.FeaturedProductsSlice>;

/**
 * Component for "FeaturedProducts" Slices.
 */
const FeaturedProducts: FC<FeaturedProductsProps> = ({ slice }) => {
  return (
    <Container
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="font-roboto bg-white py-16 text-center text-gray-900"
    >
      {/* Section Header */}
      <p className="mb-2 text-base font-semibold tracking-wide text-green-600 uppercase">
        {slice.primary.features_tagline}
      </p>
      <h1 className="font-oswald mb-10 text-5xl font-extrabold tracking-wide">
        {slice.primary.features_product_heading}
      </h1>

      {/* Products Grid */}
      <div className="flex flex-wrap justify-center gap-4">
        {slice.primary.product_card.map((item, index) => (
          <div key={index} className="group relative overflow-hidden bg-white">
            {/* <PrismicNextLink
              field={item.}
              className="text-red-700"
            /> */}

            {/* Product Image */}
            <div className="relative">
              <PrismicNextImage
                field={item.product_image}
                className="h-[391px] w-[370px] bg-gray-50 bg-center object-cover p-6"
              />

              {/* Tag (New / Discount) */}
              {item.chip && (
                <span
                  className={`absolute top-3 right-3 rounded px-3 py-1 text-xs font-semibold ${
                    item.chip.toLowerCase().includes("new")
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {item.chip}
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="py-5">
              <p className="mb-1 text-base font-semibold text-gray-500">
                {item.category}
              </p>
              <h2 className="font-oswald mb-2 text-2xl font-semibold">
                {item.name}
              </h2>

              <div className="flex items-center justify-center gap-3">
                {item.old_price && (
                  <p className="text-sm text-gray-400 line-through">
                    {item.old_price}
                  </p>
                )}
                <p className="text-lg font-bold text-green-600">
                  {item.new_price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default FeaturedProducts;
