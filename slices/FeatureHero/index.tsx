import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Container from "@/componnets/Container";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import Navbar from "@/componnets/Navbar";

/**
 * Props for `FeatureHero`.
 */
export type FeatureHeroProps = SliceComponentProps<Content.FeatureHeroSlice>;

/**
 * Component for "FeatureHero" Slices.
 */
const FeatureHero: FC<FeatureHeroProps> = ({ slice }) => {
  return (
    <>
      <Navbar component={"feature_hero"} />
      <div className="relative mt-30 overflow-hidden">
        <Container
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="-z-10 flex flex-col items-center px-4"
        >
          <p className="text-primary font-roboto mb-4 text-[15.5px] font-bold tracking-[1.425px] md:mb-8 md:text-[18px]">
            {slice.primary.tagline}
          </p>
          <h1 className="mb-4 max-w-[1000px] text-center text-[60px] leading-tight font-semibold tracking-normal uppercase [word-spacing:3px] md:mb-7 md:text-[66px] md:leading-20 md:font-medium lg:text-[74px]">
            {slice.primary.heading}
          </h1>
          <PrismicNextLink
            field={slice.primary.button}
            className="btn-primary relative top-4 z-10 mb-8 md:top-[30px] md:mb-0"
          />
          <div className="relative flex h-[260px] w-full justify-center md:h-auto">
            <PrismicNextImage
              preload
              field={slice.primary.green_background}
              className="invisible h-auto w-full max-w-[1124px] md:visible md:block"
            />

            <PrismicNextImage
              preload
              field={slice.primary.product_image}
              className="absolute top-8 w-[300px] md:top-30 md:w-[549px]"
            />
          </div>
        </Container>

        <PrismicNextImage
          field={slice.primary.leaves_1}
          className="absolute top-4 left-0 h-auto w-10 md:top-10 md:w-auto"
        />
        <PrismicNextImage
          field={slice.primary.leaves_2}
          className="absolute top-4 right-0 h-auto w-10 md:top-10 md:w-auto"
        />
        <PrismicNextImage
          field={slice.primary.ingredient_1}
          className="absolute bottom-0 left-2 z-[-2] hidden h-auto w-20 md:left-28 md:block md:w-40 lg:w-50"
        />
        <PrismicNextImage
          field={slice.primary.ingredient_2}
          className="0 absolute bottom-0 z-[-2] hidden h-auto w-20 md:right-30 md:block md:w-40 lg:w-40"
        />
      </div>
    </>
  );
};

export default FeatureHero;
