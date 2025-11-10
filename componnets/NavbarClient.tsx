"use client";

import React, { useEffect, useRef, useState } from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Container from "./Container";
import MobileMenu from "./MobileMenu";
import CartItemsBadge from "./CartItemsBadge";
import Link from "next/link";

type NavData = any;

export default function NavbarClient({
  pageData,
  component,
}: {
  pageData: NavData;
  component: string;
}) {
  const navRef = useRef<HTMLElement | null>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [navHeight, setNavHeight] = useState<number>(0);

  const isLandingHero = component === "landing_hero";
  const isFeatureHero = component === "feature_hero";

  // Original design when page first loads
  const navBaseStyle = isLandingHero
    ? "relative bg-[#f1f7eb] pt-2"
    : isFeatureHero
      ? "relative bg-white pt-2"
      : "absolute top-0 left-0 w-full bg-transparent z-50";

  useEffect(() => {
    const measure = () => {
      const h = navRef.current?.getBoundingClientRect().height ?? 0;
      setNavHeight(h);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (navRef.current) ro.observe(navRef.current);

    const onScroll = () => {
      setIsFixed(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  // Classes applied once user scrolls past threshold
  const fixedClasses =
    "fixed top-0 left-0 w-full z-50 bg-white shadow-md backdrop-blur-sm";

  // Smooth transition & animation for appearing navbar
  const navClassName = `
    ${isFixed ? fixedClasses : navBaseStyle}
    font-roboto transition-all duration-500 ease-in-out
    ${isFixed ? "translate-y-0 opacity-100" : "translate-y-0 opacity-100"}
  `;

  return (
    <>
      {/* Placeholder to prevent layout shift */}
      {isFixed && <div style={{ height: navHeight }} aria-hidden />}

      <nav
        ref={navRef}
        className={`${navClassName} ${
          isFixed ? "border-b border-gray-100" : ""
        }`}
      >
        <Container
          className={`mx-auto flex max-w-[1320px] items-center justify-between px-4 pt-3 ${isFeatureHero || isLandingHero ? "pb-0" : "pt-5"} ${isFixed ? "pb-3" : "pb-0"}`}
        >
          {/* === Brand Logo === */}
          <Link
            href="/"
            className="flex items-center transition-all duration-300"
          >
            {isLandingHero || isFeatureHero || isFixed ? (
              <PrismicNextImage field={pageData.brand_logo} />
            ) : (
              <PrismicNextImage field={pageData.secondary_brand_logo} />
            )}
          </Link>

          {/* === Desktop Nav Links === */}
          <div className="hidden gap-13 md:flex">
            {pageData.nav_links.map((item: any, idx: number) => (
              <PrismicNextLink
                key={idx}
                field={item.nav_link}
                className={`text-[16px] font-semibold tracking-wide transition-all duration-300 ${
                  isFixed
                    ? "text-[#777777] hover:text-[#0a9b4c]" // when scrolled
                    : isLandingHero || isFeatureHero
                      ? "text-[#777777] hover:text-[#0a9b4c]"
                      : "text-white hover:text-[#0a9b4c]"
                }`}
              />
            ))}
          </div>

          {/* === Icons Section === */}
          <div className="flex items-center gap-8 transition-all duration-300">
            {pageData.nav_icons.map((item: any, idx: number) => {
              const isThirdIcon = idx === 2; // Mobile menu icon
              const isCartIcon = idx === 0;

              if (isThirdIcon) {
                return (
                  <div
                    key={idx}
                    className="rounded-full bg-[#0a9b4c] p-4 md:hidden"
                  >
                    <MobileMenu data={pageData} icon={item} />
                  </div>
                );
              }

              return (
                <PrismicNextLink
                  key={idx}
                  field={item.nav_icon_link}
                  className="relative transition-all duration-300"
                >
                  <PrismicNextImage
                    field={item.nav_icon}
                    className={`${!(isLandingHero || isFeatureHero) && !isFixed && "invert"} transition-all duration-300 ${isFixed ? "opacity-90" : "opacity-100"} `}
                  />
                  {isCartIcon && <CartItemsBadge key={idx} />}
                </PrismicNextLink>
              );
            })}
          </div>
        </Container>
      </nav>
    </>
  );
}
