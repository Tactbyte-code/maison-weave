import { useQuery } from "@tanstack/react-query";
import type { Footer } from "@/payload-types";

interface PayloadResponse<T> {
  docs: T[];
  totalDocs: number;
}

async function fetchFooter(): Promise<Footer | null> {
  const params = new URLSearchParams({
    depth: "1",
    limit: "1",
    sort: "-updatedAt",
  });

  const response = await fetch(`/api/footer?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Unable to fetch footer data.");
  }

  const result: PayloadResponse<Footer> = await response.json();

  return result.docs[0] ?? null;
}

export function usePayloadFooterQuery() {
  return useQuery({
    queryKey: ["payload-footer"],
    queryFn: fetchFooter,
  });
}