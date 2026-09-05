import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { contact } from "@/lib/data";

const outfit = localFont({
  variable: "--font-outfit",
  src: [
    { path: "../fonts/Outfit-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Outfit-Bold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
});

const workSans = localFont({
  variable: "--font-work-sans",
  src: [
    { path: "../fonts/WorkSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/WorkSans-Bold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://agidrywall.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "AGI Interior Specialists | B-BBEE Level 2 Aluminium & Drywall Contractor",
    template: "%s | AGI Interior Specialists",
  },
  description:
    "AGI is a B-BBEE Level 2, CIDB registered aluminium, drywall, ceiling and glazing contractor based in Johannesburg, delivering large-scale fit-outs for hospitals, corporates and national retailers across South Africa.",
  keywords: [
    "B-BBEE Level 2 contractor South Africa",
    "CIDB registered contractor Johannesburg",
    "aluminium partitioning Johannesburg",
    "drywall contractor South Africa",
    "shopfront installation South Africa",
    "commercial ceiling contractor",
    "glazing contractor Johannesburg",
    "interior fit-out contractor South Africa",
  ],
  authors: [{ name: "AGI Interior Specialists" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: baseUrl,
    siteName: "AGI Interior Specialists",
    title: "AGI Interior Specialists | B-BBEE Level 2 Aluminium & Drywall Contractor",
    description:
      "B-BBEE Level 2, CIDB registered contractor delivering aluminium, drywall, ceiling and glazing fit-outs at scale across South Africa.",
    images: [{ url: "/images/hero.jpg", width: 1920, height: 1080, alt: "AGI Interior Specialists project" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AGI Interior Specialists | B-BBEE Level 2 Contractor",
    description:
      "B-BBEE Level 2, CIDB registered aluminium, drywall and ceiling contractor delivering large-scale fit-outs across South Africa.",
    images: ["/images/hero.jpg"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "AGI Interior Specialists",
  description:
    "B-BBEE Level 2, CIDB registered aluminium, drywall, ceiling and glazing contractor delivering large-scale interior fit-outs across South Africa.",
  url: baseUrl,
  logo: `${baseUrl}/images/logo.png`,
  telephone: contact.phones[0].number,
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Unit 4B, 23 New Goch Road, Benrose",
    addressLocality: "Johannesburg",
    postalCode: "2094",
    addressCountry: "ZA",
  },
  areaServed: "South Africa",
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "B-BBEE Level 2 Contributor",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "CIDB Registered Contractor",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "membership",
      name: "SAGGA Affiliate (South African Glass & Glazing Association)",
    },
  ],
  sameAs: [],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-charcoal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
