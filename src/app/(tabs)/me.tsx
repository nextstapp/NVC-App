import { ScreenShell } from '@/components/screen-shell';

// ponytail: no "Me" screen in the handoff yet — shell only, so the tab renders.
export default function MeScreen() {
  return <ScreenShell centered>{null}</ScreenShell>;
}
