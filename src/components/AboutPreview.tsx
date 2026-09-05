import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const points = [
  "30+ years of hands-on aluminium, glazing & drywall expertise",
  "B-BBEE Level 2 Contributor — 125% procurement recognition",
  "CIDB & CSD registered, SAGGA affiliated",
  "Finishes built to hold up under facilities-management scrutiny",
];

export function AboutPreview() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl">
              <Image
                src="/images/projects/kathrine-towers-1.jpg"
                alt="Kathrine Towers interior fit-out by AGI"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-6 hidden aspect-[4/5] w-56 overflow-hidden rounded-2xl border-8 border-cream shadow-xl sm:block">
              <Image
                src="/images/projects/university-mpumalanga-1.jpg"
                alt="University of Mpumalanga aluminium partitioning"
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-bronze">
            <span className="h-px w-10 bg-bronze" />
            About AGI
          </p>
          <h2 className="mt-6 font-heading text-4xl font-semibold leading-tight text-charcoal sm:text-5xl">
            Thirty years is what it takes to get this good.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-graphite">
            AGI is a Johannesburg-based aluminium, glazing, drywall and
            ceiling contractor with three decades of technical expertise
            behind every fit-out. The difference shows in the detailing
            &mdash; tolerances, fixings and finishes built to hold up long
            after handover, not just on walkthrough day.
          </p>
          <ul className="mt-8 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-charcoal">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-bronze" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/about"
            className="mt-9 inline-flex items-center gap-2 border-b border-bronze pb-1 text-sm font-semibold text-charcoal transition hover:gap-3 hover:text-bronze"
          >
            More about us
            <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
