import Image from "next/image";
import { associates } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

export function AssociatesStrip() {
  return (
    <section className="border-y border-border py-14">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal>
          <p className="mb-9 text-center text-xs uppercase tracking-[0.25em] text-aluminium">
            Registered &amp; Affiliated With
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
            {associates.map((a) => (
              <div
                key={a.name}
                className="relative h-11 w-28 shrink-0 grayscale opacity-60 transition hover:opacity-100 hover:grayscale-0"
              >
                <Image src={a.logo} alt={a.name} fill className="object-contain" sizes="120px" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
