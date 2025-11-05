import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Navbar from "@/componnets/Navbar";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <>
      <Navbar component={"landing_hero"} />
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="relative w-full overflow-hidden"
        style={{
          backgroundImage: `url(${slice.primary.background?.url})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(5deg, rgba(148,190,38,0.87) 0%, rgba(98,175,33,0.87) 90%)",
          }}
        />

        {/* Optional Clouds */}
        {slice.primary.clouds?.url && (
          <PrismicNextImage
            field={slice.primary.clouds}
            className="absolute top-0 left-0 h-auto w-full opacity-90"
          />
        )}

        {/* Hero Content */}
        <div className="relative z-10 mx-auto mt-20 flex max-w-[1320px] flex-col items-center justify-between px-4 text-white md:mt-0 md:flex-row md:py-50 lg:px-0">
          {/* Left Text */}
          <div className="flex max-w-xl flex-col items-start text-left">
            <p className="mb-3 text-lg font-semibold tracking-tight text-white/90 uppercase">
              {slice.primary.tagline}
            </p>

            <h1 className="mb-4 text-4xl leading-tight font-extrabold tracking-tight uppercase md:text-5xl lg:text-6xl">
              {slice.primary.heading}
            </h1>

            <p className="font-roboto mb-8 max-w-md text-base leading-relaxed font-semibold text-white/90 md:text-[18px]">
              {slice.primary.sub_heading}
            </p>

            {slice.primary.button && (
              <PrismicNextLink
                field={slice.primary.button}
                className="rounded-full bg-white px-[30px] py-[15px] text-[14px] font-semibold text-[#62AF21] shadow-lg transition-all hover:bg-green-100"
              >
                {slice.primary.button.text || "Purchase Now"}
              </PrismicNextLink>
            )}
          </div>

          {/* Right Product Image */}
          <div className="mt-10 flex justify-center md:mt-0 md:w-1/2">
            <PrismicNextImage
              field={slice.primary.product_image}
              className="h-auto w-[340px] object-contain md:w-[420px] lg:w-[500px]"
            />
          </div>
        </div>

        {/* Bottom Shape */}
        {slice.primary.bottom_shaper?.url && (
          <PrismicNextImage
            field={slice.primary.bottom_shaper}
            className="absolute bottom-0 left-0 w-full select-none"
          />
        )}
      </section>

      {/* Cards Section */}
      {slice.primary.hero_cards && slice.primary.hero_cards.length > 0 && (
        <div className="relative top-[-120px] z-20 mt-20 w-full px-6 pb-20 md:mt-0">
          <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 md:grid-cols-3">
            {slice.primary.hero_cards.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center rounded-2xl bg-white p-10 text-center shadow-lg transition-transform hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mt-4 mb-11 flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-b from-[#94BE26] to-[#62AF21] text-white">
                  <PrismicNextImage
                    field={item.icon}
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <h2 className="mb-2 text-2xl font-semibold text-gray-800 uppercase">
                  {item.heading}
                </h2>
                <p className="font-roboto mb-4 text-[16px] font-medium text-gray-500">
                  {item.sub_heading}
                </p>
                {item.learn_more && (
                  <PrismicNextLink
                    field={item.learn_more}
                    className="font-roboto text-[14px] font-semibold text-[#62AF21] hover:underline"
                  >
                    Learn More
                  </PrismicNextLink>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
