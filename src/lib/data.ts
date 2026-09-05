export type Service = {
  slug: string;
  name: string;
  summary: string;
  items: string[];
};

export const services: Service[] = [
  {
    slug: "aluminium",
    name: "Aluminium",
    summary:
      "Precision-fabricated aluminium systems for shopfronts, offices and facades.",
    items: [
      "Partitioning & dividers",
      "Curtain walling",
      "Shopfronts",
      "Doors & windows",
      "Automatic sliding doors",
    ],
  },
  {
    slug: "dry-walling",
    name: "Dry Walling",
    summary:
      "Fast, clean-build partitioning systems for commercial and medical spaces.",
    items: [
      "Partitions",
      "Specialised acoustic partitions",
      "Wall paneling",
      "Firestops",
      "Security doors",
      "Moisture resistant systems",
    ],
  },
  {
    slug: "ceilings",
    name: "Ceilings",
    summary: "Suspended and acoustic ceiling systems built for scale and finish.",
    items: ["Suspended ceilings", "Bulkheads", "Acoustic ceilings"],
  },
  {
    slug: "glazing",
    name: "Glazing",
    summary: "Glass partitioning and shopfront glazing for a premium finish.",
    items: ["Office partitions", "Shopfronts", "Aluminium doors"],
  },
  {
    slug: "carpentry",
    name: "Carpentry",
    summary: "Custom wooden joinery for partitions, doors and shopfronts.",
    items: ["Partitioning & dividers", "Wooden doors & frames", "Wooden shopfronts"],
  },
  {
    slug: "turnkey",
    name: "Turnkey Projects",
    summary: "End-to-end interior fit-out, managed from concept to handover.",
    items: ["Corporate", "Medical", "Residential", "Construction"],
  },
];

export type Project = {
  slug: string;
  name: string;
  category: string;
  location?: string;
  note?: string;
  featured?: boolean;
  cover: string;
  images: string[];
};

export const projects: Project[] = [
  {
    slug: "university-of-mpumalanga",
    name: "University of Mpumalanga",
    category: "Education",
    location: "Mbombela, Mpumalanga",
    featured: true,
    cover: "/images/projects/university-mpumalanga-1.jpg",
    images: [
      "/images/projects/university-mpumalanga-1.jpg",
      "/images/projects/university-mpumalanga-2.jpg",
      "/images/projects/university-mpumalanga-3.jpg",
      "/images/projects/university-mpumalanga-4.jpg",
    ],
  },
  {
    slug: "steve-tshwete-hospital",
    name: "Steve Tshwete Hospital",
    category: "Healthcare",
    location: "Middelburg, Mpumalanga",
    note: "Main contractor: ENZA Construction",
    featured: true,
    cover: "/images/projects/steve-tshwete-hospital-1.jpg",
    images: [
      "/images/projects/steve-tshwete-hospital-1.jpg",
      "/images/projects/steve-tshwete-hospital-2.jpg",
      "/images/projects/steve-tshwete-hospital-3.jpg",
      "/images/projects/steve-tshwete-hospital-4.jpg",
    ],
  },
  {
    slug: "mmamethalke-hospital",
    name: "Mmamethalke Hospital",
    category: "Healthcare",
    location: "Limpopo",
    note: "Main contractor: Clear Choice Builders",
    cover: "/images/projects/mmamethalke-hospital-1.jpg",
    images: [
      "/images/projects/mmamethalke-hospital-1.jpg",
      "/images/projects/mmamethalke-hospital-2.jpg",
      "/images/projects/mmamethalke-hospital-3.jpg",
      "/images/projects/mmamethalke-hospital-4.jpg",
    ],
  },
  {
    slug: "baragwaneth-hospital",
    name: "Baragwaneth Hospital",
    category: "Healthcare",
    location: "Soweto, Johannesburg",
    cover: "/images/projects/baragwaneth-hospital.jpg",
    images: ["/images/projects/baragwaneth-hospital.jpg"],
  },
  {
    slug: "comair",
    name: "Comair",
    category: "Corporate",
    location: "Kempton Park, Johannesburg",
    featured: true,
    cover: "/images/projects/comair-1.jpg",
    images: [
      "/images/projects/comair-1.jpg",
      "/images/projects/comair-2.jpg",
      "/images/projects/comair-3.jpg",
      "/images/projects/comair-4.jpg",
    ],
  },
  {
    slug: "kathrine-towers",
    name: "Kathrine Towers",
    category: "Corporate",
    location: "Johannesburg",
    cover: "/images/projects/kathrine-towers-1.jpg",
    images: [
      "/images/projects/kathrine-towers-1.jpg",
      "/images/projects/kathrine-towers-2.jpg",
      "/images/projects/kathrine-towers-3.jpg",
      "/images/projects/kathrine-towers-4.jpg",
    ],
  },
  {
    slug: "somerset-mall",
    name: "Somerset Mall",
    category: "Retail",
    location: "Somerset West, Cape Town",
    featured: true,
    cover: "/images/projects/somerset-mall-2.jpg",
    images: [
      "/images/projects/somerset-mall-2.jpg",
      "/images/projects/somerset-mall-3.jpg",
      "/images/projects/somerset-mall-4.jpg",
    ],
  },
  {
    slug: "dwarsloop-mall",
    name: "Dwarsloop Mall",
    category: "Retail",
    location: "Bushbuckridge, Mpumalanga",
    cover: "/images/projects/dwarsloop-mall-1.jpg",
    images: [
      "/images/projects/dwarsloop-mall-1.jpg",
      "/images/projects/dwarsloop-mall-2.jpg",
      "/images/projects/dwarsloop-mall-3.jpg",
      "/images/projects/dwarsloop-mall-4.jpg",
    ],
  },
  {
    slug: "maranatha-church",
    name: "Maranatha Church",
    category: "Community",
    location: "Johannesburg",
    cover: "/images/projects/maranatha-church-1.jpg",
    images: [
      "/images/projects/maranatha-church-1.jpg",
      "/images/projects/maranatha-church-2.jpg",
      "/images/projects/maranatha-church-3.jpg",
      "/images/projects/maranatha-church-4.jpg",
    ],
  },
  {
    slug: "residential",
    name: "Various Residentials",
    category: "Residential",
    location: "Nationwide",
    cover: "/images/projects/residential-1.jpg",
    images: [
      "/images/projects/residential-1.jpg",
      "/images/projects/residential-2.jpg",
      "/images/projects/residential-3.jpg",
      "/images/projects/residential-4.jpg",
    ],
  },
];

export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

export const associates = [
  { name: "Central Supplier Database", logo: "/images/associates/central-supplier-database.jpg" },
  { name: "SAGGA", logo: "/images/associates/sagga.jpg" },
  { name: "CIDB", logo: "/images/associates/cidb.jpg" },
  { name: "Sabisa", logo: "/images/associates/sabisa.jpg" },
  { name: "Buildmart", logo: "/images/associates/buildmart.jpg" },
];

export type Credential = {
  slug: string;
  title: string;
  short: string;
  detail: string;
};

export const credentials: Credential[] = [
  {
    slug: "bbbee",
    title: "B-BBEE Level 2 Contributor",
    short: "125% procurement recognition",
    detail:
      "AGI is a B-BBEE Level 2 Contributor, giving procurement teams 125% B-BBEE recognition on spend — a direct advantage on government, parastatal and corporate tenders with transformation scorecards.",
  },
  {
    slug: "cidb",
    title: "CIDB Registered",
    short: "Construction Industry Development Board",
    detail:
      "Registered with the CIDB, meeting the compliance and grading requirements to tender for and deliver public and private sector construction work across South Africa.",
  },
  {
    slug: "sagga",
    title: "SAGGA Affiliated",
    short: "South African Glass & Glazing Association",
    detail:
      "Affiliated with SAGGA, holding our aluminium and glazing installations to recognised industry standards for safety and workmanship.",
  },
];

export const contact = {
  address: "Unit 4B, 23 New Goch Road, Benrose, 2094, Johannesburg, South Africa",
  phones: [
    { label: "Johannesburg", number: "087 094 6843" },
    { label: "Cape Town", number: "083 260 4101" },
    { label: "Polokwane", number: "083 379 2885" },
  ],
  email: "admin@agidrywall.co.za",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];
