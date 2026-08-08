# NVC App

Mobile app for the NVC project, built with [Expo](https://expo.dev) SDK 57 (React Native 0.86, React 19.2, New Architecture). Local-only: no backend.

## Get started

```bash
npm install
npx expo start
```

Then open on an Android emulator, iOS simulator, physical device via [Expo Go](https://expo.dev/go), or a [development build](https://docs.expo.dev/develop/development-builds/introduction/).

## Scripts

```bash
npm start            # expo start
npm run android      # expo start --android
npm run ios          # expo start --ios
npm run web          # expo start --web
npm run lint         # eslint (eslint-config-expo + prettier)
npm run typecheck    # tsc --noEmit (strict)
npm run format       # prettier --write .
```

## Structure

```
src/
  app/          # Screens — Expo Router file-based routing (typed routes enabled)
  components/   # Reusable UI primitives (ThemedText, ThemedView, …)
  constants/    # theme.ts — design tokens: Colors, FontFamily, Spacing, Radius
  hooks/        # use-theme, use-color-scheme
assets/         # App icons, splash
```

## Conventions

- **Design tokens only** — every color, spacing, radius, and font comes from `src/constants/theme.ts`. No hardcoded values in components; this keeps the UI consistent and restylable from one file.
- **Identical look on iOS and Android** — Inter is bundled via `@expo-google-fonts/inter` and used everywhere instead of platform system fonts (SF vs Roboto). Static font files: select weight through `FontFamily.*` names, never `fontWeight`.
- **Light/dark mode** — automatic via `useColorScheme`; both palettes live in `theme.ts`. Use `ThemedText` / `ThemedView` instead of raw `Text` / `View`.
- **No barrel exports** (`index.ts` re-export files) — they break fast refresh.
- Path alias `@/*` → `src/*`.
