import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Container from "@/componnets/Container";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";

/**
 * Props for `FeatureHero`.
 */
export type FeatureHeroProps = SliceComponentProps<Content.FeatureHeroSlice>;

/**
 * Component for "FeatureHero" Slices.
 */
const FeatureHero: FC<FeatureHeroProps> = ({ slice }) => {
  return (
    <div className="relative mt-44">
      <Container
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="flex flex-col items-center"
      >
        <p className="text-primary font-roboto mb-8 text-[15px] font-extrabold tracking-[1.425px]">
          {slice.primary.tagline}
        </p>
        <h1 className="mb-7 max-w-[900px] text-center text-4xl leading-20 font-medium tracking-normal [word-spacing:3px] md:text-5xl lg:text-[74px]">
          {slice.primary.heading}
        </h1>
        <PrismicNextLink
          field={slice.primary.button}
          className="btn-primary relative top-[30px] z-10"
        />
        <div className="relative flex justify-center">
          <PrismicNextImage
            field={slice.primary.green_background}
            width={1124}
            className="hidden md:block"
          />
          <PrismicNextImage
            field={slice.primary.product_image}
            width={549}
            className="absolute top-30"
          />
        </div>
      </Container>

      <PrismicNextImage
        field={slice.primary.leaves_1}
        className="absolute top-10 left-0"
      />
      <PrismicNextImage
        field={slice.primary.leaves_2}
        className="absolute top-10 right-0"
      />
      <PrismicNextImage
        field={slice.primary.ingredient_1}
        className="absolute bottom-0 left-15 z-[-2]"
        width={240}
        height={230}
      />
      <PrismicNextImage
        field={slice.primary.ingredient_2}
        className="absolute right-15 bottom-0 z-[-2]"
        width={240}
        height={230}
      />
    </div>
  );
};

export default FeatureHero;
