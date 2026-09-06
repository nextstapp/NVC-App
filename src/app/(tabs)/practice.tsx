import { ScreenShell } from '@/components/screen-shell';

// ponytail: the handoff designs the tab bar but no Practice screen — this is the
// empty shell the tab needs; fill it when that design lands.
export default function PracticeScreen() {
  return <ScreenShell centered>{null}</ScreenShell>;
}
