import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { CredentialsSection } from "@/components/CredentialsSection";
import { AssociatesStrip } from "@/components/AssociatesStrip";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { ValuesGrid } from "@/components/ValuesGrid";
import { siteCopy } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "AGI is a B-BBEE Level 2, CIDB registered aluminium, drywall and ceiling contractor with 30+ years delivering large-scale fit-outs for hospitals, corporates and national retailers across South Africa.",
};

const { aboutPage } = siteCopy;
const values = aboutPage.values;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutPage.heroEyebrow}
        title={aboutPage.heroTitle}
        description={aboutPage.heroDescription}
        image="/images/projects/mmamethalke-hospital-1.jpg"
      />

      <CredentialsSection />

      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem]">
                <Image
                  src="/images/projects/steve-tshwete-hospital-1.jpg"
                  alt="Steve Tshwete Hospital fit-out"
                  fill
                  sizes="(max-width: 1024px) 50vw, 300px"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-[1.75rem]">
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
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-aluminium">
              <span className="label-mark" />
              {aboutPage.storyEyebrow}
            </p>
            <h2 className="mt-6 font-heading text-4xl font-light leading-tight text-charcoal sm:text-5xl">
              {aboutPage.storyHeadline}
            </h2>
            {aboutPage.storyParagraphs.map((p, i) => (
              <p key={i} className="mt-6 text-base leading-relaxed text-graphite first:mt-6 [&:not(:first-child)]:mt-4">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-muted py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal>
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-aluminium">
              <span className="label-mark" />
              {aboutPage.valuesEyebrow}
            </p>
            <h2 className="mt-6 max-w-xl font-heading text-4xl font-light leading-tight text-charcoal sm:text-5xl">
              {aboutPage.valuesHeadline}
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
