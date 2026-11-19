'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { Toaster } from 'sonner';

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    const win = window as Window & { __lenis?: Lenis | null };
    win.__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      win.__lenis = null;
    };
  }, []);

  useEffect(() => {
    const win = window as Window & { __lenis?: Lenis | null };
    if (win.__lenis) {
      win.__lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0B2B1F',
            color: '#FAFAF7',
            border: '1px solid rgba(212,175,55,0.4)',
            borderRadius: '0px',
            fontFamily: "var(--font-sans), 'Plus Jakarta Sans', sans-serif",
          },
        }}
      />
    </>
  );
}
