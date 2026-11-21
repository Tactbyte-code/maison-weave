'use client';

import Link from 'next/link';
import { ArrowUpRight, Globe, Mail } from 'lucide-react';
import { MaisonLogo } from './MaisonMark';
import { usePayloadCategoriesQuery } from '@/hooks/usePayloadCategories';
import { usePayloadFooterQuery } from '@/hooks/usePayloadFooter';

const EXPLORE_LINKS = [
  { to: '/', label: 'Home', id: 'home' },
  { to: '/about', label: 'About Us', id: 'about' },
  { to: '/collections', label: 'Collections', id: 'collections' },
  { to: '/contact', label: 'Contact', id: 'contact' },
  { to: '/portal', label: 'Partner Portal', id: 'portal' },
];

const FALLBACK = {
  tagline: 'Crafted Luxury Living',
  description:
    'Manufacturer and exporter of home textiles and home decor, creating crafted collections for brands, retailers and hospitality partners worldwide.',
  email: 'jayant@maisonweave.com',
  website: 'https://maisonweave.com',
  note: 'B2B enquiries welcome — private label, wholesale and hospitality supply.',
};

export function Footer() {
  const year = new Date().getFullYear();

  const { data: footer } = usePayloadFooterQuery();
  const { data: categories } = usePayloadCategoriesQuery();

  const footerCategories = (categories ?? []).slice(0, 5);
  const tagline = footer?.tagline ?? FALLBACK.tagline;
  const email = footer?.email ?? FALLBACK.email;
  const website = footer?.website ?? FALLBACK.website;
  const websiteLabel = website.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const logo = footer?.logo;
  const logoUrl = typeof logo === 'object' && logo?.url ? logo.url : '';
  const logoAlt =
    typeof logo === 'object' && logo?.alt ? logo.alt : 'Maison Weave';

  return (
    <footer data-testid="site-footer" className="bg-forest-night text-cream">
      <div className="shell border-b border-cream/10 py-20 lg:py-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow-light">Start a conversation</p>
            <h2 className="mt-5 font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">
              Let&rsquo;s craft your next collection,{' '}
              <em className="text-gold">together</em>.
            </h2>
          </div>
          <Link
            href="/contact"
            data-testid="footer-cta-enquiry"
            className="btn btn-gold shrink-0"
          >
            Send an Enquiry
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="shell grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <MaisonLogo
            dark
            sublineText={tagline.toUpperCase()}
            markUrl={logoUrl}
            markAlt={logoAlt}
          />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/60">
            {footer?.description ?? FALLBACK.description}
          </p>
        </div>

        <div>
          <p className="eyebrow-light">Explore</p>
          <ul className="mt-6 space-y-3">
            {EXPLORE_LINKS.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.to}
                  data-testid={`footer-link-${item.id}`}
                  className="text-sm text-cream/70 transition-colors duration-300 hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow-light">Collections</p>
          <ul className="mt-6 space-y-3">
            {footerCategories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/collections?category=${category.slug}`}
                  data-testid={`footer-link-collection-${category.slug}`}
                  className="text-sm text-cream/70 transition-colors duration-300 hover:text-gold"
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/collections"
                data-testid="footer-link-all-collections"
                className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-deep hover:text-gold"
              >
                View the full catalogue
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow-light">Contact</p>
          <ul className="mt-6 space-y-4 text-sm text-cream/70">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-gold" />
              <a
                href={`mailto:${email}`}
                data-testid="footer-email-link"
                className="transition-colors duration-300 hover:text-gold"
              >
                {email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Globe className="h-4 w-4 shrink-0 text-gold" />
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-domain-link"
                className="transition-colors duration-300 hover:text-gold"
              >
                {websiteLabel}
              </a>
            </li>
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-cream/40">
            {footer?.note ?? FALLBACK.note}
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="shell flex flex-col items-center justify-between gap-3 py-7 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream/40">
            &copy; {year} Maison Weave
          </p>
          <p className="font-serif text-sm italic text-cream/50">
            {tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
