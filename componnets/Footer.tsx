import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { notFound } from "next/navigation";
import Container from "./Container";

export default async function Footer() {
  const client = createClient();
  const { data } = await client.getSingle("footer").catch(() => notFound());

  return (
    <footer className="relative overflow-hidden bg-[#0A0A0A] text-white">
      {/* Decorative top brush image */}
      <div className="w-full">
        <PrismicNextImage
          field={data.top_reshaper}
          className="w-full object-cover"
        />
        <PrismicNextImage
          field={data.leaves_1}
          className="absolute bottom-10 left-0 w-24 opacity-80"
        />
        <PrismicNextImage
          field={data.leaves_2}
          className="absolute right-0 bottom-10 w-24 opacity-80"
        />
      </div>

      <Container className="relative z-10 mx-auto grid grid-cols-1 gap-20 px-6 py-12 md:grid-cols-4">
        {/* Leaves background images */}

        {/* COLUMN 1 - Brand + Description + Socials */}
        <div className="space-y-5">
          <div className="flex items-center space-x-2">
            <PrismicNextImage
              field={data.brand_logo}
              className="h-auto w-[60%] object-cover"
            />
          </div>
          <p className="text-[15px] leading-relaxed text-gray-400">
            {data.brand_motive}
          </p>

          <div className="mt-3 flex gap-3">
            {data.social_links.map((item, i) => (
              <PrismicNextLink
                key={i}
                field={item.social_link}
                className="rounded-full bg-[#1B1B1B] p-2 transition hover:bg-green-600"
              >
                <PrismicNextImage
                  field={item.social_icon}
                  className="h-4 w-4 object-contain"
                />
              </PrismicNextLink>
            ))}
          </div>
        </div>

        {/* COLUMN 2 - About Us */}
        <div className="ms-10">
          <h2 className="mb-4 text-xl font-semibold uppercase">About Us</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            {data.about_us_links.map((item, i) => (
              <li key={i}>
                <PrismicNextLink
                  field={item.link}
                  className="transition hover:text-green-500"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 3 - Support */}
        <div>
          <h2 className="mb-4 text-xl font-semibold uppercase">Support</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            {data.support_links.map((item, i) => (
              <li key={i}>
                <PrismicNextLink
                  field={item.support_link}
                  className="transition hover:text-green-500"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 4 - Contact Us */}
        <div>
          <h2 className="mb-4 text-xl font-semibold uppercase">Contact Us</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            {data.contact_us_links.map((item, i) => (
              <li key={i}>
                <PrismicNextLink
                  field={item.contact_us_link}
                  className="flex items-center gap-2 transition hover:text-green-500"
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="mt-6 border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-4 md:flex-row">
          <p className="text-sm text-gray-500">{data.copyright}</p>
          <div className="flex gap-2">
            <PrismicNextImage
              field={data.payments}
              className="w-48 object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
