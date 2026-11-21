import type { CollectionConfig, CollectionSlug } from "payload";

export const Home: CollectionConfig = {
  slug: "homepage",

  access: {
    read: () => true,
  },

  admin: {
    useAsTitle: "heroTitle",
    defaultColumns: ["heroTitle", "updatedAt"],
    description:
      "Edit the homepage here. Each tab is one section of the page, from top to bottom.",
  },

  fields: [
    {
      // tabs have no `name` on purpose. that keeps the data flat
      // (homepage.heroTitle etc). adding a name would nest it and
      // rename the db columns, so don't
      type: "tabs",
      tabs: [
        // hero
        {
          label: "Top Banner",
          description: "The big picture section at the very top of the page.",
          fields: [
            {
              name: "heroSubtitle",
              type: "text",
              label: "Small line above the title",
              required: true,
            },
            {
              name: "heroTitle",
              type: "text",
              label: "Main title (exactly 3 words)",
              required: true,
              validate: (value: unknown) => {
                if (typeof value !== "string") {
                  return "title is required.";
                }
                const words = value.trim().split(/\s+/).filter(Boolean);

                return (
                  words.length === 3 || "Hero title must contain exactly 3 words."
                );
              },
            },
            {
              name: "heroBackgroundImage",
              type: "upload",
              relationTo: "media" as CollectionSlug,
              label: "Background image",
              required: true,
            },
            {
              name: "heroDescription",
              type: "textarea",
              label: "Short line under the title",
              required: true,
            },
            {
              name: "heroButtons",
              type: "array",
              label: "Buttons (exactly 3)",
              labels: { singular: "Button", plural: "Buttons" },
              required: true,
              minRows: 3,
              maxRows: 3,
              fields: [
                {
                  name: "label",
                  type: "text",
                  label: "Button text",
                  required: true,
                },
                {
                  name: "url",
                  type: "text",
                  label: "Button link (where it goes)",
                  required: true,
                },
                {
                  name: "style",
                  type: "select",
                  label: "Button look",
                  required: true,
                  options: [
                    {
                      label: "Gold (filled)",
                      value: "gold",
                    },
                    {
                      label: "Outline (cream border)",
                      value: "outline-cream",
                    },
                  ],
                },
              ],
            },
            {
              name: "scrollItems",
              type: "array",
              label: "Bottom bar of the banner (exactly 3 items)",
              labels: { singular: "Item", plural: "Items" },
              required: true,
              minRows: 3,
              maxRows: 3,
              fields: [
                {
                  name: "text",
                  type: "text",
                  label: "Text",
                  required: true,
                },
              ],
            },
          ],
        },

        // running text strip under the hero
        {
          label: "Moving Text Strip",
          description: "The line of words that slides across, just below the banner.",
          fields: [
            {
              name: "runningTexts",
              type: "array",
              label: "Words in the strip (at least 3)",
              labels: { singular: "Word or phrase", plural: "Words and phrases" },
              required: true,
              minRows: 3,
              fields: [
                {
                  name: "text",
                  type: "text",
                  label: "Text",
                  required: true,
                },
              ],
            },
          ],
        },

        // collections list. names/images/order are edited in the Categories collection
        {
          label: "Collections",
          description:
            "The heading above the category list. The categories themselves, their names, pictures and order, are edited under Categories in the left menu.",
          fields: [
            {
              name: "collectionsTitleStart",
              type: "text",
              label: "Heading, first part",
              defaultValue: "Eleven families of",
            },
            {
              name: "collectionsTitleHighlight",
              type: "text",
              label: "Heading, gold italic word",
              defaultValue: "crafted",
              admin: { description: "Shown in gold italics." },
            },
            {
              name: "collectionsTitleEnd",
              type: "text",
              label: "Heading, last part",
              defaultValue: "textiles",
            },
            {
              name: "collectionsLinkLabel",
              type: "text",
              label: "Link text (top right)",
              defaultValue: "View the full catalogue",
            },
            {
              name: "collectionsLinkUrl",
              type: "text",
              label: "Link address (where it goes)",
              defaultValue: "/collections",
            },
          ],
        },

        // selected pieces row. cards come from Products, first 4 by sortOrder
        {
          label: "Selected Pieces",
          description:
            "The heading above the product cards. The cards come from Products in the left menu (the first four by sort order).",
          fields: [
            {
              name: "selectedPiecesTitle",
              type: "text",
              label: "Section heading",
              defaultValue: "Selected pieces",
            },
          ],
        },

        // craft section (dark green, two photos)
        {
          label: "Craft & Character",
          description:
            "The dark green section with the two weaving photos and the checklist.",
          fields: [
            {
              name: "craftTitleStart",
              type: "text",
              label: "Heading, first part",
              defaultValue: "Quality is a habit,",
            },
            {
              name: "craftTitleHighlight",
              type: "text",
              label: "Heading, gold italic part",
              defaultValue: "woven in daily",
              admin: { description: "Shown in gold italics." },
            },
            {
              name: "craftDescription",
              type: "textarea",
              label: "Paragraph",
              defaultValue:
                "Every Maison Weave collection is developed and made with intention — fibres chosen for how they live, patterns sampled and refined, and each piece finished by experienced hands before it leaves us.",
            },
            {
              name: "craftBullets",
              type: "array",
              label: "Checklist",
              labels: { singular: "Line", plural: "Lines" },
              admin: {
                description:
                  "The checklist under the paragraph. If left empty, the standard four lines are shown.",
              },
              fields: [
                {
                  name: "text",
                  type: "text",
                  label: "Text",
                  required: true,
                },
              ],
            },
            {
              name: "craftMainImage",
              type: "upload",
              relationTo: "media" as CollectionSlug,
              label: "Large photo",
              admin: {
                description:
                  "Large image. Upload portrait, at least 1200 x 1500 px.",
              },
            },
            {
              name: "craftDetailImage",
              type: "upload",
              relationTo: "media" as CollectionSlug,
              label: "Small photo (overlapping)",
              admin: {
                description:
                  "Small overlapping image. Upload square, at least 1000 x 1000 px.",
              },
            },
            {
              name: "craftButtonLabel",
              type: "text",
              label: "Button text",
              defaultValue: "Read Our Story",
            },
            {
              name: "craftButtonUrl",
              type: "text",
              label: "Button link (where it goes)",
              defaultValue: "/about",
              admin: { description: "Page the button opens, for example /about." },
            },
          ],
        },

        // private label section
        {
          label: "Private Label",
          description:
            "The light section with the workshop photo and the Private Label button.",
          fields: [
            {
              name: "privateLabel",
              type: "group",
              label: "Private Label section",
              admin: {
                description:
                  "The section with the workshop photo and the Private Label button.",
              },
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                  label: "Small line above the heading",
                  defaultValue: "Private Label Manufacturing",
                },
                {
                  name: "headingPlain",
                  type: "text",
                  label: "Heading, first part",
                  defaultValue: "Your label.",
                },
                {
                  name: "headingGold",
                  type: "text",
                  label: "Heading, second part (shown in gold italics)",
                  defaultValue: "Our looms.",
                },
                {
                  name: "description",
                  type: "textarea",
                  label: "Paragraph",
                  defaultValue:
                    "We develop and manufacture complete private label programmes — from product development and customisation to production-ready collections — in cotton, linen, jute, bamboo, cane and water hyacinth, made for brands, retailers and hospitality partners worldwide.",
                },
                {
                  name: "buttonText",
                  type: "text",
                  label: "Button text",
                  defaultValue: "Start a Private Label Conversation",
                },
                {
                  name: "buttonLink",
                  type: "text",
                  label: "Button link (where the button goes)",
                  defaultValue: "/contact?category=Private%20Label%20Manufacturing",
                  admin: {
                    description:
                      "Leave as it is unless you want the button to open a different page.",
                  },
                },
                {
                  name: "photo",
                  type: "upload",
                  relationTo: "media" as CollectionSlug,
                  label: "Photo",
                  admin: {
                    description:
                      "Landscape photo, at least 1600 x 1200 px. Other shapes are cropped, never stretched.",
                  },
                },
              ],
            },
          ],
        },

        // materials strip
        {
          label: "Materials",
          description: "The row of material boxes (Cotton, Linen and so on).",
          fields: [
            {
              name: "materialsHeading",
              type: "text",
              label: "Heading",
              defaultValue: "Honest fibres, chosen for the long life of a home.",
            },
            {
              name: "materialsList",
              type: "array",
              label: "Materials",
              labels: { singular: "Material", plural: "Materials" },
              admin: {
                description:
                  "Each one shows as a box. If left empty, the standard six are shown.",
              },
              fields: [
                {
                  name: "text",
                  type: "text",
                  label: "Name",
                  required: true,
                },
              ],
            },
          ],
        },

        // enquiry banner at the bottom
        {
          label: "Enquiry Banner",
          description:
            "The dark green banner at the bottom of the page. The two buttons stay as they are for now.",
          fields: [
            {
              name: "ctaTitleStart",
              type: "text",
              label: "Heading, first part",
              defaultValue: "Tell us what you are making — we will help you",
            },
            {
              name: "ctaTitleHighlight",
              type: "text",
              label: "Heading, gold italic part",
              defaultValue: "weave it",
              admin: { description: "Shown in gold italics." },
            },
            {
              name: "ctaButtonLabel",
              type: "text",
              label: "Gold button text",
              defaultValue: "Send an Enquiry",
            },
            {
              name: "ctaButtonLink",
              type: "text",
              label: "Gold button link (where it goes)",
              defaultValue: "/contact",
            },
            {
              name: "ctaEmail",
              type: "email",
              label: "Email address (second button)",
              defaultValue: "jayant@maisonweave.com",
              admin: {
                description:
                  "Shown on the second button. Clicking it opens an email to this address.",
              },
            },
          ],
        },
      ],
    },
  ],
};
