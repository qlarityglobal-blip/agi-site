import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "./env";

// createClient validates projectId eagerly, so fall back to a placeholder
// when Sanity isn't configured yet — getProjects() checks isSanityConfigured
// before ever calling client.fetch, so this client is simply never used.
export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
