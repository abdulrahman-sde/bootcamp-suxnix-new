"use client";

import { useState } from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import type { Content, ImageField } from "@prismicio/client";

interface MobileMenuProps {
  data: {
    brand_logo: ImageField;
    nav_links: Content.NavbarDocumentDataNavLinksItem[];
  };
  icon: Content.NavbarDocumentDataNavIconsItem;
}

export default function MobileMenu({ data, icon }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* === Hamburger Icon (3rd icon from Prismic) === */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        className="flex items-center"
      >
        <PrismicNextImage field={icon.nav_icon} />
      </button>

      {/* === Drawer === */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 transform bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b p-5">
          <PrismicNextImage field={data.brand_logo} />
          <button onClick={() => setIsOpen(false)} aria-label="Close menu">
            <span className="text-3xl font-bold text-gray-700">&times;</span>
          </button>
        </div>

        {/* Drawer Nav Links */}
        <div className="flex flex-col space-y-4 p-5">
          {data.nav_links.map((item, idx) => (
            <PrismicNextLink
              key={idx}
              field={item.nav_link}
              className="text-lg font-medium text-gray-800 hover:text-green-700"
              onClick={() => setIsOpen(false)}
            />
          ))}
        </div>
      </div>

      {/* === Overlay === */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
