import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CTABanner } from "@/components/CTABanner";
import { GalleryFiltered } from "@/components/GalleryFiltered";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Completed aluminium, drywall and ceiling fit-out projects for Comair, University of Mpumalanga, provincial hospitals, Somerset Mall and national retailers across South Africa.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="A showcase of recent projects"
        description="Corporate offices, hospitals, malls, campuses and residential builds — a look at what our teams deliver on site."
        image="/images/projects/university-mpumalanga-3.jpg"
      />

      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <GalleryFiltered projects={projects} />
      </section>

      <CTABanner />
    </>
  );
}
