import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";
import NavbarClient from "./NavbarClient";

export default async function Navbar({ component }: { component: string }) {
  const client = createClient();
  const page = await client.getSingle("navbar").catch(() => notFound());

  // pass page.data (serializable) down to the client component
  return <NavbarClient pageData={page.data} component={component} />;
}
