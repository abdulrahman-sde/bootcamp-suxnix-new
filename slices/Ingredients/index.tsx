import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `Ingredients`.
 */
export type IngredientsProps = SliceComponentProps<Content.IngredientsSlice>;

/**
 * Server Component for "Ingredients" Slice.
 */
const Ingredients: FC<IngredientsProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-white py-20 text-gray-800"
    >
      {/* === Top Charts Section === */}
      <div className="mx-auto mb-20 grid max-w-[1320px] grid-cols-1 px-6 md:grid-cols-3">
        {slice.primary.charts?.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-start gap-8 border border-gray-200 bg-white py-2 shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            {/* Circular percentage indicator */}
            <div className="relative flex py-1 ps-6">
              <div className="flex h-18 w-18 items-center justify-center rounded-full border-8 border-orange-400 text-2xl font-bold text-orange-500">
                {item.percentage}
              </div>
              <div className="absolute inset-0 -z-10 rounded-full border-8 border-gray-100" />
            </div>

            <div>
              <h3 className="mb-1 text-lg font-semibold text-gray-900">
                {item.heading}
              </h3>
              <p className="max-w-[200px] text-sm text-gray-500">
                {item.sub_heading}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* === Product + Ingredients Section === */}
      <div className="grid max-w-[1320px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        {/* Left: Product Image */}
        <div className="relative flex justify-center">
          <div className="relative z-10 w-[80%] md:w-[70%]">
            <PrismicNextImage
              field={slice.primary.product_image}
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Right: Ingredients Info */}
        <div>
          <p className="mb-2 text-center text-sm tracking-widest text-orange-400 uppercase md:text-left">
            {slice.primary.tagline}
          </p>
          <h2 className="mb-10 text-3xl font-extrabold text-gray-900 md:text-4xl">
            {slice.primary.heading}
          </h2>

          <div className="grid gap-8 sm:grid-cols-2">
            {slice.primary.ingredient_1?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center sm:items-start sm:text-left"
              >
                {/* Regular image (already hex-shaped from Prismic) */}
                <div className="mb-4 h-16 w-16">
                  <PrismicNextImage
                    field={item.image}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-1 text-lg font-semibold">{item.heading}</h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {item.sub_heading}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ingredients;
