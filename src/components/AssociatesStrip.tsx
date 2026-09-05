import Image from "next/image";
import { associates } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

const loop = [...associates, ...associates];

export function AssociatesStrip() {
  return (
    <section className="border-y border-border bg-muted/60 py-14">
      <Reveal>
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.25em] text-aluminium">
          Registered &amp; Affiliated With
        </p>
      </Reveal>
      <div className="group overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-16 group-hover:[animation-play-state:paused]">
          {loop.map((a, i) => (
            <div
              key={`${a.name}-${i}`}
              className="relative h-12 w-32 shrink-0 grayscale opacity-70 transition hover:opacity-100 hover:grayscale-0"
            >
              <Image src={a.logo} alt={a.name} fill className="object-contain" sizes="130px" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
