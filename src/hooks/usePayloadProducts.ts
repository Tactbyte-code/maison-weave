
import { useQuery } from "@tanstack/react-query";
import type { Category, Media, Product } from "@/payload-types";

type ProductWithRelations = Omit<Product, "category" | "image"> & {
  category: Category | number;
  image: Media | number;
};

interface PayloadResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
}

async function fetchPayload<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch catalogue data.");
  }

  return response.json();
}

async function fetchProducts(): Promise<ProductWithRelations[]> {
  const params = new URLSearchParams({
    "where[isActive][equals]": "true",
    depth: "1",
    sort: "sortOrder",
    limit: "100",
  });

  const result = await fetchPayload<PayloadResponse<ProductWithRelations>>(
    `/api/products?${params.toString()}`,
  );

  return result.docs;
}

async function fetchProductBySlug(
  slug: string,
): Promise<ProductWithRelations | null> {
  const params = new URLSearchParams({
    "where[slug][equals]": slug,
    "where[isActive][equals]": "true",
    depth: "1",
    limit: "1",
  });

  const result = await fetchPayload<PayloadResponse<ProductWithRelations>>(
    `/api/products?${params.toString()}`,
  );

  return result.docs[0] ?? null;
}

export function usePayloadProductsQuery() {
  return useQuery({
    queryKey: ["payload-products"],
    queryFn: fetchProducts,
  });
}

export function usePayloadProductBySlugQuery(slug: string) {
  return useQuery({
    queryKey: ["payload-product", slug],
    queryFn: () => fetchProductBySlug(slug),
    enabled: Boolean(slug),
  });
}

export type { ProductWithRelations };
