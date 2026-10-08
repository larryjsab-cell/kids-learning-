# TODO: needs owner input

- [x] **Real products.** "ABC, 123 & Shapes Fun Book" (90 pages) and "Find It! Seek & Find Fun Book" (79 pages), both ages 3–6. Page previews in `public/books/<slug>/` are rendered from your PDFs. To add another book, add an entry to `content/products.json` and its images to `content/images.json`.
- [ ] **Prices are still test values.** PDF $12, Printed + PDF $24 (+ shipping), Club $9/month (`content/products.json`, `pricesAreTest`). Confirm or send the real prices.
- [ ] **Print policy.** The copy says "print as many copies as your own family needs" (page 3 of the book says "print extra copies of favorite pages"). Confirm the licence terms.
- [x] **Free sample pack.** `public/samples/tinilearners-free-sample-pack.pdf` holds 5 pages from the book (warm-up lines, A, 1, circle, Draw a Cat). The site offers it straight after sign-up, and n8n emails the link. The link only works once the site is deployed.
- [ ] **Hosting env vars.** Set every value in `.env.example` on the host. The `N8N_WEBHOOK_TOKEN` value is in either n8n workflow's webhook node ("Only run if" option). Without these the form and checkout show email fallbacks.
- [ ] **Stripe.** Add the keys, then create a webhook endpoint at `https://<domain>/api/stripe/webhook` for the 4 events listed in `.env.example`, and copy its signing secret into `STRIPE_WEBHOOK_SECRET`.
- [ ] **Upload the book PDF.** In Supabase project **ryzon-automation**, go to Storage → `tl-pdfs` (private) and upload each book renamed to exactly `abc-123-shapes-fun-book.pdf` and `find-it-seek-and-find.pdf`. Until it's there, buyers get a "link follows within 24 hours" email and your order alert subject says `[PDF MISSING]`. For new books, add a row to `tl_products` (`slug`, `title`, `pdf_path`).
- [ ] **Delete 2 test rows in Supabase.** My clean-up deletes timed out. Run: `delete from tl_orders where stripe_session_id = 'cs_test_tinilearners_001'; delete from tl_leads where email = 'test@example.com';`
- [ ] **Shipping.** Printed books are set to US-only at a flat $5 (test values in `content/products.json` → `shipping`). Confirm countries and rates.
- [ ] **Club new releases.** Members get every PDF that exists when they join. Emailing each new release to active members (`tl_members` where status = 'active') isn't automated yet.
- [ ] **About page.** There's no founder story, because I won't invent one. Send your story or a photo if you want them added.
- [ ] **Logo.** The current one is a generated wordmark (star + "TiniLearners"). Replace it if a real logo is made.
- [ ] **Domain.** The site runs at https://tinilearners.netlify.app (`site.config.json` → `url`). If you add a custom domain in Netlify, update that value too.
- [ ] **Phone, address, hours and social links.** None, by request.
- [ ] **Reviews and testimonials.** None yet. No social proof is shown until real reviews exist.
- [ ] **Images.** The 9 photos live in the public Supabase bucket `tl-site-images`. next/image serves them as WebP/AVIF. Check that the lettering on the book cover reads correctly.
