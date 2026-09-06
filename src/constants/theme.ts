import { Platform, type TextStyle, type ViewStyle } from 'react-native';

// Design tokens for the NVC game (Erasmus+ KA220-SCH handoff).
// Every colour, font, spacing and radius used in the app is defined here and
// nowhere else. Dark mode is the same components with a different token set —
// warm dark greys, never pure black.
export const Colors = {
  light: {
    // Semantic aliases kept so ThemedText / ThemedView keep working.
    text: '#2E2A25',
    textSecondary: '#6B6157',
    background: '#F7F1E6',
    backgroundElement: '#FFFCF6',
    backgroundSelected: '#F1E8D8',

    // NVC palette.
    bg: '#F7F1E6',
    surface: '#FFFCF6',
    surface2: '#F1E8D8',
    ink: '#2E2A25',
    ink2: '#6B6157',
    line: '#E4D9C6',
    sun: '#E0B354',
    clay: '#C76D55',
    sea: '#4A6FA5',
    sunSoft: '#F8EDD5',
    claySoft: '#F7E2DA',
    seaSoft: '#E0E7F3',
    sunSoftLine: '#EBD9AF',
    claySoftLine: '#EBC9BC',
    seaSoftLine: '#C6D3E7',
    onAccent: '#FFFFFF',
  },
  dark: {
    text: '#F3EDE2',
    textSecondary: '#AFA496',
    background: '#221F1B',
    backgroundElement: '#2C2823',
    backgroundSelected: '#38322B',

    bg: '#221F1B',
    surface: '#2C2823',
    surface2: '#38322B',
    ink: '#F3EDE2',
    ink2: '#AFA496',
    line: '#413A32',
    sun: '#E8C071',
    clay: '#D98369',
    sea: '#7F9FD4',
    sunSoft: '#3A3226',
    claySoft: '#3B2B26',
    seaSoft: '#26303F',
    // The handoff only specifies soft borders for light mode; in dark the soft
    // fills sit on `line` so the card edge stays visible without a red-ish rim.
    sunSoftLine: '#4C4130',
    claySoftLine: '#4D3830',
    seaSoftLine: '#33415A',
    onAccent: '#FFFFFF',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/** The three mascot/section tones. Each has a solid, a soft fill and a soft border. */
export type Tone = 'sun' | 'clay' | 'sea';

export const ToneSoft: Record<Tone, ThemeColor> = {
  sun: 'sunSoft',
  clay: 'claySoft',
  sea: 'seaSoft',
};

export const ToneSoftLine: Record<Tone, ThemeColor> = {
  sun: 'sunSoftLine',
  clay: 'claySoftLine',
  sea: 'seaSoftLine',
};

// Nunito for everything, IBM Plex Mono for counters and codes.
// Static font files: pick weight via family name, never via fontWeight.
export const FontFamily = {
  regular: 'Nunito_400Regular',
  italic: 'Nunito_400Regular_Italic',
  semiBold: 'Nunito_600SemiBold',
  bold: 'Nunito_700Bold',
  extraBold: 'Nunito_800ExtraBold',
  mono: 'IBMPlexMono_500Medium',
  monoSemiBold: 'IBMPlexMono_600SemiBold',
} as const;

export const Spacing = {
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 20,
  six: 24,
} as const;

export const Radius = {
  xs: 5,
  sm: 7,
  chip: 10,
  box: 11,
  pill: 12,
  info: 14,
  icon: 15,
  button: 16,
  card: 18,
  panel: 20,
  full: 9999,
} as const;

/** Fixed sizes the handoff calls out explicitly. */
export const Size = {
  primaryButton: 54,
  backButton: 36,
  languageRow: 62,
  ageCard: 112,
  moduleRow: 86,
  minTapTarget: 44,
  progressBar: 5,
} as const;

export const SafeArea = {
  top: 60,
  bottom: 28,
} as const;

// RN has no box-shadow: the CSS shadows become elevation + iOS shadow props.
export const Shadow: Record<'card' | 'lifted', ViewStyle> = {
  card: Platform.select({
    ios: {
      shadowColor: '#503C1E',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 10,
    },
    default: { elevation: 2 },
  }) as ViewStyle,
  lifted: Platform.select({
    ios: {
      shadowColor: '#503C1E',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.14,
      shadowRadius: 18,
    },
    default: { elevation: 6 },
  }) as ViewStyle,
};

/**
 * The handoff type ramp, keyed by role. Sizes and line heights are literal —
 * boxes flex around them so the longer DE/PT translations still fit.
 */
export const Type = {
  ageNumber: { fontSize: 38, lineHeight: 38, fontFamily: FontFamily.extraBold },
  onboardingTitle: { fontSize: 25, lineHeight: 29, fontFamily: FontFamily.extraBold },
  badgeTitle: { fontSize: 23, lineHeight: 28, fontFamily: FontFamily.extraBold },
  sectionTitle: { fontSize: 20, lineHeight: 26, fontFamily: FontFamily.extraBold },
  rule: { fontSize: 19.5, lineHeight: 25, fontFamily: FontFamily.extraBold },
  feedbackTitle: { fontSize: 19, lineHeight: 25, fontFamily: FontFamily.extraBold },
  gameTitle: { fontSize: 17.5, lineHeight: 22, fontFamily: FontFamily.extraBold },
  buttonLabel: { fontSize: 17, lineHeight: 22, fontFamily: FontFamily.extraBold },
  bodyStrong: { fontSize: 16, lineHeight: 23, fontFamily: FontFamily.bold },
  buttonLabelSmall: { fontSize: 15.5, lineHeight: 20, fontFamily: FontFamily.extraBold },
  rowTitle: { fontSize: 15, lineHeight: 20, fontFamily: FontFamily.extraBold },
  cardSentence: { fontSize: 14.5, lineHeight: 20, fontFamily: FontFamily.bold },
  subtle: { fontSize: 14.5, lineHeight: 21, fontFamily: FontFamily.regular },
  note: { fontSize: 13.5, lineHeight: 20, fontFamily: FontFamily.regular },
  toast: { fontSize: 13.5, lineHeight: 18, fontFamily: FontFamily.bold },
  helper: { fontSize: 13, lineHeight: 19, fontFamily: FontFamily.regular },
  zoneTitle: { fontSize: 13, lineHeight: 17, fontFamily: FontFamily.extraBold },
  micro: { fontSize: 12.5, lineHeight: 18, fontFamily: FontFamily.semiBold },
  small: { fontSize: 12, lineHeight: 16, fontFamily: FontFamily.bold },
  overline: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: FontFamily.bold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  tabLabel: { fontSize: 10.5, lineHeight: 14, fontFamily: FontFamily.extraBold },
  mono: { fontSize: 11, lineHeight: 14, fontFamily: FontFamily.monoSemiBold },
  monoLarge: { fontSize: 13, lineHeight: 16, fontFamily: FontFamily.monoSemiBold },
} satisfies Record<string, TextStyle>;

export const MaxContentWidth = 800;
