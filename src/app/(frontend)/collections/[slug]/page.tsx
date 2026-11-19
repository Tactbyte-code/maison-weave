import { ProductDetailClient } from "@/components/pages/ProductDetailClient";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <ProductDetailClient slug={slug} />;
}
