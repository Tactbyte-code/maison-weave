import Link from 'next/link';
import { ArrowUpRight, Globe, Mail } from 'lucide-react';
import { MaisonLogo } from './MaisonMark';

const EXPLORE_LINKS = [
  { to: '/', label: 'Home', id: 'home' },
  { to: '/about', label: 'About Us', id: 'about' },
  { to: '/collections', label: 'Collections', id: 'collections' },
  { to: '/contact', label: 'Contact', id: 'contact' },
  { to: '/portal', label: 'Partner Portal', id: 'portal' },
];

const FOOTER_COLLECTIONS = [
  'Table Linen',
  'Cushion Covers',
  'Rugs',
  'Jute Products',
  'Water Hyacinth',
];

export function Footer() {
  const year = new Date().getFullYear();

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
          <MaisonLogo dark />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/60">
            Manufacturer and exporter of home textiles and home decor, creating
            crafted collections for brands, retailers and hospitality partners
            worldwide.
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
            {FOOTER_COLLECTIONS.map((category) => (
              <li key={category}>
                <Link
                  href={`/collections?category=${encodeURIComponent(category)}`}
                  data-testid={`footer-link-collection-${category
                    .toLowerCase()
                    .replace(/[^a-z]+/g, '-')}`}
                  className="text-sm text-cream/70 transition-colors duration-300 hover:text-gold"
                >
                  {category}
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
                href="mailto:jayant@maisonweave.com"
                data-testid="footer-email-link"
                className="transition-colors duration-300 hover:text-gold"
              >
                jayant@maisonweave.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Globe className="h-4 w-4 shrink-0 text-gold" />
              <a
                href="https://maisonweave.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-domain-link"
                className="transition-colors duration-300 hover:text-gold"
              >
                maisonweave.com
              </a>
            </li>
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-cream/40">
            B2B enquiries welcome — private label, wholesale and hospitality
            supply.
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="shell flex flex-col items-center justify-between gap-3 py-7 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream/40">
            &copy; {year} Maison Weave
          </p>
          <p className="font-serif text-sm italic text-cream/50">
            Crafted Luxury Living
          </p>
        </div>
      </div>
    </footer>
  );
}
