"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

const AUTO_ADVANCE_MS = 6000;

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = projects.length;
  const project = projects[index];
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const goTo = (i: number) => setIndex(i);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused]);

  return (
    <section className="bg-charcoal py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-aluminium-light">
                <span className="label-mark" />
                Our Work
              </p>
              <h2 className="mt-6 max-w-xl font-heading text-4xl font-light text-white sm:text-5xl">
                Sites our teams have shaped.
              </h2>
            </div>
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 text-sm text-white transition"
            >
              View full gallery
              <ArrowUpRight size={16} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative mt-14 overflow-hidden rounded-[2rem]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[16/8]">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={project.cover}
                    alt={project.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1152px"
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-transparent" />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-7 sm:flex-row sm:items-end sm:justify-between sm:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-xs uppercase tracking-widest text-bronze">
                      {project.category}
                    </p>
                    <h3 className="mt-2 font-heading text-3xl font-light text-white sm:text-4xl">
                      {project.name}
                    </h3>
                    {project.location && (
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-aluminium-light">
                        <MapPin size={14} />
                        {project.location}
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center gap-4">
                  <span className="index-mark text-sm text-aluminium-light">
                    {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      aria-label="Previous project"
                      onClick={prev}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-white hover:bg-white/10"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <button
                      aria-label="Next project"
                      onClick={next}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-white hover:bg-white/10"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-1.5">
            {projects.map((p, i) => (
              <button
                key={p.slug}
                aria-label={`Show ${p.name}`}
                onClick={() => goTo(i)}
                className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10"
              >
                {i === index && (
                  <motion.span
                    key={`${p.slug}-${paused}`}
                    className="block h-full bg-bronze"
                    initial={{ width: "0%" }}
                    animate={{ width: paused ? "0%" : "100%" }}
                    transition={{ duration: paused ? 0 : AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                  />
                )}
                {i < index && <span className="block h-full w-full bg-white/40" />}
              </button>
            ))}
          </div>

          <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
            {projects.map((p, i) => (
              <button
                key={p.slug}
                onClick={() => goTo(i)}
                aria-label={p.name}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg transition ${
                  i === index ? "ring-2 ring-bronze" : "opacity-45 hover:opacity-80"
                }`}
              >
                <Image src={p.cover} alt="" fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
