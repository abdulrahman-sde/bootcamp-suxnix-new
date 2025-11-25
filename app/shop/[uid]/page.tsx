import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage } from "@prismicio/next";
import Container from "@/componnets/Container";
import ProductDetailCartBtn from "@/componnets/ProductDetailCartBtn";
import RelatedProducts from "@/componnets/RelatedProducts";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client
    .getByUID("product_details", uid)
    .catch(() => notFound());

  const slices = page.data.slices;

  const firstSlices = slices.slice(0, 1); // all except last 2
  const remainingSlices = slices.slice(1); // remaining slices
  console.log(page.data);
  return (
    <>
      <SliceZone slices={firstSlices} components={components} />
      <Container className="px-6">
        {/* Grid layout: left for images, right for product details */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* LEFT SECTION - MAIN IMAGE + GALLERY */}
          <div>
            {/* Main Image */}
            <div className="flex items-center justify-center overflow-hidden bg-gray-50 p-6">
              <PrismicNextImage
                field={page.data.product_images[0]?.product_image}
                className="w-[50%] max-w-md object-contain"
              />
            </div>

            {/* Thumbnail gallery */}
            <div className="mt-4 flex justify-center gap-4">
              {page.data.product_images.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-2 transition hover:border-green-500"
                >
                  <PrismicNextImage
                    field={item.product_image}
                    className="h-20 w-20 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SECTION - DETAILS */}
          <div>
            {/* Product Title */}
            <h1 className="mb-2 text-[36px] font-medium text-gray-800 uppercase">
              {page.data.name}
            </h1>

            {/* Brand, Rating, ID */}
            <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span>
                Brands:{" "}
                <span className="font-medium text-gray-800">
                  {page.data.brand}
                </span>
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`${
                      i < Math.floor(page.data.rating ?? 0)
                        ? "text-primary"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-1 text-gray-700">({page.data.rating})</span>
              </div>
              <span className="text-gray-400">| ID: {page.uid}</span>
            </div>

            {/* Price + Stock */}
            <div className="mb-4 flex items-center gap-3">
              <span className="price text-4xl font-medium text-gray-800">
                ${page.data.price}
              </span>
              <span
                className={`price text-sm font-semibold ${
                  page.data.in_stock ? "text-green-600" : "text-red-500"
                }`}
              >
                {page.data.in_stock ? "IN STOCK" : "OUT OF STOCK"}
              </span>
            </div>

            {/* Short Description */}
            <p className="mb-6 text-[15.7px] leading-relaxed text-gray-600">
              {page.data.short_descrition}
            </p>

            {/* Bullet details */}
            <div className="mb-6 space-y-2">
              {page.data.bullet_details.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-700">
                  <span className="text-green-500">●</span>
                  <span className="font-bold text-gray-500">{item.label}:</span>
                  <span>{item.data}</span>
                </div>
              ))}
            </div>

            {/* Quantity + Add to Cart */}
            <ProductDetailCartBtn
              product={{
                product_id: page.data.product_id ?? "",
                name: page.data.name ?? "",
                price: page.data.price ?? 0,
                image: page.data.product_images[0]?.product_image.url ?? "",
              }}
            />

            {/* Tags */}
            <div className="mb-2 text-sm text-gray-700">
              <span className="mr-2 text-[16.2px] font-bold">Tag:</span>
              {page.data.tags.map((item, i) => (
                <span
                  key={i}
                  className="ml-1 rounded-sm border border-gray-300 px-3 py-1"
                >
                  {item.tag}
                </span>
              ))}
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 text-sm text-gray-700">
              <span className="mr-2 text-[16.2px] font-bold">Categories:</span>
              {page.data.categories.map((item, i) => (
                <span
                  key={i}
                  className="rounded-sm border border-gray-300 px-4 py-1 text-gray-600"
                >
                  {item.category}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Slices below (like description, reviews, etc.) */}

        <SliceZone slices={remainingSlices} components={components} />
      </Container>
    </>
  );
}

/* ----------------------- METADATA + STATIC PARAMS ----------------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client
    .getByUID("product_details", uid)
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
  const pages = await client.getAllByType("product_details");
  return pages.map((page) => ({ uid: page.uid }));
}
