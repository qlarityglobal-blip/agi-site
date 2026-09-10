import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Service Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      title: "Short Summary",
      type: "text",
      rows: 2,
      description: "Shown on service cards, keep to one sentence",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "intro",
      title: "Full Description",
      type: "text",
      rows: 5,
      description: "The main paragraph on the dedicated service page",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "metaTitle",
      title: "SEO Title",
      type: "string",
      description: "Shown in Google search results and browser tab",
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      description: "Shown under the title in Google search results",
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "items",
      title: "What's Included",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "summary", media: "image" },
  },
});
