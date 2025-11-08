"use client";

import { FC } from "react";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { useShopFilters } from "@/contexts/FiltersContext";

export type ShopSidebarProps = SliceComponentProps<any>;

const ShopSidebar: FC<ShopSidebarProps> = ({ slice }) => {
  const { priceRange, setPriceRange, selectedCategory, setSelectedCategory } =
    useShopFilters();

  return (
    <aside
      className="w-full max-w-[30%] space-y-4 lg:max-w-[25%]"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* === Filter By Price === */}
      <div>
        <h3 className="mb-3 text-lg font-bold">
          {slice.primary.filter_by_heading}
        </h3>
        <div className="border-t border-gray-200 pt-4">
          <input
            type="range"
            min={slice.primary.price_min}
            max={slice.primary.price_max}
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([slice.primary.price_min, Number(e.target.value)])
            }
            className="w-full"
          />
          <p className="mt-2 text-sm text-gray-600">
            Price: ${priceRange[0]} - ${priceRange[1]}
          </p>
        </div>
      </div>

      {/* === Categories === */}
      <div>
        <h3 className="mb-3 text-lg font-bold">
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
        <h3 className="mb-3 text-lg font-bold">
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
                  <p className="text-sm font-semibold">{item.product_name}</p>
                  <p className="text-sm font-semibold text-green-600">
                    ${item.price}
                  </p>
                </div>
              </PrismicNextLink>
            ),
          )}
        </div>
      </div>

      {/* === Tags === */}
      <div>
        <h3 className="mb-3 text-lg font-bold">
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
