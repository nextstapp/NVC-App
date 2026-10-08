import Constants from 'expo-constants';
import { Image, Linking, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { AspectRatio, Radius, Size, Spacing, Type } from '@/constants/theme';
import { PROGRAMME, PROJECT_NAME, SITE_URL, type AppCopy, type Country } from '@/content/app-copy';
import type { Locale } from '@/content/nvc-content';
import { useTheme, useThemeName } from '@/hooks/use-theme';

// Official names from the project website; they are not translated.
const COORDINATOR = { name: 'Kastamonu University', country: 'TR' as Country };
const PARTNERS: { name: string; country: Country }[] = [
  { name: 'Kastamonu Provincial Directorate of National Education (Kastamonu MEM)', country: 'TR' },
  { name: 'Nextstapp UG', country: 'DE' },
  { name: 'Arte e Cultura Sociale', country: 'IT' },
  { name: 'Kohtla-Järve Iidla Põhikool', country: 'EE' },
  { name: 'Associação de Jardins-Escolas João de Deus', country: 'PT' },
];

export function AboutSection({ copy, locale }: { copy: AppCopy; locale: Locale }) {
  const theme = useTheme();
  const dark = useThemeName() === 'dark';

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <View style={styles.block}>
        <ThemedText style={[Type.bodyStrong, { color: theme.ink }]}>{PROJECT_NAME}</ThemedText>
        <ThemedText style={[Type.mono, { color: theme.ink2 }]}>{PROGRAMME}</ThemedText>
      </View>

      <View style={styles.block}>
        <ThemedText style={[Type.overline, { color: theme.ink2 }]}>{copy.coordinator}</ThemedText>
        <Org name={COORDINATOR.name} country={copy.countries[COORDINATOR.country]} />
      </View>

      <View style={styles.block}>
        <ThemedText style={[Type.overline, { color: theme.ink2 }]}>{copy.partners}</ThemedText>
        {PARTNERS.map((partner) => (
          <Org key={partner.name} name={partner.name} country={copy.countries[partner.country]} />
        ))}
      </View>

      <ThemedText style={[Type.note, { color: theme.ink }]}>{copy.gameCredit}</ThemedText>

      <View style={styles.links}>
        <Link label={copy.website} url={`${SITE_URL}/${locale}/`} />
        <Link label={copy.privacy} url={`${SITE_URL}/${locale}/privacy-policy`} />
      </View>

      <View style={[styles.block, styles.eu, { borderTopColor: theme.line }]}>
        <Image
          source={
            dark
              ? require('@/assets/images/eu-cofunded-neg.png')
              : require('@/assets/images/eu-cofunded-pos.png')
          }
          style={styles.euLogo}
          resizeMode="contain"
          accessibilityLabel={copy.fundedBy}
        />
        <ThemedText style={[Type.note, { color: theme.ink }]}>{copy.fundedBy}</ThemedText>
        <ThemedText style={[Type.helper, { color: theme.ink2 }]}>{copy.euDisclaimer}</ThemedText>
      </View>

      <ThemedText style={[Type.mono, { color: theme.ink2 }]}>
        {copy.version} {Constants.expoConfig?.version}
      </ThemedText>
    </View>
  );
}

function Org({ name, country }: { name: string; country: string }) {
  const theme = useTheme();

  return (
    <ThemedText style={[Type.note, { color: theme.ink }]}>
      {name} <ThemedText style={[Type.note, { color: theme.ink2 }]}>· {country}</ThemedText>
    </ThemedText>
  );
}

function Link({ label, url }: { label: string; url: string }) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="link"
      onPress={() => Linking.openURL(url)}
      style={({ pressed }) => [
        styles.link,
        { backgroundColor: theme.seaSoft },
        pressed && styles.pressed,
      ]}
    >
      <ThemedText style={[Type.small, { color: theme.sea }]}>{label}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.panel,
    borderWidth: 1,
    padding: Spacing.four,
    gap: Spacing.four,
  },
  block: { gap: Spacing.one },
  links: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  link: {
    minHeight: Size.minTapTarget,
    paddingHorizontal: Spacing.four,
    borderRadius: Radius.pill,
    justifyContent: 'center',
  },
  pressed: { opacity: 0.7 },
  eu: { borderTopWidth: 1, paddingTop: Spacing.four, gap: Spacing.two },
  euLogo: { width: Size.euLogoWidth, height: undefined, aspectRatio: AspectRatio.euLogo },
});
