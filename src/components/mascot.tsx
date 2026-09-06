import { StyleSheet, View } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props = { size: number; kind: 'giraffe' | 'coyote' };

/**
 * Placeholder mascots: the giraffe is a sun circle with clay spots, the coyote a
 * rotated clay diamond. Real illustrations drop into the same 26 / 76 / 92 px
 * boxes without any layout change.
 */
export function Mascot({ size, kind }: Props) {
  const theme = useTheme();

  if (kind === 'coyote') {
    return (
      <View
        style={[
          styles.diamond,
          {
            width: size,
            height: size,
            backgroundColor: theme.clay,
            borderRadius: Math.max(Radius.xs, size * 0.16),
          },
        ]}
      />
    );
  }

  const spot = Math.max(3, size * 0.13);

  return (
    <View style={[styles.circle, { width: size, height: size, backgroundColor: theme.sun }]}>
      <View
        style={[
          styles.spot,
          {
            width: spot,
            height: spot,
            backgroundColor: theme.clay,
            top: size * 0.26,
            left: size * 0.26,
          },
        ]}
      />
      <View
        style={[
          styles.spot,
          {
            width: spot,
            height: spot,
            backgroundColor: theme.clay,
            top: size * 0.2,
            right: size * 0.24,
          },
        ]}
      />
      <View
        style={[
          styles.spot,
          {
            width: spot,
            height: spot,
            backgroundColor: theme.clay,
            bottom: size * 0.24,
            left: size * 0.42,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { borderRadius: Radius.full },
  diamond: { transform: [{ rotate: '45deg' }] },
  spot: { position: 'absolute', borderRadius: Radius.full },
});
