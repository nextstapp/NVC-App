import { Pressable, StyleSheet, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Shadow, Size, Type, type Tone } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  label: string;
  onPress: () => void;
  /** `sea` for navigation, `clay` for game actions. Ignored when secondary. */
  tone?: Tone;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  small?: boolean;
  style?: ViewStyle;
};

export function NvcButton({
  label,
  onPress,
  tone = 'sea',
  variant = 'primary',
  disabled = false,
  small = false,
  style,
}: Props) {
  const theme = useTheme();
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isPrimary
          ? { backgroundColor: theme[tone], ...Shadow.card }
          : { backgroundColor: theme.surface, borderWidth: 1.5, borderColor: theme.line },
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <ThemedText
        style={[
          small ? Type.buttonLabelSmall : Type.buttonLabel,
          { color: isPrimary ? theme.onAccent : theme.ink },
        ]}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: Size.primaryButton,
    borderRadius: Radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Radius.button,
  },
  pressed: { opacity: 0.9 },
  disabled: { opacity: 0.45 },
});
