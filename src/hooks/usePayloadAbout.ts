import { useQuery } from "@tanstack/react-query";
import type { About } from "@/payload-types";

interface PayloadResponse<T> {
  docs: T[];
  totalDocs: number;
}

async function fetchAbout(): Promise<About | null> {
  const params = new URLSearchParams({
    depth: "1",
    limit: "1",
    sort: "-updatedAt",
  });

  const response = await fetch(`/api/about?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Unable to fetch about page data.");
  }

  const result: PayloadResponse<About> = await response.json();

  return result.docs[0] ?? null;
}

export function usePayloadAboutQuery() {
  return useQuery({
    queryKey: ["payload-about"],
    queryFn: fetchAbout,
  });
}
