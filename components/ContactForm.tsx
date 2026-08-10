"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Loader2, Send } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xljrjplp";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";
  const labelClass = "mb-1.5 block text-xs font-medium text-muted";

  return (
    <form onSubmit={handleSubmit} className="text-left">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What would you like to say?"
          className={`${fieldClass} resize-none`}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send size={16} />
              Send Message
            </>
          )}
        </button>

        {status === "success" && (
          <p className="text-sm font-medium text-accent">
            Message sent — thanks for reaching out.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm font-medium text-red-600">
            Something went wrong. Try emailing me directly instead.
          </p>
        )}
      </div>
    </form>
  );
}
