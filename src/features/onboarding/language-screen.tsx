import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { NvcButton } from '@/components/nvc-button';
import { ScreenShell } from '@/components/screen-shell';
import { ThemedText } from '@/components/themed-text';
import { Radius, Shadow, Size, Spacing, Type } from '@/constants/theme';
import { LANGUAGES, getCopy } from '@/content/nvc-content';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/use-profile-store';

export function LanguageScreen() {
  const theme = useTheme();
  const { locale: selected, setLocale } = useProfileStore();
  const copy = getCopy(selected, 12);

  return (
    <ScreenShell
      contentStyle={styles.content}
      action={<NvcButton label={copy.next} onPress={() => router.push('/onboarding/age')} />}
    >
      <View style={styles.header}>
        <Image source={require('@/assets/images/logo-emblem.png')} style={styles.logo} />
        <ThemedText style={[Type.overline, styles.brand, { color: theme.ink2 }]}>
          NVC-Game
        </ThemedText>
        <ThemedText style={[Type.onboardingTitle, styles.centerText, { color: theme.ink }]}>
          {copy.langTitle}
        </ThemedText>
        <ThemedText style={[Type.subtle, styles.centerText, styles.sub, { color: theme.ink2 }]}>
          {copy.langSub}
        </ThemedText>
      </View>

      <View style={styles.list}>
        {LANGUAGES.map((language) => {
          const isSelected = language.locale === selected;

          return (
            <Pressable
              key={language.locale}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              onPress={() => setLocale(language.locale)}
              style={[
                styles.row,
                {
                  backgroundColor: theme.surface,
                  borderColor: isSelected ? theme.sea : 'transparent',
                },
                isSelected && Shadow.card,
              ]}
            >
              <View
                style={[styles.code, { backgroundColor: theme.surface2, borderColor: theme.line }]}
              >
                <ThemedText style={[Type.mono, { color: theme.ink2 }]}>{language.code}</ThemedText>
              </View>
              <ThemedText style={[Type.bodyStrong, styles.name, { color: theme.ink }]}>
                {language.name}
              </ThemedText>
              <View
                style={[
                  styles.radio,
                  isSelected
                    ? { backgroundColor: theme.surface, borderColor: theme.sea }
                    : { backgroundColor: 'transparent', borderColor: theme.line },
                ]}
              >
                {isSelected ? (
                  <View style={[styles.radioDot, { backgroundColor: theme.sea }]} />
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  // The list is pinned to the bottom so it never shifts when the header copy
  // changes length across locales; the header floats centred in the space above.
  content: { flexGrow: 1 },
  header: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: { width: Size.logo, height: Size.logo },
  brand: { marginTop: 14 },
  centerText: { textAlign: 'center' },
  sub: { marginTop: Spacing.two, maxWidth: 280 },
  list: { gap: 9, marginTop: 22 },
  row: {
    height: Size.languageRow,
    borderRadius: Radius.button,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: 14,
  },
  code: {
    width: 38,
    height: 28,
    borderRadius: Radius.sm,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { flex: 1 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Sea outline, surface ring, sea centre — the design's stacked inset rings.
  radioDot: { width: 10, height: 10, borderRadius: Radius.full },
});
