import type { User } from 'firebase/auth';
import { create } from 'zustand';

export interface PartnerProfile {
  uid: string;
  displayName: string;
  email: string;
  company?: string;
  country?: string;
}

interface AuthStoreState {
  user: User | null;
  profile: PartnerProfile | null;
  authReady: boolean;
  signingIn: boolean;
  setUser: (user: User | null) => void;
  setProfile: (
    profile:
      | PartnerProfile
      | null
      | ((prev: PartnerProfile | null) => PartnerProfile | null)
  ) => void;
  setAuthReady: (authReady: boolean) => void;
  setSigningIn: (signingIn: boolean) => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  profile: null,
  authReady: false,
  signingIn: false,
  setUser: (user) => set({ user }),
  setProfile: (profile) =>
    set((state) => ({
      profile: typeof profile === 'function' ? profile(state.profile) : profile,
    })),
  setAuthReady: (authReady) => set({ authReady }),
  setSigningIn: (signingIn) => set({ signingIn }),
}));
