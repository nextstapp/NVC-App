import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Canonical store pattern: zustand + persist(AsyncStorage).
// Copy this shape for every new store; never call AsyncStorage outside a store.
type SettingsState = {
  soundEnabled: boolean;
  setSoundEnabled: (soundEnabled: boolean) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      soundEnabled: true,
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
    }),
    {
      name: 'settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
