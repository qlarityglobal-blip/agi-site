"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { nav, contact } from "@/lib/data";
import { Logo } from "@/components/Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6 sm:px-6">
      <div className="w-full max-w-6xl rounded-2xl bg-charcoal/95 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.4)] backdrop-blur">
        <div className="flex items-center justify-between gap-6 px-5 py-3 sm:px-7">
          <Link href="/" className="shrink-0">
            <Logo theme="light" compact />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm tracking-wide transition-colors ${
                    active ? "text-white" : "text-aluminium-light hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={`tel:${contact.phones[0].number.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-sm text-aluminium-light transition hover:text-white"
            >
              <Phone size={15} />
              {contact.phones[0].number}
            </a>
            <Link
              href="/contact"
              className="rounded-full border border-white/25 px-5 py-2 text-sm text-white transition hover:border-white hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            className="text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-white/10 px-5 pb-6 pt-2 lg:hidden">
            <nav className="flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-2 py-3 text-base text-aluminium-light transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <a
              href={`tel:${contact.phones[0].number.replace(/\s/g, "")}`}
              className="mt-2 flex items-center gap-2 px-2 py-2 text-sm text-aluminium-light"
            >
              <Phone size={15} />
              {contact.phones[0].number}
            </a>
            <Link
              href="/contact"
              className="mt-3 block rounded-full border border-white/25 px-5 py-3 text-center text-sm text-white"
            >
              Contact Us
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
