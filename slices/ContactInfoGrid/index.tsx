import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/componnets/Container";
import { PrismicNextImage } from "@prismicio/next";

export type ContactInfoGridProps =
  SliceComponentProps<Content.ContactInfoGridSlice>;

const ContactInfoGrid: FC<ContactInfoGridProps> = ({ slice }) => {
  return (
    <Container
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-6 py-16"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {slice.primary.items.map((item, index) => (
          <div
            key={index}
            className="flex max-w-[370px] flex-col items-center rounded-xl border border-gray-100 bg-white p-10 text-center shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
          >
            {/* Icon container */}
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-lg bg-white">
              <PrismicNextImage
                field={item.icon}
                className="h-20 w-20 object-contain"
              />
            </div>

            {/* Title */}
            <h2 className="mb-3 text-2xl font-medium tracking-wide text-gray-900 uppercase">
              {item.title}
            </h2>

            {/* Details */}
            <div className="text-sm leading-relaxed text-gray-500">
              <PrismicRichText field={item.details} />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ContactInfoGrid;
