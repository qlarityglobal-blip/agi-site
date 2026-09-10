import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { DirectLines } from "@/components/DirectLines";
import { Reveal } from "@/components/Reveal";
import { contact } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Call or email AGI Interior Specialists directly in Johannesburg, Cape Town or Polokwane to scope your next aluminium, drywall or ceiling fit-out.",
};

const directLines = [
  { label: "Johannesburg", number: contact.phones[0].number, note: "Head Office" },
  { label: "Cape Town", number: contact.phones[1].number, note: "Regional Team" },
  { label: "Polokwane", number: contact.phones[2].number, note: "Regional Team" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Speak to our team directly"
        description="For fit-outs of this scale, a phone call gets you further than a form. Call or email your nearest regional team and we'll scope the project with you directly."
        image="/images/projects/somerset-mall-2.jpg"
      />

      <section className="bg-charcoal py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal>
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-aluminium-light">
              <span className="label-mark" />
              Direct Lines
            </p>
            <h2 className="mt-4 max-w-xl font-heading text-4xl font-light text-white sm:text-5xl">
              Call your nearest team
            </h2>
          </Reveal>

          <DirectLines lines={directLines} email={contact.email} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-aluminium">
              <span className="label-mark" />
              Head Office
            </p>
            <h2 className="mt-6 font-heading text-3xl font-light text-charcoal sm:text-4xl">
              Unit 4B, New Goch Road
            </h2>
            <div className="mt-6 flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted text-charcoal">
                <MapPin size={20} />
              </span>
              <p className="text-sm leading-relaxed text-graphite">{contact.address}</p>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-border">
              <iframe
                title="AGI Interior Specialists location"
                src="https://www.google.com/maps?q=Unit+4B+23+New+Goch+Road+Benrose+2094+Johannesburg+South+Africa&output=embed"
                width="100%"
                height="320"
                loading="lazy"
                className="grayscale"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-muted p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-aluminium">
                Prefer to write instead?
              </p>
              <h3 className="mt-3 font-heading text-2xl font-light text-charcoal">
                Send us your project details
              </h3>
              <p className="mt-2 text-sm text-graphite">
                Tell us about the site and scope &mdash; a project lead will call
                you back to discuss the fit-out.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
