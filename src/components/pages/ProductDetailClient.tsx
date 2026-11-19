"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/MotionPrimitives";
import { TexturedImage } from "@/components/TexturedImage";
import {
  useShortlistQuery,
  useToggleShortlistMutation,
} from "@/hooks/useCatalogQueries";
import { usePayloadProductBySlugQuery } from "@/hooks/usePayloadProducts";
import { useAuth } from "@/providers/AuthProvider";

export function ProductDetailClient({ slug }: { slug: string }) {
  const {
    data: product,
    isLoading,
    isError,
  } = usePayloadProductBySlugQuery(slug);

  const { user, signInWithGoogle, signingIn } = useAuth();

  const { data: shortlist } = useShortlistQuery(user?.uid, Boolean(user));

  const toggleShortlist = useToggleShortlistMutation(user?.uid);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Extract the populated category relationship.
  const category =
    product && typeof product.category === "object" ? product.category : null;

  // Extract the populated media relationship.
  const media =
    product && typeof product.image === "object" ? product.image : null;

  const categoryName = category?.name ?? "";
  const imageUrl = media?.url ?? "";

  // Payload stores these as arrays of objects.
  const materials = product?.materials?.map((item) => item.material) ?? [];

  const sizes = product?.sizes?.map((item) => item.size) ?? [];

  const isSaved = Boolean(
    product && shortlist?.some((item) => item.productSlug === product.slug),
  );

  const handleShortlistClick = async () => {
    if (!product) return;

    let activeUid = user?.uid;

    if (!activeUid) {
      try {
        const signedInUser = await signInWithGoogle();

        if (!signedInUser) return;

        activeUid = signedInUser.uid;

        toast.success(
          "Signed in to Partner Portal — saving piece to shortlist.",
        );
      } catch {
        toast.error("Google Sign-In was cancelled or failed.");
        return;
      }
    }

    try {
      // Adapt the Payload product to the existing shortlist product shape.
      const shortlistProduct = {
        slug: product.slug,
        name: product.name,
        category: categoryName,
        tagline: product.tagline,
        description: product.description,
        image: imageUrl,
        materials,
        sizes,
      };

      const result = await toggleShortlist.mutateAsync({
        product: shortlistProduct,
        isSaved,
      });

      if (result.action === "added") {
        toast.success(`${product.name} saved to your Partner Shortlist.`);
      } else {
        toast.success(`${product.name} removed from your shortlist.`);
      }
    } catch {
      toast.error("Could not update shortlist. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-cream pt-24">
        <p className="animate-pulse font-serif text-2xl italic text-moss">
          Unfolding the piece…
        </p>
      </div>
    );
  }

  if (isError || !product || !category || !imageUrl) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-cream px-6 pt-24 text-center">
        <p className="font-serif text-4xl font-light text-forest">
          This piece could not be found.
        </p>

        <Link
          href="/collections"
          data-testid="product-not-found-back"
          className="btn btn-forest mt-10"
        >
          Back to the Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div
      data-testid="product-detail-page"
      className="bg-cream pb-24 pt-28 sm:pt-32 lg:pb-32 lg:pt-40"
    >
      <div className="shell">
        <Link
          href="/collections"
          data-testid="product-back-link"
          className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-moss transition-colors hover:text-gold-deep"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          All Collections
        </Link>

        <div className="mt-10 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative self-start lg:sticky lg:top-28">
            <div className="absolute -left-4 -top-4 hidden h-full w-full border border-gold/40 sm:block" />

            <div
              className="relative aspect-[4/5] overflow-hidden bg-sand"
              data-testid="product-image"
            >
              <TexturedImage
                src={imageUrl}
                alt={media?.alt || product.name}
                loading="eager"
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div>
            <Reveal>
              <p className="eyebrow">{categoryName}</p>

              <h1 className="mt-5 font-serif text-4xl font-light leading-tight text-forest sm:text-5xl lg:text-6xl">
                {product.name}
              </h1>

              <p className="mt-4 font-serif text-xl italic text-gold-deep sm:text-2xl">
                {product.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 border-t border-forest/10 pt-8 text-base leading-relaxed text-moss sm:text-lg">
                {product.description}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 grid gap-10 sm:grid-cols-2">
                <div>
                  <p className="field-label">Materials</p>

                  <ul className="space-y-2.5">
                    {materials.map((material, index) => (
                      <li
                        key={`${material}-${index}`}
                        className="flex items-center gap-3 text-sm text-ink"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="field-label">Available Sizes</p>

                  <ul className="space-y-2.5">
                    {sizes.map((size, index) => (
                      <li
                        key={`${size}-${index}`}
                        className="flex items-center gap-3 text-sm text-ink"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                        {size}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-12 border-t border-forest/10 pt-10">
                <p className="font-serif text-lg italic text-forest">
                  Private label development is available for this line — colour,
                  size, material and branding can be tailored to your
                  collection.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  <Link
                    href={`/contact?product=${encodeURIComponent(
                      product.name,
                    )}&category=${encodeURIComponent(categoryName)}`}
                    data-testid="enquire-product-btn"
                    className="btn btn-gold"
                  >
                    Enquire About This Piece
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>

                  <button
                    type="button"
                    data-testid="shortlist-toggle-btn"
                    onClick={handleShortlistClick}
                    disabled={toggleShortlist.isPending || signingIn}
                    className="btn btn-outline-forest disabled:opacity-60"
                  >
                    {isSaved ? (
                      <>
                        <BookmarkCheck className="h-4 w-4 text-gold-deep" />
                        Saved in Shortlist
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-4 w-4" />
                        {user ? "Save to Shortlist" : "Sign In & Shortlist"}
                      </>
                    )}
                  </button>

                  <Link
                    href="/collections"
                    data-testid="product-continue-browsing"
                    className="btn btn-outline-forest"
                  >
                    Continue Browsing
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
