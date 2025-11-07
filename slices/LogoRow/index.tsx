import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Container from "@/componnets/Container";

export type LogoRowProps = SliceComponentProps<Content.LogoRowSlice>;

const LogoRow: FC<LogoRowProps> = ({ slice }) => {
  return (
    <Container
      className="w-full py-20"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* Heading with lines */}
      <div className="mb-10 flex items-center justify-center gap-4">
        <span className="h-0.5 w-16 bg-orange-400/70" />
        <h3 className="font-roboto text-center text-sm font-bold tracking-widest text-gray-700 uppercase">
          {slice.primary.heading}
        </h3>
        <span className="h-0.5 w-16 bg-orange-400/70" />
      </div>

      {/* Logos Row */}
      <div className="flex flex-wrap items-center justify-center gap-20">
        {slice.primary.logos?.map((item, i) => (
          <div key={i} className="transition hover:opacity-100">
            <PrismicNextImage field={item.logo} className="h-10" />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default LogoRow;
