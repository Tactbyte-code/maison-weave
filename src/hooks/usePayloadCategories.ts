
import { useQuery } from "@tanstack/react-query";
import type { Category } from "@/payload-types";

interface PayloadResponse<T> {
  docs: T[];
  totalDocs: number;
}

async function fetchCategories(): Promise<Category[]> {
  const params = new URLSearchParams({
    "where[isActive][equals]": "true",
    sort: "sortOrder",
    limit: "100",
  });

  const response = await fetch(`/api/categories?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Unable to fetch categories.");
  }

  const result: PayloadResponse<Category> = await response.json();

  return result.docs;
}

export function usePayloadCategoriesQuery() {
  return useQuery({
    queryKey: ["payload-categories"],
    queryFn: fetchCategories,
  });
}
