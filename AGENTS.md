# NVC App — Rules for agents and contributors

## Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any Expo/React Native code. This project: Expo SDK 57, React Native 0.86, React 19.2, New Architecture only (legacy architecture no longer exists).

These rules are binding. When a rule below conflicts with a general best practice you remember, the rule wins.

## Where code goes

| What                                          | Where                                                                                                                                   |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Screens / routes                              | `src/app/` — Expo Router file-based routing, typed routes enabled                                                                       |
| Feature code (a game, a settings screen)      | `src/features/<feature>/` — screen, components, and store for that feature live together. Games go in `src/features/games/<game-name>/` |
| Shared UI primitives (used by 2+ features)    | `src/components/`                                                                                                                       |
| Global cross-feature state                    | `src/stores/`                                                                                                                           |
| Design tokens (colors, fonts, spacing, radii) | `src/constants/theme.ts` — the ONLY place these values are defined                                                                      |
| Shared hooks                                  | `src/hooks/`                                                                                                                            |
| Pure utilities                                | `src/lib/`                                                                                                                              |
| Static assets (images, sounds)                | `assets/`                                                                                                                               |

Create folders on first use — never scaffold empty ones.

Route files in `src/app/` stay thin: navigation structure and a screen import at most. Real screen UI lives in its feature folder and is re-exported:

```tsx
// src/app/games/memory.tsx
export { MemoryGameScreen as default } from '@/features/games/memory/memory-game-screen';
```

## State

- Local component state → `useState`. Do not create a store for state one component owns.
- Shared or persistent state → zustand store. Copy the pattern in `src/stores/use-settings-store.ts` (store per domain, `use-<domain>-store.ts`).
- Feature-only stores live in that feature's folder; cross-feature stores in `src/stores/`.
- Persistence → zustand `persist` + AsyncStorage ONLY. Never import `@react-native-async-storage/async-storage` outside a store file.
- No Redux, no React Context for app state, no additional state libraries.

## Navigation

- Expo Router only. New screen = new file under `src/app/`.
- Typed routes are enabled — use typed `<Link href>` / `router.push`; never build path strings dynamically.
- Navigation configuration lives in `_layout.tsx` files, nowhere else.

## Styling

- `StyleSheet.create` + tokens from `src/constants/theme.ts`. No literal colors, sizes, spacing, or font names in components.
- Text → `ThemedText`, colored containers → `ThemedView`. Never raw `<Text>` with a hardcoded color.
- Fonts: bundled Inter everywhere (identical rendering on iOS and Android). Select weight via `FontFamily.*` family names — NEVER `fontWeight` (static font files; `fontWeight` breaks on Android).
- New color = add to BOTH `Colors.light` and `Colors.dark`. `ThemeColor` type enforces this.
- No platform-specific look-and-feel forks unless a platform API forces it; the app must look the same on both platforms.

## Conventions

- File names kebab-case (`memory-game-screen.tsx`); exported components PascalCase.
- No barrel exports (`index.ts` re-export files) — they break fast refresh.
- Path alias `@/*` → `src/*`; always import via the alias, never relative `../../`.
- TypeScript strict; no `any`, no `@ts-ignore` without a one-line reason.
- New dependency = last resort. Order: React/React Native built-in → Expo SDK package → already-installed dependency → new package. RN-native packages install via `npx expo install`, never plain `npm install`.
- No backend, no network calls. Everything is local.

## Quality gates — run before every commit

```bash
npm run typecheck && npm run lint && npm run format:check
```

All three must pass. Fix, don't suppress.
