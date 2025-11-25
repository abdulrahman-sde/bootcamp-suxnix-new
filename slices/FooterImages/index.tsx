import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `FooterImages`.
 */
export type FooterImagesProps = SliceComponentProps<Content.FooterImagesSlice>;

/**
 * Component for "FooterImages" Slices.
 */
const FooterImages: FC<FooterImagesProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="z-10 bg-white py-0"
    >
      {/* Responsive Grid - Shows fewer images on smaller screens */}
      <div className="mx-auto flex max-w-[1548px] flex-wrap justify-center">
        {slice.primary.images.map((item, index) => (
          <div
            key={index}
            className={`overflow-hidden ${
              // Hide images progressively on smaller screens
              index >= 6
                ? "hidden xl:block" // Show only 6 images on large screens (1280px+)
                : index >= 4
                  ? "hidden lg:block" // Show only 4 images on medium screens (1024px+)
                  : index >= 3
                    ? "hidden md:block" // Show only 3 images on small screens (768px+)
                    : index >= 2
                      ? "hidden sm:block" // Show only 2 images on extra small (640px+)
                      : "" // Always show first 2 images
            }`}
          >
            <PrismicNextImage
              field={item.image}
              className="h-[258px] w-[258px] object-cover transition-opacity duration-300 hover:opacity-80"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FooterImages;
