// TiniLearners back office. Called only by n8n with the x-tinilearners-token header.
// The token is stored in public.tl_config (service-role only), so JWT verification is off.
// Deployed to Supabase project ryzon-automation (woejhqidgykrcdyktuio) with verify_jwt = false.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
  auth: { persistSession: false },
});

const IMAGE_BUCKET = "tl-site-images";
const PDF_BUCKET = "tl-pdfs";
const LINK_TTL_SECONDS = 60 * 60 * 24 * 7; // download links last 7 days
const ALLOWED_IMAGE_HOSTS = ["d8j0ntlcm91z4.cloudfront.net"];

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

let cachedToken: string | null = null;
async function expectedToken() {
  if (cachedToken) return cachedToken;
  const { data, error } = await db.from("tl_config").select("value").eq("key", "edge_token").single();
  if (error || !data) throw new Error("edge_token missing from tl_config");
  cachedToken = data.value;
  return cachedToken;
}

const str = (v: unknown, max = 500) => (v == null ? null : String(v).trim().slice(0, max) || null);

async function downloadLinks(slugs: string[] | null) {
  let q = db.from("tl_products").select("slug,title,pdf_path").not("pdf_path", "is", null);
  if (slugs) q = q.in("slug", slugs);
  const { data: products, error } = await q;
  if (error) throw error;
  const links = [];
  for (const p of products ?? []) {
    const { data } = await db.storage.from(PDF_BUCKET).createSignedUrl(p.pdf_path, LINK_TTL_SECONDS, { download: true });
    links.push({ slug: p.slug, title: p.title, url: data?.signedUrl ?? null });
  }
  return links;
}

async function importImages(items: { key: string; url: string }[]) {
  const results = [];
  for (const item of items) {
    const key = String(item.key).replace(/[^a-z0-9._-]/gi, "");
    const src = new URL(item.url);
    if (!ALLOWED_IMAGE_HOSTS.includes(src.hostname)) {
      results.push({ key, error: "host not allowed" });
      continue;
    }
    const res = await fetch(src);
    if (!res.ok) {
      results.push({ key, error: `download ${res.status}` });
      continue;
    }
    const type = res.headers.get("content-type") ?? "image/png";
    const bytes = new Uint8Array(await res.arrayBuffer());
    const { error } = await db.storage.from(IMAGE_BUCKET).upload(key, bytes, { contentType: type, upsert: true, cacheControl: "31536000" });
    if (error) {
      results.push({ key, error: error.message });
      continue;
    }
    const { data } = db.storage.from(IMAGE_BUCKET).getPublicUrl(key);
    results.push({ key, url: data.publicUrl, bytes: bytes.length });
  }
  return results;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "POST only" }, 405);
  try {
    if (req.headers.get("x-tinilearners-token") !== (await expectedToken())) return json({ error: "unauthorized" }, 401);
  } catch (e) {
    return json({ error: String(e) }, 500);
  }

  let body: Record<string, any>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid json" }, 400);
  }

  try {
    switch (body.action) {
      case "import_images":
        return json({ results: await importImages(body.items ?? []) });

      case "lead": {
        const email = str(body.email, 254);
        const first_name = str(body.firstName, 80);
        if (!email || !first_name) return json({ error: "firstName and email required" }, 422);
        const { error } = await db.from("tl_leads").insert({ email, first_name, form: str(body.form, 80) ?? "Website form", page: str(body.page, 200) });
        if (error) throw error;
        return json({ ok: true });
      }

      case "order": {
        const option = str(body.option, 10);
        const email = str(body.email, 254);
        const session = str(body.stripe_session_id, 200);
        if (!session || !email || !["pdf", "print", "club"].includes(option ?? "")) return json({ error: "stripe_session_id, email and option required" }, 422);

        const { data: existing } = await db.from("tl_orders").select("id,fulfilled_at").eq("stripe_session_id", session).maybeSingle();
        if (existing?.fulfilled_at) return json({ duplicate: true, downloads: [] });

        const row = {
          stripe_session_id: session,
          email,
          customer_name: str(body.customer_name, 200),
          product_slug: str(body.product_slug, 100),
          option,
          amount_total: Number.isFinite(Number(body.amount_total)) ? Number(body.amount_total) : null,
          currency: str(body.currency, 10),
          shipping: body.shipping ?? null,
          stripe_customer_id: str(body.stripe_customer_id, 100),
          stripe_subscription_id: str(body.stripe_subscription_id, 100),
        };
        const { error } = await db.from("tl_orders").upsert(row, { onConflict: "stripe_session_id" });
        if (error) throw error;

        if (option === "club") {
          const { error: mErr } = await db.from("tl_members").upsert(
            { email, stripe_customer_id: row.stripe_customer_id, stripe_subscription_id: row.stripe_subscription_id, status: "active", updated_at: new Date().toISOString() },
            { onConflict: "email" },
          );
          if (mErr) throw mErr;
        }
        const downloads = await downloadLinks(option === "club" ? null : row.product_slug ? [row.product_slug] : []);
        return json({ duplicate: false, downloads });
      }

      case "mark_fulfilled": {
        const session = str(body.stripe_session_id, 200);
        const { error } = await db.from("tl_orders").update({ fulfilled_at: new Date().toISOString() }).eq("stripe_session_id", session);
        if (error) throw error;
        return json({ ok: true });
      }

      case "member_status": {
        const sub = str(body.stripe_subscription_id, 100);
        const status = str(body.status, 30);
        if (!sub || !status) return json({ error: "stripe_subscription_id and status required" }, 422);
        const { error } = await db.from("tl_members").update({ status, updated_at: new Date().toISOString() }).eq("stripe_subscription_id", sub);
        if (error) throw error;
        return json({ ok: true });
      }

      default:
        return json({ error: "unknown action" }, 400);
    }
  } catch (e) {
    console.error(e);
    return json({ error: e instanceof Error ? e.message : String(e) }, 500);
  }
});
