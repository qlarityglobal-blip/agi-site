"use client";

import Link from "next/link";
import Image from "next/image";
import type { ComponentType } from "react";
import {
  DoorOpen,
  Grid2x2,
  Hammer,
  KeyRound,
  LayoutPanelTop,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { services } from "@/lib/data";
import { RevealGroup, revealItem } from "@/components/Reveal";
import { motion } from "framer-motion";

const icons: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  aluminium: DoorOpen,
  "dry-walling": Grid2x2,
  ceilings: LayoutPanelTop,
  glazing: Sparkles,
  carpentry: Hammer,
  turnkey: KeyRound,
};

const images: Record<string, string> = {
  aluminium: "/images/projects/comair-1.jpg",
  "dry-walling": "/images/projects/drywalling.jpg",
  ceilings: "/images/projects/university-mpumalanga-2.jpg",
  glazing: "/images/projects/somerset-mall-2.jpg",
  carpentry: "/images/projects/carpentry.jpg",
  turnkey: "/images/projects/mmamethalke-hospital-2.jpg",
};

export function ServicesGrid({ compact = false }: { compact?: boolean }) {
  const list = compact ? services.slice(0, 6) : services;

  return (
    <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((service) => {
        const Icon = icons[service.slug] ?? Hammer;
        return (
          <motion.div key={service.slug} variants={revealItem} initial="rest" whileHover="hover">
            <Link
              href={`/services#${service.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-bronze/40 hover:shadow-[0_24px_60px_-24px_rgba(10,31,56,0.35)]"
            >
              <motion.div
                variants={{ rest: { opacity: 0, scale: 1.1 }, hover: { opacity: 1, scale: 1 } }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[service.slug]}
                  alt=""
                  fill
                  sizes="360px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/75 to-charcoal/50" />
              </motion.div>

              <div className="relative flex items-center justify-between">
                <motion.span
                  variants={{
                    rest: { backgroundColor: "var(--color-muted)", color: "var(--color-bronze)" },
                    hover: { backgroundColor: "rgba(255,255,255,0.15)", color: "#ffffff" },
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                >
                  <Icon size={22} />
                </motion.span>
                <motion.span
                  variants={{ rest: { color: "var(--color-aluminium)" }, hover: { color: "#ffffff" } }}
                >
                  <ArrowUpRight size={18} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.span>
              </div>

              <motion.h3
                variants={{ rest: { color: "var(--color-charcoal)" }, hover: { color: "#ffffff" } }}
                className="relative mt-6 font-heading text-xl font-semibold"
              >
                {service.name}
              </motion.h3>
              <motion.p
                variants={{ rest: { color: "var(--color-graphite)" }, hover: { color: "var(--color-aluminium-light)" } }}
                className="relative mt-2 text-sm leading-relaxed"
              >
                {service.summary}
              </motion.p>
              <motion.ul
                variants={{ rest: { color: "var(--color-aluminium)" }, hover: { color: "rgba(255,255,255,0.85)" } }}
                className="relative mt-5 space-y-1.5 text-xs"
              >
                {service.items.slice(0, 3).map((item) => (
                  <li key={item}>&mdash; {item}</li>
                ))}
              </motion.ul>
            </Link>
          </motion.div>
        );
      })}
    </RevealGroup>
  );
}
