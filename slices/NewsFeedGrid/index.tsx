import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `NewsFeedGrid`.
 */
export type NewsFeedGridProps = SliceComponentProps<Content.NewsFeedGridSlice>;

/**
 * Component for "NewsFeedGrid" Slices.
 */
const NewsFeedGrid: FC<NewsFeedGridProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16 md:py-20 lg:py-24 xl:py-28"
    >
      <div className="mx-auto max-w-[1250px] px-6">
        {/* Header Section */}
        <div className="mb-12 text-center md:mb-16 lg:mb-20">
          {slice.primary.eyebrow && (
            <p className="price mb-1 text-[14px] font-semibold tracking-[3px] text-[#63AF21] uppercase">
              {slice.primary.eyebrow}
            </p>
          )}
          {slice.primary.title && (
            <h2 className="font-oswald text-[37px] leading-tight font-semibold text-gray-900 uppercase lg:text-[48px]">
              {slice.primary.title}
            </h2>
          )}
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {slice.primary.articles.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col overflow-hidden border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                <PrismicNextImage
                  field={item.image}
                  width={400}
                  height={273}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Category Badge */}
                {item.category && (
                  <div className="font-roboto absolute right-4 bottom-4 rounded-full bg-white px-5 py-1.5 text-[14px] font-bold text-[#63AF21] shadow-md">
                    {item.category}
                  </div>
                )}
              </div>

              {/* Content Container */}
              <div className="flex flex-1 flex-col p-6">
                {/* Date */}
                <div className="font-roboto mb-3 flex items-center text-[14px] text-gray-500">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {item.date}
                </div>

                {/* Title */}
                <h3 className="mb-2 text-[16px] leading-tight font-medium text-gray-900 uppercase transition-colors group-hover:text-[#63AF21] md:text-[20px]">
                  {item.title}
                </h3>

                {/* Read More Link */}
                <div className="mt-auto pt-2">
                  <PrismicNextLink
                    field={item.read_more_link}
                    className="font-roboto inline-flex items-center text-sm font-bold text-gray-400 underline decoration-gray-300 underline-offset-4 transition-colors hover:text-[#63AF21] hover:decoration-[#63AF21]"
                  >
                    Read More
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </PrismicNextLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsFeedGrid;
