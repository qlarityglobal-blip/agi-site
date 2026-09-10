"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquareText } from "lucide-react";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Link
            href="/contact"
            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-charcoal px-5 py-3.5 text-sm text-white transition hover:bg-charcoal-soft"
          >
            <MessageSquareText size={18} />
            <span className="hidden sm:inline">Contact Us</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
