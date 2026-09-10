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
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem]">
              <Image
                src="/images/projects/kathrine-towers-1.jpg"
                alt="Kathrine Towers interior fit-out by AGI"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-6 hidden aspect-[4/5] w-56 overflow-hidden rounded-[1.5rem] border-8 border-cream sm:block">
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
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-aluminium">
            <span className="label-mark" />
            About AGI
          </p>
          <h2 className="mt-6 font-heading text-4xl font-light leading-[1.05] text-charcoal sm:text-5xl">
            Three decades in aluminium, glazing and drywall.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-graphite">
            AGI is a Johannesburg-based contractor with thirty years in
            aluminium, glazing and drywall. It shows in the details most
            people never think to check: tolerances, fixings and finishes
            that still hold up long after the walkthrough.
          </p>
          <ul className="mt-8 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-charcoal">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-aluminium" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/about"
            className="mt-9 inline-flex items-center gap-2 border-b border-charcoal pb-1 text-sm text-charcoal transition hover:gap-3"
          >
            More about us
            <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
