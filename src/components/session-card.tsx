import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Shadow, Spacing, Type, type ThemeColor } from '@/constants/theme';
import type { AppCopy, Badge } from '@/content/app-copy';
import type { Locale } from '@/content/nvc-content';
import { useTheme } from '@/hooks/use-theme';
import { formatPlayedAt, sessionSetup, teamScore } from '@/lib/session-format';
import type { GameSession } from '@/stores/use-sessions-store';

const BADGE_TONE: Record<Badge, { fill: ThemeColor; text: ThemeColor }> = {
  diamond: { fill: 'seaSoft', text: 'sea' },
  gold: { fill: 'sunSoft', text: 'sunText' },
  silver: { fill: 'surface2', text: 'ink2' },
  bronze: { fill: 'claySoft', text: 'clay' },
};

type Props = {
  session: GameSession;
  copy: AppCopy;
  locale: Locale;
  /** Rendered under the ranking, e.g. share / delete. */
  actions?: ReactNode;
};

/** A finished game: when, how it was set up, and the ranked teams. */
export function SessionCard({ session, copy, locale, actions }: Props) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.line },
        Shadow.card,
      ]}
    >
      <View>
        <ThemedText style={[Type.rowTitle, { color: theme.ink }]}>
          {formatPlayedAt(session.playedAt, locale)}
        </ThemedText>
        <ThemedText style={[Type.micro, { color: theme.ink2 }]}>
          {sessionSetup(session, copy)}
        </ThemedText>
      </View>

      <View style={styles.teams}>
        {session.teams.map((team, index) => {
          const tone = BADGE_TONE[team.badge];

          return (
            <View key={`${index}-${team.name}`} style={styles.team}>
              <ThemedText style={[Type.monoLarge, styles.rank, { color: theme.ink2 }]}>
                {index + 1}
              </ThemedText>
              <ThemedText
                numberOfLines={1}
                style={[Type.cardSentence, styles.name, { color: theme.ink }]}
              >
                {team.name}
              </ThemedText>
              <ThemedText style={[Type.micro, { color: theme.ink2 }]}>
                {teamScore(team, copy)}
              </ThemedText>
              <View style={[styles.badge, { backgroundColor: theme[tone.fill] }]}>
                <ThemedText style={[Type.small, { color: theme[tone.text] }]}>
                  {copy.badges[team.badge]}
                </ThemedText>
              </View>
            </View>
          );
        })}
      </View>

      {actions}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.panel,
    borderWidth: 1,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  teams: { gap: Spacing.two },
  team: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  rank: { minWidth: Spacing.four },
  name: { flex: 1 },
  badge: {
    borderRadius: Radius.chip,
    paddingVertical: 2,
    paddingHorizontal: Spacing.two,
  },
});
