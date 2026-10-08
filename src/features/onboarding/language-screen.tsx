import { router } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';

import { LanguageList } from '@/components/language-list';
import { NvcButton } from '@/components/nvc-button';
import { ScreenShell } from '@/components/screen-shell';
import { ThemedText } from '@/components/themed-text';
import { Size, Spacing, Type } from '@/constants/theme';
import { BRAND, getAppCopy } from '@/content/app-copy';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/use-profile-store';

export function LanguageScreen() {
  const theme = useTheme();
  const { locale, setLocale, completeOnboarding } = useProfileStore();
  const copy = getAppCopy(locale);

  return (
    <ScreenShell
      contentStyle={styles.content}
      action={
        <NvcButton
          label={copy.next}
          onPress={() => {
            completeOnboarding();
            router.replace('/(tabs)');
          }}
        />
      }
    >
      <View style={styles.header}>
        <Image source={require('@/assets/images/logo-emblem.png')} style={styles.logo} />
        <ThemedText style={[Type.overline, styles.brand, { color: theme.ink2 }]}>
          {BRAND}
        </ThemedText>
        <ThemedText style={[Type.onboardingTitle, styles.centerText, { color: theme.ink }]}>
          {copy.langTitle}
        </ThemedText>
        <ThemedText style={[Type.subtle, styles.centerText, styles.sub, { color: theme.ink2 }]}>
          {copy.langSub}
        </ThemedText>
      </View>

      <View style={styles.list}>
        <LanguageList selected={locale} onSelect={setLocale} />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  // The list is pinned to the bottom so it never shifts when the header copy
  // changes length across locales; the header floats centred in the space above.
  content: { flexGrow: 1 },
  header: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: Spacing.four },
  logo: { width: Size.logo, height: Size.logo },
  brand: { marginTop: 14 },
  centerText: { textAlign: 'center' },
  sub: { marginTop: Spacing.two, maxWidth: 320 },
  list: { marginTop: 22 },
});
