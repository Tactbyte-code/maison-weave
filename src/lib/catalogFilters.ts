import type { Product } from '../data/catalog';

export function extractCatalogCategories(products: Product[]): string[] {
  const list: string[] = [];
  const seen = new Set<string>();
  products.forEach((product) => {
    if (!seen.has(product.category)) {
      seen.add(product.category);
      list.push(product.category);
    }
  });
  return list;
}

export function filterCatalogProducts(
  products: Product[],
  searchQuery: string,
  selectedCategories: ReadonlySet<string>
): Product[] {
  const normalized = searchQuery.trim().toLowerCase();
  return products.filter((product) => {
    if (
      selectedCategories.size > 0 &&
      !selectedCategories.has(product.category)
    ) {
      return false;
    }
    if (!normalized) return true;
    const haystack = [
      product.name,
      product.tagline,
      product.description,
      product.category,
      ...(product.materials || []),
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(normalized);
  });
}
