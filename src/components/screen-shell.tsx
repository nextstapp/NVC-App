import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, SafeArea, Size, Spacing, Type } from '@/constants/theme';
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
 * action area]. Content scrolls, the action never does.
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

  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>
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
          style={[styles.action, { borderTopColor: theme.line, paddingHorizontal: horizontal }]}
        >
          {action}
        </View>
      ) : null}
    </View>
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
          <ThemedText style={[Type.bodyStrong, { color: theme.ink }]}>‹</ThemedText>
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
    paddingBottom: SafeArea.bottom,
    gap: 9,
  },
  topBar: {
    paddingTop: SafeArea.top,
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
});
