## Stage 1–2 — Plan + build (Phase 1–2)
- [fixed] Scaffolded Next.js 16.4 App Router + TS + Tailwind v4; tokens in app/globals.css @theme (semantic: primary, accent, mint, coral, ink, muted, surface, surface-alt, line)
- [fixed] Palette contrast checked: primary/white 9.15, ink/accent 11.1, ink/coral 6.25, muted/white 7.1, muted/surface-alt 6.19
- [fixed] Routes: / (static), /shop /about (stubs), /products/[slug] (SSG stub), not-found, sitemap, robots, icon.svg, opengraph-image
- [fixed] Ruled handwriting lines aligned to Grandstander metrics (baseline 0.715 lh, cap 0.117 lh) measured in-browser
## Stage 5–7 — Home review
- [fixed] Screenshots 1440 + 375: 0px horizontal overflow, 0 console errors
- [fixed] Mobile drawer opens, closes on navigate (Playwright)
- [fixed] Form: empty submit focuses first invalid field; no endpoint → clear fallback message
- [fixed] Internal links on home all 200
- [fixed] Web Interface Guidelines pass: scroll-padding for sticky header, touch-action, overscroll-contain drawer, tabular-nums prices, translate="no" wordmark, numerals in copy, theme-color = header bg
- [deferred] Guidelines ask Title Case headings/buttons — kept sentence case deliberately (brand voice)
- [not-verified] /impeccable critique, /ui-ux-pro-max — skills not installed in session
## Phase 3 — Remaining pages
- [fixed] Extracted shared UI: TextLink, SectionHeading, StepList, FaqList, ChecklistCard, MembershipBand (props), RelatedPages
- [fixed] /products/[slug] IM8-style landing: gallery + sticky buy box (PDF / Print+PDF / Club radio cards), 4-step routine, outcomes, comparison table, Club band, product FAQ, related links, mobile sticky buy bar
- [fixed] Stripe embedded checkout (ui_mode embedded_page) in <dialog> drawer; /api/checkout validates slug/option; payment, shipping (print), subscription (club); /checkout/complete status page (noindex)
- [fixed] Stripe.js lazy-loaded (pure import + dynamic drawer) — was loading on every product page view
- [fixed] 148px mobile overflow on product page: sr-only spans in table escaped overflow-x-auto scroller → wrapper made relative
- [fixed] ?plan=club#buy deep link preselects Club (useSearchParams in Suspense)
- [fixed] Shop with empty-state "more books on the way" → free sample; About principles + contact; styled 404
- [not-verified] Live Stripe payment — no keys in environment
## Phase 4 — Internal links
- [fixed] Every page has RelatedPages or contextual links (home FAQ → About added); all pages ≤1 click from home via nav
## Phase 5 — Responsive
- [fixed] Viewport sweep 6 routes × 9 widths (320–1920): 0 horizontal scroll
- [fixed] text-small raised 15px→16px, body 17→18px (no mobile text <16px)
- [fixed] 404 text links given 44px targets
- [deferred] Radio input itself is 20px, but its <label> card (full-width, ≥80px tall) is the hit target — accepted
- [deferred] "overlapping" reports = intentional 1–2° rotations on image/price cards (2–9px), not bugs
## Phase 6 — Images
- [fixed] 9 images generated (Higgsfield gpt_image_2_5 / flare, high, 2k), one consistent style + palette; manifest content/images.json; <Photo> wraps next/image (fill, sizes, priority on hero/product/about only, real alt); Placeholder component removed
- [fixed] next.config images: AVIF/WebP formats, remotePatterns for Higgsfield CDN — optimizer serves responsive WebP/AVIF in production
- [deferred] Local WebP copies in /public not made: d8j0ntlcm91z4.cloudfront.net is blocked by this environment's egress policy
- [not-verified] Rendered images at every breakpoint — sandbox can't fetch CDN; markup verified (alt, sizes, no lazy on hero)
## Phase 7 — Forms + n8n
- [fixed] n8n workflow 4j1gDwSjaJ8PpVaU "TiniLearners Website Form to Gmail" published: webhook (token-gated) → Code (escaped, every field labeled, HTML) → Gmail (Gmail account 2) to tinilearners@gmail.com, subject "New Form Submission!", Reply-To = submitter
- [fixed] Live production execution 3505 succeeded; Gmail message 1a117aafabe3cc82 SENT
- [fixed] /api/lead: validation 422, honeypot silent 200, upstream failure 502 with email fallback; token kept server-side
- [not-verified] Browser → /api/lead → n8n hop end-to-end: n8n host blocked by sandbox egress; inbox arrival not visible to me
