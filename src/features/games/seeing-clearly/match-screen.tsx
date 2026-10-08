import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenShell } from '@/components/screen-shell';
import { ThemedText } from '@/components/themed-text';
import { Radius, Shadow, Spacing, Type } from '@/constants/theme';
import { getCopy } from '@/content/nvc-content';
import { GameTopBar, sentenceFor } from '@/features/games/seeing-clearly/game-top-bar';
import { DECK, useGameStore, type Pair } from '@/features/games/seeing-clearly/use-game-store';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/use-profile-store';

const HORIZONTAL = Spacing.five;
const ADVANCE_DELAY = 550;
const MISS_FLASH = 300;

export function MatchScreen() {
  const theme = useTheme();
  const locale = useProfileStore((state) => state.locale);
  const { pick, matched, missed, missedThisRound, tapCard, clearMissed } = useGameStore();
  const copy = getCopy(locale);
  const solved = matched.length === 2;

  useEffect(() => {
    if (!solved) return;

    const timer = setTimeout(() => router.push('/games/seeing-clearly/sort'), ADVANCE_DELAY);

    return () => clearTimeout(timer);
  }, [solved]);

  useEffect(() => {
    if (missed.length === 0) return;

    const timer = setTimeout(clearMissed, MISS_FLASH);

    return () => clearTimeout(timer);
  }, [missed, clearMissed]);

  return (
    <ScreenShell
      horizontal={HORIZONTAL}
      topBar={<GameTopBar horizontal={HORIZONTAL} />}
      contentStyle={styles.content}
    >
      <View style={[styles.contextChip, { backgroundColor: theme.seaSoft }]}>
        <ThemedText style={[Type.small, { color: theme.ink }]}>{copy.ctx}</ThemedText>
      </View>

      <ThemedText style={[Type.gameTitle, styles.title, { color: theme.ink }]}>
        {copy.matchTitle}
      </ThemedText>
      <ThemedText style={[Type.helper, styles.sub, { color: theme.ink2 }]}>
        {copy.matchSub}
      </ThemedText>

      <View style={styles.deck}>
        {matched.map((pair) => (
          <MatchedCard key={pair} pair={pair} label={copy.matched} copy={copy} />
        ))}

        {DECK.filter((card) => !matched.includes(card.pair)).map((card) => {
          const isPicked = pick === card.key;
          const isMissed = missed.includes(card.key);

          return (
            <Pressable
              key={card.key}
              accessibilityRole="button"
              accessibilityState={{ selected: isPicked }}
              onPress={() => tapCard(card.key)}
              style={[
                styles.card,
                {
                  backgroundColor: isMissed ? theme.claySoft : theme.surface,
                  borderColor: isMissed ? theme.clay : isPicked ? theme.sea : theme.line,
                  borderWidth: isPicked || isMissed ? 2 : 1.5,
                },
                isPicked ? [Shadow.lifted, styles.lifted] : Shadow.card,
              ]}
            >
              <ThemedText style={[Type.cardSentence, { color: theme.ink }]}>
                {sentenceFor(copy, card.key)}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.hint}>
        <View
          style={[styles.hintDot, { backgroundColor: missedThisRound ? theme.clay : theme.sun }]}
        />
        <ThemedText
          accessibilityLiveRegion="polite"
          style={[
            Type.micro,
            styles.hintText,
            { color: missedThisRound ? theme.clay : theme.ink2 },
          ]}
        >
          {missedThisRound && !solved
            ? copy.matchMiss
            : matched.length === 1
              ? copy.matchHintLast
              : copy.matchHint}
        </ThemedText>
      </View>
    </ScreenShell>
  );
}

/** A solved pair collapses into a single card holding both sentences. */
function MatchedCard({
  pair,
  label,
  copy,
}: {
  pair: Pair;
  label: string;
  copy: ReturnType<typeof getCopy>;
}) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        styles.matchedCard,
        { backgroundColor: theme.sunSoft, borderColor: theme.sun },
      ]}
    >
      <View style={styles.matchedHeader}>
        <View style={[styles.matchedCheck, { backgroundColor: theme.sun }]}>
          <ThemedText style={[Type.small, { color: theme.onSun }]}>✓</ThemedText>
        </View>
        <ThemedText style={[Type.overline, { color: theme.ink2 }]}>{label}</ThemedText>
      </View>
      <ThemedText style={[Type.cardSentence, { color: theme.ink }]}>
        {sentenceFor(copy, `${pair}-judge`)}
      </ThemedText>
      <View style={[styles.divider, { backgroundColor: theme.line }]} />
      <ThemedText style={[Type.cardSentence, { color: theme.ink }]}>
        {sentenceFor(copy, `${pair}-camera`)}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 14 },
  contextChip: {
    alignSelf: 'flex-start',
    borderRadius: Radius.box,
    paddingVertical: 7,
    paddingHorizontal: Spacing.three,
  },
  title: { marginTop: Spacing.three },
  sub: { marginTop: Spacing.one },
  deck: { gap: 10, marginTop: Spacing.four },
  card: {
    borderRadius: Radius.card,
    borderWidth: 1.5,
    paddingVertical: 14,
    paddingHorizontal: 15,
  },
  lifted: { transform: [{ translateY: -2 }] },
  matchedCard: { gap: Spacing.two },
  matchedHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  matchedCheck: {
    width: 16,
    height: 16,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: { height: 1 },
  hint: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.four,
    alignItems: 'flex-start',
  },
  hintDot: { width: 9, height: 9, borderRadius: Radius.full, marginTop: 5 },
  hintText: { flex: 1 },
});
