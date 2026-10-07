import { siteConfig, membership, type Product } from "@/lib/content";
import images from "@/content/images.json";

const url = (path: string) => new URL(path, siteConfig.url).toString();

export const organizationId = url("/#organization");

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    "@id": organizationId,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: url("/icon.svg"),
    email: siteConfig.email,
    description: siteConfig.tagline,
    areaServed: "Worldwide",
    contactPoint: { "@type": "ContactPoint", email: siteConfig.email, contactType: "customer support" },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": organizationId },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: url(c.path),
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function productSchema(product: Product) {
  const productUrl = url(`/products/${product.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.summary,
    url: productUrl,
    image: product.gallery.map((g) => images[g.image as keyof typeof images].src),
    brand: { "@type": "Brand", name: siteConfig.name },
    audience: { "@type": "PeopleAudience", suggestedMinAge: 3, suggestedMaxAge: 6 },
    offers: [
      ...product.formats.map((f) => ({
        "@type": "Offer",
        name: f.label,
        price: f.price.toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: productUrl,
        seller: { "@id": organizationId },
      })),
      {
        "@type": "Offer",
        name: membership.name,
        price: membership.price.toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${productUrl}?plan=club`,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: membership.price.toFixed(2),
          priceCurrency: "USD",
          billingDuration: 1,
          billingIncrement: 1,
          unitCode: "MON",
        },
        seller: { "@id": organizationId },
      },
    ],
  };
}
