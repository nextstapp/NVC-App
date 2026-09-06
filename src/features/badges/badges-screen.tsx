import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenShell } from '@/components/screen-shell';
import { ThemedText } from '@/components/themed-text';
import { Radius, Shadow, Spacing, Type } from '@/constants/theme';
import { getCopy } from '@/content/nvc-content';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/use-profile-store';

export function BadgesScreen() {
  const theme = useTheme();
  const { locale, age, badges } = useProfileStore();
  const copy = getCopy(locale ?? 'tr', age ?? 12);

  if (badges.length > 0) {
    return (
      <ScreenShell contentStyle={styles.earnedContent}>
        <View style={styles.grid}>
          {badges.map((badge) => (
            <View key={badge} style={[styles.badge, { backgroundColor: theme.sun }, Shadow.card]}>
              <View style={[styles.badgeDot, { backgroundColor: theme.surface }]} />
              <ThemedText style={[Type.overline, { color: theme.onAccent }]}>{badge}</ThemedText>
            </View>
          ))}
        </View>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell centered>
      <View style={styles.empty}>
        <View style={[styles.ring, { borderColor: theme.line }]}>
          <View style={[styles.ringDot, { backgroundColor: theme.surface2 }]} />
        </View>
        <ThemedText style={[Type.feedbackTitle, styles.centerText, { color: theme.ink }]}>
          {copy.emptyTitle}
        </ThemedText>
        <ThemedText style={[Type.subtle, styles.centerText, styles.sub, { color: theme.ink2 }]}>
          {copy.emptySub}
        </ThemedText>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace('/(tabs)')}
          style={[styles.cta, { backgroundColor: theme.sea }]}
        >
          <ThemedText style={[Type.rowTitle, { color: theme.onAccent }]}>
            {copy.emptyCta}
          </ThemedText>
        </Pressable>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  earnedContent: { paddingTop: Spacing.six },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.three },
  badge: {
    width: 96,
    height: 96,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  badgeDot: { width: 26, height: 26, borderRadius: Radius.full },
  empty: { alignItems: 'center' },
  ring: {
    width: 84,
    height: 84,
    borderRadius: Radius.full,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.five,
  },
  ringDot: { width: 26, height: 26, borderRadius: Radius.full },
  centerText: { textAlign: 'center' },
  sub: { marginTop: 6, maxWidth: 250 },
  cta: {
    height: 46,
    borderRadius: Radius.info,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.five,
  },
});
