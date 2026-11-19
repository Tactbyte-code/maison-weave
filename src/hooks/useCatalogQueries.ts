'use client';

import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  getCategories,
  getProductBySlug,
  PRODUCTS,
  type CategorySummary,
  type Product,
} from '../data/catalog';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export interface ShortlistEntry {
  userId: string;
  productSlug: string;
  productName: string;
  category: string;
  notes?: string;
  createdAt?: Date | null;
}

export interface EnquiryRecord {
  id: string;
  userId: string;
  name: string;
  email: string;
  company?: string;
  country?: string;
  category: string;
  productName?: string;
  message: string;
  status: 'submitted' | 'withdrawn';
  createdAt?: Date | null;
}

export function useCategoriesQuery() {
  return useQuery<CategorySummary[]>({
    queryKey: ['categories'],
    queryFn: async () => getCategories(),
    initialData: getCategories,
    staleTime: Infinity,
  });
}

export function useProductsQuery() {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => PRODUCTS,
    initialData: PRODUCTS,
    staleTime: Infinity,
  });
}

export function useProductBySlugQuery(slug: string | undefined) {
  return useQuery<Product | null>({
    queryKey: ['product', slug],
    queryFn: async () => (slug ? getProductBySlug(slug) ?? null : null),
    initialData: () => (slug ? getProductBySlug(slug) ?? null : null),
    enabled: Boolean(slug),
    staleTime: Infinity,
  });
}

export function useShortlistQuery(userId: string | undefined, enabled: boolean) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled || !userId) return;
    const path = `users/${userId}/shortlist`;
    const q = query(
      collection(db, 'users', userId, 'shortlist'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: ShortlistEntry[] = snapshot.docs.map((d) => {
          const data = d.data();
          return {
            userId: data.userId,
            productSlug: data.productSlug,
            productName: data.productName,
            category: data.category,
            notes: data.notes || '',
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : null,
          };
        });
        queryClient.setQueryData(['shortlist', userId], items);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );

    return () => unsubscribe();
  }, [enabled, userId, queryClient]);

  return useQuery<ShortlistEntry[]>({
    queryKey: ['shortlist', userId],
    queryFn: async () => {
      if (!userId) return [];
      const path = `users/${userId}/shortlist`;
      try {
        const q = query(
          collection(db, 'users', userId, 'shortlist'),
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        );
        const snap = await getDocs(q);
        return snap.docs.map((d) => {
          const data = d.data();
          return {
            userId: data.userId,
            productSlug: data.productSlug,
            productName: data.productName,
            category: data.category,
            notes: data.notes || '',
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : null,
          };
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    },
    enabled: enabled && Boolean(userId),
  });
}

export function useToggleShortlistMutation(userId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      product,
      isSaved,
      notes = '',
    }: {
      product: Product;
      isSaved: boolean;
      notes?: string;
    }) => {
      if (!userId) throw new Error('Authentication required');
      const path = `users/${userId}/shortlist/${product.slug}`;
      const ref = doc(db, 'users', userId, 'shortlist', product.slug);

      if (isSaved) {
        try {
          await deleteDoc(ref);
          return { action: 'removed' as const };
        } catch (error) {
          handleFirestoreError(error, OperationType.DELETE, path);
        }
      } else {
        try {
          await setDoc(ref, {
            userId,
            productSlug: product.slug.slice(0, 120),
            productName: product.name.slice(0, 120),
            category: product.category.slice(0, 80),
            notes: notes.slice(0, 400),
            createdAt: serverTimestamp(),
          });
          return { action: 'added' as const };
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, path);
        }
      }
    },
    onSuccess: () => {
      if (userId) {
        void queryClient.invalidateQueries({ queryKey: ['shortlist', userId] });
      }
    },
  });
}

export function useUpdateShortlistNoteMutation(userId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productSlug, notes }: { productSlug: string; notes: string }) => {
      if (!userId) throw new Error('Authentication required');
      const path = `users/${userId}/shortlist/${productSlug}`;
      const ref = doc(db, 'users', userId, 'shortlist', productSlug);
      try {
        await updateDoc(ref, {
          notes: notes.trim().slice(0, 400),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, path);
      }
    },
    onSuccess: () => {
      if (userId) {
        void queryClient.invalidateQueries({ queryKey: ['shortlist', userId] });
      }
    },
  });
}

export function useEnquiriesQuery(userId: string | undefined, enabled: boolean) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled || !userId) return;
    const path = 'enquiries';
    const q = query(
      collection(db, 'enquiries'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const rows: EnquiryRecord[] = snapshot.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            userId: data.userId,
            name: data.name,
            email: data.email,
            company: data.company || '',
            country: data.country || '',
            category: data.category,
            productName: data.productName || '',
            message: data.message,
            status: data.status,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : null,
          };
        });
        queryClient.setQueryData(['enquiries', userId], rows);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );

    return () => unsubscribe();
  }, [enabled, userId, queryClient]);

  return useQuery<EnquiryRecord[]>({
    queryKey: ['enquiries', userId],
    queryFn: async () => {
      if (!userId) return [];
      const path = 'enquiries';
      try {
        const q = query(
          collection(db, 'enquiries'),
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        );
        const snap = await getDocs(q);
        return snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            userId: data.userId,
            name: data.name,
            email: data.email,
            company: data.company || '',
            country: data.country || '',
            category: data.category,
            productName: data.productName || '',
            message: data.message,
            status: data.status,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : null,
          };
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    },
    enabled: enabled && Boolean(userId),
  });
}

export function useSubmitEnquiryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      userId: string;
      name: string;
      email: string;
      company?: string;
      country?: string;
      category: string;
      productName?: string;
      message: string;
    }) => {
      const path = 'enquiries';
      try {
        const docRef = await addDoc(collection(db, 'enquiries'), {
          userId: payload.userId,
          name: payload.name.trim().slice(0, 120),
          email: payload.email.trim().slice(0, 160),
          company: (payload.company || '').trim().slice(0, 120),
          country: (payload.country || '').trim().slice(0, 80),
          category: payload.category.trim().slice(0, 80),
          productName: (payload.productName || '').trim().slice(0, 120),
          message: payload.message.trim().slice(0, 2000),
          status: 'submitted',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        return docRef.id;
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, path);
      }
    },
    onSuccess: (_id, variables) => {
      void queryClient.invalidateQueries({ queryKey: ['enquiries', variables.userId] });
    },
  });
}

export function useWithdrawEnquiryMutation(userId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (enquiryId: string) => {
      if (!userId) throw new Error('Authentication required');
      const path = `enquiries/${enquiryId}`;
      try {
        await updateDoc(doc(db, 'enquiries', enquiryId), {
          status: 'withdrawn',
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, path);
      }
    },
    onSuccess: () => {
      if (userId) {
        void queryClient.invalidateQueries({ queryKey: ['enquiries', userId] });
      }
    },
  });
}
