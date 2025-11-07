import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Container from "@/componnets/Container";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `Offers`.
 */
export type OffersProps = SliceComponentProps<Content.OffersSlice>;

/**
 * Component for "Offers" Slices.
 */
const Offers: FC<OffersProps> = ({ slice }) => {
  return (
    <Container
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="max-w-1250 bg-white px-4 py-20 text-center"
    >
      {/* Section Titles */}
      <p className="mb-1 text-[15.5px] font-semibold tracking-[2px] text-[#63AF21] uppercase lg:text-base">
        {slice.primary.tagline}
      </p>
      <h1 className="font-oswald mb-24 text-[36px] font-extrabold uppercase lg:text-[46px]">
        {slice.primary.offers_heading}
      </h1>

      {/* Cards Grid */}
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-8 md:grid-cols-3">
        {slice.primary.offer_card.map((item, index) => (
          <div
            key={index}
            className={`relative flex flex-col items-center rounded-sm border-4 border-[#222222] p-7 shadow-md transition-all hover:shadow-lg ${
              index === 1 && "border-[#818181]"
            } ${index === 2 && "border-secondary"}`}
          >
            {/* Labels */}
            {index === 1 && (
              <div className="absolute -top-13 w-full rounded-sm bg-gray-700 py-2 text-base tracking-wider text-white uppercase">
                ★ {item.offer_exclusivity} ★
              </div>
            )}
            {index === 2 && (
              <div className="bg-secondary absolute -top-13 w-full rounded-sm py-2 text-base tracking-wider text-white uppercase">
                ✓ {item.offer_exclusivity}
              </div>
            )}

            {/* Offer Text */}
            {/* <p className="text-sm text-gray-500 uppercase">
              {item.offer_exclusivity}
            </p> */}
            <p className="text-[17px] font-semibold uppercase">
              {item.bottle_units}
            </p>
            <h2 className="text-[32px] font-bold text-gray-800 uppercase">
              {item.name}
            </h2>
            <p className="mb-3 font-bold text-gray-700 capitalize">
              {item.bottle_caps}
            </p>

            {/* Image with Background */}
            <div className="relative mb-4 flex h-40 w-40 items-center justify-center md:h-48 md:w-48">
              <div className="absolute inset-0 rounded-full bg-[#8BCD2B59] opacity-60 blur-md"></div>
              <div className="relative z-10 h-36 w-36 md:h-40 md:w-40">
                <PrismicNextImage
                  field={item.product_image}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-start">
              <p className="price text-[44px] font-medium tracking-tight text-gray-800">
                ${item.price}
              </p>
              <span className="ms-2 mt-4 flex flex-col items-start -space-y-1 text-[14.8px] font-bold text-gray-500">
                <span>Per</span>
                <span> Bottle</span>
              </span>
            </div>
            <p className="price text-[18px] font-medium text-[#818181]">
              (${item.total_price} TOTAL)
            </p>

            {/* Save Info */}
            <p className="price text-secondary text-[32px] font-semibold tracking-wide uppercase">
              {item.save}
            </p>

            {/* Free Shipping */}

            <p
              className={`text-secondary text-base font-semibold ${item.free_shipping ? "" : "py-2.5"}`}
            >
              {item.free_shipping}
            </p>

            {/* Buy Button */}
            <div className="mt-6 w-full">
              <PrismicNextLink
                field={item.buy_now_button}
                className="bg-secondary font-roboto block w-full rounded-md py-1.5 text-[20px] font-semibold text-white"
              >
                BUY NOW
                <p className="text-[12px] font-light">
                  365 DAY MONEY FULL BACK GUARANTEED
                </p>
              </PrismicNextLink>
              {/* <p className="mt-2 text-xs text-gray-600">
                365 DAY FULL MONEY BACK GUARANTEED
              </p> */}
            </div>

            {/* Brand Logos */}
            <div className="mt-4">
              <PrismicNextImage
                field={item.brand_logos}
                className="w-[300px] object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Offers;
