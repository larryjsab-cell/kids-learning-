import { formatPrice, homeContent, membership, products, siteConfig } from "@/lib/content";

export function GET() {
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.tagline}. Online store; PDFs are delivered by email worldwide, printed books ship to the buyer.`,
    "",
    "## Key facts",
    `- Audience: ${siteConfig.audience}`,
    `- Contact: ${siteConfig.email} (email only; no phone, no physical store)`,
    "- Formats: PDF download (emailed right after checkout); printed book (shipped, PDF included)",
    `- Membership: ${membership.name}, ${formatPrice(membership.price)} per ${membership.interval}. ${membership.summary}`,
    "- Free sample pack: 5 pages emailed after signing up on the home page",
    "",
    "## Books",
    ...products.flatMap((p) => [
      `- [${p.title}](${siteConfig.url}/products/${p.slug}): ${p.summary} ${p.ages}, ${p.pages} pages. ` +
        p.formats.map((f) => `${f.label} ${formatPrice(f.price)}`).join("; ") +
        ".",
    ]),
    "",
    "## Pages",
    `- [Home](${siteConfig.url}/): ${homeContent.meta.description}`,
    `- [Shop](${siteConfig.url}/shop): every book with prices and formats`,
    `- [About](${siteConfig.url}/about): how pages are designed and who they are for`,
    "",
    "## FAQ",
    ...homeContent.faq.items.map((i) => `- ${i.q} ${i.a}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
