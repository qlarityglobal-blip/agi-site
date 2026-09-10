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
    <section className="relative flex min-h-[54vh] items-end overflow-hidden bg-charcoal pt-32">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/20" />
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 lg:px-10">
        <Reveal>
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-aluminium-light">
            <span className="label-mark" />
            {eyebrow}
          </p>
          <h1 className="mt-6 max-w-2xl font-heading text-5xl font-light leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
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
