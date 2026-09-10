import Link from "next/link";
import { Award, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { contact, nav, services } from "@/lib/data";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="bg-onyx text-aluminium-light">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Logo theme="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-aluminium">
              30+ years delivering aluminium, glazing, drywall and ceiling
              fit-outs at scale for hospitals, campuses, national retailers and
              corporate headquarters across South Africa.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-aluminium-light">
                <Award size={13} />
                B-BBEE Level 2
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-aluminium-light">
                <ShieldCheck size={13} />
                CIDB Registered
              </span>
            </div>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-xs uppercase tracking-widest text-white">
              <span className="label-mark text-aluminium" />
              Navigate
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-aluminium transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-xs uppercase tracking-widest text-white">
              <span className="label-mark text-aluminium" />
              Services
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-aluminium transition hover:text-white"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-xs uppercase tracking-widest text-white">
              <span className="label-mark text-aluminium" />
              Contact
            </h4>
            <ul className="mt-5 space-y-4 text-sm text-aluminium">
              <li className="flex gap-3">
                <MapPin size={17} className="mt-0.5 shrink-0" />
                <span>{contact.address}</span>
              </li>
              {contact.phones.map((p) => (
                <li key={p.label} className="flex gap-3">
                  <Phone size={17} className="mt-0.5 shrink-0" />
                  <span>
                    {p.label} &mdash; {p.number}
                  </span>
                </li>
              ))}
              <li className="flex gap-3">
                <Mail size={17} className="mt-0.5 shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-white">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-aluminium sm:flex-row">
          <p>&copy; {new Date().getFullYear()} AGI Interior Specialists. All rights reserved.</p>
          <p>Johannesburg &middot; Cape Town &middot; Polokwane</p>
        </div>
      </div>
    </footer>
  );
}
