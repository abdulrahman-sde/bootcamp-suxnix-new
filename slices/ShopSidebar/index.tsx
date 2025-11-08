"use client";

import { FC } from "react";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { useShopFilters } from "@/contexts/FiltersContext";

export type ShopSidebarProps = SliceComponentProps<any>;

const ShopSidebar: FC<ShopSidebarProps> = ({ slice }) => {
  const { priceRange, setPriceRange, selectedCategory, setSelectedCategory } =
    useShopFilters();

  // Define priceMin and priceMax from slice
  const priceMin = slice.primary.price_min ?? 0;
  const priceMax = slice.primary.price_max ?? 200;

  return (
    <aside
      className="w-full max-w-[30%] space-y-4 lg:max-w-[25%]"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* === Filter By Price === */}
      <div>
        <h3 className="mb-3 text-xl font-medium uppercase">
          {slice.primary.filter_by_heading}
        </h3>
        <div className="border-t border-gray-200 pt-4">
          <input
            type="range"
            min={priceMin}
            max={priceMax}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceMin, Number(e.target.value)])}
            className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:border-[#0D9B4D] [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-track]:rounded-lg [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#0D9B4D] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
            style={{
              background: `linear-gradient(to right, #0D9B4D 0%, #0D9B4D ${((priceRange[1] - priceMin) / (priceMax - priceMin)) * 100}%, #e5e7eb ${((priceRange[1] - priceMin) / (priceMax - priceMin)) * 100}%, #e5e7eb 100%)`,
            }}
          />
          <p className="mt-2 text-sm text-gray-600">
            Price: ${priceRange[0]} - ${priceRange[1]}
          </p>
        </div>
      </div>

      {/* === Categories === */}
      <div>
        <h3 className="mb-3 pt-5 text-xl font-medium uppercase">
          {slice.primary.categories_heading}
        </h3>
        <ul className="space-y-2 border-t border-gray-200 pt-4 text-sm">
          {slice.primary.categories.map((item: { name: string }, i: number) => (
            <li
              key={i}
              onClick={() => setSelectedCategory(item.name)}
              className={`flex cursor-pointer justify-between transition ${
                selectedCategory === item.name
                  ? "font-semibold text-green-600"
                  : ""
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-600"></span>
                {item.name}
              </span>
              <span>»</span>
            </li>
          ))}
        </ul>
      </div>

      {/* === Latest Products === */}
      <div>
        <h3 className="mt-12 mb-3 text-xl font-medium uppercase">
          {slice.primary.latest_products_heading}
        </h3>
        <div className="space-y-4 border-t border-gray-200 pt-4">
          {slice.primary.latest_products.map(
            (
              item: {
                product_details_link: any;
                product_image: any;
                product_name: string;
                price: number;
              },
              i: number,
            ) => (
              <PrismicNextLink
                key={i}
                field={item.product_details_link}
                className="flex items-center gap-3"
              >
                <PrismicNextImage
                  field={item.product_image}
                  className="h-16 w-16 object-contain"
                />
                <div>
                  <div className="text-xs text-yellow-400">★★★★★</div>
                  <p className="price py-1 text-[19px] font-medium">
                    {item.product_name}
                  </p>
                  <p className="text-sm font-semibold text-[#0D9B4D]">
                    ${item.price}.00
                  </p>
                </div>
              </PrismicNextLink>
            ),
          )}
        </div>
      </div>

      {/* === Tags === */}
      <div>
        <h3 className="mt-12 mb-3 text-xl font-medium uppercase">
          {slice.primary.product_tags_heading}
        </h3>
        <div className="flex flex-wrap gap-2 border-t border-gray-200 pt-4">
          {slice.primary.product_tags.map(
            (item: { tag_label: string }, i: number) => (
              <span
                key={i}
                onClick={() => setSelectedCategory(item.tag_label)}
                className="cursor-pointer rounded bg-gray-100 px-3 py-1 text-sm transition hover:bg-green-600 hover:text-white"
              >
                {item.tag_label}
              </span>
            ),
          )}
        </div>
      </div>
    </aside>
  );
};

export default ShopSidebar;
