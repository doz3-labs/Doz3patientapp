import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import type { PatientProfile } from "../types";

const TOKEN_KEY = "doz3_patient_token";
const PROFILE_KEY = "doz3_patient_profile";

interface AuthState {
  token: string | null;
  patient: PatientProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  hydrate: () => Promise<void>;
  login: (token: string, patient: PatientProfile) => Promise<void>;
  updateProfile: (p: Partial<PatientProfile>) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  patient: null,
  isAuthenticated: false,
  isLoading: true,

  hydrate: async () => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const profileJson = await SecureStore.getItemAsync(PROFILE_KEY);
      if (token && profileJson) {
        const patient = JSON.parse(profileJson) as PatientProfile;
        set({ token, patient, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },

  login: async (token, patient) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    await SecureStore.setItemAsync(PROFILE_KEY, JSON.stringify(patient));
    set({ token, patient, isAuthenticated: true });
  },

  updateProfile: (updates) => {
    const current = get().patient;
    if (!current) return;
    const next = { ...current, ...updates };
    set({ patient: next });
    SecureStore.setItemAsync(PROFILE_KEY, JSON.stringify(next)).catch(() => {});
  },

  logout: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY).catch(() => {});
    await SecureStore.deleteItemAsync(PROFILE_KEY).catch(() => {});
    set({ token: null, patient: null, isAuthenticated: false });
  },
}));
