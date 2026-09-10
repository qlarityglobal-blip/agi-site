"use client";

import { motion } from "framer-motion";
import { Award, MapPin, Target, Users } from "lucide-react";
import { RevealGroup, revealItem } from "@/components/Reveal";

const icons = { award: Award, users: Users, "map-pin": MapPin, target: Target };

export type Value = {
  icon: keyof typeof icons;
  title: string;
  text: string;
};

export function ValuesGrid({ values }: { values: Value[] }) {
  return (
    <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {values.map((v) => {
        const Icon = icons[v.icon];
        return (
          <motion.div
            key={v.title}
            variants={revealItem}
            className="rounded-[1.5rem] border border-border bg-white p-8"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cream text-charcoal">
              <Icon size={22} />
            </span>
            <h3 className="mt-6 font-heading text-lg font-medium text-charcoal">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-graphite">{v.text}</p>
          </motion.div>
        );
      })}
    </RevealGroup>
  );
}
