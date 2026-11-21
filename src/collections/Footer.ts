import type { CollectionConfig } from "payload";

export const Footer: CollectionConfig = {
  slug: "footer",
    labels: {
    singular: "Footer",
    plural: "Footer",
  },

  access: {
    read: () => true,
  },

  admin: {
    useAsTitle: "email",
    description:
      "The footer at the bottom of every page. There is only one. The Collections column comes from Categories.",
  },

  hooks: {
    // only one footer allowed
    beforeValidate: [
      async ({ data, operation, req }) => {
        if (operation === "create") {
          const existing = await req.payload.count({
            collection: "footer",
          });

          if (existing.totalDocs > 0) {
            throw new Error(
              "There is already a footer. Open it and edit that one.",
            );
          }
        }

        return data;
      },
    ],
  },

  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Logo & Description",
          fields: [
            {
              name: "logo",
              type: "upload",
              relationTo: "media",
              label: "Small logo icon (optional)",
              admin: {
                description:
                  "Small square image shown next to the brand name, like a favicon. It replaces the gold weave symbol only. The name and tagline always stay. Use a square PNG, at least 200 x 200 px.",
              },
            },
            {
              name: "tagline",
              type: "text",
              label: "Tagline",
              defaultValue: "Crafted Luxury Living",
              admin: {
                description:
                  "Small line under the brand name and in the bottom bar of the footer.",
              },
            },
            {
              name: "description",
              type: "textarea",
              label: "Short description under the logo",
              defaultValue:
                "Manufacturer and exporter of home textiles and home decor, creating crafted collections for brands, retailers and hospitality partners worldwide.",
            },
          ],
        },
        {
          label: "Contact",
          fields: [
            {
              name: "email",
              type: "email",
              label: "Email address",
              defaultValue: "jayant@maisonweave.com",
            },
            {
              name: "website",
              type: "text",
              label: "Website address",
              defaultValue: "https://maisonweave.com",
              admin: { description: "Include https:// at the start." },
            },
            {
              name: "note",
              type: "textarea",
              label: "Small note under the contact details",
              defaultValue:
                "B2B enquiries welcome — private label, wholesale and hospitality supply.",
            },
          ],
        },
      ],
    },
  ],
};