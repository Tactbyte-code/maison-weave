'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { LUXURY_EASE } from "./MotionPrimitives";

const NAV_LINKS = [
  { to: "/", label: "Home", id: "home" },
  { to: "/about", label: "About Us", id: "about" },
  { to: "/collections", label: "Collections", id: "collections" },
  { to: "/contact", label: "Contact", id: "contact" },
  { to: "/portal", label: "Partner Portal", id: "portal" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() || "/";

  const isTransparent = pathname === "/" && !scrolled;

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isLinkActive = (to: string) =>
    to === "/"
      ? pathname === "/"
      : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <>
      <header
        data-testid="site-navbar"
        className={`fixed inset-x-0 z-50 transition-all duration-500 ${
          isTransparent
            ? "bg-transparent top-5"
            : "border-b top-0 border-forest/10 bg-cream/85 backdrop-blur-xl py-3"
        }`}
      >
        <div
          className={`shell flex items-center justify-between gap-8 transition-all duration-500 ${
            isTransparent ? "h-19" : "h-16"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            data-testid="nav-logo-link"
            aria-label="Maison Weave home"
            className="shrink-0"
          >
            <Image
              src="/assets/images/logos/logo.png"
              alt="Maison Weave"
              width={401}
              height={210}
              priority
              className={`w-auto object-contain transition-all duration-500 ${
                isTransparent ? "h-25" : "h-16"
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = isLinkActive(link.to);
              return (
                <Link
                  key={link.id}
                  href={link.to}
                  data-testid={`nav-link-${link.id}`}
                  className={`font-mono text-[11px] uppercase tracking-[0.22em] whitespace-nowrap shrink-0 transition-colors duration-300 ${
                    isTransparent
                      ? isActive
                        ? "text-gold"
                        : "text-cream/85 hover:text-gold"
                      : isActive
                        ? "text-gold-deep"
                        : "text-forest/75 hover:text-gold-deep"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              data-testid="nav-cta-enquiry"
              className={`hidden lg:inline-flex btn ${
                isTransparent ? "btn-gold" : "btn-forest"
              }`}
            >
              Send Enquiry
            </Link>

            <button
              type="button"
              data-testid="mobile-menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className={`p-2 lg:hidden ${
                isTransparent ? "text-cream" : "text-forest"
              }`}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <motion.div
          data-testid="scroll-progress-bar"
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gold"
          style={{ scaleX }}
        />
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            data-testid="mobile-menu-overlay"
            className="fixed inset-0 z-[60] flex flex-col bg-forest px-6 py-6"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: LUXURY_EASE }}
          >
            <div className="flex items-center justify-between">
              <Image
                src="/assets/images/logos/logo.png"
                alt="Maison Weave"
                width={401}
                height={210}
                className="h-12 w-auto object-contain"
              />

              <button
                type="button"
                data-testid="mobile-menu-close-btn"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="p-2 text-cream"
              >
                <X className="h-7 w-7" />
              </button>
            </div>

            <nav
              className="mt-14 flex flex-col gap-2"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link, index) => {
                const isActive = isLinkActive(link.to);
                return (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.12 + 0.07 * index,
                      duration: 0.5,
                      ease: LUXURY_EASE,
                    }}
                  >
                    <Link
                      href={link.to}
                      data-testid={`mobile-nav-link-${link.id}`}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between border-b border-cream/10 py-5 font-serif text-3xl ${
                        isActive ? "text-gold" : "text-cream"
                      }`}
                    >
                      {link.label}
                      <ArrowUpRight className="h-5 w-5 text-gold" />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-auto"
            >
              <Link
                href="/contact"
                data-testid="mobile-nav-cta-enquiry"
                onClick={() => setMobileOpen(false)}
                className="btn btn-gold w-full"
              >
                Send an Enquiry
              </Link>

              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/50">
                jayant@maisonweave.com
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
