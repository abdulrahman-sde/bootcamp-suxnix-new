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
      className="font-roboto bg-white px-4 pb-20 text-center text-gray-900"
    >
      {/* Section Header */}
      <p className="mb-1 text-[15px] font-semibold tracking-[2px] text-[#63AF21] uppercase lg:text-base">
        {slice.primary.features_tagline}
      </p>
      <h1 className="font-oswald mb-16 text-[37px] font-extrabold uppercase lg:text-[46px]">
        {slice.primary.features_product_heading}
      </h1>
      {/* <PrismicNextLink field={item.product_detail_link}>Link</PrismicNextLink> */}

      {/* Products Grid */}
      <div className="flex flex-wrap justify-center gap-6">
        {slice.primary.product_card.map((item, index) => (
          <div key={index} className="group relative overflow-hidden bg-white">
            {/* <PrismicNextLink
              field={item.}
              className="text-red-700"
            /> */}

            {/* Product Image */}
            <PrismicNextLink
              field={item.product_detail_link}
              className="relative"
            >
              <PrismicNextImage
                field={item.product_image}
                className="h-[430px] w-[400px] bg-gray-50 bg-center object-contain p-6"
              />

              {/* Tag (New / Discount) */}
              {item.chip && (
                <span
                  className={`absolute top-5 right-6 rounded px-3 py-1 text-xs font-semibold ${
                    item.chip.toLowerCase().includes("new")
                      ? "bg-[#66B021] text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {item.chip}
                </span>
              )}
            </PrismicNextLink>

            {/* Product Info */}
            <div className="py-6">
              <p className="mb-1.5 text-[16px] font-semibold text-gray-500">
                {item.category}
              </p>
              <PrismicNextLink
                field={item.product_detail_link}
                className="font-oswald hover:text-secondary mb-2 text-[25px] font-semibold uppercase"
              >
                {item.name}
              </PrismicNextLink>

              <div className="mt-1.5 flex items-center justify-center gap-3">
                {item.old_price && (
                  <p className="text-[17px] font-semibold text-gray-400 line-through">
                    ${item.old_price}
                  </p>
                )}
                <p className="text-secondary text-[18px] font-bold">
                  ${item.new_price}
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
