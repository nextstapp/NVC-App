import { router } from 'expo-router';

import { RoundBar } from '@/components/progress-bar';
import { TopBar } from '@/components/screen-shell';
import { ThemedText } from '@/components/themed-text';
import { Type } from '@/constants/theme';
import { ROUNDS_PER_SESSION } from '@/content/nvc-content';
import type { Copy } from '@/content/nvc-content';
import { useGameStore } from '@/features/games/seeing-clearly/use-game-store';
import { useTheme } from '@/hooks/use-theme';

/** Back arrow, one segment per round, and the round counter. Shared by match and sort. */
export function GameTopBar({ horizontal }: { horizontal: number }) {
  const theme = useTheme();
  const turn = useGameStore((state) => state.turn);

  return (
    <TopBar onBack={() => router.back()} horizontal={horizontal}>
      <RoundBar total={ROUNDS_PER_SESSION} current={turn} />
      <ThemedText style={[Type.mono, { color: theme.ink2 }]}>
        {turn}/{ROUNDS_PER_SESSION}
      </ThemedText>
    </TopBar>
  );
}

/** Maps a deck card to its sentence in the active copy set. */
export function sentenceFor(copy: Copy, key: string): string {
  switch (key) {
    case 'a-judge':
      return copy.judge;
    case 'a-camera':
      return copy.camera;
    case 'b-judge':
      return copy.judge2;
    default:
      return copy.camera2;
  }
}
