import type { MetadataRoute } from "next";
import { products, siteConfig } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/shop", "/about", ...products.map((p) => `/products/${p.slug}`)];
  return paths.map((path) => ({ url: `${siteConfig.url}${path}` }));
}
