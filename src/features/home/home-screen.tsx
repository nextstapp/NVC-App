import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { NvcButton } from '@/components/nvc-button';
import { ScreenShell } from '@/components/screen-shell';
import { SessionCard } from '@/components/session-card';
import { ThemedText } from '@/components/themed-text';
import { AspectRatio, Radius, Shadow, Size, Spacing, Type } from '@/constants/theme';
import { BRAND, GAME_MODULE_NAME, getAppCopy } from '@/content/app-copy';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/use-profile-store';
import { useSessionsStore } from '@/stores/use-sessions-store';

export function HomeScreen() {
  const theme = useTheme();
  const locale = useProfileStore((state) => state.locale);
  const latest = useSessionsStore((state) => state.sessions[0]);
  const copy = getAppCopy(locale);

  return (
    <ScreenShell topBar={<Header tagline={copy.tagline} />} contentStyle={styles.content}>
      <View
        style={[
          styles.card,
          { backgroundColor: theme.surface, borderColor: theme.line },
          Shadow.card,
        ]}
      >
        <Image
          source={require('@/assets/images/duygu-avcisi-cover.jpg')}
          style={styles.cover}
          accessibilityIgnoresInvertColors
        />
        <View style={styles.body}>
          <ThemedText style={[Type.overline, { color: theme.clay }]}>
            {copy.module} 3 · {GAME_MODULE_NAME}
          </ThemedText>
          <ThemedText style={[Type.sectionTitle, { color: theme.ink }]}>
            {copy.gameTitle}
          </ThemedText>
          <ThemedText style={[Type.subtle, { color: theme.ink2 }]}>{copy.gameDesc}</ThemedText>
          <View style={[styles.hint, { backgroundColor: theme.seaSoft }]}>
            <View style={[styles.dot, { backgroundColor: theme.sea }]} />
            <ThemedText style={[Type.micro, styles.hintText, { color: theme.ink2 }]}>
              {copy.gameHint}
            </ThemedText>
          </View>
          <NvcButton
            tone="clay"
            label={copy.play}
            onPress={() => router.push('/games/duygu-avcisi')}
          />
        </View>
      </View>

      {latest ? (
        <View style={styles.latest}>
          <View style={styles.sectionRow}>
            <ThemedText style={[Type.rowTitle, { color: theme.ink }]}>
              {copy.lastSession}
            </ThemedText>
            <Pressable
              accessibilityRole="link"
              hitSlop={Spacing.three}
              onPress={() => router.navigate('/sessions')}
            >
              <ThemedText style={[Type.small, { color: theme.sea }]}>{copy.allSessions}</ThemedText>
            </Pressable>
          </View>
          <SessionCard session={latest} copy={copy} locale={locale} />
        </View>
      ) : null}
    </ScreenShell>
  );
}

function Header({ tagline }: { tagline: string }) {
  const theme = useTheme();

  return (
    <View style={styles.header}>
      <Image source={require('@/assets/images/logo-emblem.png')} style={styles.logo} />
      <View>
        <ThemedText style={[Type.rowTitle, { color: theme.ink }]}>{BRAND}</ThemedText>
        <ThemedText style={[Type.micro, { color: theme.ink2 }]}>{tagline}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Spacing.three,
    paddingBottom: Spacing.three,
    paddingHorizontal: Spacing.five + 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  logo: { width: Size.headerLogo, height: Size.headerLogo },
  content: { paddingTop: Spacing.two, paddingBottom: Spacing.six, gap: Spacing.six },
  // Wraps: cover on top on phones, cover beside the text on tablets and in landscape.
  card: {
    borderRadius: Radius.panel,
    borderWidth: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cover: { flexGrow: 1, flexBasis: 320, alignSelf: 'flex-start', aspectRatio: AspectRatio.cover },
  body: { flexGrow: 1, flexBasis: 300, padding: Spacing.four + 2, gap: Spacing.three },
  hint: {
    borderRadius: Radius.info,
    paddingVertical: Spacing.three,
    paddingHorizontal: 14,
    flexDirection: 'row',
    gap: Spacing.three,
  },
  dot: { width: 7, height: 7, borderRadius: Radius.full, marginTop: 6 },
  hintText: { flex: 1 },
  latest: { gap: Spacing.three },
  sectionRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },
});
