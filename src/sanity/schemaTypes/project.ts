import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Project Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["Education", "Healthcare", "Corporate", "Retail", "Community", "Residential"],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "note",
      title: "Note",
      type: "string",
      description: "e.g. \"Main contractor: ENZA Construction\"",
    }),
    defineField({ name: "featured", title: "Featured on homepage carousel", type: "boolean", initialValue: false }),
    defineField({
      name: "cover",
      title: "Cover Photo",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "images",
      title: "Gallery Photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "cover" },
  },
});
