# TiniLearners design system

Playful and made for kids, but trustworthy enough for parents to buy from. One idea carries the brand: **children's handwriting paper**.

## Signature
- **`ruled` utility** (`app/globals.css`). It draws a top line, a dashed midline and a coral baseline behind display headings. The line positions are measured from Grandstander's metrics: baseline 0.715 line-height, cap height 0.117. Use it on page H1s and at most one section heading per page.
- **`TraceLetter`** (`components/home/TraceLetter.tsx`). The hero letter outline draws itself once, then fills in yellow. This is the site's one load animation. Reduced-motion users see the finished state.

## Tokens (`@theme` in `app/globals.css`)
| Token | Hex | Use |
|---|---|---|
| primary | #4B2BB3 | Brand, primary buttons, display type (9.15:1 on white) |
| primary-deep | #2A1A6E | Dark bands, footer, table header |
| primary-soft | #D9D2F5 | Image backgrounds, hover fills |
| accent | #FFC93C | Secondary CTA, membership band, stars (ink text on it: 11.1:1) |
| mint / coral | #3DC98A / #FF6F5E | Decorative fills only. Text on them is always ink |
| ink | #1F1638 | Body text, borders, sticker shadows |
| muted | #5C5470 | Secondary text (7.1:1 on white) |
| surface / surface-alt | #FFFFFF / #E7F0FF | Page and alternating section backgrounds |
| line | #C9C2E0 | Rules, dashed dividers |

**Type.** Grandstander (display, 600–800) and Lexend (body; designed for reading fluency). Named steps:
- small 16
- body 18
- lead 20
- h3 24
- h2 36
- display 48
- display-lg 76
- giant 144

All sizes are in px. Copy is sentence case and uses numerals.

**Shape.**
- Radius: sm, md, lg, xl.
- Borders: 2px ink.
- Shadows: two only. `shadow-sticker` (a 4px ink offset, for interactive and tactile items) and `shadow-lift` (a soft drop, for photos).

## Components (`components/ui`)
- **Layout:** Container, Section (tones: surface, alt, deep, accent), SectionHeading.
- **Buttons and links:** ButtonLink / buttonClasses (variants: primary, accent, light, outline; sticker press on `:active`), TextLink.
- **Content blocks:**
  - StepList: only for real sequences. Numbered and joined by a dashed "tracing" path.
  - ChecklistCard: a ruled worksheet list with star bullets.
  - FaqList: native `<details>`.
  - MembershipBand, RelatedPages.
- **Images:** Photo wraps next/image with a fixed ratio so layout never shifts. Its source is `content/images.json`.
- **Commerce:** `components/product/*` (Gallery, BuyBox, CompareTable, MobileBuyBar) and `components/checkout/CheckoutDrawer` (Stripe embedded checkout in a native `<dialog>`; Stripe.js loads only once the drawer opens).

## Motion
- Hover: buttons lift by 2px; on press the shadow collapses (150ms).
- The FAQ toggle rotates 45°, and the checkout drawer slides in (280ms).
- Background motion is limited to the one hero trace.
- `prefers-reduced-motion` turns all of this off.

## Rules
- Never write arbitrary Tailwind values. The two exceptions are the explicit `transition-[…]` property lists and the safe-area padding on the mobile buy bar.
- Copy lives in `content/*.json`, and business facts live in `site.config.json`.
- New products: add an entry to `content/products.json` and its photos to `content/images.json`. The product page, shop card, sitemap, JSON-LD, OG image and llms.txt all build from those two files.
