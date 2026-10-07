# TODO: needs owner input

- [ ] **Products.** `content/products.json` → "Alphabet Adventures" is a TEST product (`isTestProduct: true`). The title, page count (56), ages and skills are all inferred. Replace them with real products.
- [ ] **Prices are test values.** PDF $12, Printed + PDF $24 (+ shipping), Club $9/month. Confirm these and the shipping policy.
- [ ] **Print policy.** The copy says "print as many copies as your own family needs". Confirm the licence terms.
- [ ] **Free sample pack.** The copy says "5 pages". The PDF itself doesn't exist yet.
- [ ] **Hosting env vars.** Set `N8N_LEAD_WEBHOOK_URL` and `N8N_WEBHOOK_TOKEN` on the host (see `.env.example`). The token value is in the n8n workflow's webhook node ("Only run if" option). Without them the form shows an email fallback.
- [ ] **Stripe keys.** Add `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (see `.env.example`). Until then the checkout drawer shows an "email us" fallback.
- [ ] **Delivering PDFs after payment.** Nothing emails the PDF yet. This needs a Stripe webhook (`checkout.session.completed`) feeding n8n or an email service, plus the PDF files hosted somewhere.
- [ ] **Shipping.** Printed books are set to US-only at a flat $5 (test values in `content/products.json` → `shipping`). Confirm countries and rates.
- [ ] **Club fulfilment.** Decide how members get access to the PDFs: an emailed link per release, or an account area.
- [ ] **About page.** There's no founder story, because I won't invent one. Send your story or a photo if you want them added.
- [ ] **Logo.** The current one is a generated wordmark (star + "TiniLearners"). Replace it if a real logo is made.
- [ ] **Domain.** `site.config.json` → `url` is set to `https://tinilearners.com` (assumed).
- [ ] **Phone, address, hours and social links.** None, by request.
- [ ] **Reviews and testimonials.** None yet. No social proof is shown until real reviews exist.
- [ ] **Images.** 9 Higgsfield images are served from Higgsfield's CDN through next/image. Allow `d8j0ntlcm91z4.cloudfront.net` in this environment's network settings so they can be downloaded into `/public` as WebP. Check the book-cover lettering reads correctly.
