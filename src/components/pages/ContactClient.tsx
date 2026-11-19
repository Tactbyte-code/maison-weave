'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowUpRight,
  Clock,
  Globe,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { LineMaskReveal, Reveal } from "@/components/MotionPrimitives";
import { useSubmitEnquiryMutation } from "@/hooks/useCatalogQueries";
import { useAuth } from "@/providers/AuthProvider";

const ENQUIRY_CATEGORIES = [
  "General Enquiry",
  "Table Linen",
  "Table Runners",
  "Placemats",
  "Tablecloths",
  "Cushion Covers",
  "Quilted Products",
  "Kitchen Textiles",
  "Rugs",
  "Jute Products",
  "Bamboo and Cane Products",
  "Water Hyacinth",
  "Private Label Manufacturing",
  "Wholesale & Retail Partnership",
  "Hospitality Supply",
];

const NEXT_STEPS = [
  {
    n: "01",
    text: "We review your requirement — categories, materials, quantities and branding.",
  },
  {
    n: "02",
    text: "We respond with questions or a tailored proposal for your programme.",
  },
  {
    n: "03",
    text: "We develop samples until the collection is exactly right.",
  },
];

export function ContactClient() {
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get("product") || "";
  const initialCategory = searchParams.get("category") || "";

  const { user, profile, signInWithGoogle, signingIn } = useAuth();
  const submitEnquiry = useSubmitEnquiryMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    category: ENQUIRY_CATEGORIES.includes(initialCategory)
      ? initialCategory
      : "General Enquiry",
    message: initialProduct
      ? `Hello Maison Weave — I would like to enquire about ${initialProduct}.`
      : "",
  });

  const [lastEnquiryId, setLastEnquiryId] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || profile.displayName || "",
        email: prev.email || profile.email || "",
        company: prev.company || profile.company || "",
        country: prev.country || profile.country || "",
      }));
    }
  }, [profile]);

  const updateField =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let activeUid = user?.uid;

    if (!activeUid) {
      try {
        const signedInUser = await signInWithGoogle();
        if (!signedInUser) return;
        activeUid = signedInUser.uid;
      } catch {
        toast.error(
          "Sign-in is required to submit securely — or email jayant@maisonweave.com directly."
        );
        return;
      }
    }

    try {
      const enquiryId = await submitEnquiry.mutateAsync({
        userId: activeUid,
        name: form.name,
        email: form.email,
        company: form.company,
        country: form.country,
        category: form.category,
        productName: initialProduct,
        message: form.message,
      });

      setLastEnquiryId(enquiryId);

      toast.success("Enquiry received — our team will respond shortly.", {
        description: "Recorded in your Partner Portal for tracking.",
      });

      setForm((prev) => ({
        ...prev,
        category: "General Enquiry",
        message: "",
      }));
    } catch {
      toast.error(
        "Something went wrong — please email jayant@maisonweave.com directly."
      );
    }
  };

  return (
    <div
      data-testid="contact-page"
      className="bg-cream pb-24 pt-32 sm:pt-36 lg:pb-32 lg:pt-44"
    >
      <div className="shell">
        <p className="eyebrow">Contact</p>

        <h1 className="mt-6 font-serif text-5xl font-light leading-[1.02] text-forest sm:text-6xl lg:text-7xl">
          <LineMaskReveal
            delay={0.2}
            lines={[
              "Let's talk",
              <em key="t" className="text-gold-deep">
                textiles.
              </em>,
            ]}
          />
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-moss sm:text-lg">
          Share your requirement — categories, materials, quantities and
          branding — and our team will respond with a tailored proposal.
        </p>

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-5 lg:gap-14">
          {/* LEFT COLUMN */}
          <div className="space-y-8 lg:col-span-2">
            {/* STUDIO CONTACT DETAILS */}
            <Reveal className="bg-forest p-8 text-cream sm:p-10">
              <h2 className="font-serif text-3xl font-light">The studio</h2>

              <p className="mt-3 text-sm leading-relaxed text-cream/60">
                MAISON WEAVE (OPC) PRIVATE LIMITED
              </p>

              <div className="mt-9 space-y-7">
                {/* PHONE */}
                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream/50">
                      Phone
                    </p>
                    <a
                      href="tel:+919654815881"
                      className="mt-1.5 block text-sm text-cream transition-colors hover:text-gold"
                    >
                      +91 96548 15881
                    </a>
                  </div>
                </div>

                {/* EMAILS */}
                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream/50">
                      Email
                    </p>
                    <a
                      href="mailto:jayant@maisonweave.com"
                      data-testid="contact-email-link"
                      className="mt-1.5 block break-all text-sm text-cream transition-colors hover:text-gold"
                    >
                      jayant@maisonweave.com
                    </a>
                    <a
                      href="mailto:ekdesignsllp@gmail.com"
                      className="mt-2 block break-all text-sm text-cream transition-colors hover:text-gold"
                    >
                      ekdesignsllp@gmail.com
                    </a>
                  </div>
                </div>

                {/* WEBSITE */}
                <div className="flex items-start gap-4">
                  <Globe className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream/50">
                      Website
                    </p>
                    <a
                      href="https://maisonweave.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="contact-domain-link"
                      className="mt-1.5 block text-sm text-cream transition-colors hover:text-gold"
                    >
                      maisonweave.com
                    </a>
                  </div>
                </div>

                {/* BUSINESS HOURS */}
                <div className="flex items-start gap-4">
                  <Clock className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream/50">
                      Business Hours
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-cream">
                      Mon - Sat
                      <br />
                      9:00 AM - 6:00 PM (IST)
                    </p>
                  </div>
                </div>

                {/* USA ADDRESS */}
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream/50">
                      USA Office
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-cream/90">
                      125 New Field Avenue Unit-C
                      <br />
                      Edison, NJ 08837
                      <br />
                      USA
                    </p>
                  </div>
                </div>

                {/* INDIA ADDRESS */}
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream/50">
                      India Office
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-cream/90">
                      C-48, DDA Sheds, Okhla Phase I,
                      <br />
                      Okhla Industrial Area
                      <br />
                      New Delhi - 110020
                      <br />
                      India
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-9 border-t border-cream/10 pt-7">
                <p className="text-sm leading-relaxed text-cream/60">
                  We work with brands, retailers and hospitality partners
                  worldwide — from single collections to ongoing private label
                  programmes.
                </p>
              </div>
            </Reveal>

            {/* WHAT HAPPENS NEXT — SEPARATE FROM GREEN BOX */}
            <Reveal
              delay={0.1}
              className="border border-forest/10 bg-sand/60 p-8 sm:p-10"
            >
              <p className="eyebrow">Our process</p>

              <h2 className="mt-3 font-serif text-2xl font-light text-forest sm:text-3xl">
                What happens next
              </h2>

              <div className="mt-8 space-y-7">
                {NEXT_STEPS.map((step) => (
                  <div key={step.n} className="flex gap-5">
                    <span className="font-mono text-xs tabular-nums text-gold-deep">
                      {step.n}
                    </span>
                    <p className="text-sm leading-relaxed text-moss">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN — STICKY FORM */}
          <Reveal
            delay={0.1}
            className="
              lg:sticky
              lg:top-35
              lg:col-span-3
              lg:max-h-[calc(100svh-7rem)]
              lg:overflow-y-auto
              lg:overscroll-contain
              lg:pr-2
            "
          >
            {!user && (
              <div className="mb-8 flex flex-col items-start justify-between gap-4 border border-forest/15 bg-sand/60 p-5 sm:flex-row sm:items-center">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
                  <div>
                    <p className="font-serif text-lg text-forest">
                      Partner Verification
                    </p>
                    <p className="text-xs leading-relaxed text-moss">
                      Sign in with Google to pre-fill your studio profile and
                      track submitted briefs in the Partner Portal.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => void signInWithGoogle()}
                  disabled={signingIn}
                  data-testid="contact-google-signin-btn"
                  className="btn btn-outline-forest shrink-0 px-5 py-2.5"
                >
                  {signingIn ? "Connecting…" : "Sign In"}
                </button>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              data-testid="enquiry-form"
              className="grid gap-x-7 gap-y-6 sm:grid-cols-2"
            >
              <div>
                <label htmlFor="f-name" className="field-label">
                  Full Name *
                </label>
                <input
                  id="f-name"
                  data-testid="enquiry-name-input"
                  required
                  minLength={2}
                  maxLength={120}
                  value={form.name}
                  onChange={updateField("name")}
                  placeholder="Your name"
                  className="field-input"
                />
              </div>

              <div>
                <label htmlFor="f-email" className="field-label">
                  Business Email *
                </label>
                <input
                  id="f-email"
                  type="email"
                  data-testid="enquiry-email-input"
                  required
                  maxLength={160}
                  value={form.email}
                  onChange={updateField("email")}
                  placeholder="you@company.com"
                  className="field-input"
                />
              </div>

              <div>
                <label htmlFor="f-company" className="field-label">
                  Company
                </label>
                <input
                  id="f-company"
                  data-testid="enquiry-company-input"
                  maxLength={120}
                  value={form.company}
                  onChange={updateField("company")}
                  placeholder="Company or brand"
                  className="field-input"
                />
              </div>

              <div>
                <label htmlFor="f-country" className="field-label">
                  Country
                </label>
                <input
                  id="f-country"
                  data-testid="enquiry-country-input"
                  maxLength={80}
                  value={form.country}
                  onChange={updateField("country")}
                  placeholder="Country / market"
                  className="field-input"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="f-category" className="field-label">
                  Area of Interest
                </label>
                <select
                  id="f-category"
                  data-testid="enquiry-category-select"
                  value={form.category}
                  onChange={updateField("category")}
                  className="field-input cursor-pointer bg-transparent"
                >
                  {ENQUIRY_CATEGORIES.map((category) => (
                    <option
                      key={category}
                      value={category}
                      className="bg-cream text-ink"
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="f-message" className="field-label">
                  Your Requirement *
                </label>
                <textarea
                  id="f-message"
                  data-testid="enquiry-message-textarea"
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={4}
                  value={form.message}
                  onChange={updateField("message")}
                  placeholder="Tell us about the collection — categories, materials, quantities, timelines and branding."
                  className="field-input resize-none border border-ink/20 px-4 focus:border-gold"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  data-testid="enquiry-submit-btn"
                  disabled={submitEnquiry.isPending || signingIn}
                  className="btn btn-forest w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {submitEnquiry.isPending || signingIn
                    ? "Sending…"
                    : user
                      ? "Send an Enquiry"
                      : "Sign In with Google & Send Enquiry"}

                  {!submitEnquiry.isPending && !signingIn && (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                </button>

                {lastEnquiryId && (
                  <p className="mt-4 text-sm text-forest">
                    Enquiry logged ({lastEnquiryId.slice(0, 8)}).{" "}
                    <Link
                      href="/portal"
                      className="underline decoration-gold underline-offset-4 hover:text-gold-deep"
                    >
                      View in Partner Portal
                    </Link>
                  </p>
                )}

                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.24em] text-moss">
                  Enquiries reach us directly at jayant@maisonweave.com
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
