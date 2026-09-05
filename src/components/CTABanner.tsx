import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { contact } from "@/lib/data";

export function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24">
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal>
          <p className="flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-bronze">
            <span className="h-px w-10 bg-bronze" />
            Let&rsquo;s Build
            <span className="h-px w-10 bg-bronze" />
          </p>
          <h2 className="mt-6 font-heading text-3xl font-bold text-white sm:text-5xl">
            Ready to start your next fit-out?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-aluminium-light">
            From a single shopfront to a full turnkey build &mdash; our teams are
            ready to scope your project anywhere in South Africa.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-bronze px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-12px_rgba(31,147,171,0.7)] transition hover:bg-bronze-dark"
            >
              Contact Us
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </Link>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              {contact.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
