"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/data";

export function ProjectIndex() {
  const [active, setActive] = useState<(typeof projects)[number] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 280, damping: 28, mass: 0.4 });
  const y = useSpring(mouseY, { stiffness: 280, damping: 28, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section className="relative overflow-hidden bg-charcoal py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-bronze">
                <span className="h-px w-10 bg-bronze" />
                The Work
              </p>
              <h2 className="mt-6 max-w-xl font-heading text-3xl font-bold text-white sm:text-4xl">
                Ten sites. Zero shortcuts.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-aluminium-light">
              Hover a project to preview it. Every line below is a completed AGI
              site, not a stock render.
            </p>
          </div>
        </Reveal>

        <div
          ref={containerRef}
          onMouseMove={handleMove}
          onMouseLeave={() => setActive(null)}
          className="relative mt-12 border-t border-white/10"
        >
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href="/gallery"
              onMouseEnter={() => setActive(project)}
              className="group relative flex items-center justify-between gap-6 border-b border-white/10 py-6 transition-colors hover:border-bronze/40 sm:py-7"
            >
              <div className="flex min-w-0 items-baseline gap-5 sm:gap-8">
                <span className="hidden font-heading text-sm text-aluminium sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="truncate font-heading text-2xl font-bold text-white transition-colors group-hover:text-bronze sm:text-3xl lg:text-4xl">
                  {project.name}
                </h3>
              </div>
              <div className="flex shrink-0 items-center gap-4 sm:gap-8">
                <span className="hidden text-xs font-semibold uppercase tracking-widest text-aluminium sm:inline">
                  {project.category}
                </span>
                <span className="hidden text-sm text-aluminium-light md:inline">
                  {project.location}
                </span>
                <ArrowUpRight
                  size={22}
                  className="text-aluminium transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-bronze"
                />
              </div>
            </Link>
          ))}

          <motion.div
            style={{ left: x, top: y }}
            className="pointer-events-none absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
          >
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={active.slug}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="relative h-64 w-80 overflow-hidden rounded-2xl shadow-2xl"
                >
                  <Image
                    src={active.cover}
                    alt={active.name}
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
