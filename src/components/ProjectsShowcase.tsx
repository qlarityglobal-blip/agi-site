"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MapPin, ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/data";
import { RevealGroup, revealItem } from "@/components/Reveal";

const ratios = ["aspect-[4/5]", "aspect-[4/3]", "aspect-square", "aspect-[3/4]"];

function TiltCard({
  project,
  ratio,
  onClick,
}: {
  project: Project;
  ratio: string;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spx = useSpring(px, { stiffness: 200, damping: 20 });
  const spy = useSpring(py, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(spy, [0, 1], [7, -7]);
  const rotateY = useTransform(spx, [0, 1], [-7, 7]);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.button
      variants={revealItem}
      onClick={onClick}
      className={`group relative mb-6 block w-full break-inside-avoid overflow-hidden rounded-[1.75rem] bg-charcoal text-left ${ratio}`}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
        className="absolute inset-0"
      >
        <Image
          src={project.cover}
          alt={project.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/10 to-transparent opacity-80 transition group-hover:opacity-95" />

        <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur transition duration-300 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </span>

        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="text-[11px] uppercase tracking-widest text-aluminium-light">
            {project.category}
          </p>
          <h3 className="mt-1 font-heading text-xl font-medium text-white sm:text-2xl">
            {project.name}
          </h3>
          {project.location && (
            <p className="mt-1 flex items-center gap-1 text-xs text-aluminium-light">
              <MapPin size={12} />
              {project.location}
            </p>
          )}
        </div>
      </motion.div>
    </motion.button>
  );
}

export function ProjectsShowcase({ list }: { list: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const [imgIndex, setImgIndex] = useState(0);

  const open = (project: Project) => {
    setActive(project);
    setImgIndex(0);
  };

  const next = () => {
    if (!active) return;
    setImgIndex((i) => (i + 1) % active.images.length);
  };
  const prev = () => {
    if (!active) return;
    setImgIndex((i) => (i - 1 + active.images.length) % active.images.length);
  };

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, imgIndex]);

  return (
    <>
      <RevealGroup className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {list.map((project, i) => (
          <TiltCard
            key={project.slug}
            project={project}
            ratio={ratios[i % ratios.length]}
            onClick={() => open(project)}
          />
        ))}
      </RevealGroup>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 p-4"
            onClick={() => setActive(null)}
          >
            <button
              aria-label="Close"
              className="absolute right-5 top-5 text-white/70 transition hover:text-white"
              onClick={() => setActive(null)}
            >
              <X size={28} />
            </button>

            <div
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={imgIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-xl"
                >
                  <Image
                    src={active.images[imgIndex]}
                    alt={active.name}
                    fill
                    sizes="90vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {active.images.length > 1 && (
                <>
                  <button
                    aria-label="Previous photo"
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    aria-label="Next photo"
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60"
                  >
                    <ChevronRight size={22} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {active.images.map((_, idx) => (
                      <span
                        key={idx}
                        className={`h-1.5 w-1.5 rounded-full transition ${
                          idx === imgIndex ? "bg-white" : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              <div className="mt-4 text-center text-white">
                <p className="text-xs uppercase tracking-widest text-aluminium-light">
                  {active.category}
                </p>
                <h3 className="mt-1 font-heading text-xl font-light">{active.name}</h3>
                {active.location && (
                  <p className="mt-1 flex items-center justify-center gap-1 text-sm text-aluminium-light">
                    <MapPin size={13} />
                    {active.location}
                  </p>
                )}
                {active.note && (
                  <p className="mt-1 text-sm text-aluminium-light">{active.note}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
