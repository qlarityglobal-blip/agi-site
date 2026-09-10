"use client";

import { useMemo, useState } from "react";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import type { Project } from "@/lib/data";

export function GalleryFiltered({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );

  const list =
    category === "All" ? projects : projects.filter((p) => p.category === category);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-5 py-2 text-sm transition ${
              category === c
                ? "border-charcoal bg-charcoal text-white"
                : "border-border text-graphite hover:border-charcoal"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-12">
        <ProjectsShowcase key={category} list={list} />
      </div>
    </div>
  );
}
