import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Radius, Size, Spacing, Type } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  children: ReactNode;
  /** Rendered above the scroll area, inside the top safe-area padding. */
  topBar?: ReactNode;
  /** Pinned below the scroll area with a hairline separator. */
  action?: ReactNode;
  horizontal?: number;
  centered?: boolean;
  contentStyle?: ViewStyle;
};

/**
 * Every screen is the same skeleton: [top bar] + [scrollable content] + [pinned
 * action area]. Content scrolls, the action never does. The shell owns the safe
 * area: top/side insets on the root, the bottom inset under the action area (a
 * tab bar covers the bottom on screens without one).
 */
export function ScreenShell({
  children,
  topBar,
  action,
  horizontal = Spacing.five + 2,
  centered = false,
  contentStyle,
}: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.root, { backgroundColor: theme.bg }]}
    >
      {topBar}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          { paddingHorizontal: horizontal, paddingBottom: Spacing.two },
          centered && styles.centered,
          contentStyle,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      {action ? (
        <View
          style={[
            styles.action,
            {
              borderTopColor: theme.line,
              paddingHorizontal: horizontal,
              paddingBottom: Math.max(insets.bottom, Spacing.three),
            },
          ]}
        >
          {action}
        </View>
      ) : null}
    </SafeAreaView>
  );
}

type TopBarProps = {
  onBack?: () => void;
  children?: ReactNode;
  horizontal?: number;
};

export function TopBar({ onBack, children, horizontal = Spacing.five + 2 }: TopBarProps) {
  const theme = useTheme();

  return (
    <View style={[styles.topBar, { paddingHorizontal: horizontal }]}>
      {onBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Geri"
          onPress={onBack}
          hitSlop={Spacing.two}
          style={[styles.back, { borderColor: theme.line }]}
        >
          <ThemedText style={[Type.onboardingTitle, styles.backGlyph, { color: theme.ink }]}>
            ‹
          </ThemedText>
        </Pressable>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  centered: { flexGrow: 1, justifyContent: 'center' },
  action: {
    borderTopWidth: 1,
    paddingTop: Spacing.three,
    gap: 9,
  },
  topBar: {
    paddingTop: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  back: {
    width: Size.backButton,
    height: Size.backButton,
    borderRadius: Radius.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Optical centre: the chevron glyph sits low in its box.
  backGlyph: { marginTop: -Spacing.one },
});
