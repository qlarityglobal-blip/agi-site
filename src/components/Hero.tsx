"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Award } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Magnetic } from "@/components/Magnetic";
import { siteCopy } from "@/lib/data";

const { hero } = siteCopy;
const stats = hero.stats;

const slides = [
  { src: "/images/hero.jpg", alt: "AGI aluminium and glazing project" },
  { src: "/images/projects/comair-1.jpg", alt: "Comair corporate fit-out" },
  { src: "/images/projects/university-mpumalanga-1.jpg", alt: "University of Mpumalanga" },
  { src: "/images/projects/steve-tshwete-hospital-1.jpg", alt: "Steve Tshwete Hospital" },
  { src: "/images/projects/somerset-mall-2.jpg", alt: "Somerset Mall" },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-screen flex-col overflow-hidden bg-charcoal">
      <motion.div style={{ y: parallaxY }} className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.4 }, scale: { duration: 6.5, ease: "linear" } }}
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
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-onyx/85 via-onyx/20 to-transparent" />
      </motion.div>

      <div className="relative flex flex-1 items-center">
        <div className="mx-auto w-full max-w-6xl px-6 pt-32 pb-10 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-aluminium-light"
          >
            <span className="label-mark" />
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-3xl font-heading text-6xl font-light leading-[0.98] tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-8 max-w-lg text-base leading-relaxed text-aluminium-light"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.36 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic strength={0.3} className="inline-flex">
              <Link
                href="/gallery"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm text-charcoal transition hover:bg-aluminium-light"
              >
                {hero.primaryCtaLabel}
                <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.3} className="inline-flex">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm text-white transition hover:border-white"
              >
                {hero.secondaryCtaLabel}
              </Link>
            </Magnetic>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-2 text-xs uppercase tracking-wider text-aluminium-light">
              <Award size={13} />
              {hero.badge}
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
                <p className="font-heading text-3xl font-medium text-white sm:text-4xl">
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

      <div className="relative flex items-center justify-center gap-1.5 pb-8">
        {slides.map((s, i) => (
          <button
            key={s.src}
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === index ? "w-8 bg-white" : "w-3 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
