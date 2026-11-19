import { useQuery } from "@tanstack/react-query";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  isActive: boolean;
  sortOrder: number;
}

interface CategoriesResponse {
  docs: Category[];
  totalDocs: number;
}

async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(
    "/api/categories?where[isActive][equals]=true&sort=sortOrder&limit=100",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: CategoriesResponse = await response.json();

  return data.docs;
}

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}
