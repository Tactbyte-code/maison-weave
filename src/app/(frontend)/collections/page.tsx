import { Suspense } from 'react';
import { CollectionsClient } from '@/components/pages/CollectionsClient';

export default function CollectionsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center bg-cream pt-24">
          <p className="animate-pulse font-serif text-2xl italic text-moss">
            Loading catalogue…
          </p>
        </div>
      }
    >
      <CollectionsClient />
    </Suspense>
  );
}
