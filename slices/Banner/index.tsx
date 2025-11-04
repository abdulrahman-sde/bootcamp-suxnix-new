// import { FC } from "react";
// import { Content } from "@prismicio/client";
// import { SliceComponentProps } from "@prismicio/react";
// import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

// /**
//  * Props for `Banner`.
//  */
// export type BannerProps = SliceComponentProps<Content.BannerSlice>;

// /**
//  * Component for "Banner" Slices.
//  */
// const Banner: FC<BannerProps> = ({ slice }) => {
//   return (
//     <section
//       data-slice-type={slice.slice_type}
//       data-slice-variation={slice.variation}
//       style={{ backgroundImage: `url(${slice.primary.background.url})` }}
//       className="before:bg-opacity-50 relative w-full bg-cover bg-no-repeat before:absolute before:inset-0 before:bg-black before:content-['']"
//     >
//       <div
//         className={`flex h-[490px] w-full flex-col items-center justify-center gap-4 text-white`}
//       >
//         <h1 className="text-6xl font-semibold">
//           {slice.primary.banner_heading}
//         </h1>
//         <div className="flex gap-3">
//           <PrismicNextLink
//             field={slice.primary.home_button}
//             className="text-2xl"
//           />
//           <p className="text-2xl">|</p>
//           <PrismicNextLink
//             field={slice.primary.shop_button}
//             className="text-2xl"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Banner;

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Image from "next/image";

export type BannerProps = SliceComponentProps<Content.BannerSlice>;

const Banner: FC<BannerProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      style={{
        backgroundImage: `url(${slice.primary.background?.url})`,
      }}
      className="relative mb-[110px] h-[490px] w-full bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 text-white">
        <h1 className="text-5xl font-bold tracking-wide uppercase md:text-6xl">
          {slice.primary.heading}
        </h1>
        <div className="flex items-center gap-3 text-2xl">
          <PrismicNextLink field={slice.primary.home} />
          <span>|</span>
          <PrismicNextLink field={slice.primary.second} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-50 w-full">
        <PrismicNextImage
          field={slice.primary.bottom_image}
          className="w-full select-none"
        />
      </div>
    </section>
  );
};

export default Banner;
