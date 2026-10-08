import { router } from 'expo-router';
import { Alert, Pressable, Share, StyleSheet, View } from 'react-native';

import { NvcButton } from '@/components/nvc-button';
import { ScreenShell } from '@/components/screen-shell';
import { SessionCard } from '@/components/session-card';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing, Type } from '@/constants/theme';
import { BRAND, GAME_MODULE_NAME, getAppCopy, type AppCopy } from '@/content/app-copy';
import type { Locale } from '@/content/nvc-content';
import { useTheme } from '@/hooks/use-theme';
import { formatPlayedAt, sessionSetup, teamScore } from '@/lib/session-format';
import { useProfileStore } from '@/stores/use-profile-store';
import { useSessionsStore, type GameSession } from '@/stores/use-sessions-store';

function shareText(session: GameSession, copy: AppCopy, locale: Locale): string {
  return [
    `${copy.gameTitle} — ${copy.module} 3 · ${GAME_MODULE_NAME}`,
    formatPlayedAt(session.playedAt, locale),
    sessionSetup(session, copy),
    '',
    ...session.teams.map(
      (team, index) =>
        `${index + 1}. ${team.name} — ${teamScore(team, copy)} · ${copy.badges[team.badge]}`,
    ),
    '',
    `${BRAND} · eunvcgames.com`,
  ].join('\n');
}

export function SessionsScreen() {
  const theme = useTheme();
  const locale = useProfileStore((state) => state.locale);
  const { sessions, removeSession, clearSessions } = useSessionsStore();
  const copy = getAppCopy(locale);

  const confirm = (title: string, onConfirm: () => void) =>
    Alert.alert(title, copy.undoneNote, [
      { text: copy.cancel, style: 'cancel' },
      { text: copy.delete, style: 'destructive', onPress: onConfirm },
    ]);

  if (sessions.length === 0) {
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
            {copy.emptyBody}
          </ThemedText>
          <NvcButton
            tone="clay"
            label={copy.play}
            style={styles.cta}
            onPress={() => router.push('/games/duygu-avcisi')}
          />
        </View>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell contentStyle={styles.content}>
      <View style={styles.titleRow}>
        <ThemedText style={[Type.sectionTitle, { color: theme.ink }]}>
          {copy.tabs.sessions}
        </ThemedText>
        <Pressable
          accessibilityRole="button"
          hitSlop={Spacing.three}
          onPress={() => confirm(copy.clearTitle, clearSessions)}
        >
          <ThemedText style={[Type.small, { color: theme.clay }]}>{copy.clearAll}</ThemedText>
        </Pressable>
      </View>

      {sessions.map((session) => (
        <SessionCard
          key={session.playedAt}
          session={session}
          copy={copy}
          locale={locale}
          actions={
            <View style={[styles.actions, { borderTopColor: theme.line }]}>
              <TextButton
                label={copy.share}
                color={theme.sea}
                onPress={() => Share.share({ message: shareText(session, copy, locale) })}
              />
              <TextButton
                label={copy.delete}
                color={theme.clay}
                onPress={() => confirm(copy.deleteTitle, () => removeSession(session.playedAt))}
              />
            </View>
          }
        />
      ))}
    </ScreenShell>
  );
}

function TextButton({
  label,
  color,
  onPress,
}: {
  label: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.textButton, pressed && styles.pressed]}
    >
      <ThemedText style={[Type.small, { color }]}>{label}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: Spacing.four, paddingBottom: Spacing.six, gap: Spacing.three },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: Spacing.one,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.two,
    borderTopWidth: 1,
    paddingTop: Spacing.two,
  },
  textButton: {
    minHeight: 36,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.chip,
    justifyContent: 'center',
  },
  pressed: { opacity: 0.6 },
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
  sub: { marginTop: 6, maxWidth: 300 },
  cta: { marginTop: Spacing.five, paddingHorizontal: Spacing.six * 2 },
});
