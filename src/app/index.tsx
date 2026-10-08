import { Redirect } from 'expo-router';

import { useProfileStore } from '@/stores/use-profile-store';

export default function Index() {
  const { onboarded, hydrated } = useProfileStore();

  // Nothing to show until the persisted profile is back; the splash screen is
  // still up at this point.
  if (!hydrated) return null;

  return <Redirect href={onboarded ? '/(tabs)' : '/onboarding/language'} />;
}
