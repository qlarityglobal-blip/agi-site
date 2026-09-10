import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "address", title: "Head Office Address", type: "string" }),
    defineField({
      name: "phones",
      title: "Phone Numbers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Region Label", type: "string" },
            { name: "number", title: "Number", type: "string" },
          ],
        },
      ],
    }),
    defineField({ name: "email", title: "Email Address", type: "string" }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
