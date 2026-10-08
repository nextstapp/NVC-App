import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Badge } from '@/content/app-copy';

const MAX_SESSIONS = 100;

/** One finished Emotion Hunter game, exactly as the game reports it. */
export type GameSession = {
  lang: string;
  mode: 'single' | 'team';
  rounds: number;
  secondsPerRound: number;
  maxScore: number;
  /** ISO timestamp; doubles as the session id. */
  playedAt: string;
  /** Sorted by score, best first. */
  teams: { name: string; score: number; pct: number; badge: Badge }[];
};

type SessionsState = {
  /** Newest first. */
  sessions: GameSession[];
  addSession: (session: GameSession) => void;
  removeSession: (playedAt: string) => void;
  clearSessions: () => void;
};

export const useSessionsStore = create<SessionsState>()(
  persist(
    (set) => ({
      sessions: [],
      addSession: (session) =>
        set((state) =>
          // The results screen can report the same game twice; keep the first.
          state.sessions.some((s) => s.playedAt === session.playedAt)
            ? state
            : { sessions: [session, ...state.sessions].slice(0, MAX_SESSIONS) },
        ),
      removeSession: (playedAt) =>
        set((state) => ({ sessions: state.sessions.filter((s) => s.playedAt !== playedAt) })),
      clearSessions: () => set({ sessions: [] }),
    }),
    {
      name: 'sessions',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
