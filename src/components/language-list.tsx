import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Shadow, Size, Spacing, Type } from '@/constants/theme';
import { LANGUAGES, type Locale } from '@/content/nvc-content';
import { useTheme } from '@/hooks/use-theme';

/** The six project languages as radio rows. Onboarding and Settings share it. */
export function LanguageList({
  selected,
  onSelect,
}: {
  selected: Locale;
  onSelect: (locale: Locale) => void;
}) {
  const theme = useTheme();

  return (
    <View accessibilityRole="radiogroup" style={styles.list}>
      {LANGUAGES.map((language) => {
        const isSelected = language.locale === selected;

        return (
          <Pressable
            key={language.locale}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelect(language.locale)}
            style={[
              styles.row,
              {
                backgroundColor: theme.surface,
                borderColor: isSelected ? theme.sea : 'transparent',
              },
              isSelected && Shadow.card,
            ]}
          >
            <View
              style={[styles.code, { backgroundColor: theme.surface2, borderColor: theme.line }]}
            >
              <ThemedText style={[Type.mono, { color: theme.ink2 }]}>{language.code}</ThemedText>
            </View>
            <ThemedText style={[Type.bodyStrong, styles.name, { color: theme.ink }]}>
              {language.name}
            </ThemedText>
            <View
              style={[
                styles.radio,
                isSelected
                  ? { backgroundColor: theme.surface, borderColor: theme.sea }
                  : { backgroundColor: 'transparent', borderColor: theme.line },
              ]}
            >
              {isSelected ? (
                <View style={[styles.radioDot, { backgroundColor: theme.sea }]} />
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: 9 },
  row: {
    height: Size.languageRow,
    borderRadius: Radius.button,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: 14,
  },
  code: {
    width: 38,
    height: 28,
    borderRadius: Radius.sm,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { flex: 1 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Sea outline, surface ring, sea centre — the design's stacked inset rings.
  radioDot: { width: 10, height: 10, borderRadius: Radius.full },
});
