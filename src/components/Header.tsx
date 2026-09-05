"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { nav, contact } from "@/lib/data";
import { Logo } from "@/components/Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-border bg-cream/95 backdrop-blur shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="relative z-10">
          <Logo theme={solid ? "dark" : "light"} />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative text-sm font-medium tracking-wide uppercase transition-colors ${
                  solid ? "text-graphite hover:text-charcoal" : "text-white/90 hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-[2px] bg-bronze transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${contact.phones[0].number.replace(/\s/g, "")}`}
            className={`flex items-center gap-2 text-sm font-medium ${
              solid ? "text-charcoal" : "text-white"
            }`}
          >
            <Phone size={16} className="text-bronze" />
            {contact.phones[0].number}
          </a>
          <Link
            href="/contact"
            className="rounded-full bg-bronze px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(31,147,171,0.6)] transition hover:bg-bronze-dark"
          >
            Contact Us
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className={`relative z-10 lg:hidden ${solid ? "text-charcoal" : "text-white"}`}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-cream px-6 pb-8 pt-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-charcoal hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={`tel:${contact.phones[0].number.replace(/\s/g, "")}`}
            className="mt-4 flex items-center gap-2 px-3 text-sm font-medium text-charcoal"
          >
            <Phone size={16} className="text-bronze" />
            {contact.phones[0].number}
          </a>
          <Link
            href="/contact"
            className="mt-4 block rounded-full bg-bronze px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Contact Us
          </Link>
        </div>
      )}

      <div
        className="h-[2px] bg-bronze transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </header>
  );
}
