import type { SanityImageSource } from "@sanity/image-url";
import { client, urlFor } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import { projects as fallbackProjects, type Project } from "@/lib/data";

type SanityProject = {
  name: string;
  slug: { current: string };
  category: string;
  location?: string;
  note?: string;
  featured?: boolean;
  cover: SanityImageSource;
  images?: SanityImageSource[];
};

const PROJECTS_QUERY = `*[_type == "project"] | order(featured desc, name asc) {
  name, slug, category, location, note, featured, cover, images
}`;

export async function getProjects(): Promise<Project[]> {
  if (!isSanityConfigured) return fallbackProjects;

  try {
    const results = await client.fetch<SanityProject[]>(PROJECTS_QUERY, {}, {
      next: { revalidate: 60 },
    });

    if (!results || results.length === 0) return fallbackProjects;

    return results.map((p) => ({
      slug: p.slug.current,
      name: p.name,
      category: p.category,
      location: p.location,
      note: p.note,
      featured: p.featured,
      cover: urlFor(p.cover).width(1600).url(),
      images: (p.images && p.images.length > 0 ? p.images : [p.cover]).map((img) =>
        urlFor(img).width(1600).url()
      ),
    }));
  } catch {
    return fallbackProjects;
  }
}
