import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { notFound } from "next/navigation";
import Container from "./Container";
import MobileMenu from "./MobileMenu";
export default async function Navbar({ component }: { component: string }) {
  const client = createClient();
  const page = await client.getSingle("navbar").catch(() => notFound());

  return (
    <nav
      className={`font-roboto ${component === "landing_hero" ? "bg-[#f1f7eb]" : ""}`}
    >
      <Container
        className={`mx-auto flex max-w-[1320px] items-center justify-between px-4 ${component === "landing_hero" ? "pt-5" : "py-5"}`}
      >
        {/* === Brand Logo === */}
        <div className="flex items-center">
          {component === "banner" ? (
            <PrismicNextImage field={page.data.brand_logo} />
          ) : (
            <PrismicNextImage field={page.data.brand_logo} />
          )}
        </div>

        {/* === Desktop Nav Links (hidden on mobile) === */}
        <div className="hidden gap-13 md:flex">
          {page.data.nav_links.map((item, idx) => (
            <PrismicNextLink
              key={idx}
              field={item.nav_link}
              className="font-medium text-gray-800 transition hover:text-green-700"
            />
          ))}
        </div>

        {/* === Icons Section (always visible) === */}
        <div className="flex items-center gap-8">
          {page.data.nav_icons.map((item, idx) => {
            const isThirdIcon = idx === 2; // third icon in your array

            if (isThirdIcon) {
              return (
                <div
                  key={idx}
                  className="bg- rounded-full bg-[#0a9b4c] p-4 md:hidden"
                >
                  <MobileMenu data={page.data} icon={item} />
                </div>
              );
            }

            return (
              <PrismicNextLink
                key={idx}
                field={item.nav_icon_link}
                // className={}
              >
                <PrismicNextImage field={item.nav_icon} />
              </PrismicNextLink>
            );
          })}
        </div>
      </Container>
    </nav>
  );
}
