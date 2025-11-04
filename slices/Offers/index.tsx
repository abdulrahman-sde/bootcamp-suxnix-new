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
      className="bg-white py-20 text-center"
    >
      {/* Section Titles */}
      <p className="mb-2 text-sm font-semibold tracking-[0.15em] text-green-600 uppercase">
        {slice.primary.tagline}
      </p>
      <h1 className="mb-12 text-3xl font-extrabold text-gray-800 md:text-4xl">
        {slice.primary.offers_heading}
      </h1>

      {/* Cards Grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        {slice.primary.offer_card.map((item, index) => (
          <div
            key={index}
            className={`relative flex flex-col items-center rounded-xl border p-8 shadow-md transition-all hover:shadow-lg ${
              index === 1
                ? "border-gray-300"
                : index === 2
                  ? "border-green-500"
                  : "border-gray-200"
            }`}
          >
            {/* Labels */}
            {index === 1 && (
              <div className="absolute -top-3 rounded-full bg-gray-700 px-4 py-1 text-xs tracking-wide text-white uppercase">
                ★ Most Popular ★
              </div>
            )}
            {index === 2 && (
              <div className="absolute -top-3 rounded-full bg-green-600 px-4 py-1 text-xs tracking-wide text-white uppercase">
                ✓ Best Value
              </div>
            )}

            {/* Offer Text */}
            <p className="mt-3 text-sm text-gray-500 uppercase">
              {item.offer_exclusivity}
            </p>
            <p>{item.bottle_units}</p>
            <h2 className="mt-1 text-2xl font-bold text-gray-800">
              {item.name}
            </h2>
            <p className="mb-3 text-sm text-gray-500">
              {item.bottle_units} ({item.bottle_caps})
            </p>

            {/* Image with Background */}
            <div className="relative mb-4 flex h-40 w-40 items-center justify-center md:h-48 md:w-48">
              <div className="absolute inset-0 rounded-full bg-green-100 opacity-60 blur-md"></div>
              <div className="relative z-10 h-36 w-36 md:h-44 md:w-44">
                <PrismicNextImage
                  field={item.product_image}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            {/* Pricing */}
            <p className="text-3xl font-bold text-gray-800">
              ${item.price}{" "}
              <span className="text-base font-medium text-gray-500">
                Per Bottle
              </span>
            </p>
            <p className="mt-1 text-sm text-gray-500">
              (${item.total_price} TOTAL)
            </p>

            {/* Save Info */}
            <p className="mt-3 font-semibold text-green-600">{item.save}</p>

            {/* Free Shipping */}
            {item.free_shipping && (
              <p className="text-sm text-green-500">{item.free_shipping}</p>
            )}

            {/* Buy Button */}
            <div className="mt-6 w-full">
              <PrismicNextLink
                field={item.buy_now_button}
                className="block w-full rounded-md bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                BUY NOW
              </PrismicNextLink>
              <p className="mt-2 text-xs text-gray-600">
                365 DAY FULL MONEY BACK GUARANTEED
              </p>
            </div>

            {/* Brand Logos */}
            <div className="mt-4">
              <PrismicNextImage
                field={item.brand_logos}
                className="h-10 w-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Offers;
