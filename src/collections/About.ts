import type { CollectionConfig, CollectionSlug } from "payload";

export const About: CollectionConfig = {
  slug: "about",

  labels: {
    singular: "About Page",
    plural: "About Page",
  },

  access: {
    read: () => true,
  },

  admin: {
    useAsTitle: "titleLine1",
    description:
      "Content of the About Us page. There is only one. Open it and edit it.",
  },

  hooks: {
    // only one about page allowed
    beforeValidate: [
      async ({ data, operation, req }) => {
        if (operation === "create") {
          const existing = await req.payload.count({
            collection: "about",
          });

          if (existing.totalDocs > 0) {
            throw new Error(
              "There is already an About page. Open it and edit that one.",
            );
          }
        }

        return data;
      },
    ],
  },

  fields: [
    // tabs have no name on purpose, so the data stays flat
    {
      type: "tabs",
      tabs: [
        {
          label: "Top Banner",
          fields: [
            {
              name: "titleLine1",
              type: "text",
              label: "Heading, first line",
              defaultValue: "A house built",
            },
            {
              name: "titleLine2Start",
              type: "text",
              label: "Heading, second line",
              defaultValue: "on the",
            },
            {
              name: "titleHighlight",
              type: "text",
              label: "Gold word at the end of the heading",
              defaultValue: "loom",
              admin: {
                description: "The full stop after this word is added for you.",
              },
            },
            {
              name: "intro",
              type: "textarea",
              label: "Short text under the heading",
              defaultValue:
                "Maison Weave is a manufacturer and exporter specialising in home textiles and home decor — working with brands, retailers and hospitality partners across the world.",
            },
          ],
        },
        {
          label: "Our Story",
          fields: [
            {
              name: "storyLabel",
              type: "text",
              label: "Small label above the story",
              defaultValue: "Our Story",
            },
            {
              name: "storyImage",
              type: "upload",
              relationTo: "media" as CollectionSlug,
              label: "Story photo",
              admin: {
                description:
                  "Portrait photo (3 by 4), at least 900 x 1200 px. It is cropped to fit, never stretched.",
              },
            },
            {
              name: "storyParagraphs",
              type: "array",
              label: "Story paragraphs",
              minRows: 1,
              labels: { singular: "Paragraph", plural: "Paragraphs" },
              admin: {
                description: "Add, remove or reorder paragraphs.",
              },
              defaultValue: [
                {
                  text: "Maison Weave began with a simple conviction: that the objects we live with should be made slowly, skilfully and honestly. Today the house designs and manufactures home textiles and home decor — from table linen and cushion covers to rugs, baskets and woven accents for the home.",
                },
                {
                  text: "We work the way good workshops always have. Fibres are chosen for how they will live — washed cotton that softens, jute that warms, water hyacinth that holds its shape. Patterns are developed, sampled and refined until a piece earns its place in a collection.",
                },
                {
                  text: "As a manufacturing and export partner, we build long-term programmes rather than one-off orders: consistent quality, dependable communication and collections that arrive ready for your market.",
                },
              ],
              fields: [
                {
                  name: "text",
                  type: "textarea",
                  label: "Paragraph",
                  required: true,
                },
              ],
            },
            {
              name: "quote",
              type: "textarea",
              label: "Highlighted quote",
              defaultValue:
                "Crafted Luxury Living is not a tagline — it is the standard we weave into every metre.",
              admin: {
                description: "Quote marks are added for you.",
              },
            },
          ],
        },
        {
          label: "What We Bring",
          fields: [
            {
              name: "commitmentsEyebrow",
              type: "text",
              label: "Small label above the heading",
              defaultValue: "What We Bring",
            },
            {
              name: "commitmentsTitleEnd",
              type: "text",
              label: "Heading text after the number",
              defaultValue: "commitments,",
              admin: {
                description:
                  "The number in front (Seven, Eight...) is added automatically from how many boxes you have below.",
              },
            },
            {
              name: "commitmentsHighlight",
              type: "text",
              label: "Gold words at the end of the heading",
              defaultValue: "one house",
            },
            {
              name: "commitments",
              type: "array",
              label: "Boxes",
              minRows: 2,
              labels: { singular: "Box", plural: "Boxes" },
              admin: {
                description:
                  "Add, remove or reorder boxes. The LAST box is always shown in dark green with the button inside it.",
              },
              defaultValue: [
                {
                  title: "Product Development",
                  body: "From first sketch to approved sample, we develop collections around your brief — construction, colour, finish and presentation.",
                },
                {
                  title: "Quality-Focused Manufacturing",
                  body: "Quality is built into every stage, with attention from weaving to finishing, so pieces arrive ready for your shelves and showrooms.",
                },
                {
                  title: "Customisation",
                  body: "Colours, sizes, materials, stitches and labels are developed to order. Your collection should be unmistakably yours.",
                },
                {
                  title: "Skilled Workmanship",
                  body: "Braiding, quilting, embroidery and hand-weaving are done by experienced hands, keeping craft at the centre of every collection.",
                },
                {
                  title: "Sustainable Material Options",
                  body: "Natural fibres — cotton, linen, jute, bamboo, cane and water hyacinth — with responsible material options developed on request.",
                },
                {
                  title: "International B2B Partnerships",
                  body: "We work as a long-term production partner to brands, retail groups and hospitality procurement teams around the world.",
                },
                {
                  title: "Private Label Manufacturing",
                  body: "Complete private label programmes — developed, manufactured and packed under your brand, ready for your markets.",
                },
              ],
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Box title",
                  required: true,
                },
                {
                  name: "body",
                  type: "textarea",
                  label: "Box text",
                  required: true,
                },
              ],
            },
            {
              name: "commitmentsButtonLabel",
              type: "text",
              label: "Button text (in the last box)",
              defaultValue: "Start the Conversation",
            },
            {
              name: "commitmentsButtonLink",
              type: "text",
              label: "Button link (in the last box)",
              defaultValue: "/contact?category=Private%20Label%20Manufacturing",
              admin: {
                description:
                  "Page address such as /contact, or a full address starting with https://",
              },
            },
          ],
        },
                {
          label: "Moving Text Strip",
          fields: [
            {
              name: "marqueeTexts",
              type: "array",
              label: "Words in the strip (at least 3)",
              minRows: 3,
              labels: { singular: "Word or phrase", plural: "Words and phrases" },
              admin: {
                description:
                  "The dark line of words that slides across the page, below the commitments.",
              },
              defaultValue: [
                { text: "Product Development" },
                { text: "Quality Manufacturing" },
                { text: "Customisation" },
                { text: "Skilled Workmanship" },
                { text: "Natural Fibres" },
                { text: "B2B Partnerships" },
              ],
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
        {
          label: "How We Work",
          fields: [
            {
              name: "processEyebrow",
              type: "text",
              label: "Small label above the heading",
              defaultValue: "How We Work",
            },
            {
              name: "processTitleStart",
              type: "text",
              label: "Heading",
              defaultValue: "From fibre to",
            },
            {
              name: "processTitleHighlight",
              type: "text",
              label: "Gold word at the end of the heading",
              defaultValue: "finish",
              admin: {
                description: "The full stop after this word is added for you.",
              },
            },
            {
              name: "processSteps",
              type: "array",
              label: "Steps",
              minRows: 1,
              labels: { singular: "Step", plural: "Steps" },
              admin: {
                description:
                  "Add, remove or reorder steps. The numbers (01, 02...) are added for you.",
              },
              defaultValue: [
                {
                  title: "The Brief",
                  body: "We begin with your requirement — market, materials, aesthetic and positioning.",
                },
                {
                  title: "Development",
                  body: "Our team develops designs, materials and samples until the piece is right.",
                },
                {
                  title: "Craft",
                  body: "Production with quality checks at weaving, stitching and finishing stages.",
                },
                {
                  title: "Export",
                  body: "Collections are packed, documented and shipped to your markets.",
                },
              ],
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Step title",
                  required: true,
                },
                {
                  name: "body",
                  type: "textarea",
                  label: "Step text",
                  required: true,
                },
              ],
            },
            {
              name: "partnerImage",
              type: "upload",
              relationTo: "media" as CollectionSlug,
              label: "Photo next to the text",
              admin: {
                description:
                  "Landscape photo (4 by 3), at least 1200 x 900 px. It is cropped to fit, never stretched.",
              },
            },
            {
              name: "partnerTitle",
              type: "textarea",
              label: "Heading beside the photo",
              defaultValue:
                "An established manufacturing partner for international home textile programmes.",
            },
            {
              name: "partnerText",
              type: "textarea",
              label: "Text beside the photo",
              defaultValue:
                "Whether you are developing a first capsule collection or scaling an established line, Maison Weave brings product development, skilled production and export experience to the table.",
            },
            {
              name: "partnerButtonLabel",
              type: "text",
              label: "Button text",
              defaultValue: "Send an Enquiry",
            },
            {
              name: "partnerButtonLink",
              type: "text",
              label: "Button link",
              defaultValue: "/contact",
              admin: {
                description:
                  "Page address such as /contact, or a full address starting with https://",
              },
            },
          ],
        },
      ],
    },
  ],
};
