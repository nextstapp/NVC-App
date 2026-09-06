/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useProfileStore } from '@/stores/use-profile-store';

/** Resolves the stored preference against the system scheme. */
export function useThemeName(): 'light' | 'dark' {
  const scheme = useColorScheme();
  const preference = useProfileStore((state) => state.themePreference);

  if (preference !== 'system') return preference;

  return scheme === 'dark' ? 'dark' : 'light';
}

export function useTheme() {
  return Colors[useThemeName()];
}
