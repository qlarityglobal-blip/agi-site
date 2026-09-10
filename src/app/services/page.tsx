import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CTABanner } from "@/components/CTABanner";
import { ServicesGrid } from "@/components/ServicesGrid";

export const metadata: Metadata = {
  title: "Aluminium, Drywall, Ceiling & Glazing Services",
  description:
    "B-BBEE Level 2 contractor offering aluminium partitioning, dry walling, suspended ceilings, glazing, carpentry and turnkey fit-outs for corporate, medical, retail and residential projects across South Africa.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Six trades, one specialist team"
        description="From aluminium shopfronts to full turnkey fit-outs, we deliver every stage of interior construction in-house. Select a trade below for full detail."
        image="/images/projects/dwarsloop-mall-1.jpg"
      />

      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <ServicesGrid />
      </section>

      <CTABanner />
    </>
  );
}
