import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { notFound } from "next/navigation";
import Container from "./Container";
import MobileMenu from "./MobileMenu";
import CartItemsBadge from "./CartItemsBadge";
import Link from "next/link";

export default async function Navbar({ component }: { component: string }) {
  const client = createClient();
  const page = await client.getSingle("navbar").catch(() => notFound());

  const isLandingHero = component === "landing_hero";
  const isFeatureHero = component === "feature_hero";

  // Determine dynamic navbar style based on component type
  const navStyle = isLandingHero
    ? "relative bg-[#f1f7eb] pt-2"
    : isFeatureHero
      ? "relative bg-white pt-2"
      : "absolute top-0 left-0 w-full bg-transparent z-50";

  return (
    <nav className={`font-roboto ${navStyle}`}>
      <Container
        className={`mx-auto flex max-w-[1320px] items-center justify-between px-4 ${
          isLandingHero || isFeatureHero ? "pt-5" : "py-7"
        }`}
      >
        {/* === Brand Logo === */}
        <Link href="/" className="flex items-center">
          {isLandingHero || isFeatureHero ? (
            <PrismicNextImage field={page.data.brand_logo} />
          ) : (
            <PrismicNextImage field={page.data.secondary_brand_logo} />
          )}
        </Link>

        {/* === Desktop Nav Links === */}
        <div className="hidden gap-13 md:flex">
          {page.data.nav_links.map((item, idx) => (
            <PrismicNextLink
              key={idx}
              field={item.nav_link}
              className={`text-[16px] font-semibold tracking-wide transition ${
                isLandingHero || isFeatureHero
                  ? "text-[#777777] hover:text-[#0a9b4c]"
                  : "text-white hover:text-[#0a9b4c]"
              }`}
            />
          ))}
        </div>

        {/* === Icons Section === */}
        <div className="flex items-center gap-8">
          {page.data.nav_icons.map((item, idx) => {
            const isThirdIcon = idx === 2; // Mobile menu icon
            const isCartIcon = idx === 0;

            if (isThirdIcon) {
              return (
                <div
                  key={idx}
                  className="rounded-full bg-[#0a9b4c] p-4 md:hidden"
                >
                  <MobileMenu data={page.data} icon={item} />
                </div>
              );
            }

            return (
              <PrismicNextLink
                key={idx}
                field={item.nav_icon_link}
                className="relative"
              >
                <PrismicNextImage
                  field={item.nav_icon}
                  className={`${!(isLandingHero || isFeatureHero) && "invert"}`}
                />
                {isCartIcon && <CartItemsBadge key={idx} />}
              </PrismicNextLink>
            );
          })}
        </div>
      </Container>
    </nav>
  );
}
