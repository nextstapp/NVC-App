import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Radius, Size, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Four shimmering placeholder rows — no spinner, per the handoff. */
export function ModuleSkeleton() {
  const theme = useTheme();
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(withTiming(1, { duration: 1300, easing: Easing.linear }), -1, false);
  }, [shimmer]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -300 + shimmer.value * 600 }],
  }));

  return (
    <View style={styles.list}>
      {[0, 1, 2, 3].map((row) => (
        <View
          key={row}
          style={[styles.row, { backgroundColor: theme.surface, borderColor: theme.line }]}
        >
          <View style={[styles.icon, { backgroundColor: theme.surface2 }]} />
          <View style={styles.lines}>
            <View style={[styles.line, styles.lineWide, { backgroundColor: theme.surface2 }]} />
            <View style={[styles.line, { backgroundColor: theme.surface2 }]} />
          </View>
          <Animated.View style={[styles.shine, animatedStyle, { backgroundColor: theme.bg }]} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: 10 },
  row: {
    height: Size.moduleRow,
    borderRadius: Radius.panel,
    borderWidth: 1.5,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    overflow: 'hidden',
  },
  icon: { width: 46, height: 46, borderRadius: Radius.icon },
  lines: { flex: 1, gap: Spacing.two },
  line: { height: 10, borderRadius: Radius.xs, width: '55%' },
  lineWide: { width: '80%' },
  shine: { position: 'absolute', top: 0, bottom: 0, width: 90, opacity: 0.5 },
});
