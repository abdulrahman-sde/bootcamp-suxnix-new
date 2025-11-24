"use client";

import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

/**
 * Props for `ProductDetailDisplay`.
 */
export type ProductDetailDisplayProps =
  SliceComponentProps<Content.ProductDetailDisplaySlice>;

/**
 * Component for "ProductDetailDisplay" Slices.
 */
const ProductDetailDisplay: FC<ProductDetailDisplayProps> = ({ slice }) => {
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        product_id: slice.primary.product_id || "unknown",
        name: slice.primary.product_title || "Unknown Product",
        price: Number(slice.primary.price),
        quantity: quantity,
        image: slice.primary.main_product_image.url || "",
      },
    });
    toast.success(`${slice.primary.product_title || "Product"} added to cart!`);
  };

  // Calculate progress bar width
  const ordered = slice.primary.ordered_count || 0;
  const available = slice.primary.items_available || 0;
  const total = ordered + available;
  const progressPercentage = total > 0 ? (ordered / total) * 100 : 0;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-6">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <p className="mb-2 text-[16px] font-bold tracking-[2px] text-[#63AF21] uppercase">
            {slice.primary.label || "PURCHASE PRODUCT"}
          </p>
          <h2 className="font-oswald mb-4 text-4xl font-semibold text-[#1F1F1F] uppercase md:text-[48px]">
            {slice.primary.title}
          </h2>
          <p className="mx-auto max-w-2xl text-[16px] leading-relaxed text-[#777777]">
            {slice.primary.description}
          </p>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Left Column: Images */}
          <div className="flex flex-col">
            <div className="mb-6 flex items-center justify-center bg-[#F9F9F9]">
              <PrismicNextImage
                field={slice.primary.main_product_image}
                className="max-h-[700px] max-w-[630px]"
                width={630}
                height={700}
              />
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {slice.primary.related_products.map((item, index) => (
                <div
                  key={index}
                  className="flex cursor-pointer items-center justify-center bg-[#F9F9F9] py-4 transition-all hover:opacity-80"
                >
                  <PrismicNextImage
                    field={item.related_product_image}
                    className="h-20 w-auto object-contain mix-blend-multiply"
                    width={100}
                    height={100}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col items-start">
            <h1 className="font-oswald mb-4 text-3xl font-medium text-[#1F1F1F] uppercase md:text-[40px]">
              {slice.primary.product_title}
            </h1>

            {/* Rating */}
            <div className="mb-6 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < (slice.primary.product_rating || 5)
                        ? "text-[#FFB800]"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-[#777777]">
                ( {slice.primary.review_count || "0"} Customer Review )
              </span>
            </div>

            {/* Price */}
            <div className="mb-6 flex items-center gap-3">
              <span className="price text-4xl font-medium text-[#1F1F1F]">
                ${slice.primary.price}
              </span>
              <span className="text-xs font-bold text-[#63AF21] uppercase">
                - {slice.primary.in_stock ? "IN STOCK" : "OUT OF STOCK"}
              </span>
            </div>

            {/* Description */}
            <p className="mb-8 text-[16px] leading-relaxed text-[#777777]">
              {slice.primary.product_description}
            </p>

            {/* Progress Bar */}
            <div className="mb-8 w-full">
              <div className="mb-2 flex justify-between text-xs font-bold text-[#777777] uppercase">
                <span>Ordered: {ordered}</span>
                <span>Items Available: {available}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-gray-200">
                <div
                  className="h-1.5 rounded-full bg-[#63AF21]"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mb-8 flex w-full flex-wrap items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex h-[50px] items-center border border-gray-200">
                <button
                  onClick={decreaseQuantity}
                  className="flex h-full w-10 items-center justify-center text-gray-500 hover:bg-gray-50"
                >
                  -
                </button>
                <div className="flex h-full w-12 items-center justify-center border-x border-gray-200 text-sm font-bold text-[#1F1F1F]">
                  {quantity}
                </div>
                <button
                  onClick={increaseQuantity}
                  className="flex h-full w-10 items-center justify-center text-gray-500 hover:bg-gray-50"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="font-roboto flex h-[50px] items-center justify-center rounded-lg bg-[#63AF21] px-8 text-[13px] font-semibold tracking-wider text-white uppercase transition-colors hover:bg-[#7da31f]"
              >
                {slice.primary.add_to_cart || "ADD TO CART"}
              </button>
            </div>

            {/* Meta Info */}
            <div className="mb-8 space-y-2 text-sm text-[#777777]">
              <div className="flex gap-2">
                <span className="font-bold text-[#1F1F1F] uppercase">
                  SKU :
                </span>
                <span className="text-[#63AF21]">{slice.primary.sku}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-[#1F1F1F] uppercase">
                  Category :
                </span>
                <span className="font-bold text-[#63AF21] uppercase">
                  {slice.primary.category}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-[#1F1F1F] uppercase">
                  Tags :
                </span>
                <span className="font-bold text-[#63AF21] uppercase">
                  {slice.primary.tags}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="mb-8 h-px w-full bg-gray-200" />

            {/* Shipping Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <p className="text-[15px] font-bold text-[#1F1F1F]">
                  {slice.primary.shipping_notes || (
                    <>
                      Free worldwide shipping on all orders over{" "}
                      <span className="text-[#63AF21]">$50</span>
                    </>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="h-4 w-4 text-[#1F1F1F]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-[14px] text-[#777777]">
                  {slice.primary.return_notes || "30 days easy returns"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailDisplay;
