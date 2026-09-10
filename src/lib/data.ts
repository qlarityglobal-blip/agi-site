import siteContent from "@/content/site.json";

export type Service = {
  slug: string;
  name: string;
  summary: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  items: string[];
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  location?: string;
  note?: string;
  description?: string;
  featured?: boolean;
  cover: string;
  images: string[];
};

export type Credential = {
  slug: string;
  title: string;
  short: string;
  detail: string;
};

export type Associate = {
  name: string;
  logo: string;
};

export type Contact = {
  address: string;
  phones: { label: string; number: string }[];
  email: string;
};

export type Stat = { value: number; suffix: string; label: string };

export type Value = {
  icon: "award" | "target" | "users" | "map-pin";
  title: string;
  text: string;
};

export type SiteCopy = {
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    badge: string;
    stats: Stat[];
  };
  aboutPreview: {
    eyebrow: string;
    headline: string;
    body: string;
    points: string[];
  };
  credentialsSection: {
    eyebrow: string;
    headline: string;
    description: string;
  };
  ctaBanner: {
    eyebrow: string;
    headline: string;
    description: string;
  };
  aboutPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    storyEyebrow: string;
    storyHeadline: string;
    storyParagraphs: string[];
    valuesEyebrow: string;
    valuesHeadline: string;
    values: Value[];
  };
  contactPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    directLinesEyebrow: string;
    directLinesHeadline: string;
    officeHeadline: string;
    formEyebrow: string;
    formHeadline: string;
    formDescription: string;
  };
};

export const siteCopy: SiteCopy = siteContent.siteCopy as SiteCopy;
export const services: Service[] = siteContent.services;
export const projects: Project[] = siteContent.projects;
export const credentials: Credential[] = siteContent.credentials;
export const associates: Associate[] = siteContent.associates;
export const contact: Contact = siteContent.contact;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];
