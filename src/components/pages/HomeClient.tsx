"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  EditorialMarquee,
  LineMaskReveal,
  LUXURY_EASE,
  ParallaxImage,
  Reveal,
} from "@/components/MotionPrimitives";
import { ProductCard } from "@/components/ProductCard";
import { TexturedImage } from "@/components/TexturedImage";
import { FEATURED_SLUGS, IMAGES, type CategorySummary } from "@/data/catalog";
import { useCategoriesQuery } from "@/hooks/useCatalogQueries";
import { usePayloadProductsQuery } from "@/hooks/usePayloadProducts";

const MARQUEE_ITEMS = [
  "Private Label Manufacturing",
  "Custom Product Development",
  "Hospitality & Retail Supply",
  "Natural Fibre Decor",
  "Quality-Driven Craftsmanship",
  "Export-Ready Collections",
];

const MATERIALS = [
  "Cotton",
  "Linen",
  "Jute",
  "Bamboo",
  "Cane",
  "Water Hyacinth",
];

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 220]);
  const scale = useTransform(scrollY, [0, 900], [1.06, 1.16]);

  return (
    <section
      data-testid="home-hero"
      className="relative flex min-h-screen items-end overflow-hidden bg-forest"
    >
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <TexturedImage
          src={IMAGES.hero}
          alt="Maison Weave linen dining room with natural fibres"
          loading="eager"
          priority
          className="h-full w-full object-cover -scale-x-100"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-forest-night via-forest/60 to-forest/30" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-forest-night/70 to-transparent" />

      <div className="shell relative z-10 w-full pb-28 pt-40 sm:pb-32">
        <motion.p
          className="eyebrow-light"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: LUXURY_EASE, delay: 0.2 }}
        >
          Maison Weave &middot; Home Textiles &amp; Decor
        </motion.p>

        <h1 className="mt-8 font-serif font-light leading-[0.95] text-cream text-[clamp(3.4rem,10.5vw,10rem)]">
          <LineMaskReveal
            delay={0.35}
            lines={[
              "Crafted",
              <em key="lux" className="text-gold">
                Luxury
              </em>,
              "Living",
            ]}
          />
        </h1>

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            className="max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: LUXURY_EASE, delay: 0.95 }}
          >
            Thoughtfully designed home textiles and decor, created for brands,
            retailers and hospitality partners worldwide.
          </motion.p>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row sm:flex-wrap"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: LUXURY_EASE, delay: 1.1 }}
          >
            <Link
              href="/collections"
              data-testid="hero-cta-explore"
              className="btn btn-gold"
            >
              Explore Our Collections
            </Link>
            <Link
              href="/about"
              data-testid="hero-cta-private-label"
              className="btn btn-outline-cream"
            >
              Private Label Manufacturing
            </Link>
            <Link
              href="/contact"
              data-testid="hero-cta-enquiry"
              className="btn btn-outline-cream"
            >
              Send an Enquiry
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 hidden border-t border-cream/15 md:block">
        <div className="shell flex items-center justify-between py-5">
          <div className="flex items-center gap-3">
            <span className="h-8 w-px animate-scroll-cue bg-gold" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60">
              Scroll
            </span>
          </div>
          <div className="flex gap-10 font-mono text-[10px] uppercase tracking-[0.28em] text-cream/60">
            <span>Manufacturer &amp; Exporter</span>
            <span>Private Label Programmes</span>
            <span>Hospitality &amp; Retail Supply</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CollectionsIndexSection() {
  const { data: categories } = useCategoriesQuery();
  const [hovered, setHovered] = useState<CategorySummary | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 130, damping: 18, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 130, damping: 18, mass: 0.4 });

  return (
    <section className="bg-cream py-24 lg:py-32">
      <div
        className="shell"
        onMouseMove={(event) => {
          mouseX.set(event.clientX);
          mouseY.set(event.clientY);
        }}
      >
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Collections</p>
            <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-forest sm:text-5xl lg:text-6xl">
              Eleven families of <em className="text-gold-deep">crafted</em>{" "}
              textiles
            </h2>
          </div>
          <Link
            href="/collections"
            data-testid="home-view-catalogue-link"
            className="link-underline shrink-0"
          >
            View the full catalogue
          </Link>
        </Reveal>

        <div className="mt-14" data-testid="category-index">
          {(categories || Array.from({ length: 11 })).map((cat, index) =>
            categories && cat && typeof cat === "object" && "name" in cat ? (
              <Link
                key={cat.name}
                href={`/collections?category=${encodeURIComponent(cat.name)}`}
                data-testid={`category-row-${cat.name
                  .toLowerCase()
                  .replace(/[^a-z]+/g, "-")}`}
                onMouseEnter={() => setHovered(cat)}
                onMouseLeave={() => setHovered(null)}
                className="group flex items-center justify-between gap-6 border-t border-forest/10 px-2 py-6 transition-colors duration-500 last:border-b hover:bg-sand/70 sm:px-6 sm:py-8"
              >
                <span className="flex min-w-0 items-baseline gap-5 sm:gap-9">
                  <span className="w-8 shrink-0 font-mono text-xs tabular-nums text-gold-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate font-serif text-2xl font-light text-forest transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl lg:text-5xl">
                    {cat.name}
                  </span>
                </span>

                <span className="flex shrink-0 items-center gap-6">
                  <TexturedImage
                    src={cat.image}
                    alt={cat.name}
                    className="h-14 w-14 object-cover lg:hidden"
                  />
                  <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] tabular-nums text-moss lg:block">
                    {cat.count} pieces
                  </span>
                  <ArrowRight className="h-5 w-5 -translate-x-2 text-gold-deep opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
              </Link>
            ) : (
              <div
                key={index}
                className="h-20 animate-pulse border-t border-forest/10 bg-sand/40"
              />
            ),
          )}
        </div>
      </div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
        style={{ x: springX, y: springY }}
      >
        <AnimatePresence mode="wait">
          {hovered && (
            <motion.img
              key={hovered.name}
              src={hovered.image}
              alt=""
              referrerPolicy="no-referrer"
              initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: LUXURY_EASE }}
              className="h-72 w-56 border border-gold/40 object-cover shadow-2xl"
              style={{ marginLeft: "-7rem", marginTop: "-9rem" }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function SelectedPiecesSection() {
  const { data: products } = usePayloadProductsQuery();

  const selected = useMemo(() => {
    if (!products) return null;

    return FEATURED_SLUGS.map((slug) =>
      products.find((product) => product.slug === slug),
    ).filter(
      (product): product is NonNullable<typeof product> =>
        product !== undefined,
    );
  }, [products]);

  return (
    <section className="bg-sand py-24 lg:py-32">
      <div className="shell">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">From the catalogue</p>
            <h2 className="mt-5 font-serif text-4xl font-light text-forest sm:text-5xl">
              Selected pieces
            </h2>
          </div>
          <Link
            href="/collections"
            data-testid="home-selected-view-all"
            className="link-underline shrink-0"
          >
            Browse all {products ? products.length : "—"} pieces
          </Link>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {selected
            ? selected.map((product, index) => (
                <ProductCard
                  key={product?.id}
                  product={product}
                  index={index}
                />
              ))
            : Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-[4/5] animate-pulse bg-forest/10"
                />
              ))}
        </div>
      </div>
    </section>
  );
}

function CraftSection() {
  return (
    <section className="bg-forest py-24 text-cream lg:py-32">
      <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 lg:order-1">
          <ParallaxImage
            src={IMAGES.handloom}
            alt="Artisan weaving on a handloom"
            className="aspect-[4/5] w-full"
            distance={50}
          />
          <div className="absolute -bottom-10 -right-6 hidden w-1/2 border-4 border-forest sm:block lg:-right-10">
            <ParallaxImage
              src={IMAGES.loomDetail}
              alt="Detail of woven textile on the loom"
              className="aspect-square w-full"
              distance={80}
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow-light">Craft &amp; Character</p>
            <h2 className="mt-5 font-serif text-4xl font-light leading-tight sm:text-5xl">
              Quality is a habit, <em className="text-gold">woven in daily</em>.
            </h2>
            <p className="mt-7 max-w-lg leading-relaxed text-cream/75">
              Every Maison Weave collection is developed and made with intention
              — fibres chosen for how they live, patterns sampled and refined,
              and each piece finished by experienced hands before it leaves us.
            </p>
            <ul className="mt-10 space-y-5">
              {[
                "Product development from first brief to approved sample",
                "Quality-focused manufacturing at every stage",
                "Skilled handwork — braiding, quilting, embroidery, weaving",
                "Sustainable material options across natural fibres",
              ].map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-4 text-sm text-cream/85 sm:text-base"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                  {bullet}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              data-testid="home-craft-about-link"
              className="btn btn-outline-cream mt-12"
            >
              Read Our Story
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PrivateLabelSection() {
  return (
    <section id="private-label" className="bg-cream py-24 lg:py-32">
      <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow">Private Label Manufacturing</p>
            <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-forest sm:text-5xl lg:text-6xl">
              Your label. <em className="text-gold-deep">Our looms.</em>
            </h2>
            <p className="mt-7 max-w-lg leading-relaxed text-moss">
              We develop and manufacture complete private label programmes —
              from product development and customisation to production-ready
              collections — in cotton, linen, jute, bamboo, cane and water
              hyacinth, made for brands, retailers and hospitality partners
              worldwide.
            </p>
            <Link
              href="/contact?category=Private%20Label%20Manufacturing"
              data-testid="home-private-label-cta"
              className="btn btn-forest mt-12"
            >
              Start a Private Label Conversation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <Reveal className="relative">
          <div className="absolute -left-4 -top-4 hidden h-full w-full border border-gold/40 sm:block" />
          <ParallaxImage
            src={IMAGES.workshopLoom}
            alt="Traditional wooden loom in the workshop"
            className="relative aspect-[4/3] w-full"
            distance={60}
          />
        </Reveal>
      </div>
    </section>
  );
}

function CtaBandSection() {
  return (
    <section className="bg-forest-deep py-24 text-center lg:py-32">
      <div className="shell">
        <Reveal>
          <p className="eyebrow-light">Send an Enquiry</p>
          <h2 className="mx-auto mt-6 max-w-3xl font-serif text-4xl font-light leading-tight text-cream sm:text-5xl">
            Tell us what you are making — we will help you{" "}
            <em className="text-gold">weave it</em>.
          </h2>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              data-testid="home-cta-band-enquiry"
              className="btn btn-gold"
            >
              Send an Enquiry
            </Link>
            <a
              href="mailto:jayant@maisonweave.com"
              data-testid="home-cta-band-email"
              className="btn btn-outline-cream"
            >
              jayant@maisonweave.com
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function HomeClient() {
  return (
    <div data-testid="home-page">
      <HeroSection />
      <EditorialMarquee items={MARQUEE_ITEMS} />
      <CollectionsIndexSection />
      <SelectedPiecesSection />
      <CraftSection />
      <PrivateLabelSection />

      <section className="border-y border-forest/10 bg-cream py-20">
        <div className="shell text-center">
          <Reveal>
            <p className="eyebrow">Materials</p>
            <h2 className="mx-auto mt-5 max-w-2xl font-serif text-3xl font-light text-forest sm:text-4xl">
              Honest fibres, chosen for the long life of a home.
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {MATERIALS.map((material, index) => (
                <motion.span
                  key={material}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.6,
                    ease: LUXURY_EASE,
                    delay: 0.06 * index,
                  }}
                  className="border border-forest/20 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-forest transition-colors duration-300 hover:border-gold hover:text-gold-deep"
                >
                  {material}
                </motion.span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBandSection />
    </div>
  );
}
