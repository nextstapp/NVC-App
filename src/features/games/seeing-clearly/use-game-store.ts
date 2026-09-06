import { create } from 'zustand';

import { ROUNDS_PER_SESSION } from '@/content/nvc-content';

/** Each round contrasts two events (pairs A and B) told as judgment vs camera. */
export type Pair = 'a' | 'b';
export type CardKind = 'judge' | 'camera';
export type CardKey = `${Pair}-${CardKind}`;
export type Zone = 'coyote' | 'giraffe';

export type Card = { key: CardKey; pair: Pair; kind: CardKind };

// Deck order from the handoff: A-judgment, B-camera, A-camera, B-judgment, so a
// pair is never adjacent and the match cannot be solved by position alone.
export const DECK: Card[] = [
  { key: 'a-judge', pair: 'a', kind: 'judge' },
  { key: 'b-camera', pair: 'b', kind: 'camera' },
  { key: 'a-camera', pair: 'a', kind: 'camera' },
  { key: 'b-judge', pair: 'b', kind: 'judge' },
];

/** The sort step classifies pair A only. */
export const SORT_CARDS: Card[] = DECK.filter((card) => card.pair === 'a');

const ZONE_FOR_KIND: Record<CardKind, Zone> = { judge: 'coyote', camera: 'giraffe' };

type GameState = {
  turn: number;
  firstTryCount: number;
  /** Set when the current round has already taken a wrong attempt. */
  missedThisRound: boolean;

  pick: CardKey | null;
  matched: Pair[];

  selected: CardKey | null;
  placed: Partial<Record<CardKey, Zone>>;
  wrong: CardKey | null;

  startSession: () => void;
  tapCard: (key: CardKey) => void;
  selectCard: (key: CardKey) => void;
  dropOnZone: (zone: Zone, key?: CardKey) => void;
  clearWrong: () => void;
  nextRound: () => void;
};

const roundState = {
  pick: null,
  matched: [] as Pair[],
  selected: null,
  placed: {},
  wrong: null,
};

export const useGameStore = create<GameState>()((set, get) => ({
  turn: 1,
  firstTryCount: 0,
  missedThisRound: false,
  ...roundState,

  startSession: () => set({ turn: 1, firstTryCount: 0, missedThisRound: false, ...roundState }),

  // First tap selects, tapping the same card clears it, and a second card either
  // completes the pair or silently drops the selection. A miss costs nothing.
  tapCard: (key) => {
    const { pick, matched } = get();
    const card = DECK.find((c) => c.key === key);

    if (!card || matched.includes(card.pair)) return;
    if (pick === key) return set({ pick: null });
    if (!pick) return set({ pick: key });

    const previous = DECK.find((c) => c.key === pick);

    if (previous && previous.pair === card.pair) {
      return set({ pick: null, matched: [...matched, card.pair] });
    }

    set({ pick: null, missedThisRound: true });
  },

  selectCard: (key) => set({ selected: get().selected === key ? null : key }),

  dropOnZone: (zone, key) => {
    const target = key ?? get().selected;
    const card = target ? SORT_CARDS.find((c) => c.key === target) : undefined;

    if (!card || get().placed[card.key]) return;

    if (ZONE_FOR_KIND[card.kind] === zone) {
      return set((state) => ({
        placed: { ...state.placed, [card.key]: zone },
        selected: null,
      }));
    }

    // Wrong side: the card shakes back, nothing is deducted.
    set({ wrong: card.key, selected: null, missedThisRound: true });
  },

  clearWrong: () => set({ wrong: null }),

  nextRound: () =>
    set((state) => ({
      turn: Math.min(state.turn + 1, ROUNDS_PER_SESSION),
      firstTryCount: state.missedThisRound ? state.firstTryCount : state.firstTryCount + 1,
      missedThisRound: false,
      ...roundState,
    })),
}));

export function zoneFor(kind: CardKind): Zone {
  return ZONE_FOR_KIND[kind];
}
