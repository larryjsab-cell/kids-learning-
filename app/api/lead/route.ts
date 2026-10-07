import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v: unknown, max = 200) => String(v ?? "").trim().slice(0, max);

/** Validates website form posts and forwards them to the n8n → Gmail workflow. */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success.
  if (clean(body.company)) return NextResponse.json({ ok: true });

  const firstName = clean(body.firstName, 80);
  const email = clean(body.email, 254);
  if (!firstName || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter your first name and a valid email address." }, { status: 422 });
  }

  const url = process.env.N8N_LEAD_WEBHOOK_URL;
  const token = process.env.N8N_WEBHOOK_TOKEN;
  if (!url || !token) {
    return NextResponse.json(
      { error: "Sign-ups aren’t switched on yet. Email tinilearners@gmail.com and we’ll send the pages by hand." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-tinilearners-token": token },
      body: JSON.stringify({
        form: clean(body.form, 80) || "Website form",
        firstName,
        email,
        page: clean(body.page, 200) || "/",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`n8n responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead forward failed", err);
    return NextResponse.json(
      { error: "We couldn’t send that just now. Try again in a minute, or email tinilearners@gmail.com." },
      { status: 502 },
    );
  }
}
