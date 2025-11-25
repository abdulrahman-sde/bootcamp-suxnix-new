import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";
import React from "react";
import RelatedProductsClient from "./RelatedProductsClient";

export default async function RelatedProducts() {
  const client = createClient();
  const page = await client
    .getSingle("related_products")
    .catch(() => notFound());
  return (
    <div>
      <RelatedProductsClient
        products={page.data.related_products}
        leftIcon={page.data.left_icon_with_bg}
        rightIcon={page.data.right_icon_with_bg}
      />
    </div>
  );
}
