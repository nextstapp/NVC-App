import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Switch, View } from 'react-native';

import { LanguageList } from '@/components/language-list';
import { ScreenShell } from '@/components/screen-shell';
import { ThemedText } from '@/components/themed-text';
import { Radius, Shadow, Size, Spacing, Type } from '@/constants/theme';
import { getAppCopy, type ThemeOption } from '@/content/app-copy';
import { AboutSection } from '@/features/settings/about-section';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/use-profile-store';
import { useSettingsStore } from '@/stores/use-settings-store';

const THEME_OPTIONS: ThemeOption[] = ['system', 'light', 'dark'];

export function SettingsScreen() {
  const theme = useTheme();
  const { locale, setLocale, themePreference, setThemePreference } = useProfileStore();
  const { soundEnabled, setSoundEnabled } = useSettingsStore();
  const copy = getAppCopy(locale);

  return (
    <ScreenShell contentStyle={styles.content}>
      <ThemedText style={[Type.sectionTitle, { color: theme.ink }]}>
        {copy.tabs.settings}
      </ThemedText>

      <Section title={copy.language}>
        <LanguageList selected={locale} onSelect={setLocale} />
      </Section>

      <View style={[styles.row, { backgroundColor: theme.surface }]}>
        <ThemedText style={[Type.bodyStrong, styles.rowLabel, { color: theme.ink }]}>
          {copy.sound}
        </ThemedText>
        <Switch
          accessibilityLabel={copy.sound}
          value={soundEnabled}
          onValueChange={setSoundEnabled}
          trackColor={{ true: theme.sea, false: theme.line }}
          thumbColor={theme.onAccent}
          ios_backgroundColor={theme.line}
        />
      </View>

      <Section title={copy.appearance}>
        <View
          accessibilityRole="radiogroup"
          style={[styles.segments, { backgroundColor: theme.surface2 }]}
        >
          {THEME_OPTIONS.map((option) => {
            const selected = option === themePreference;

            return (
              <Pressable
                key={option}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                onPress={() => setThemePreference(option)}
                style={[
                  styles.segment,
                  selected && [{ backgroundColor: theme.surface }, Shadow.card],
                ]}
              >
                <ThemedText style={[Type.small, { color: selected ? theme.ink : theme.ink2 }]}>
                  {copy.themes[option]}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>
      </Section>

      <Section title={copy.about}>
        <AboutSection copy={copy} locale={locale} />
      </Section>

      {__DEV__ ? <DevTools /> : null}
    </ScreenShell>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  const theme = useTheme();

  return (
    <View style={styles.section}>
      <ThemedText style={[Type.overline, { color: theme.ink2 }]}>{title}</ThemedText>
      {children}
    </View>
  );
}

/** Dev builds only: the Module 2 design reference and an onboarding reset. */
function DevTools() {
  const theme = useTheme();
  const reset = useProfileStore((state) => state.reset);

  return (
    <View style={[styles.dev, { backgroundColor: theme.claySoft, borderColor: theme.clay }]}>
      <Pressable onPress={() => router.push('/games/seeing-clearly/brief')}>
        <ThemedText style={[Type.small, { color: theme.clay }]}>
          DEV: Module 2 demo (Seeing Clearly)
        </ThemedText>
      </Pressable>
      <Pressable
        onPress={() => {
          reset();
          router.replace('/onboarding/language');
        }}
      >
        <ThemedText style={[Type.small, { color: theme.clay }]}>DEV: reset onboarding</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: Spacing.four, paddingBottom: Spacing.six, gap: Spacing.six },
  section: { gap: Spacing.three },
  row: {
    minHeight: Size.settingsRow,
    borderRadius: Radius.button,
    paddingHorizontal: Spacing.four,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  rowLabel: { flex: 1 },
  segments: { flexDirection: 'row', borderRadius: Radius.button, padding: Spacing.one },
  segment: {
    flex: 1,
    minHeight: Size.minTapTarget,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dev: {
    borderWidth: 1,
    borderRadius: Radius.chip,
    padding: Spacing.three,
    gap: Spacing.three,
  },
});
