import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { NvcButton } from '@/components/nvc-button';
import { ScreenShell } from '@/components/screen-shell';
import { ThemedText } from '@/components/themed-text';
import { Radius, Shadow, Spacing, Type } from '@/constants/theme';
import { ROUNDS_PER_SESSION, getCopy } from '@/content/nvc-content';
import { useGameStore } from '@/features/games/seeing-clearly/use-game-store';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/use-profile-store';

const HORIZONTAL = Spacing.five;
const MODULE_ID = 'seeing-clearly';
const BADGE = 'observer';

export function ResultScreen() {
  const theme = useTheme();
  const { locale, age, previousScore, completeSession, awardBadge } = useProfileStore();
  const { firstTryCount, startSession } = useGameStore();
  const copy = getCopy(locale ?? 'tr', age ?? 12);

  // Snapshot the old score BEFORE the effect overwrites it — "last time" must
  // mean the previous session, not the one being banked right now.
  const [previous] = useState(() => previousScore);

  // The session is banked once, on arrival: progress, the badge, and the score
  // this run will be compared against next time.
  useEffect(() => {
    completeSession(MODULE_ID, firstTryCount);
    awardBadge(BADGE);
  }, [completeSession, awardBadge, firstTryCount]);

  return (
    <ScreenShell
      horizontal={HORIZONTAL}
      contentStyle={styles.content}
      action={
        <View style={styles.actions}>
          <NvcButton
            small
            variant="secondary"
            label={copy.replay}
            style={styles.actionButton}
            onPress={() => {
              startSession();
              router.replace('/games/seeing-clearly/brief');
            }}
          />
          <NvcButton
            small
            label={copy.backToModule}
            style={styles.actionButton}
            onPress={() => router.dismissTo('/(tabs)')}
          />
        </View>
      }
    >
      <View style={styles.center}>
        <BadgeMedal />
        <ThemedText
          style={[Type.badgeTitle, styles.centerText, styles.badgeTitle, { color: theme.ink }]}
        >
          {copy.badgeTitle}
        </ThemedText>
        <ThemedText
          style={[Type.subtle, styles.centerText, styles.badgeSub, { color: theme.ink2 }]}
        >
          {copy.badgeSub}
        </ThemedText>
      </View>

      <View style={[styles.card, { backgroundColor: theme.surface }, Shadow.card]}>
        <ThemedText style={[Type.overline, { color: theme.ink2 }]}>{copy.summary}</ThemedText>
        <View style={styles.roundRow}>
          {Array.from({ length: ROUNDS_PER_SESSION }, (_, index) => {
            const round = index + 1;
            const firstTry = round <= firstTryCount;

            return (
              <View
                key={round}
                style={[
                  styles.roundBox,
                  firstTry
                    ? { backgroundColor: theme.sun }
                    : {
                        backgroundColor: theme.sunSoft,
                        borderWidth: 1.5,
                        borderColor: theme.sun,
                        borderStyle: 'dashed',
                      },
                ]}
              >
                <ThemedText
                  style={[Type.monoLarge, { color: firstTry ? theme.onSun : theme.ink2 }]}
                >
                  {round}
                </ThemedText>
              </View>
            );
          })}
        </View>
        <ThemedText style={[Type.toast, { color: theme.ink }]}>
          {copy.firstTry
            .replace('{n}', String(firstTryCount))
            .replace('{total}', String(ROUNDS_PER_SESSION))}
        </ThemedText>
      </View>

      <View style={[styles.card, { backgroundColor: theme.seaSoft }]}>
        <ThemedText style={[Type.overline, { color: theme.sea }]}>{copy.selfTitle}</ThemedText>
        {previous === null ? null : <CompareRow label={copy.lastTime} value={previous} muted />}
        <CompareRow label={copy.today} value={firstTryCount} />
        <ThemedText style={[Type.small, { color: theme.ink2 }]}>{copy.noLeaderboard}</ThemedText>
      </View>
    </ScreenShell>
  );
}

/** Sun disc with a ring that keeps pulsing outward. */
function BadgeMedal() {
  const theme = useTheme();
  const ring = useSharedValue(0);

  useEffect(() => {
    ring.value = withRepeat(
      withTiming(1, { duration: 1800, easing: Easing.out(Easing.ease) }),
      -1,
      false,
    );
  }, [ring]);

  const ringStyle = useAnimatedStyle(() => ({
    opacity: 0.9 * (1 - ring.value),
    transform: [{ scale: 0.8 + ring.value * 0.7 }],
  }));

  return (
    <View style={styles.medal}>
      <Animated.View style={[styles.ring, ringStyle, { borderColor: theme.sun }]} />
      <View style={[styles.disc, { backgroundColor: theme.sun }, Shadow.lifted]}>
        <View style={[styles.discDot, { backgroundColor: theme.surface }]} />
        <ThemedText style={[Type.overline, { color: theme.onSun }]}>Observer</ThemedText>
      </View>
    </View>
  );
}

function CompareRow({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: number;
  muted?: boolean;
}) {
  const theme = useTheme();

  return (
    <View style={styles.compareRow}>
      <ThemedText style={[Type.small, styles.compareLabel, { color: theme.ink2 }]}>
        {label}
      </ThemedText>
      <View style={[styles.compareTrack, { backgroundColor: `${theme.sea}2E` }]}>
        <View
          style={[
            styles.compareFill,
            {
              width: `${(value / ROUNDS_PER_SESSION) * 100}%`,
              backgroundColor: muted ? `${theme.sea}73` : theme.sea,
            },
          ]}
        />
      </View>
      <ThemedText style={[Type.mono, { color: theme.ink2 }]}>
        {value}/{ROUNDS_PER_SESSION}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: Spacing.six },
  center: { alignItems: 'center' },
  centerText: { textAlign: 'center' },
  medal: { width: 112, height: 112, alignItems: 'center', justifyContent: 'center' },
  ring: { position: 'absolute', width: 96, height: 96, borderRadius: Radius.full, borderWidth: 2 },
  disc: {
    width: 96,
    height: 96,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  discDot: { width: 26, height: 26, borderRadius: Radius.full },
  badgeTitle: { marginTop: Spacing.three },
  badgeSub: { marginTop: 6, maxWidth: 290 },
  card: {
    marginTop: Spacing.four,
    borderRadius: Radius.card,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  roundRow: { flexDirection: 'row', gap: 6 },
  roundBox: {
    flex: 1,
    height: 38,
    borderRadius: Radius.box,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compareRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  compareLabel: { width: 74 },
  compareTrack: { flex: 1, height: 9, borderRadius: 5, overflow: 'hidden' },
  compareFill: { height: '100%', borderRadius: 5 },
  actions: { flexDirection: 'row', gap: 9 },
  actionButton: { flex: 1 },
});
