import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { CredentialsSection } from "@/components/CredentialsSection";
import { AboutPreview } from "@/components/AboutPreview";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { AssociatesStrip } from "@/components/AssociatesStrip";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { getProjects } from "@/lib/content";

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Hero />
      <CredentialsSection />
      <AboutPreview />

      <section className="bg-muted py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-aluminium">
                  <span className="label-mark" />
                  What We Do
                </p>
                <h2 className="mt-6 max-w-xl font-heading text-4xl font-light leading-tight text-charcoal sm:text-5xl">
                  Six trades, one specialist team.
                </h2>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm text-charcoal transition hover:gap-3"
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

      <ProjectShowcase projects={projects} />
      <AssociatesStrip />
      <CTABanner />
    </>
  );
}
