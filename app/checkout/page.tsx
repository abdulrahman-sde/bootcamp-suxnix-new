import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { Suspense } from "react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("checkout").catch(() => notFound());

  // Wrap SliceZone in a Suspense boundary so client-only hooks (like useSearchParams)
  // used inside client components render properly during prerender.
  return (
    <Suspense fallback={<div />}>
      {/* fallback can be replaced with a loader */}
      <SliceZone slices={page.data.slices} components={components} />
    </Suspense>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("checkout").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
