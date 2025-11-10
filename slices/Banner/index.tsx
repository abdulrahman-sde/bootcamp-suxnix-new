import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Navbar from "@/componnets/Navbar";

export type BannerProps = SliceComponentProps<Content.BannerSlice>;

const Banner: FC<BannerProps> = ({ slice }) => {
  return (
    <>
      <Navbar component={"banner"} />
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        style={{
          backgroundImage: `url(${slice.primary.background?.url})`,
        }}
        className="relative mb-[110px] h-[470px] w-full bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 text-white">
          <h1 className="text-5xl font-medium tracking-wide uppercase md:text-6xl">
            {slice.primary.heading}
          </h1>
          <div className="mt-1 flex items-center gap-3 text-[28px]">
            <PrismicNextLink field={slice.primary.home} />
            <span>|</span>
            <PrismicNextLink field={slice.primary.second} />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-20 w-full">
          <PrismicNextImage
            field={slice.primary.bottom_image}
            className="w-full select-none"
          />
        </div>
      </section>
    </>
  );
};

export default Banner;
