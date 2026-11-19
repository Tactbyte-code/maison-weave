import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Categories } from "./src/collections/Categories";
import { Media } from "./src/collections/Media";
import { Products } from "./src/collections/Products";

import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

export default buildConfig({
  admin: {
    user: "users",
  },

  storage: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],

  typescript: {
    outputFile: "src/payload-types.ts",
  },

  collections: [
    {
      slug: "users",
      auth: true,
      fields: [
        {
          name: "name",
          type: "text",
        },
      ],
    },
    Categories,
    Media,
    Products,
  ],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || "",

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),

  sharp,
});
