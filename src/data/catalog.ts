export interface Product {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  materials: string[];
  sizes: string[];
  featured?: boolean;
}

export interface CategorySummary {
  name: string;
  count: number;
  image: string;
}

export const IMAGES = {
  hero: "/assets/images/hero_maison_weave_1794992702000.jpg",
  handloom: "/assets/images/atelier_handloom_weaving_1794992699791.jpg",
  loomDetail: "/assets/images/loom_thread_detail_1794992700885.jpg",
  workshopLoom: "/assets/images/workshop_wooden_loom_1794992701914.jpg",
  tableLinen: "/assets/images/collection_table_linen_1794992702940.jpg",
  cushionCovers: "/assets/images/collection_cushion_covers_1794992702029.jpg",
  hyacinthCane: "/assets/images/collection_hyacinth_cane_1794992702934.jpg",
  kitchenTextiles:
    "/assets/images/collection_kitchen_textiles_1794992702966.jpg",
  quiltedThrows: "/assets/images/collection_quilted_throws_1794992703589.jpg",
} as const;

export const FEATURED_SLUGS = [
  "botanica-linen-cushion-covers",
  "verona-embroidered-tablecloth",
  "meadow-braided-rug",
  "larder-hyacinth-baskets",
];

export const CATEGORY_ORDER = [
  "Table Linen",
  "Table Runners",
  "Placemats",
  "Tablecloths",
  "Cushion Covers",
  "Quilted Products",
  "Kitchen Textiles",
  "Rugs",
  "Jute Products",
  "Bamboo and Cane Products",
  "Water Hyacinth",
] as const;

export const PRODUCTS: Product[] = [
  {
    slug: "verona-embroidered-tablecloth",
    name: "Verona Embroidered Tablecloth",
    category: "Tablecloths",
    tagline: "Fine botanical embroidery on washed Belgian flax.",
    description:
      "Woven from long-staple European flax and stonewashed for an effortless, supple drape. Finished with tonal floral corner embroidery and mitred borders tailored for hospitality dining rooms and discerning home collections.",
    image: IMAGES.tableLinen,
    materials: ["100% Washed Belgian Linen", "Mercerised Cotton Thread"],
    sizes: [
      "150 × 220 cm",
      "170 × 270 cm",
      "180 × 320 cm",
      "Custom Hospitality Sizing",
    ],
    featured: true,
  },
  {
    slug: "atelier-selvedge-table-linen-set",
    name: "Atelier Selvedge Table Set",
    category: "Table Linen",
    tagline: "Unbleached linen napkins and cloth with sage selvedge.",
    description:
      "Our signature dining suite pairing raw-edge woven table cloths with matching 45 cm dinner napkins. Subtle botanical green and muted gold selvedge stripes frame the weave without overwhelming the table setting.",
    image: IMAGES.hero,
    materials: ["Organic Linen-Cotton Blend", "Natural Vat-Dyed Yarn"],
    sizes: ["Napkins 45 × 45 cm (Set of 4 / 6)", "Cloth 150 × 250 cm"],
  },
  {
    slug: "provence-hemstitch-napkin-suite",
    name: "Provence Hemstitch Napkins",
    category: "Table Linen",
    tagline: "Hand-drawn threadwork on crisp unbleached flax.",
    description:
      "Refined everyday table linen featuring classic ajour hemstitching along all four sides. Pre-washed for immediate softness and minimal shrinkage across repeated commercial laundering cycles.",
    image: IMAGES.tableLinen,
    materials: ["100% European Flax Linen (185 GSM)"],
    sizes: ["40 × 40 cm", "45 × 45 cm", "50 × 50 cm"],
  },
  {
    slug: "solstice-herringbone-runner",
    name: "Solstice Herringbone Runner",
    category: "Table Runners",
    tagline: "Heavyweight chevron weave with hand-knotted fringe.",
    description:
      "Loom-woven in a tactile broken-herringbone structure using unbleached cotton and raw linen slub yarns. Ends are hand-frayed and knotted for an architectural yet organic centrepiece.",
    image: IMAGES.tableLinen,
    materials: ["60% Raw Linen", "40% Combed Organic Cotton"],
    sizes: ["35 × 180 cm", "38 × 240 cm", "40 × 300 cm"],
  },
  {
    slug: "savile-handloom-runner",
    name: "Savile Handloom Table Runner",
    category: "Table Runners",
    tagline: "Shuttle-woven stripe with gold-ochre weft accents.",
    description:
      "Crafted on traditional wooden pit looms with double-twisted warp yarns for crisp table presence. Available in custom Pantone-matched stripe rhythms for private label dining programmes.",
    image: IMAGES.handloom,
    materials: ["Handspun Cotton", "Dyed Linen Weft"],
    sizes: ["35 × 200 cm", "40 × 260 cm"],
  },
  {
    slug: "fringed-flax-placemat-quartet",
    name: "Fringed Flax Placemats",
    category: "Placemats",
    tagline: "Double-layered washed linen mats with soft eyelash trim.",
    description:
      "Constructed with double-faced linen canvas for substantial heat protection and flat table recovery. Finished with delicate 1.5 cm frayed edges that soften further with every wash.",
    image: IMAGES.tableLinen,
    materials: ["Heavyweight Belgian Flax (310 GSM)"],
    sizes: ["35 × 48 cm (Set of 4)", "38 × 50 cm (Set of 6)"],
  },
  {
    slug: "meadow-braided-placemat",
    name: "Meadow Braided Placemats",
    category: "Placemats",
    tagline: "Circular hand-coiled jute and cotton table mats.",
    description:
      "Tightly braided golden jute interlocked with ivory cotton cord and spiral-stitched for durable daily table service. Resistant to curling and built for indoor or covered-terrace dining.",
    image: IMAGES.hyacinthCane,
    materials: ["Natural Bengal Jute", "Unbleached Cotton Cord"],
    sizes: ["38 cm Diameter", "40 cm Diameter"],
  },
  {
    slug: "botanica-linen-cushion-covers",
    name: "Botanica Linen Cushion Covers",
    category: "Cushion Covers",
    tagline: "Crewel botanical embroidery with piped gold-linen edges.",
    description:
      "Sculpted lumbar and square cushion covers embroidered with woodland eucalyptus motifs on stonewashed flax. Concealed brass YKK zipper closure and tailored contrast piping.",
    image: IMAGES.cushionCovers,
    materials: ["100% Stonewashed Linen", "Cotton-Wool Embroidery Yarn"],
    sizes: ["45 × 45 cm", "50 × 50 cm", "35 × 55 cm Lumbar"],
    featured: true,
  },
  {
    slug: "moss-velvet-piped-cushion",
    name: "Moss Embroidered Cushion",
    category: "Cushion Covers",
    tagline: "Deep forest linen with delicate tonal leaf linework.",
    description:
      "Piece-dyed in our signature deep botanical forest shade and finished with fine gold-ochre contrast piping. Softened through an enzyme stone wash for a velvety dry handfeel.",
    image: IMAGES.cushionCovers,
    materials: ["Heavy Linen Canvas (280 GSM)", "Tonal Silk-Cotton Thread"],
    sizes: ["45 × 45 cm", "55 × 55 cm"],
  },
  {
    slug: "kantha-moss-coverlet",
    name: "Kantha Stitch Moss Coverlet",
    category: "Quilted Products",
    tagline: "Hand-quilted organic cotton voile in sage and ivory.",
    description:
      "Three layers of breathable organic cotton filled with combed cotton batting and anchored by dense rows of traditional hand-running stitches. Reversible colourway for layered bedroom merchandising.",
    image: IMAGES.quiltedThrows,
    materials: ["100% Organic Cotton Voile", "Carded Cotton Batting"],
    sizes: ["150 × 220 cm Throw", "220 × 240 cm Queen", "260 × 240 cm King"],
  },
  {
    slug: "heirloom-quilted-sham-set",
    name: "Heirloom Quilted Shams",
    category: "Quilted Products",
    tagline: "Channel-quilted linen shams with tie-back closures.",
    description:
      "Matched to our coverlet line with fine vermicelli and linear quilting patterns. Finished with clean flange borders and hand-tacked cotton tie closures on the reverse.",
    image: IMAGES.cushionCovers,
    materials: ["Washed Linen Front", "Organic Cotton Backing"],
    sizes: ["50 × 70 cm Standard", "65 × 65 cm Euro"],
  },
  {
    slug: "atelier-waffle-kitchen-towels",
    name: "Atelier Waffle Kitchen Set",
    category: "Kitchen Textiles",
    tagline: "Honeycomb-woven organic cotton towels & quilted mitts.",
    description:
      "High-absorbency honeycomb waffle dish towels paired with diamond-quilted pot holders and leather-tabbed hanging loops. Engineered for heavy culinary use and refined countertop display.",
    image: IMAGES.kitchenTextiles,
    materials: ["100% GOTS Organic Cotton", "Vegetable-Tanned Loop Tab"],
    sizes: ["Towels 50 × 70 cm", "Pot Holders 20 × 20 cm"],
  },
  {
    slug: "stonewashed-chef-apron",
    name: "Stonewashed Linen Apron",
    category: "Kitchen Textiles",
    tagline: "Full-length culinary apron with adjustable brass hardware.",
    description:
      "Cut from heavyweight 240 GSM flax linen with deep utility pockets, reinforced bar-tacks, and detachable bridle-style neck strap for effortless washing.",
    image: IMAGES.kitchenTextiles,
    materials: ["240 GSM Washed Flax", "Solid Brushed Brass Buckles"],
    sizes: ["One Size (Adjustable)", "Custom Embroidery Available"],
  },
  {
    slug: "meadow-braided-rug",
    name: "Meadow Braided Rug",
    category: "Rugs",
    tagline: "Hand-braided natural jute and unbleached cotton pile.",
    description:
      "Woven from sustainably harvested Bengal jute intertwined with soft ivory cotton slub for reduced shedding and barefoot comfort. Flat-weave profile suited to dining spaces and boutique suites.",
    image: IMAGES.hero,
    materials: ["75% Natural Golden Jute", "25% Recycled Combed Cotton"],
    sizes: ["120 × 180 cm", "160 × 230 cm", "200 × 300 cm", "240 × 340 cm"],
    featured: true,
  },
  {
    slug: "loom-boucle-flatweave-rug",
    name: "Loom Bouclé Flatweave Rug",
    category: "Rugs",
    tagline: "Chunky basketweave texture in warm oat and flax.",
    description:
      "Handloomed on wide-frame shuttle looms using multi-ply twisted wool and cotton yarns. Features crisp braided end tassels and optional natural latex backing for hospitality specification.",
    image: IMAGES.quiltedThrows,
    materials: ["Undyed New Zealand Wool", "Cotton Warp"],
    sizes: ["140 × 200 cm", "170 × 240 cm", "240 × 300 cm"],
  },
  {
    slug: "solis-jute-tote-basket",
    name: "Solis Braided Jute Hamper",
    category: "Jute Products",
    tagline: "Structured coiled-jute storage vessel with woven handles.",
    description:
      "Hand-coiled natural jute rope stitched tightly to retain upright architectural form even when empty. Ideal for throws, guest towels, or indoor botanical planters.",
    image: IMAGES.hyacinthCane,
    materials: ["100% Natural Braided Jute", "Heavy Cotton Lockstitch"],
    sizes: ["32 × 34 cm", "40 × 42 cm", "48 × 50 cm"],
  },
  {
    slug: "harvest-jute-market-pouf",
    name: "Harvest Woven Jute Pouf",
    category: "Jute Products",
    tagline: "Textured hand-knitted jute ottoman with cotton liner.",
    description:
      "Dense cable-knit golden jute casing over an organic cotton inner bag filled with high-resilience recycled EPS beads. Adds grounded warmth to lounge and hospitality corners.",
    image: IMAGES.loomDetail,
    materials: ["Natural Jute Yarn", "100% Cotton Inner Liner"],
    sizes: ["50 × 50 × 35 cm", "60 cm Diameter × 38 cm"],
  },
  {
    slug: "kyoto-cane-serving-tray",
    name: "Kyoto Woven Cane Tray",
    category: "Bamboo and Cane Products",
    tagline: "Open-weave rattan cane gallery tray with oak-tone rim.",
    description:
      "Hand-woven hexagonal cane webbing framed in steam-bent solid rattan with cut-out side handles. Finished in a matte water-based protective seal for breakfast-in-bed or bar service.",
    image: IMAGES.hyacinthCane,
    materials: ["Natural Indonesian Rattan", "Woven Cane Webbing"],
    sizes: ["36 × 26 × 5 cm", "46 × 32 × 6 cm"],
  },
  {
    slug: "lattice-bamboo-canister-trio",
    name: "Lattice Bamboo Vessel Set",
    category: "Bamboo and Cane Products",
    tagline: "Fine split-bamboo lidded canisters and openwork lantern.",
    description:
      "Artisan-split cured bamboo woven into tight herringbone canisters and airy lattice vases. Lightweight, naturally moisture-cured, and packed nested for efficient container volume.",
    image: IMAGES.hyacinthCane,
    materials: ["Sustainably Harvested Bamboo", "Natural Beeswax Polish"],
    sizes: ["Canisters Ø14 × 18 cm", "Vase Ø18 × 32 cm"],
  },
  {
    slug: "larder-hyacinth-baskets",
    name: "Larder Hyacinth Baskets",
    category: "Water Hyacinth",
    tagline: "Sun-dried water hyacinth nested baskets with braided handles.",
    description:
      "Handwoven around concealed powder-coated wire frames using thick, sun-cured water hyacinth stems. Offered in nested sets of three with reinforced loop handles for retail and pantry organisation.",
    image: IMAGES.hyacinthCane,
    materials: ["Sun-Dried Water Hyacinth", "Powder-Coated Iron Core"],
    sizes: ["Small Ø28 × 24 cm", "Medium Ø36 × 30 cm", "Large Ø44 × 36 cm"],
    featured: true,
  },
  {
    slug: "estuary-hyacinth-charger-set",
    name: "Estuary Hyacinth Chargers",
    category: "Water Hyacinth",
    tagline: "Flat-woven round table chargers in warm river reed.",
    description:
      "Concentric hand-woven water hyacinth table chargers lending organic texture beneath fine porcelain dinnerware. Treated with food-safe matte lacquer for effortless wipe-clean care.",
    image: IMAGES.hyacinthCane,
    materials: ["100% Natural Water Hyacinth"],
    sizes: ["35 cm Diameter (Set of 4)", "38 cm Diameter (Set of 6)"],
  },
  {
    slug: "grand-atelier-damask-cloth",
    name: "Grand Atelier Damask Cloth",
    category: "Tablecloths",
    tagline: "Jacquard-woven flax tablecloth for formal banquet programmes.",
    description:
      "High-thread-count jacquard linen woven on wide-width looms for seamless banquet table coverage. Subtle tone-on-tone botanical border pattern designed for luxury hotels and private residences.",
    image: IMAGES.workshopLoom,
    materials: ["100% Combed European Flax (220 GSM)"],
    sizes: ["180 × 280 cm", "180 × 360 cm", "Custom Banquet Widths"],
  },
];

export function getCategories(): CategorySummary[] {
  return CATEGORY_ORDER.map((categoryName) => {
    const matching = PRODUCTS.filter((p) => p.category === categoryName);
    return {
      name: categoryName,
      count: matching.length,
      image: matching[0]?.image || IMAGES.tableLinen,
    };
  });
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
