import type { CollectionConfig, CollectionSlug } from "payload";

export const Products: CollectionConfig = {
  slug: "products",

  access: {
    read: () => true,
  },

  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "slug", "updatedAt"],
    description: "Manage products in your catalogue.",
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories" as CollectionSlug,
      required: true,
    },
    {
      name: "tagline",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media" as CollectionSlug,
      required: true,
    },
    {
      name: "materials",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "material",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "sizes",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "size",
          type: "text",
          required: true,
        },
      ],
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
