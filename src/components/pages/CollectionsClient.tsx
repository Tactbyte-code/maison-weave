"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { LUXURY_EASE, PageHeader } from "@/components/MotionPrimitives";
import { ProductCard } from "@/components/ProductCard";
import { usePayloadProductsQuery } from "@/hooks/usePayloadProducts";
import { usePayloadCategoriesQuery } from "@/hooks/usePayloadCategories";
import { Category } from "@/payload-types";

const EMPTY_CATEGORIES: Category[] = [];

export function CollectionsClient() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    () => new Set(),
  );

  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = usePayloadProductsQuery();

  const {
    data: categories = EMPTY_CATEGORIES,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = usePayloadCategoriesQuery();

  const isLoading = isProductsLoading || isCategoriesLoading;
  const isError = isProductsError || isCategoriesError;

  // Resolve the category slug from the URL to its Payload ID.
  useEffect(() => {
    if (!categoryParam) {
      setSelectedCategories((prev) => (prev.size === 0 ? prev : new Set()));
      return;
    }

    if (isCategoriesLoading) return;

    const matchingCategory = categories.find(
      (category) => category.slug === categoryParam,
    );

    const nextSelection = matchingCategory
      ? new Set([String(matchingCategory.id)])
      : new Set<string>();

    setSelectedCategories((prev) => {
      if (
        prev.size === nextSelection.size &&
        [...prev].every((id) => nextSelection.has(id))
      ) {
        return prev;
      }

      return nextSelection;
    });
  }, [categoryParam, categories, isCategoriesLoading]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    const normalizedSearch = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const category =
        typeof product.category === "object" ? product.category : null;

      const matchesCategory =
        selectedCategories.size === 0 ||
        (category && selectedCategories.has(String(category.id)));

      const materials =
        product.materials?.map((item) => item.material).join(" ") ?? "";

      const searchableText = [
        product.name,
        product.tagline,
        product.description,
        category?.name ?? "",
        materials,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalizedSearch || searchableText.includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [products, searchQuery, selectedCategories]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);

      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }

      return next;
    });
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategories(new Set());
  };

  return (
    <div data-testid="catalogue-page">
      <PageHeader
        eyebrow="Product Catalogue"
        title={["The Catalogue"]}
        intro="A working catalogue of our home textile and decor lines — searchable and filterable by collection. Every piece can be developed to your specification."
      />

      <section className="bg-cream pb-24 lg:pb-32">
        <div className="shell">
          <div className="flex flex-col gap-8 border-y border-forest/10 py-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-moss" />

              <input
                data-testid="catalogue-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pieces, materials…"
                aria-label="Search the catalogue"
                className="w-full border-0 border-b border-ink/20 bg-transparent py-3 pl-8 pr-10 text-[15px] text-ink outline-none transition-colors duration-300 placeholder:text-ink/30 focus:border-gold"
              />

              {searchQuery && (
                <button
                  type="button"
                  data-testid="catalogue-search-clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-moss hover:text-forest"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <p
              className="font-mono text-[11px] uppercase tracking-[0.24em] tabular-nums text-moss"
              data-testid="catalogue-count"
            >
              Showing {products ? filteredProducts.length : "—"} of{" "}
              {products ? products.length : "—"} pieces
            </p>
          </div>

          <div
            className="mt-8 flex flex-wrap gap-2.5"
            data-testid="catalogue-filters"
          >
            <button
              type="button"
              data-testid="filter-chip-all"
              onClick={() => setSelectedCategories(new Set())}
              className={`border px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] whitespace-nowrap shrink-0 transition-all duration-300 ${
                selectedCategories.size === 0
                  ? "border-forest bg-forest text-cream"
                  : "border-ink/20 text-moss hover:border-gold hover:text-gold-deep"
              }`}
            >
              All Collections
            </button>

            {categories.map((category) => {
              const categoryId = String(category.id);
              const isSelected = selectedCategories.has(categoryId);

              return (
                <button
                  type="button"
                  key={category.id}
                  data-testid={`filter-chip-${category.slug}`}
                  onClick={() => toggleCategory(categoryId)}
                  className={`border px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] whitespace-nowrap shrink-0 transition-all duration-300 ${
                    isSelected
                      ? "border-forest bg-forest text-cream"
                      : "border-ink/20 text-moss hover:border-gold hover:text-gold-deep"
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>

          {isError && (
            <p className="py-24 text-center font-serif text-2xl text-forest">
              The catalogue could not be loaded. Please refresh the page.
            </p>
          )}

          {isLoading && (
            <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index}>
                  <div className="aspect-[4/5] animate-pulse bg-forest/10" />
                  <div className="mt-5 h-4 w-1/3 animate-pulse bg-forest/10" />
                  <div className="mt-3 h-6 w-2/3 animate-pulse bg-forest/10" />
                </div>
              ))}
            </div>
          )}

          {!isLoading && !isError && products && (
            <>
              <motion.div
                layout
                className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
                data-testid="catalogue-grid"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.slug}
                      layout
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{
                        duration: 0.5,
                        ease: LUXURY_EASE,
                        delay: Math.min(0.04 * index, 0.3),
                      }}
                    >
                      <ProductCard product={product} index={index} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredProducts.length === 0 && (
                <div
                  className="py-24 text-center"
                  data-testid="catalogue-empty-state"
                >
                  <p className="font-serif text-3xl font-light text-forest">
                    Nothing matches that search.
                  </p>

                  <p className="mt-3 text-moss">
                    Try a different material or collection — or reset the
                    filters.
                  </p>

                  <button
                    type="button"
                    onClick={resetFilters}
                    data-testid="catalogue-reset-btn"
                    className="btn btn-forest mt-8"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
