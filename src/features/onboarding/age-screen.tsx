import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { NvcButton } from '@/components/nvc-button';
import { ScreenShell, TopBar } from '@/components/screen-shell';
import { ThemedText } from '@/components/themed-text';
import { Radius, Shadow, Size, Spacing, Type } from '@/constants/theme';
import { AGES, getCopy, type Age } from '@/content/nvc-content';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/use-profile-store';

export function AgeScreen() {
  const theme = useTheme();
  const locale = useProfileStore((state) => state.locale) ?? 'tr';
  const setAge = useProfileStore((state) => state.setAge);
  const [selected, setSelected] = useState<Age>(12);
  const copy = getCopy(locale, selected);

  return (
    <ScreenShell
      topBar={
        <TopBar onBack={() => router.back()}>
          <View style={styles.steps}>
            <View style={[styles.step, { backgroundColor: theme.sea }]} />
            <View style={[styles.step, { backgroundColor: theme.sea }]} />
          </View>
          <ThemedText style={[Type.mono, { color: theme.ink2 }]}>2/2</ThemedText>
        </TopBar>
      }
      contentStyle={styles.content}
      action={
        <NvcButton
          label={copy.next}
          onPress={() => {
            setAge(selected);
            router.replace('/(tabs)');
          }}
        />
      }
    >
      <ThemedText style={[Type.onboardingTitle, { color: theme.ink }]}>{copy.ageTitle}</ThemedText>
      <ThemedText style={[Type.subtle, styles.sub, { color: theme.ink2 }]}>
        {copy.ageSub}
      </ThemedText>

      <View style={styles.grid}>
        {AGES.map((age) => {
          const isSelected = age === selected;

          return (
            <Pressable
              key={age}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              onPress={() => setSelected(age)}
              style={[
                styles.card,
                {
                  backgroundColor: isSelected ? theme.sunSoft : theme.surface,
                  borderColor: isSelected ? theme.sun : theme.line,
                  borderWidth: isSelected ? 2 : 1.5,
                },
                isSelected && [Shadow.lifted, styles.lifted],
              ]}
            >
              <ThemedText style={[Type.ageNumber, { color: theme.ink }]}>{age}</ThemedText>
              <ThemedText style={[Type.micro, { color: theme.ink2 }]}>
                {copy.ageHints[age]}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>

      <View style={[styles.note, { backgroundColor: theme.seaSoft }]}>
        <View style={[styles.dot, { backgroundColor: theme.sea }]} />
        <ThemedText style={[Type.micro, styles.noteText, { color: theme.ink2 }]}>
          {copy.ageNote}
        </ThemedText>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 26 },
  steps: { flex: 1, flexDirection: 'row', gap: Spacing.two },
  step: { flex: 1, height: Size.progressBar, borderRadius: 3 },
  sub: { marginTop: Spacing.two },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 11,
    marginTop: Spacing.five,
  },
  card: {
    // Two per row, gap 11 — the percentage keeps both columns equal as text grows.
    width: '47.5%',
    flexGrow: 1,
    minHeight: Size.ageCard,
    borderRadius: Radius.panel,
    paddingVertical: Spacing.four,
    paddingHorizontal: 14,
    justifyContent: 'space-between',
  },
  lifted: { transform: [{ translateY: -2 }] },
  note: {
    marginTop: Spacing.four,
    borderRadius: Radius.info,
    paddingVertical: 13,
    paddingHorizontal: 14,
    flexDirection: 'row',
    gap: Spacing.three,
  },
  dot: { width: 7, height: 7, borderRadius: Radius.full, marginTop: 5 },
  noteText: { flex: 1 },
});
