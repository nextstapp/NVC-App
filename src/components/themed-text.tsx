import { StyleSheet, Text, type TextProps } from 'react-native';

import { FontFamily, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'subtitle' | 'small' | 'bold' | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return <Text style={[{ color: theme[themeColor ?? 'text'] }, styles[type], style]} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FontFamily.regular,
  },
  bold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FontFamily.semiBold,
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FontFamily.medium,
  },
  subtitle: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: FontFamily.semiBold,
  },
  title: {
    fontSize: 36,
    lineHeight: 44,
    fontFamily: FontFamily.bold,
  },
  code: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: FontFamily.mono,
  },
});
