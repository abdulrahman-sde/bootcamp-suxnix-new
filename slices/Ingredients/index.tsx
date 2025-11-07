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
            <div className="relative flex items-center justify-center py-1 ps-6">
              <svg
                className="h-20 w-20"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="#e5e7eb" /* Light Gray background ring */
                  strokeWidth="4"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="#f59e0b" /* Orange progress */
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="94.2" // circumference
                  strokeDashoffset={
                    94.2 -
                    (94.2 * (item.percentage ? item.percentage : 0)) / 100
                  }
                  transform="rotate(-90 18 18)" /* Start from top */
                />
              </svg>

              <span className="absolute text-lg font-bold text-gray-800">
                {item.percentage}%
              </span>
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
      <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-16 px-6 py-10 md:flex-row md:gap-30">
        {/* Left: Product Image */}
        <div className="relative flex w-[50%] justify-center">
          <div className="relative z-10">
            <PrismicNextImage
              field={slice.primary.product_image}
              className="object-contain drop-shadow-2xl"
              width={440}
              height={640}
            />
          </div>
        </div>

        {/* Right: Ingredients Info */}
        <div className="w-full">
          <p className="text-primary mb-2 text-center text-sm font-semibold tracking-widest uppercase md:text-left">
            {slice.primary.tagline}
          </p>
          <h2 className="mt-4 mb-10 text-3xl font-medium text-gray-900 uppercase md:text-[40px]">
            {slice.primary.heading}
          </h2>

          <div className="grid w-full gap-8 sm:grid-cols-2">
            {slice.primary.ingredient_1?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center sm:items-start sm:text-left"
              >
                {/* Regular image (already hex-shaped from Prismic) */}
                <div className="mb-4 h-18 w-18">
                  <PrismicNextImage
                    field={item.image}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="mb-1 flex items-center gap-2 text-[19px] font-semibold uppercase">
                  <div className="bg-primary mt-0.5 h-4.5 w-1 rounded-[1.5px]"></div>
                  <h3>{item.heading}</h3>
                </div>
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
