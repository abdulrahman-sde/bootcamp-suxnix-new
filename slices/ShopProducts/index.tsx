import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

export type ShopProductsProps = SliceComponentProps<Content.ShopProductsSlice>;

const ShopProducts: FC<ShopProductsProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="grid place-items-center gap-8 p-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {slice.primary.products.map((item, index) => (
        <PrismicNextLink
          key={index}
          field={item.product_detail_link}
          className="relative flex w-full max-w-[340px] flex-col items-center border border-gray-100 bg-white p-6 shadow-[0_0_40px_rgba(173,216,230,0.4)] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(173,216,230,0.7)]"
        >
          {/* === Discount Badge === */}
          {item.chip && (
            <span className="absolute top-4 right-4 rounded-sm bg-red-500 px-2.5 py-0.5 text-[11px] font-semibold text-white">
              {item.chip}
            </span>
          )}

          {/* === Product Image === */}
          <div className="relative mb-4 h-48 w-48">
            <PrismicNextImage
              field={item.product_image}
              className="h-full w-full object-contain"
            />
          </div>

          {/* === Product Info === */}
          <div className="self-start">
            <p className="text-sm text-gray-500">{item.category}</p>
            <h2 className="mt-1 text-lg font-bold text-gray-900 uppercase">
              {item.name}
            </h2>
            <p className="mt-2 text-xl font-bold text-gray-900">
              ${item.price}
            </p>

            {/* === Ratings === */}
            <div className="mt-2 flex items-center justify-start gap-1">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }, (_, i) => {
                  const rating = item.rating || 0;
                  if (i + 1 <= Math.floor(rating)) {
                    return <span key={i}>★</span>;
                  } else if (rating - i >= 0.5) {
                    return <span key={i}>☆</span>;
                  } else {
                    return (
                      <span key={i} className="text-gray-300">
                        ★
                      </span>
                    );
                  }
                })}
              </div>
              <span className="text-sm text-gray-500">({item.reviews})</span>
            </div>
          </div>

          {/* === Cart Icon === */}
          <div className="mt-4 self-start">
            <div className="rounded-full bg-green-600 p-3">
              <PrismicNextImage
                field={item.cart_icon}
                className="h-5 w-5 object-contain brightness-0 invert"
              />
            </div>
          </div>
        </PrismicNextLink>
      ))}
    </section>
  );
};

export default ShopProducts;
