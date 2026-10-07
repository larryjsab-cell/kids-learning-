-- Applied to Supabase project ryzon-automation (woejhqidgykrcdyktuio) on 2026-10-07.
-- TiniLearners store data. All tables are server-only: RLS on, no policies,
-- so only the service role (used by the tinilearners edge function) can read or write.
-- The shared token row in tl_config was inserted separately and is not stored here.

create table public.tl_config (
  key text primary key,
  value text not null
);
comment on table public.tl_config is 'TiniLearners private settings (shared webhook token). Service role only.';

create table public.tl_products (
  slug text primary key,
  title text not null,
  pdf_path text,
  created_at timestamptz not null default now()
);
comment on table public.tl_products is 'TiniLearners books. pdf_path is the object path in the private tl-pdfs bucket.';

create table public.tl_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  email text not null,
  form text not null default 'Website form',
  page text
);
create index tl_leads_email_idx on public.tl_leads (lower(email));
comment on table public.tl_leads is 'TiniLearners website sign-ups (free sample pack).';

create table public.tl_orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  stripe_session_id text not null unique,
  email text not null,
  customer_name text,
  product_slug text references public.tl_products (slug),
  option text not null check (option in ('pdf', 'print', 'club')),
  amount_total integer,
  currency text,
  shipping jsonb,
  stripe_customer_id text,
  stripe_subscription_id text,
  fulfilled_at timestamptz
);
create index tl_orders_email_idx on public.tl_orders (lower(email));
comment on table public.tl_orders is 'TiniLearners Stripe checkouts. One row per completed Checkout Session.';

create table public.tl_members (
  email text primary key,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  status text not null default 'active',
  updated_at timestamptz not null default now()
);
comment on table public.tl_members is 'TiniLearners Club members (monthly subscription).';

alter table public.tl_config enable row level security;
alter table public.tl_products enable row level security;
alter table public.tl_leads enable row level security;
alter table public.tl_orders enable row level security;
alter table public.tl_members enable row level security;

insert into public.tl_products (slug, title, pdf_path)
values ('alphabet-adventures', 'Alphabet Adventures', 'alphabet-adventures.pdf');

-- Storage: public bucket for site photos, private bucket for paid PDFs.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('tl-site-images', 'tl-site-images', true, 10485760, array['image/png', 'image/jpeg', 'image/webp', 'image/avif']),
  ('tl-pdfs', 'tl-pdfs', false, 104857600, array['application/pdf']);

-- 2026-10-07 (applied via SQL): first real book.
-- insert into public.tl_products (slug, title, pdf_path)
-- values ('abc-123-shapes-fun-book', 'ABC, 123 & Shapes Fun Book', 'abc-123-shapes-fun-book.pdf');
