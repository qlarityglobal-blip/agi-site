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
          className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-charcoal-soft p-6 transition hover:border-white/30"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
              <Phone size={20} />
            </span>
            <span className="text-[11px] uppercase tracking-widest text-aluminium">
              {line.note}
            </span>
          </div>
          <div className="mt-6">
            <p className="text-xs uppercase tracking-wider text-aluminium-light">{line.label}</p>
            <p className="mt-1 font-heading text-2xl font-medium text-white">
              {line.number}
            </p>
          </div>
        </motion.a>
      ))}

      <motion.a
        variants={revealItem}
        href={`mailto:${email}`}
        className="group flex flex-col justify-between rounded-2xl border border-white bg-white p-6 transition hover:bg-aluminium-light"
      >
        <div className="flex items-center justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-charcoal text-white">
            <Mail size={20} />
          </span>
          <span className="text-[11px] uppercase tracking-widest text-aluminium">
            Email
          </span>
        </div>
        <div className="mt-6">
          <p className="text-xs uppercase tracking-wider text-graphite">All enquiries</p>
          <p className="mt-1 break-all font-heading text-xl font-medium text-charcoal">
            {email}
          </p>
        </div>
      </motion.a>
    </RevealGroup>
  );
}
