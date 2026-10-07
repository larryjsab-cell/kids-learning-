# TiniLearners

Next.js 16 (App Router) storefront for TiniLearners. It sells learning books and printable PDFs for preschool to 1st grade.

```bash
npm install
cp .env.example .env.local   # fill in Stripe + n8n values
npm run dev
```

- **Content.** Copy is in `content/*.json` and business facts are in `site.config.json`.
- **Checkout.** `/api/checkout` creates a Stripe embedded Checkout Session for one of three options: PDF, printed book + PDF, or the Club subscription.
- **Lead form.** `/api/lead` forwards to the n8n workflow "TiniLearners Website Form to Gmail".
- **Docs.** See `DESIGN.md` for the design system and `TODO.md` for what still needs owner input.
