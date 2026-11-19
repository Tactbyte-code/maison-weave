import { Suspense } from 'react';
import { ContactClient } from '@/components/pages/ContactClient';

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center bg-cream pt-24">
          <p className="animate-pulse font-serif text-2xl italic text-moss">
            Preparing studio enquiry…
          </p>
        </div>
      }
    >
      <ContactClient />
    </Suspense>
  );
}
