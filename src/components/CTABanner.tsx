import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { contact, siteCopy } from "@/lib/data";

const { ctaBanner } = siteCopy;

export function CTABanner() {
  return (
    <section className="bg-onyx py-24 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <Reveal>
          <p className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.25em] text-aluminium">
            <span className="label-mark" />
            {ctaBanner.eyebrow}
            <span className="label-mark" />
          </p>
          <h2 className="mt-6 font-heading text-4xl font-light leading-tight text-white sm:text-5xl">
            {ctaBanner.headline}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-aluminium-light">
            {ctaBanner.description}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.3} className="inline-flex">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm text-charcoal transition hover:bg-aluminium-light"
              >
                Contact Us
                <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.3} className="inline-flex">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm text-white transition hover:border-white"
              >
                {contact.email}
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
