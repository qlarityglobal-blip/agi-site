"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Project } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {projects.map((project, i) => (
        <Reveal key={project.slug} delay={i * 0.08} className={i === 0 ? "lg:row-span-2" : ""}>
          <motion.div
            whileHover="hover"
            initial="rest"
            animate="rest"
            className={`group relative overflow-hidden rounded-3xl bg-charcoal ${
              i === 0 ? "aspect-[4/5] lg:aspect-auto lg:h-full" : "aspect-[16/11]"
            }`}
          >
            <motion.div
              variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={project.cover}
                alt={project.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
            <motion.div
              variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
              className="absolute inset-0 bg-bronze/20"
            />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-bronze">
                  {project.category}
                </p>
                <h3 className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl">
                  {project.name}
                </h3>
                {project.location && (
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-aluminium-light">
                    <MapPin size={14} />
                    {project.location}
                  </p>
                )}
              </div>
              <motion.span
                variants={{ rest: { scale: 0.85, opacity: 0.7 }, hover: { scale: 1, opacity: 1 } }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-charcoal"
              >
                <ArrowUpRight size={18} />
              </motion.span>
            </div>
          </motion.div>
        </Reveal>
      ))}
    </div>
  );
}
