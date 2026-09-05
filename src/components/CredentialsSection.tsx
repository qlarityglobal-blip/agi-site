"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, ShieldCheck } from "lucide-react";
import { RevealGroup, revealItem, Reveal } from "@/components/Reveal";
import { credentials } from "@/lib/data";

const icons = { bbbee: Award, cidb: ShieldCheck, sagga: BadgeCheck };

export function CredentialsSection() {
  return (
    <section className="border-y border-border bg-charcoal py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-bronze">
                <span className="h-px w-10 bg-bronze" />
                Compliance &amp; Standing
              </p>
              <h2 className="mt-6 max-w-xl font-heading text-3xl font-bold text-white sm:text-4xl">
                Cleared for tender. Built for scale.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-aluminium-light">
              The credentials procurement teams check first &mdash; verified and
              current, so your project doesn&rsquo;t stall on compliance.
            </p>
          </div>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 lg:grid-cols-3">
          {credentials.map((c) => {
            const Icon = icons[c.slug as keyof typeof icons];
            return (
              <motion.div
                key={c.slug}
                variants={revealItem}
                className={`rounded-2xl border p-8 ${
                  c.slug === "bbbee"
                    ? "border-bronze/50 bg-gradient-to-br from-bronze/15 to-transparent"
                    : "border-white/10 bg-charcoal-soft/50"
                }`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    c.slug === "bbbee" ? "bg-bronze text-white" : "bg-white/10 text-bronze"
                  }`}
                >
                  <Icon size={22} />
                </span>
                <h3 className="mt-6 font-heading text-xl font-bold text-white">{c.title}</h3>
                <p className="mt-1 text-sm font-semibold text-bronze">{c.short}</p>
                <p className="mt-3 text-sm leading-relaxed text-aluminium-light">{c.detail}</p>
              </motion.div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
