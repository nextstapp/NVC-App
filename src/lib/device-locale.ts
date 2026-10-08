import { LOCALES, type Locale } from '@/content/nvc-content';

/**
 * Best-guess app locale from the device language, used as the pre-selected
 * option on the language screen. Hermes' Intl reports the OS locale as a BCP 47
 * tag such as "tr-TR" or "et-EE".
 */
export function deviceLocale(): Locale {
  const lang = Intl.DateTimeFormat().resolvedOptions().locale.split('-')[0].toLowerCase();

  return (LOCALES as readonly string[]).includes(lang) ? (lang as Locale) : 'en';
}
