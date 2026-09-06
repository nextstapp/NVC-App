import { StyleSheet, View } from 'react-native';

import { Size, type Tone } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function ProgressBar({ percent, tone }: { percent: number; tone: Tone }) {
  const theme = useTheme();

  return (
    <View style={[styles.track, { backgroundColor: theme.surface2 }]}>
      <View
        style={[
          styles.fill,
          { backgroundColor: theme[tone], width: `${Math.min(100, Math.max(0, percent))}%` },
        ]}
      />
    </View>
  );
}

/** The game top bar: one segment per round — done, current, still to come. */
export function RoundBar({ total, current }: { total: number; current: number }) {
  const theme = useTheme();

  return (
    <View style={styles.rounds}>
      {Array.from({ length: total }, (_, index) => {
        const round = index + 1;
        const color = round < current ? theme.sea : round === current ? theme.sun : theme.surface2;

        return <View key={round} style={[styles.segment, { backgroundColor: color }]} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: Size.progressBar,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: 3 },
  rounds: { flex: 1, flexDirection: 'row', gap: 4 },
  segment: { flex: 1, height: Size.progressBar, borderRadius: 3 },
});
