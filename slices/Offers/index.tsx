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
    <section
      className={`${slice.primary.brand_color === "#FAA432" && "bg-[#F5F5F5]"}`}
    >
      <Container
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="max-w-1250 px-4 py-20 text-center"
      >
        {/* Section Titles */}
        <p
          className={`mb-1 text-[15.5px] font-semibold tracking-[2px] text-[${slice.primary.brand_color}] uppercase lg:text-base`}
        >
          {slice.primary.tagline}
        </p>
        <h1
          className={`font-oswald mb-24 text-[36px] font-medium uppercase lg:text-[50px]`}
        >
          {slice.primary.offers_heading}
        </h1>

        {/* Cards Grid */}
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-4 md:grid-cols-3">
          {slice.primary.offer_card.map((item, index) => (
            <div
              key={index}
              className={`relative my-4 flex max-w-[400px] flex-col items-center rounded-sm border-[3.5px] border-[#222222] p-7 shadow-md transition-all hover:shadow-lg ${
                index === 1 && "border-[#818181]"
              } ${index === 2 && "border-[#818181]"}`}
              style={
                index === 2 && slice.primary.brand_color
                  ? { borderColor: slice.primary.brand_color }
                  : undefined
              }
            >
              {/* Labels */}
              {index === 1 && (
                <div className="absolute -top-13 w-full rounded-sm bg-gray-700 py-2 text-base tracking-wider text-white uppercase">
                  ★ {item.offer_exclusivity} ★
                </div>
              )}
              {index === 2 && (
                <div
                  className={`bg-[${slice.primary.brand_color}] absolute -top-13 w-full rounded-sm py-2 text-base tracking-wider text-white uppercase`}
                >
                  {item.offer_exclusivity}
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
                <div
                  className={`${(slice.primary.brand_color === "#FAA432" && "") || "bg-[#8BCD2B59]"} absolute inset-0 rounded-full opacity-60 blur-md`}
                ></div>
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
              <p
                className={`price text-[${slice.primary.brand_color}] text-[32px] font-semibold tracking-wide uppercase`}
              >
                {item.save}
              </p>

              {/* Free Shipping */}

              <p
                className={`text-[${slice.primary.brand_color}] text-base font-semibold ${item.free_shipping ? "" : "py-2.5"}`}
              >
                {item.free_shipping}
              </p>

              {/* Buy Button */}
              <div className="mt-6 w-full">
                <PrismicNextLink
                  href={{
                    pathname: "/checkout",
                    query: {
                      offer: JSON.stringify({
                        id: index,
                        name: item.name,
                        units: item.bottle_units,
                        caps: item.bottle_caps,
                        price: item.price,
                        total_price: item.total_price,
                        save: item.save,
                        shipping: item.free_shipping,
                        image: item.product_image.url,
                      }),
                    },
                  }}
                  className={`bg-[${slice.primary.brand_color}] font-roboto block w-full rounded-md py-1.5 text-[20px] font-semibold text-white`}
                >
                  BUY NOW
                  <p className="text-[12px] font-light">
                    365 DAY MONEY FULL BACK GUARANTEED
                  </p>
                </PrismicNextLink>
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
    </section>
  );
};

export default Offers;
