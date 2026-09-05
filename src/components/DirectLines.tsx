"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { RevealGroup, revealItem } from "@/components/Reveal";

export function DirectLines({
  lines,
  email,
}: {
  lines: { label: string; number: string; note: string }[];
  email: string;
}) {
  return (
    <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {lines.map((line) => (
        <motion.a
          key={line.label}
          variants={revealItem}
          href={`tel:${line.number.replace(/\s/g, "")}`}
          className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-charcoal-soft/60 p-6 transition hover:border-bronze/50 hover:bg-charcoal-soft"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bronze/15 text-bronze">
              <Phone size={20} />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-aluminium">
              {line.note}
            </span>
          </div>
          <div className="mt-6">
            <p className="text-xs uppercase tracking-wider text-aluminium-light">{line.label}</p>
            <p className="mt-1 font-heading text-2xl font-bold text-white transition group-hover:text-bronze">
              {line.number}
            </p>
          </div>
        </motion.a>
      ))}

      <motion.a
        variants={revealItem}
        href={`mailto:${email}`}
        className="group flex flex-col justify-between rounded-2xl border border-bronze/40 bg-bronze/10 p-6 transition hover:border-bronze hover:bg-bronze/20"
      >
        <div className="flex items-center justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bronze text-white">
            <Mail size={20} />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-aluminium-light">
            Email
          </span>
        </div>
        <div className="mt-6">
          <p className="text-xs uppercase tracking-wider text-aluminium-light">All enquiries</p>
          <p className="mt-1 break-all font-heading text-xl font-bold text-white transition group-hover:text-bronze">
            {email}
          </p>
        </div>
      </motion.a>
    </RevealGroup>
  );
}
