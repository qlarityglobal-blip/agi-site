import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { services, contact } from "@/lib/data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      images: [{ url: service.image, width: 1600, height: 1200, alt: service.name }],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://agidrywall.co.za";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} | AGI Interior Specialists`,
    serviceType: service.name,
    description: service.metaDescription,
    provider: {
      "@type": "GeneralContractor",
      name: "AGI Interior Specialists",
      telephone: contact.phones[0].number,
      email: contact.email,
    },
    areaServed: "South Africa",
    url: `${baseUrl}/services/${service.slug}`,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `${baseUrl}/services/${service.slug}`,
      },
    ],
  };

  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        eyebrow="Services"
        title={service.name}
        description={service.summary}
        image={service.image}
      />

      <nav aria-label="Breadcrumb" className="border-b border-border bg-cream">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-6 py-4 text-xs text-aluminium lg:px-10">
          <Link href="/" className="hover:text-charcoal">
            Home
          </Link>
          <span>/</span>
          <Link href="/services" className="hover:text-charcoal">
            Services
          </Link>
          <span>/</span>
          <span className="text-charcoal">{service.name}</span>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem]">
              <Image
                src={service.image}
                alt={service.name}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-aluminium">
              <span className="label-mark" />
              What&rsquo;s Included
            </p>
            <h2 className="mt-4 font-heading text-3xl font-light text-charcoal sm:text-4xl">
              {service.name} in South Africa
            </h2>
            <p className="mt-4 text-base leading-relaxed text-graphite">{service.intro}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-charcoal">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-aluminium" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3 text-sm text-white transition hover:bg-charcoal-soft"
            >
              Get a quote for {service.name.toLowerCase()}
              <ArrowRight size={15} className="transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal>
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-aluminium">
              <span className="label-mark" />
              Other Trades
            </p>
            <h2 className="mt-4 font-heading text-2xl font-light text-charcoal sm:text-3xl">
              Explore our other services
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-center justify-between rounded-xl border border-border bg-white px-6 py-5 text-sm text-charcoal transition hover:border-charcoal"
              >
                {s.name}
                <ArrowRight
                  size={15}
                  className="text-aluminium transition group-hover:translate-x-1 group-hover:text-charcoal"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
