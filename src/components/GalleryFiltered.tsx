"use client";

import { useState } from "react";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { projects, projectCategories } from "@/lib/data";

export function GalleryFiltered() {
  const [category, setCategory] = useState("All");

  const list =
    category === "All" ? projects : projects.filter((p) => p.category === category);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {projectCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
              category === c
                ? "border-bronze bg-bronze text-white"
                : "border-border text-graphite hover:border-bronze hover:text-bronze"
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
