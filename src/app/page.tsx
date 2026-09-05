import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { CredentialsSection } from "@/components/CredentialsSection";
import { AboutPreview } from "@/components/AboutPreview";
import { ServicesGrid } from "@/components/ServicesGrid";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { ProjectIndex } from "@/components/ProjectIndex";
import { AssociatesStrip } from "@/components/AssociatesStrip";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/data";

const featured = projects.filter((p) => p.featured);

export default function Home() {
  return (
    <>
      <Hero />
      <CredentialsSection />
      <AboutPreview />

      <section className="bg-muted/50 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-bronze">
                  <span className="h-px w-10 bg-bronze" />
                  What We Do
                </p>
                <h2 className="mt-6 max-w-xl font-heading text-4xl font-semibold leading-tight text-charcoal sm:text-5xl">
                  Six trades, one specialist team.
                </h2>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal transition hover:text-bronze"
              >
                All services
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
          <div className="mt-14">
            <ServicesGrid compact />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-bronze">
                <span className="h-px w-10 bg-bronze" />
                Signature Work
              </p>
              <h2 className="mt-6 max-w-xl font-heading text-4xl font-semibold leading-tight text-charcoal sm:text-5xl">
                Built for national retailers, hospitals &amp; corporates.
              </h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal transition hover:text-bronze"
            >
              Full gallery
              <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
        <div className="mt-14">
          <FeaturedProjects projects={featured} />
        </div>
      </section>

      <ProjectIndex />
      <AssociatesStrip />
      <CTABanner />
    </>
  );
}
