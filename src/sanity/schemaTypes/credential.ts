import { defineField, defineType } from "sanity";

export const credential = defineType({
  name: "credential",
  title: "Credential",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "short", title: "Short Line", type: "string", validation: (r) => r.required() }),
    defineField({ name: "detail", title: "Detail", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: ["award", "shield-check", "badge-check"] },
      initialValue: "award",
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "title", subtitle: "short" } },
});
