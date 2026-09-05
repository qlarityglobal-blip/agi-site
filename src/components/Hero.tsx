"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowDown, Award } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Marquee } from "@/components/Marquee";

const stats = [
  { value: 30, suffix: "+", label: "Years experience" },
  { value: 3, suffix: "", label: "Regional teams" },
  { value: 6, suffix: "", label: "Specialist trades" },
  { value: 100, suffix: "+", label: "Projects delivered" },
];

const tickerItems = [
  "B-BBEE LEVEL 2 CONTRIBUTOR",
  "30+ YEARS EXPERIENCE",
  "CIDB & CSD REGISTERED",
  "NATIONWIDE PROJECT TEAMS",
  "CORPORATE · MEDICAL · RETAIL · RESIDENTIAL",
  "SAGGA AFFILIATED",
];

const slides = [
  { src: "/images/hero.jpg", alt: "AGI aluminium and glazing project" },
  { src: "/images/projects/comair-1.jpg", alt: "Comair corporate fit-out" },
  { src: "/images/projects/university-mpumalanga-1.jpg", alt: "University of Mpumalanga" },
  { src: "/images/projects/steve-tshwete-hospital-1.jpg", alt: "Steve Tshwete Hospital" },
  { src: "/images/projects/somerset-mall-2.jpg", alt: "Somerset Mall" },
];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-charcoal">
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2 }, scale: { duration: 6, ease: "linear" } }}
            className="absolute inset-0"
          >
            <Image
              src={slides[index].src}
              alt={slides[index].alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/75 to-charcoal/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/30 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      <div className="relative flex flex-1 items-center">
        <div className="mx-auto w-full max-w-7xl px-6 pt-28 pb-10 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-bronze"
          >
            <span className="h-px w-10 bg-bronze" />
            Interior Specialists &middot; Johannesburg, South Africa
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-3xl font-heading text-5xl font-bold leading-[1.03] text-white sm:text-6xl lg:text-[4.5rem]"
          >
            Interiors engineered for <span className="text-gradient">South Africa&rsquo;s</span>{" "}
            biggest builds.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-aluminium-light"
          >
            Aluminium, glazing, drywall and ceiling systems delivered at scale for
            hospitals, malls, campuses and corporate headquarters &mdash; with over
            30 years of experience and teams stationed across the country.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 rounded-full bg-bronze px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-12px_rgba(31,147,171,0.7)] transition hover:bg-bronze-dark"
            >
              View Our Work
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              Contact Us
            </Link>
            <span className="inline-flex items-center gap-2 rounded-full border border-bronze/40 bg-bronze/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-bronze">
              <Award size={14} />
              B-BBEE Level 2
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-16 grid grid-cols-2 gap-x-10 gap-y-7 border-t border-white/10 pt-8 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-heading text-3xl font-bold text-white sm:text-4xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-aluminium">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="relative flex items-center gap-1.5 px-6 pb-4 lg:px-10">
        {slides.map((s, i) => (
          <button
            key={s.src}
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === index ? "w-8 bg-bronze" : "w-3 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      <div className="relative border-t border-white/10 bg-charcoal-soft/60 py-4 text-aluminium-light">
        <Marquee items={tickerItems} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-[4.5rem] left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 lg:flex"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.div>
    </section>
  );
}
