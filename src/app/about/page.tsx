import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { CredentialsSection } from "@/components/CredentialsSection";
import { AssociatesStrip } from "@/components/AssociatesStrip";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { ValuesGrid, type Value } from "@/components/ValuesGrid";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "AGI is a B-BBEE Level 2, CIDB registered aluminium, drywall and ceiling contractor with 30+ years delivering large-scale fit-outs for hospitals, corporates and national retailers across South Africa.",
};

const values: Value[] = [
  {
    icon: "award",
    title: "Three Decades of Technical Craft",
    text: "30+ years fabricating and installing aluminium, glazing, drywall and ceiling systems — expertise that shows in the detailing, not just the finish.",
  },
  {
    icon: "target",
    title: "Precision Over Shortcuts",
    text: "Tolerances, fixings and finishes checked against spec at every stage, not just before client walkthroughs.",
  },
  {
    icon: "users",
    title: "One Point of Accountability",
    text: "A single project lead owns your scope end-to-end, across every trade involved in the fit-out.",
  },
  {
    icon: "map-pin",
    title: "Compliance-Ready",
    text: "B-BBEE Level 2, CIDB registered and SAGGA affiliated — procurement can clear us without delay.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About AGI"
        title="30 years of getting the detail right"
        description="B-BBEE Level 2. CIDB registered. Three decades of hands-on expertise in aluminium, glazing, drywall and ceiling systems, built on precision rather than promises."
        image="/images/projects/mmamethalke-hospital-1.jpg"
      />

      <CredentialsSection />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="/images/projects/steve-tshwete-hospital-1.jpg"
                  alt="Steve Tshwete Hospital fit-out"
                  fill
                  sizes="(max-width: 1024px) 50vw, 300px"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="/images/projects/comair-2.jpg"
                  alt="Comair project"
                  fill
                  sizes="(max-width: 1024px) 50vw, 300px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-bronze">
              <span className="h-px w-10 bg-bronze" />
              Our Story
            </p>
            <h2 className="mt-6 font-heading text-4xl font-semibold leading-tight text-charcoal sm:text-5xl">
              Thirty years is what it takes to get this good.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-graphite">
              AGI has spent three decades doing one thing: fabricating and
              installing aluminium, glazing, drywall and ceiling systems to a
              standard that survives contact with facilities management.
              That&rsquo;s not a slogan &mdash; it&rsquo;s tolerances checked
              on-site, fixings specified correctly the first time, and
              finishes that still look right five years after handover.
            </p>
            <p className="mt-4 text-base leading-relaxed text-graphite">
              That expertise is on hospital wards, university campuses,
              airline head offices and national retail rollouts &mdash; work
              chosen because the margin for error was zero, not because it
              was easy.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted/50 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-bronze">
              <span className="h-px w-10 bg-bronze" />
              What Sets Us Apart
            </p>
            <h2 className="mt-6 max-w-xl font-heading text-4xl font-semibold leading-tight text-charcoal sm:text-5xl">
              Expertise you can inspect.
            </h2>
          </Reveal>

          <ValuesGrid values={values} />
        </div>
      </section>

      <AssociatesStrip />
      <CTABanner />
    </>
  );
}
