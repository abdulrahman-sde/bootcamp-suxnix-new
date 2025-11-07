import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Sidebar from "@/componnets/FilteringSidebar";
import Container from "@/componnets/Container";
import CartBtn from "@/componnets/CartBtn";

export type ShopProductsProps = SliceComponentProps<Content.ShopProductsSlice>;

const ShopProducts: FC<ShopProductsProps> = ({ slice }) => {
  return (
    <Container
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex max-w-[1400px] flex-col gap-4 p-4 md:p-6 lg:flex-row"
    >
      {/* PRODUCTS */}
      <div className="flex w-full flex-wrap justify-center gap-6">
        {slice.primary.products.map((item) => (
          <div
            key={item.product_id}
            className="relative flex w-full max-w-[320px] flex-col justify-between border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
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
                className="h-full w-full object-contain"
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
              <div className="mt-auto w-fit rounded-full bg-green-600 p-3">
                <PrismicNextImage
                  field={item.cart_icon}
                  className="h-5 w-5 object-contain brightness-0 invert"
                />
              </div>
            </CartBtn>
          </div>
        ))}
      </div>

      {/* SIDEBAR */}
      <div className="w-full shrink-0 lg:w-[260px]">
        <Sidebar />
      </div>
    </Container>
  );
};

export default ShopProducts;
