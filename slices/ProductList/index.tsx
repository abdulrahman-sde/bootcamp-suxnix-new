import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Container from "../../componnets/Container";
import Image from "next/image";
import RelatedProducts from "@/componnets/RelatedProducts";

/**
 * Props for `ProductList`.
 */
export type ProductListProps = SliceComponentProps<Content.ProductListSlice>;

/**
 * Component for "ProductList" Slices.
 */
const ProductList: FC<ProductListProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative py-16 md:py-24"
    >
      <Container>
        <div className="flex flex-col px-6">
          {slice.primary.products.map((item, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={index}
                className={`flex flex-col ${index === 1 ? "ms-10" : "-ms-18"} items-center gap-20 md:flex-row md:justify-between md:gap-0 ${
                  isReversed ? "md:flex-row-reverse" : ""
                }`}
              >
                <Image
                  src={`${index === 1 ? "/Background.svg" : "/Background1.svg"}`}
                  alt="Background"
                  width={400}
                  height={400}
                  className={`absolute bottom-0 hidden lg:block ${index === 1 ? "top-[58%] left-0" : "right-0 bottom-[44%]"}`}
                />
                {/* === Image Section === */}
                {/* <div className="flex"> */}
                {/* Background Circle - Removed */}
                {/* <div className="absolute top-1/2 left-1/2 -z-10 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E6F5EE] md:h-[500px] md:w-[500px]" /> */}

                {/* Floating Background Leaves */}
                {item.bg_leaves && (
                  <div
                    className={`absolute hidden lg:block ${index === 0 ? "top-40 left-0" : "right-0"} -z-10`}
                  >
                    <PrismicNextImage
                      field={item.bg_leaves}
                      width={100}
                      height={100}
                      className="object-contain opacity-100"
                    />
                  </div>
                )}

                {/* Main Product Image */}
                <div
                  className={`z-10 scale-100 transform overflow-hidden transition-transform duration-500 hover:scale-105`}
                >
                  <PrismicNextImage
                    field={item.image}
                    className="object-contain md:max-h-[627px] md:max-w-[660px]"
                    width={660}
                    height={627}
                  />
                </div>

                {/* === Text Section === */}
                <div className="flex w-full flex-1 flex-col items-center text-center md:items-start md:text-left">
                  {/* Title */}
                  <h2 className="font-oswald mb-1 text-4xl font-medium tracking-tight text-gray-900 uppercase md:text-[45px]">
                    {item.title}
                  </h2>

                  {/* Divider / Black Leaves */}
                  <div className="mt-3 mb-5">
                    <PrismicNextImage
                      field={item.black_leaves}
                      className="w-[70px] opacity-90"
                    />
                  </div>

                  {/* Dosage / Subheading */}
                  <p className="mb-4 font-semibold tracking-wider text-gray-900 uppercase">
                    {item.dosage}
                  </p>

                  {/* Description */}
                  <div className="mb-8 w-[350px] px-8 text-start leading-relaxed text-[#777777] md:w-full md:max-w-[580px]">
                    <PrismicRichText field={item.description} />
                  </div>

                  {/* Price & CTA */}
                  <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
                    <PrismicNextLink
                      field={item.cta_link}
                      className="font-roboto rounded-full bg-[#0D9B4D] px-[49px] py-4 text-[15px] font-bold tracking-wider text-white uppercase shadow-md transition-all duration-300 hover:bg-[#0a7a3c] hover:shadow-lg"
                    >
                      Shop Now
                    </PrismicNextLink>

                    <div className="flex items-baseline gap-3">
                      <span className="price text-[28px] font-bold text-gray-900">
                        ${item.current_price}
                      </span>
                      {item.previous_price && (
                        <span className="price text-[20px] font-bold text-[#FAA432] line-through decoration-2">
                          ${item.previous_price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
      <RelatedProducts />
    </section>
  );
};

export default ProductList;
