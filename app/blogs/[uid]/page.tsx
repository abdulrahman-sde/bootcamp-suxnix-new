import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import BlogDetail from "@/componnets/BlogDetail";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client
    .getByUID("blog_details", uid)
    .catch(() => notFound());
  const slices = page.data.slices;

  const firstSlices = slices.slice(0, 1); // all except last 2
  const lastTwoSlices = slices.slice(-1); // last 2 slices

  return (
    <div>
      {/* Render all slices normally except last two */}
      <SliceZone slices={firstSlices} components={components} />
      {/* Wrap last two slices in a container */}
      <div className="mx-auto flex max-w-[1320px] px-4">
        <BlogDetail page={page} />
        <SliceZone slices={lastTwoSlices} components={components} />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client
    .getByUID("blog_details", uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog_details");

  return pages.map((page) => ({ uid: page.uid }));
}
