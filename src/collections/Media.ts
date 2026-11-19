import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*"],
  },
  admin: {
    useAsTitle: "alt",
    defaultColumns: ["alt", "updatedAt"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
