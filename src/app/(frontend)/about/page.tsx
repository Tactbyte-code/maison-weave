'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import {
  EditorialMarquee,
  PageHeader,
  ParallaxImage,
  Reveal,
} from '@/components/MotionPrimitives';
import { IMAGES } from '@/data/catalog';
import { usePayloadAboutQuery } from '@/hooks/usePayloadAbout';

const STORY_FALLBACK = {
  titleLine1: 'A house built',
  titleLine2Start: 'on the',
  titleHighlight: 'loom',
  intro:
    'Maison Weave is a manufacturer and exporter specialising in home textiles and home decor — working with brands, retailers and hospitality partners across the world.',
  storyLabel: 'Our Story',
  paragraphs: [
    'Maison Weave began with a simple conviction: that the objects we live with should be made slowly, skilfully and honestly. Today the house designs and manufactures home textiles and home decor — from table linen and cushion covers to rugs, baskets and woven accents for the home.',
    'We work the way good workshops always have. Fibres are chosen for how they will live — washed cotton that softens, jute that warms, water hyacinth that holds its shape. Patterns are developed, sampled and refined until a piece earns its place in a collection.',
    'As a manufacturing and export partner, we build long-term programmes rather than one-off orders: consistent quality, dependable communication and collections that arrive ready for your market.',
  ],
  quote:
    'Crafted Luxury Living is not a tagline — it is the standard we weave into every metre.',
};

const COMMITMENTS = [
  {
    title: 'Product Development',
    body: 'From first sketch to approved sample, we develop collections around your brief — construction, colour, finish and presentation.',
  },
  {
    title: 'Quality-Focused Manufacturing',
    body: 'Quality is built into every stage, with attention from weaving to finishing, so pieces arrive ready for your shelves and showrooms.',
  },
  {
    title: 'Customisation',
    body: 'Colours, sizes, materials, stitches and labels are developed to order. Your collection should be unmistakably yours.',
  },
  {
    title: 'Skilled Workmanship',
    body: 'Braiding, quilting, embroidery and hand-weaving are done by experienced hands, keeping craft at the centre of every collection.',
  },
  {
    title: 'Sustainable Material Options',
    body: 'Natural fibres — cotton, linen, jute, bamboo, cane and water hyacinth — with responsible material options developed on request.',
  },
  {
    title: 'International B2B Partnerships',
    body: 'We work as a long-term production partner to brands, retail groups and hospitality procurement teams around the world.',
  },
  {
    title: 'Private Label Manufacturing',
    body: 'Complete private label programmes — developed, manufactured and packed under your brand, ready for your markets.',
  },
];

const NUMBER_WORDS = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  'Seventeen', 'Eighteen', 'Nineteen', 'Twenty',
];

const MARQUEE_FALLBACK = [
  'Product Development',
  'Quality Manufacturing',
  'Customisation',
  'Skilled Workmanship',
  'Natural Fibres',
  'B2B Partnerships',
];

const PROCESS_STEPS = [
  {
    n: '01',
    title: 'The Brief',
    body: 'We begin with your requirement — market, materials, aesthetic and positioning.',
  },
  {
    n: '02',
    title: 'Development',
    body: 'Our team develops designs, materials and samples until the piece is right.',
  },
  {
    n: '03',
    title: 'Craft',
    body: 'Production with quality checks at weaving, stitching and finishing stages.',
  },
  {
    n: '04',
    title: 'Export',
    body: 'Collections are packed, documented and shipped to your markets.',
  },
];

const PROCESS_TEXT = {
  eyebrow: 'How We Work',
  titleStart: 'From fibre to',
  titleHighlight: 'finish',
  partnerTitle:
    'An established manufacturing partner for international home textile programmes.',
  partnerText:
    'Whether you are developing a first capsule collection or scaling an established line, Maison Weave brings product development, skilled production and export experience to the table.',
  buttonLabel: 'Send an Enquiry',
  buttonLink: '/contact',
};

export default function AboutPage() {
  const { data: about } = usePayloadAboutQuery();

  const storyImage = about?.storyImage;
  const storyImageUrl =
    typeof storyImage === 'object' && storyImage?.url ? storyImage.url : '';
  const storyImageAlt =
    typeof storyImage === 'object' && storyImage?.alt
      ? storyImage.alt
      : 'Artisan weaving textile on a handloom';

  const commitments = about?.commitments?.length
    ? about.commitments.map((item) => ({ title: item.title, body: item.body }))
    : COMMITMENTS;
  const countWord = NUMBER_WORDS[commitments.length] ?? String(commitments.length);

  const marqueeItems = about?.marqueeTexts?.length
    ? about.marqueeTexts.map((item) => item.text)
    : MARQUEE_FALLBACK;

  const processSteps = about?.processSteps?.length
    ? about.processSteps.map((item) => ({ title: item.title, body: item.body }))
    : PROCESS_STEPS;

  const partnerImage = about?.partnerImage;
  const partnerImageUrl =
    typeof partnerImage === 'object' && partnerImage?.url
      ? partnerImage.url
      : '';
  const partnerImageAlt =
    typeof partnerImage === 'object' && partnerImage?.alt
      ? partnerImage.alt
      : 'Close detail of woven threads on the loom';

  const paragraphs = about?.storyParagraphs?.length
    ? about.storyParagraphs.map((item) => item.text)
    : STORY_FALLBACK.paragraphs;

  return (
    <div data-testid="about-page">
      <PageHeader
        eyebrow="About Maison Weave"
        title={[
          about?.titleLine1 ?? STORY_FALLBACK.titleLine1,
          <span key="loom">
            {about?.titleLine2Start ?? STORY_FALLBACK.titleLine2Start}{' '}
            <em className="text-gold-deep">
              {about?.titleHighlight ?? STORY_FALLBACK.titleHighlight}
            </em>
            .
          </span>,
        ]}
        intro={about?.intro ?? STORY_FALLBACK.intro}
      />

      <section className="bg-cream pb-24 lg:pb-32">
        <div className="shell grid items-start gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal className="relative">
              <div className="absolute -left-4 -top-4 hidden h-full w-full border border-gold/40 sm:block" />
              <ParallaxImage
                src={storyImageUrl || IMAGES.handloom}
                alt={storyImageAlt}
                className="relative aspect-[3/4] w-full"
                distance={55}
              />
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:pt-10">
            <Reveal>
              <p className="eyebrow">
                {about?.storyLabel ?? STORY_FALLBACK.storyLabel}
              </p>
              <div className="mt-8 space-y-7 text-base leading-relaxed text-moss sm:text-lg">
                {paragraphs.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
              <blockquote className="mt-10 border-t border-gold/40 pt-8 font-serif text-2xl font-light italic leading-snug text-forest sm:text-3xl">
                &ldquo;{about?.quote ?? STORY_FALLBACK.quote}&rdquo;
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-sand py-24 lg:py-32">
        <div className="shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">
              {about?.commitmentsEyebrow ?? 'What We Bring'}
            </p>
            <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-forest sm:text-5xl">
              {countWord} {about?.commitmentsTitleEnd ?? 'commitments,'}{' '}
              <em className="text-gold-deep">
                {about?.commitmentsHighlight ?? 'one house'}
              </em>
              .
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px border border-forest/10 bg-forest/10 sm:grid-cols-2 lg:grid-cols-3">
            {commitments.map((item, index) => {
              const number = String(index + 1).padStart(2, '0');

              if (index === commitments.length - 1) {
                return (
                  <Reveal
                    key={`${item.title}-${index}`}
                    className="flex flex-col justify-between bg-forest p-8 text-cream lg:col-span-1 lg:p-10"
                  >
                    <div>
                      <p className="font-mono text-xs tabular-nums text-gold">
                        {number}
                      </p>
                      <h3 className="mt-4 font-serif text-2xl">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-cream/75">
                        {item.body}
                      </p>
                    </div>
                    <Link
                      href={
                        about?.commitmentsButtonLink ??
                        '/contact?category=Private%20Label%20Manufacturing'
                      }
                      data-testid="about-private-label-cta"
                      className="btn btn-gold mt-8 self-start"
                    >
                      {about?.commitmentsButtonLabel ?? 'Start the Conversation'}
                    </Link>
                  </Reveal>
                );
              }

              return (
                <Reveal
                  key={`${item.title}-${index}`}
                  delay={(index % 3) * 0.08}
                  className="bg-cream p-8 transition-colors duration-500 hover:bg-sand lg:p-10"
                >
                  <p className="font-mono text-xs tabular-nums text-gold-deep">
                    {number}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl text-forest">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-moss">
                    {item.body}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <EditorialMarquee
        dark
        items={marqueeItems}
      />

      <section className="bg-cream py-24 lg:py-32">
        <div className="shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">
              {about?.processEyebrow ?? PROCESS_TEXT.eyebrow}
            </p>
            <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-forest sm:text-5xl">
              {about?.processTitleStart ?? PROCESS_TEXT.titleStart}{' '}
              <em className="text-gold-deep">
                {about?.processTitleHighlight ?? PROCESS_TEXT.titleHighlight}
              </em>
              .
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <Reveal key={`${step.title}-${index}`} delay={0.08 * index}>
                <div className="border-t border-forest/20 pt-6">
                  <p className="font-mono text-xs tabular-nums text-gold-deep">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl text-forest">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-moss">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-24 grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <ParallaxImage
                src={partnerImageUrl || IMAGES.loomDetail}
                alt={partnerImageAlt}
                className="aspect-[4/3] w-full"
                distance={60}
              />
            </Reveal>
            <Reveal>
              <h3 className="font-serif text-3xl font-light leading-snug text-forest sm:text-4xl">
                {about?.partnerTitle ?? PROCESS_TEXT.partnerTitle}
              </h3>
              <p className="mt-6 max-w-lg leading-relaxed text-moss">
                {about?.partnerText ?? PROCESS_TEXT.partnerText}
              </p>
              <Link
                href={about?.partnerButtonLink ?? PROCESS_TEXT.buttonLink}
                data-testid="about-contact-cta"
                className="btn btn-forest mt-10"
              >
                {about?.partnerButtonLabel ?? PROCESS_TEXT.buttonLabel}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
