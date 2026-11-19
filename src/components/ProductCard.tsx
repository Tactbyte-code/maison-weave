import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TexturedImage } from "./TexturedImage";
import type { ProductWithRelations } from "@/hooks/usePayloadProducts";

export function ProductCard({
  product,
  index = 0,
}: {
  product: ProductWithRelations;
  index?: number;
}) {
  const category =
    typeof product.category === "object" ? product.category : null;

  const media = typeof product.image === "object" ? product.image : null;

  const imageUrl = media?.url ?? "";

  return (
    <Link
      href={`/collections/${product.slug}`}
      data-testid={`product-card-${product.slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        {imageUrl ? (
          <TexturedImage
            src={imageUrl}
            alt={media?.alt || product.name}
            loading={index < 4 ? "eager" : "lazy"}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-sand">
            <span className="font-serif text-lg italic text-moss">
              Image unavailable
            </span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/25 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        <div className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-gold/60" />
      </div>

      <div className="flex items-start justify-between gap-4 pt-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-gold-deep">
            {category?.name ?? ""}
          </p>

          <h3 className="mt-1.5 font-serif text-xl leading-snug text-forest sm:text-2xl">
            {product.name}
          </h3>

          <p className="mt-1 text-sm text-moss">{product.tagline}</p>
        </div>

        <ArrowUpRight className="mt-1.5 h-5 w-5 shrink-0 -translate-x-1 translate-y-1 text-gold-deep opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
      </div>
    </Link>
  );
}
