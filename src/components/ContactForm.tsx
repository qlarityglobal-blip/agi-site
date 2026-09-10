"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { contact } from "@/lib/data";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const phone = String(form.get("phone") ?? "");
    const service = String(form.get("service") ?? "");
    const message = String(form.get("message") ?? "");

    const subject = encodeURIComponent(`Website enquiry from ${name || "website visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\n${message}`
    );

    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-charcoal">
            Full name
          </label>
          <input
            id="name"
            name="name"
            required
            type="text"
            className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-bronze focus:ring-2 focus:ring-bronze/20"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-charcoal">
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-bronze focus:ring-2 focus:ring-bronze/20"
            placeholder="082 000 0000"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-charcoal">
          Email address
        </label>
        <input
          id="email"
          name="email"
          required
          type="email"
          className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-bronze focus:ring-2 focus:ring-bronze/20"
          placeholder="you@company.co.za"
        />
      </div>

      <div>
        <label htmlFor="service" className="text-sm font-medium text-charcoal">
          Service required
        </label>
        <select
          id="service"
          name="service"
          className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-bronze focus:ring-2 focus:ring-bronze/20"
          defaultValue=""
        >
          <option value="" disabled>
            Select a service
          </option>
          <option>Aluminium</option>
          <option>Dry Walling</option>
          <option>Ceilings</option>
          <option>Glazing</option>
          <option>Carpentry</option>
          <option>Turnkey Project</option>
          <option>Other / Not sure</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-charcoal">
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-2 w-full resize-none rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-bronze focus:ring-2 focus:ring-bronze/20"
          placeholder="Tell us about your site, timeline and scope..."
        />
      </div>

      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-sm text-white transition hover:bg-charcoal-soft"
      >
        Send Enquiry
        <Send size={16} className="transition group-hover:translate-x-0.5" />
      </button>

      {sent && (
        <p className="text-sm text-graphite">
          Your email app should now be open with your enquiry ready to send. If it
          didn&rsquo;t open, email us directly at{" "}
          <a href={`mailto:${contact.email}`} className="text-charcoal underline">
            {contact.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
