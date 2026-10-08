import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Mascot } from '@/components/mascot';
import { NvcButton } from '@/components/nvc-button';
import { ScreenShell, TopBar } from '@/components/screen-shell';
import { ThemedText } from '@/components/themed-text';
import { FontFamily, Radius, Spacing, Type } from '@/constants/theme';
import { MODULES, ROUNDS_PER_SESSION, getCopy } from '@/content/nvc-content';
import { useGameStore } from '@/features/games/seeing-clearly/use-game-store';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/use-profile-store';

const MODULE = MODULES[1];

export function BriefScreen() {
  const theme = useTheme();
  const locale = useProfileStore((state) => state.locale);
  const startSession = useGameStore((state) => state.startSession);
  const copy = getCopy(locale);

  return (
    <ScreenShell
      horizontal={Spacing.five}
      topBar={
        <TopBar onBack={() => router.back()} horizontal={Spacing.five}>
          <ThemedText style={[Type.micro, { color: theme.ink2 }]}>
            {copy.moduleLabel} {Number(MODULE.no)} · {MODULE.name}
          </ThemedText>
        </TopBar>
      }
      contentStyle={styles.content}
      action={
        <NvcButton
          label={copy.start}
          tone="clay"
          onPress={() => {
            startSession();
            router.push('/games/seeing-clearly/match');
          }}
        />
      }
    >
      <View style={styles.center}>
        <Mascot size={92} kind="giraffe" />
        <ThemedText style={[Type.overline, styles.mascotLabel, { color: theme.ink2 }]}>
          {copy.mascotGiraffe}
        </ThemedText>
      </View>

      <View style={styles.bubbleWrapper}>
        <View style={[styles.arrow, { backgroundColor: theme.surface, borderColor: theme.line }]} />
        <View style={[styles.bubble, { backgroundColor: theme.surface, borderColor: theme.line }]}>
          <ThemedText style={[Type.rule, styles.centerText, { color: theme.ink }]}>
            {copy.rule}
          </ThemedText>
        </View>
      </View>

      <View style={[styles.quote, { backgroundColor: theme.sunSoft }]}>
        <ThemedText style={[Type.helper, styles.italic, { color: theme.ink }]}>
          “{copy.quote}”
        </ThemedText>
        <ThemedText style={[Type.overline, styles.quoteAuthor, { color: theme.ink2 }]}>
          {copy.quoteAuthor}
        </ThemedText>
      </View>

      <View style={styles.stats}>
        <Stat value={String(ROUNDS_PER_SESSION)} label={copy.briefRounds} />
        <Stat value="~3" label={copy.briefMinutes} />
        <Stat value="∞" label={copy.briefNoTimer} />
      </View>
    </ScreenShell>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  const theme = useTheme();

  return (
    <View style={[styles.stat, { borderColor: theme.line }]}>
      <ThemedText style={[Type.buttonLabel, { color: theme.ink }]}>{value}</ThemedText>
      <ThemedText style={[Type.micro, styles.centerText, { color: theme.ink2 }]}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 18 },
  center: { alignItems: 'center' },
  mascotLabel: { marginTop: Spacing.two },
  centerText: { textAlign: 'center' },
  bubbleWrapper: { marginTop: Spacing.four, alignItems: 'center' },
  // A 12px square rotated 45° reads as the bubble's tail.
  arrow: {
    width: 12,
    height: 12,
    transform: [{ rotate: '45deg' }],
    borderWidth: 1,
    marginBottom: -6,
    zIndex: 1,
  },
  bubble: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: Radius.panel,
    padding: 18,
  },
  quote: {
    marginTop: Spacing.four,
    borderRadius: Radius.button,
    paddingVertical: 14,
    paddingHorizontal: Spacing.four,
    gap: Spacing.two,
  },
  italic: { fontFamily: FontFamily.italic },
  quoteAuthor: {},
  stats: { flexDirection: 'row', gap: Spacing.two, marginTop: Spacing.four },
  stat: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 13,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
    alignItems: 'center',
    gap: 2,
  },
});
