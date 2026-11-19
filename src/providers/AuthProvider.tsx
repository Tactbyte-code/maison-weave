'use client';

import React, { useEffect } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  auth,
  db,
  googleProvider,
  handleFirestoreError,
  OperationType,
} from '../lib/firebase';
import { type PartnerProfile, useAuthStore } from '../stores/useAuthStore';

export type { PartnerProfile };

async function ensureUserProfileDocument(
  firebaseUser: User
): Promise<PartnerProfile> {
  const userPath = `users/${firebaseUser.uid}`;
  const ref = doc(db, 'users', firebaseUser.uid);

  try {
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      return {
        uid: data.uid,
        displayName: data.displayName,
        email: data.email,
        company: data.company || '',
        country: data.country || '',
      };
    }

    const displayName = (
      firebaseUser.displayName ||
      firebaseUser.email?.split('@')[0] ||
      'Maison Partner'
    ).slice(0, 120);
    const email = (firebaseUser.email || '').slice(0, 160);

    await setDoc(ref, {
      uid: firebaseUser.uid,
      displayName,
      email,
      company: '',
      country: '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      uid: firebaseUser.uid,
      displayName,
      email,
      company: '',
      country: '',
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, userPath);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const setProfile = useAuthStore((s) => s.setProfile);
  const setAuthReady = useAuthStore((s) => s.setAuthReady);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      if (nextUser) {
        try {
          const loadedProfile = await ensureUserProfileDocument(nextUser);
          setProfile(loadedProfile);
        } catch (err) {
          console.error('Failed to sync partner profile:', err);
          setProfile({
            uid: nextUser.uid,
            displayName: nextUser.displayName || 'Maison Partner',
            email: nextUser.email || '',
          });
        }
      } else {
        setProfile(null);
      }
      setAuthReady(true);
    });

    return () => unsubscribe();
  }, [setUser, setProfile, setAuthReady]);

  return <>{children}</>;
}

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const authReady = useAuthStore((s) => s.authReady);
  const signingIn = useAuthStore((s) => s.signingIn);
  const setProfile = useAuthStore((s) => s.setProfile);
  const setSigningIn = useAuthStore((s) => s.setSigningIn);

  const signInWithGoogle = async (): Promise<User | null> => {
    setSigningIn(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loadedProfile = await ensureUserProfileDocument(result.user);
      setProfile(loadedProfile);
      return result.user;
    } finally {
      setSigningIn(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setProfile(null);
  };

  const updatePartnerProfile = async (fields: {
    displayName: string;
    company: string;
    country: string;
  }) => {
    if (!user) {
      throw new Error('Authentication required');
    }
    const userPath = `users/${user.uid}`;
    const ref = doc(db, 'users', user.uid);
    const displayName = fields.displayName.trim().slice(0, 120);
    const company = fields.company.trim().slice(0, 120);
    const country = fields.country.trim().slice(0, 80);

    try {
      await updateDoc(ref, {
        displayName,
        email: (user.email || '').slice(0, 160),
        company,
        country,
        updatedAt: serverTimestamp(),
      });
      setProfile((prev) =>
        prev
          ? { ...prev, displayName, company, country }
          : {
              uid: user.uid,
              displayName,
              email: user.email || '',
              company,
              country,
            }
      );
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, userPath);
    }
  };

  return {
    user,
    profile,
    authReady,
    signingIn,
    signInWithGoogle,
    logout,
    updatePartnerProfile,
  };
}
