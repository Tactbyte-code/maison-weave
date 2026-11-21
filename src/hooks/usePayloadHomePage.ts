
import { useQuery } from "@tanstack/react-query";
import type { Config } from "@/payload-types";

export type Homepage = Config["collections"]["homepage"];

interface PayloadResponse<T> {
  docs: T[];
  totalDocs: number;
}

async function fetchHomepage(): Promise<Homepage | null> {
  const params = new URLSearchParams({
    depth: "1",
    limit: "1",
    sort: "-updatedAt",
  });

  const response = await fetch(
    `/api/homepage?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch homepage data.");
  }

  const result: PayloadResponse<Homepage> = await response.json();

  return result.docs[0] ?? null;
}

export function usePayloadHomepageQuery() {
  return useQuery({
    queryKey: ["payload-homepage"],
    queryFn: fetchHomepage,
  });
}
