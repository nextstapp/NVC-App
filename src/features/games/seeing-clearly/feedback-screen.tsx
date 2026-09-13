import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Mascot } from '@/components/mascot';
import { NvcButton } from '@/components/nvc-button';
import { ScreenShell } from '@/components/screen-shell';
import { ThemedText } from '@/components/themed-text';
import { Radius, Shadow, Spacing, Type } from '@/constants/theme';
import { getCopy } from '@/content/nvc-content';
import { useGameStore } from '@/features/games/seeing-clearly/use-game-store';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/use-profile-store';

const HORIZONTAL = Spacing.five;

export function FeedbackScreen() {
  const theme = useTheme();
  const { locale, age } = useProfileStore();
  const nextRound = useGameStore((state) => state.nextRound);
  const copy = getCopy(locale ?? 'tr', age ?? 12);

  return (
    <ScreenShell
      horizontal={HORIZONTAL}
      contentStyle={styles.content}
      action={
        <NvcButton
          label={copy.next}
          tone="clay"
          onPress={() => {
            // Closes the round: a clean round increments the first-try tally.
            nextRound();
            router.push('/games/seeing-clearly/result');
          }}
        />
      }
    >
      <View style={styles.header}>
        <Animated.View
          entering={FadeIn.duration(350)}
          style={[styles.check, { backgroundColor: theme.sun }]}
        >
          <ThemedText style={[Type.feedbackTitle, { color: theme.onSun }]}>✓</ThemedText>
        </Animated.View>
        <ThemedText style={[Type.feedbackTitle, styles.centerText, { color: theme.ink }]}>
          {copy.fbTitle}
        </ThemedText>
        <ThemedText style={[Type.micro, styles.centerText, { color: theme.ink2 }]}>
          {copy.fbSub}
        </ThemedText>
      </View>

      <View style={[styles.card, { backgroundColor: theme.surface }, Shadow.card]}>
        <ThemedText style={[Type.tabLabel, styles.label, { color: theme.clay }]}>
          {copy.zoneCoyote}
        </ThemedText>
        <TrappedSentence sentence={copy.judge} traps={copy.trap} />
        <View style={[styles.divider, { backgroundColor: theme.line }]} />
        <ThemedText style={[Type.tabLabel, styles.label, { color: theme.sunText }]}>
          {copy.zoneGiraffe}
        </ThemedText>
        <ThemedText style={[Type.bodyStrong, { color: theme.ink }]}>{copy.camera}</ThemedText>
      </View>

      <View style={[styles.why, { backgroundColor: theme.sunSoft }]}>
        <Mascot size={28} kind="giraffe" />
        <ThemedText style={[Type.note, styles.whyText, { color: theme.ink }]}>
          {copy.why}
        </ThemedText>
      </View>

      <ThemedText style={[Type.overline, styles.trapTitle, { color: theme.ink2 }]}>
        {copy.trapTitle}
      </ThemedText>
      <View style={styles.chips}>
        {copy.traps.map((trap) => (
          <View key={trap} style={[styles.chip, { backgroundColor: theme.claySoft }]}>
            <ThemedText style={[Type.micro, { color: theme.ink }]}>{trap}</ThemedText>
          </View>
        ))}
      </View>
    </ScreenShell>
  );
}

/**
 * Renders the judgment sentence with its trap words underlined in clay — the
 * words a camera could never record.
 */
function TrappedSentence({ sentence, traps }: { sentence: string; traps: string[] }) {
  const theme = useTheme();
  const pattern = new RegExp(`(${traps.map(escapeRegExp).join('|')})`, 'gi');

  return (
    <ThemedText style={[Type.bodyStrong, { color: theme.ink }]}>
      {sentence.split(pattern).map((part, index) =>
        traps.some((trap) => trap.toLocaleLowerCase('tr') === part.toLocaleLowerCase('tr')) ? (
          <ThemedText
            // Split output is positional; the index is the only stable key here.
            key={`${part}-${index}`}
            style={[
              Type.bodyStrong,
              styles.trap,
              { backgroundColor: theme.claySoft, borderColor: theme.clay },
            ]}
          >
            {part}
          </ThemedText>
        ) : (
          part
        ),
      )}
    </ThemedText>
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const styles = StyleSheet.create({
  content: { paddingTop: Spacing.six },
  header: { alignItems: 'center', gap: 6 },
  check: {
    width: 42,
    height: 42,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: { textAlign: 'center' },
  card: {
    marginTop: Spacing.five,
    borderRadius: Radius.card,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  label: { letterSpacing: 0.8, textTransform: 'uppercase' },
  divider: { height: 1, marginVertical: Spacing.two },
  trap: {
    borderBottomWidth: 2,
    paddingHorizontal: 3,
  },
  why: {
    marginTop: Spacing.four,
    borderRadius: Radius.card,
    padding: 15,
    flexDirection: 'row',
    gap: Spacing.three,
    alignItems: 'flex-start',
  },
  whyText: { flex: 1 },
  trapTitle: { marginTop: Spacing.five },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: Spacing.two },
  chip: { borderRadius: Radius.chip, paddingVertical: 6, paddingHorizontal: 11 },
});
