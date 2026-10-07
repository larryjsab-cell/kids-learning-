# TODO: needs owner input

- [ ] **Products.** `content/products.json` → "Alphabet Adventures" is a TEST product (`isTestProduct: true`). The title, page count (56), ages and skills are all inferred. Replace them with real products.
- [ ] **Prices are test values.** PDF $12, Printed + PDF $24 (+ shipping), Club $9/month. Confirm these and the shipping policy.
- [ ] **Print policy.** The copy says "print as many copies as your own family needs". Confirm the licence terms.
- [ ] **Free sample pack.** The copy says "5 pages". The PDF itself doesn't exist yet.
- [ ] **Lead form endpoint.** Set `NEXT_PUBLIC_LEAD_WEBHOOK_URL` (n8n, Phase 7). Until then the form shows a "not switched on" message with the email fallback.
- [ ] **Stripe.** Account and keys are needed for embedded checkout (Phase 3).
- [ ] **Logo.** The current one is a generated wordmark (star + "TiniLearners"). Replace it if a real logo is made.
- [ ] **Domain.** `site.config.json` → `url` is set to `https://tinilearners.com` (assumed).
- [ ] **Phone, address, hours and social links.** None, by request.
- [ ] **Reviews and testimonials.** None yet. No social proof is shown until real reviews exist.
- [ ] **Images.** Every `<Placeholder>` gets replaced in Phase 6 (Higgsfield).
