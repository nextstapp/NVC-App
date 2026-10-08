import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { MODULES, ROUNDS_PER_SESSION, type Locale, type ModuleState } from '@/content/nvc-content';
import { deviceLocale } from '@/lib/device-locale';

export type ThemePreference = 'system' | 'light' | 'dark';

type ProfileState = {
  locale: Locale;
  /** Set once the language screen's Continue is pressed. */
  onboarded: boolean;
  themePreference: ThemePreference;
  /** Completed rounds per module id. */
  progress: Record<string, number>;
  badges: string[];
  /** First-try correct rounds in the previous session — the only comparison shown. */
  previousScore: number | null;
  hydrated: boolean;

  setLocale: (locale: Locale) => void;
  completeOnboarding: () => void;
  setThemePreference: (themePreference: ThemePreference) => void;
  completeSession: (moduleId: string, firstTryCount: number) => void;
  awardBadge: (badge: string) => void;
  reset: () => void;
};

// The handoff's module list is the designed starting point: module 01 finished,
// module 02 three rounds in, the rest still sequentially locked. Seeding it here
// keeps the first launch identical to the design and makes module 02 — the only
// module with authored content — immediately playable.
// ponytail: seeded demo progress; drop to {} once modules 01 and 03-06 have content.
const INITIAL_PROGRESS: Record<string, number> = { bridges: 5, 'seeing-clearly': 3 };

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      locale: deviceLocale(),
      onboarded: false,
      themePreference: 'system',
      progress: INITIAL_PROGRESS,
      badges: [],
      previousScore: null,
      hydrated: false,

      setLocale: (locale) => set({ locale }),
      completeOnboarding: () => set({ onboarded: true }),
      setThemePreference: (themePreference) => set({ themePreference }),

      completeSession: (moduleId, firstTryCount) =>
        set((state) => {
          const module = MODULES.find((m) => m.id === moduleId);
          const done = Math.min(module?.total ?? ROUNDS_PER_SESSION, ROUNDS_PER_SESSION);

          return {
            progress: {
              ...state.progress,
              [moduleId]: Math.max(state.progress[moduleId] ?? 0, done),
            },
            previousScore: firstTryCount,
          };
        }),

      awardBadge: (badge) =>
        set((state) =>
          state.badges.includes(badge) ? state : { badges: [...state.badges, badge] },
        ),

      reset: () =>
        set({
          locale: deviceLocale(),
          onboarded: false,
          progress: INITIAL_PROGRESS,
          badges: [],
          previousScore: null,
        }),
    }),
    {
      name: 'profile',
      storage: createJSONStorage(() => AsyncStorage),
      // v1: Estonian moved from "ee" to the ISO code "et"; the age step is gone,
      // and a profile that had finished it counts as onboarded.
      version: 1,
      migrate: (persisted, version) => {
        if (version >= 1) return persisted as ProfileState;
        const { age, ...saved } = persisted as Record<string, unknown>;

        return {
          ...saved,
          locale: saved.locale === 'ee' ? 'et' : saved.locale,
          onboarded: age != null,
        } as ProfileState;
      },
      // Rehydration is async; the router waits on `hydrated` so it never bounces
      // an already-onboarded user back to the language screen on cold start.
      onRehydrateStorage: () => () => useProfileStore.setState({ hydrated: true }),
      partialize: ({ hydrated: _hydrated, ...rest }) => rest,
      // Profiles saved before the device-language default carry `locale: null`;
      // keep the fresh default instead of letting the stale null win.
      merge: (persisted, current) => {
        const saved = persisted as Partial<ProfileState> | undefined;
        return { ...current, ...saved, locale: saved?.locale ?? current.locale };
      },
    },
  ),
);

/**
 * Modules unlock in order: everything up to and including the first unfinished
 * module is reachable, the rest stay locked.
 */
export function moduleStates(progress: Record<string, number>): Record<string, ModuleState> {
  let reachedOpen = false;

  return Object.fromEntries(
    MODULES.map((module) => {
      const done = progress[module.id] ?? 0;

      if (done >= module.total) return [module.id, 'done' as ModuleState];
      if (reachedOpen) return [module.id, 'locked' as ModuleState];

      reachedOpen = true;
      return [module.id, 'open' as ModuleState];
    }),
  );
}
