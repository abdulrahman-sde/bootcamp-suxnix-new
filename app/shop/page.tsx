import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { ShopFiltersProvider } from "@/contexts/FiltersContext";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("shop").catch(() => notFound());
  const slices = page.data.slices;

  const firstSlices = slices.slice(0, -2); // all except last 2
  const lastTwoSlices = slices.slice(-2); // last 2 slices

  return (
    <ShopFiltersProvider>
      <SliceZone slices={firstSlices} components={components} />

      {/* Wrap last two slices in a container */}
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-4 md:flex-row">
        <SliceZone slices={lastTwoSlices} components={components} />
      </div>
    </ShopFiltersProvider>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("shop").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
