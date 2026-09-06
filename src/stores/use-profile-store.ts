import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import {
  MODULES,
  ROUNDS_PER_SESSION,
  type Age,
  type Locale,
  type ModuleState,
} from '@/content/nvc-content';

export type ThemePreference = 'system' | 'light' | 'dark';

type ProfileState = {
  locale: Locale | null;
  age: Age | null;
  themePreference: ThemePreference;
  /** Completed rounds per module id. */
  progress: Record<string, number>;
  badges: string[];
  /** First-try correct rounds in the previous session — the only comparison shown. */
  previousScore: number | null;
  hydrated: boolean;

  setLocale: (locale: Locale) => void;
  setAge: (age: Age) => void;
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
      locale: null,
      age: null,
      themePreference: 'system',
      progress: INITIAL_PROGRESS,
      badges: [],
      previousScore: 3,
      hydrated: false,

      setLocale: (locale) => set({ locale }),
      setAge: (age) => set({ age }),
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
          locale: null,
          age: null,
          progress: INITIAL_PROGRESS,
          badges: [],
          previousScore: 3,
        }),
    }),
    {
      name: 'profile',
      storage: createJSONStorage(() => AsyncStorage),
      // Rehydration is async; the router waits on `hydrated` so it never bounces
      // an already-onboarded user back to the language screen on cold start.
      onRehydrateStorage: () => () => useProfileStore.setState({ hydrated: true }),
      partialize: ({ hydrated: _hydrated, ...rest }) => rest,
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
