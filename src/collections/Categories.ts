import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",

  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "isActive", "sortOrder"],
    description: "Manage product catalogue categories.",
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "description",
      type: "textarea",
    },

    {

  name: "image",
  type: "upload",
  relationTo: "media",
  required: false,
  admin: {
    description: "Image displayed when hovering over a category.",
  },
},
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Lower numbers appear first.",
      },
    },
  ],
};
