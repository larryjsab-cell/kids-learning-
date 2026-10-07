"use client";

import { useState, type FormEvent } from "react";
import { buttonClasses } from "@/components/ui/Button";

type Copy = {
  fields: { name: string; email: string };
  submit: string;
  submitting: string;
  success: string;
  privacy: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function FreeSampleForm({ copy, fallbackEmail }: { copy: Copy; fallbackEmail: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [formError, setFormError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("firstName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    // Honeypot: real people never fill this in.
    if (data.get("company")) {
      setStatus("success");
      return;
    }

    const next: typeof errors = {};
    if (!name) next.name = "Enter your first name so we know who to write to.";
    if (!email) next.email = "Enter your email address so we can send the pages.";
    else if (!EMAIL_RE.test(email)) next.email = "Enter an email address like name@example.com.";
    setErrors(next);
    setFormError("");
    if (next.name || next.email) {
      form.querySelector<HTMLInputElement>(next.name ? "#sample-name" : "#sample-email")?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form: "Free sample pack", firstName: name, email, page: location.pathname }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setFormError(
        (err instanceof Error && err.message) ||
          `We couldn’t send that just now. Try again in a minute, or email ${fallbackEmail}.`,
      );
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-lg border-2 border-ink bg-mint-soft p-6 font-display text-h3">
        {copy.success}
      </div>
    );
  }

  const field =
    "mt-2 block min-h-12 w-full rounded-md border-2 border-ink bg-surface px-4 py-3 text-body text-ink placeholder:text-muted focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 aria-[invalid=true]:border-coral";

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5" aria-describedby="sample-privacy">
      <div>
        <label htmlFor="sample-name" className="font-semibold">{copy.fields.name}</label>
        <input
          id="sample-name"
          name="firstName"
          type="text"
          autoComplete="given-name"
          required
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "sample-name-error" : undefined}
          className={field}
        />
        {errors.name && <p id="sample-name-error" className="mt-2 text-small font-medium text-ink">⚠ {errors.name}</p>}
      </div>
      <div>
        <label htmlFor="sample-email" className="font-semibold">{copy.fields.email}</label>
        <input
          id="sample-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          required
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "sample-email-error" : undefined}
          className={field}
        />
        {errors.email && <p id="sample-email-error" className="mt-2 text-small font-medium text-ink">⚠ {errors.email}</p>}
      </div>

      <div aria-hidden="true" className="absolute -left-full size-px overflow-hidden opacity-0">
        <label htmlFor="sample-company">Company</label>
        <input id="sample-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite">
        {formError && <p className="rounded-md bg-coral-soft p-4 text-small font-medium">{formError}</p>}
      </div>

      <button type="submit" disabled={status === "submitting"} className={buttonClasses("primary", "w-full sm:w-auto")}>
        {status === "submitting" ? copy.submitting : copy.submit}
      </button>
      <p id="sample-privacy" className="text-small text-muted">{copy.privacy}</p>
    </form>
  );
}
