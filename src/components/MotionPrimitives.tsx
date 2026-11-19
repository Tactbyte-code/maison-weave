'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration: 0.9, ease: LUXURY_EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function LineMaskReveal({
  lines,
  className,
  delay = 0,
  stagger = 0.13,
}: {
  lines: React.ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <span className={className}>
      {lines.map((line, index) => (
        <span
          key={index}
          className="block overflow-hidden pb-[0.09em] -mb-[0.09em]"
        >
          <motion.span
            className="block will-change-transform"
            initial={{ y: '112%' }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.05,
              ease: LUXURY_EASE,
              delay: delay + index * stagger,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function ParallaxImage({
  src,
  alt,
  className,
  distance = 70,
}: {
  src: string;
  alt: string;
  className?: string;
  distance?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className || ''}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        style={{ y }}
        className="h-full w-full scale-[1.18] object-cover"
      />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: React.ReactNode[];
  intro?: string;
}) {
  return (
    <section className="bg-cream pb-14 pt-36 sm:pt-40 lg:pb-20 lg:pt-44">
      <div className="shell">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: LUXURY_EASE, delay: 0.15 }}
        >
          {eyebrow}
        </motion.p>
        <h1 className="mt-6 font-serif text-5xl font-light leading-[1.02] text-forest sm:text-6xl lg:text-7xl">
          <LineMaskReveal lines={title} delay={0.25} />
        </h1>
        {intro && (
          <motion.p
            className="mt-8 max-w-2xl text-base leading-relaxed text-moss sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: LUXURY_EASE, delay: 0.55 }}
          >
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  );
}

export function EditorialMarquee({
  items,
  dark = false,
}: {
  items: string[];
  dark?: boolean;
}) {
  const Track = ({ hidden }: { hidden?: boolean }) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center">
          <span className="whitespace-nowrap px-8 font-serif text-2xl font-light italic sm:text-3xl">
            {item}
          </span>
          <span className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      data-testid="editorial-marquee"
      className={`overflow-hidden border-y py-6 ${
        dark
          ? 'border-cream/10 bg-forest-night text-cream'
          : 'border-forest/10 bg-sand text-forest'
      }`}
    >
      <div className="flex w-max animate-marquee">
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
