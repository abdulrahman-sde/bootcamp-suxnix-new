import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";
import FooterClient from "./FooterClient";

export default async function Footer() {
  const client = createClient();
  const { data } = await client.getSingle("footer").catch(() => notFound());

  return <FooterClient data={data} />;
}
