import Image from "next/image";
import { Reveal } from "@/components/Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
}) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-charcoal pt-28">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/30" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 lg:px-10">
        <Reveal>
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-bronze">
            <span className="h-px w-10 bg-bronze" />
            {eyebrow}
          </p>
          <h1 className="mt-6 max-w-2xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-aluminium-light">
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
