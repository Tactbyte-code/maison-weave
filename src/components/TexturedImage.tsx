'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Grid3x3 } from 'lucide-react';

interface TexturedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  draggable?: boolean;
  priority?: boolean;
}

export function TexturedImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  draggable = false,
  priority = false,
}: TexturedImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt || 'Maison Weave woven textile'}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-sand via-cream to-sand/80 p-6 text-center ${className}`}
      >
        <Grid3x3
          className="h-10 w-10 text-forest/40"
          strokeWidth={1.25}
          aria-hidden="true"
        />
        {alt && (
          <span className="mt-3 font-serif text-sm italic text-moss">{alt}</span>
        )}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={900}
      priority={priority || loading === 'eager'}
      loading={priority || loading === 'eager' ? undefined : loading}
      draggable={draggable}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
