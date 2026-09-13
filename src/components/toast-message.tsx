import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  FadeOutDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Radius, Shadow, Size, Spacing, Type } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export const TOAST_DURATION = 2200;

type Props = { message: string; onDismiss: () => void };

/**
 * Neutral, never an error: dark ink surface with a sun lock glyph. Rises 10px in
 * over .22s and clears itself after 2.2s.
 */
export function ToastMessage({ message, onDismiss }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 220 });
    const timer = setTimeout(onDismiss, TOAST_DURATION);

    return () => clearTimeout(timer);
  }, [message, onDismiss, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 10 }],
  }));

  return (
    <Animated.View
      exiting={FadeOutDown}
      pointerEvents="none"
      style={[
        styles.wrapper,
        animatedStyle,
        { backgroundColor: theme.ink, bottom: Size.tabBar + insets.bottom + Spacing.two },
        Shadow.lifted,
      ]}
    >
      <View style={[styles.icon, { backgroundColor: theme.sun }]} />
      <ThemedText style={[Type.toast, { color: theme.bg }]}>{message}</ThemedText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 18,
    right: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Radius.info,
  },
  icon: { width: 18, height: 18, borderRadius: Radius.chip },
});
