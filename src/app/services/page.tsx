import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { services } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Aluminium, Drywall, Ceiling & Glazing Services",
  description:
    "B-BBEE Level 2 contractor offering aluminium partitioning, dry walling, suspended ceilings, glazing, carpentry and turnkey fit-outs for corporate, medical, retail and residential projects across South Africa.",
};

const serviceImages: Record<string, string> = {
  aluminium: "/images/projects/comair-1.jpg",
  "dry-walling": "/images/projects/drywalling.jpg",
  ceilings: "/images/projects/university-mpumalanga-2.jpg",
  glazing: "/images/projects/somerset-mall-2.jpg",
  carpentry: "/images/projects/carpentry.jpg",
  turnkey: "/images/projects/mmamethalke-hospital-2.jpg",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Six trades, one specialist team"
        description="From aluminium shopfronts to full turnkey fit-outs, we deliver every stage of interior construction in-house."
        image="/images/projects/dwarsloop-mall-1.jpg"
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="space-y-24">
          {services.map((service, i) => (
            <div
              key={service.slug}
              id={service.slug}
              className="grid scroll-mt-28 items-center gap-12 lg:grid-cols-2"
            >
              <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={serviceImages[service.slug]}
                    alt={service.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.1} className={i % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-bronze">
                  0{i + 1}
                </p>
                <h2 className="mt-4 font-heading text-3xl font-semibold text-charcoal sm:text-4xl">
                  {service.name}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-graphite">{service.summary}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-charcoal">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-bronze" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
