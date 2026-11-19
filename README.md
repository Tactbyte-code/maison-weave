# Maison Weave — Crafted Luxury Living

Manufacturer and exporter of premium home textiles and decor. Private label manufacturing for brands, retailers, and hospitality partners worldwide.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (`strict: true`)
- **Styling:** Tailwind CSS v4
- **Data Fetching:** TanStack React Query (`@tanstack/react-query`)
- **Animations:** Framer Motion (`framer-motion`)
- **Client State:** Zustand (`zustand`)
- **Icons:** Lucide React (`lucide-react`)
- **Backend / Auth / Database:** Firebase Auth & Cloud Firestore
- **Package Manager:** `pnpm`

## Getting Started

**Prerequisites:** Node.js 20+ and `pnpm`

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Configure environment variables (optional overrides for `firebase-applet-config.json`):
   Copy `.env.example` to `.env.local` and set the `NEXT_PUBLIC_FIREBASE_*` variables if needed.
3. Run the development server:
   ```bash
   pnpm dev
   ```
4. Build and run in production:
   ```bash
   pnpm build
   pnpm start
   ```
5. Run typecheck, lint, and unit tests:
   ```bash
   pnpm lint
   pnpm test
   ```
