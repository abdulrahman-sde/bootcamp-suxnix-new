"use client";
import { FC, useMemo, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import CartBtn from "@/componnets/CartBtn";
import { useShopFilters } from "@/contexts/FiltersContext";

export type ShopProductsProps = SliceComponentProps<Content.ShopProductsSlice>;

const ShopProducts: FC<ShopProductsProps> = ({ slice }) => {
  const { priceRange, selectedCategory } = useShopFilters();

  const [sortBy, setSortBy] = useState<"rating" | "price-asc" | "price-desc">(
    "rating",
  );

  const filteredProducts = useMemo(() => {
    const base = slice.primary.products.filter((p) => {
      const price = p.price ?? 0;
      const inPrice = price >= priceRange[0] && price <= priceRange[1];
      const inCategory = selectedCategory
        ? p.category === selectedCategory
        : true;
      return inPrice && inCategory;
    });

    const sorted = [...base];
    if (sortBy === "price-asc") {
      sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (sortBy === "price-desc") {
      sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    } else {
      // rating desc (default)
      sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    return sorted;
  }, [slice.primary.products, priceRange, selectedCategory, sortBy]);
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mb-40 md:min-w-[70%]"
    >
      {/* TOP BAR: showing counts + sorting */}
      <div className="font-roboto mb-4 flex w-full items-center justify-between border border-gray-200 px-5 py-3">
        <div className="text-sm text-gray-600">
          Showing 1-{filteredProducts.length} of {slice.primary.products.length}{" "}
          results
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded border border-gray-200 px-2 py-1 text-sm"
          >
            <option value="rating">Rating (Default) </option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((item) => (
          <div
            key={item.product_id}
            className="relative flex max-h-[473px] flex-col justify-center border border-gray-100 bg-white p-6 pt-12 pb-6 shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
          >
            {/* Discount Badge */}
            {item.chip && (
              <span className="absolute top-4 right-4 rounded-sm bg-red-500 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                {item.chip}
              </span>
            )}

            <PrismicNextLink
              field={item.product_detail_link}
              className="relative mx-auto mb-4 h-48 w-48"
            >
              <PrismicNextImage
                field={item.product_image}
                className="mt-2 h-full w-full object-contain"
              />
            </PrismicNextLink>

            <div className="w-full">
              <p className="text-sm text-gray-500">{item.category}</p>
              <PrismicNextLink field={item.product_detail_link}>
                <h2 className="mt-1 text-2xl font-medium text-gray-900 uppercase hover:text-green-600">
                  {item.name}
                </h2>
              </PrismicNextLink>
              <p className="price mt-2 text-[24px] font-bold text-gray-900">
                ${item.price}
              </p>

              <div className="mt-2 flex items-center gap-1">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={
                        i + 1 <= (item.rating || 0) ? "" : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-500">({item.reviews})</span>
              </div>
            </div>

            {/* CART BUTTON STAYS AT BOTTOM */}
            <CartBtn
              product_detail={{
                product_id: item.product_id || "",
                name: item.name || "",
                price: item.price || 0,
                image: item.product_image.url || "",
              }}
            >
              <div className="mt-4 w-fit cursor-pointer rounded-full bg-green-600 p-3 hover:bg-green-700">
                <PrismicNextImage
                  field={item.cart_icon}
                  className="h-5 w-5 object-contain brightness-0 invert"
                />
              </div>
            </CartBtn>
          </div>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="col-span-full flex h-[300px] items-center justify-center text-sm text-gray-500">
          No products found matching your filters.
        </div>
      )}
    </section>
  );
};

export default ShopProducts;
