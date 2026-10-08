import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ProgressBar } from '@/components/progress-bar';
import { ScreenShell } from '@/components/screen-shell';
import { ThemedText } from '@/components/themed-text';
import { ToastMessage } from '@/components/toast-message';
import { Radius, Shadow, Spacing, Type } from '@/constants/theme';
import { MODULES, getCopy } from '@/content/nvc-content';
import { ModuleSkeleton } from '@/features/modules/module-skeleton';
import { useTheme } from '@/hooks/use-theme';
import { moduleStates, useProfileStore } from '@/stores/use-profile-store';

const PLAYABLE_MODULE = 'seeing-clearly';

export function ModulesScreen() {
  const theme = useTheme();
  const { locale, progress, hydrated } = useProfileStore();
  const [toast, setToast] = useState<string | null>(null);
  const copy = getCopy(locale);
  const states = moduleStates(progress);
  const openModuleNo = MODULES.find((m) => states[m.id] === 'open')?.no ?? '';

  const dismissToast = useCallback(() => setToast(null), []);

  return (
    <View style={styles.root}>
      <ScreenShell horizontal={18} contentStyle={styles.content}>
        <View style={styles.sectionRow}>
          <ThemedText style={[Type.sectionTitle, { color: theme.ink }]}>{copy.games}</ThemedText>
          <ThemedText style={[Type.small, { color: theme.ink2 }]}>{copy.unlockNote}</ThemedText>
        </View>

        {hydrated ? (
          <View style={styles.list}>
            {MODULES.map((module, index) => {
              const state = states[module.id];
              const done = progress[module.id] ?? 0;
              const locked = state === 'locked';

              return (
                <Pressable
                  key={module.id}
                  accessibilityRole="button"
                  accessibilityState={{ disabled: locked }}
                  onPress={() => {
                    if (locked) return setToast(copy.lockedToast.replace('{n}', openModuleNo));
                    if (module.id === PLAYABLE_MODULE) router.push('/games/seeing-clearly/brief');
                  }}
                  style={[
                    styles.row,
                    {
                      backgroundColor: theme.surface,
                      borderColor: theme.line,
                      borderStyle: locked ? 'dashed' : 'solid',
                      opacity: locked ? 0.55 : 1,
                    },
                    !locked && Shadow.card,
                  ]}
                >
                  <View
                    style={[
                      styles.icon,
                      {
                        backgroundColor: theme[`${module.tone}Soft`],
                        borderColor: theme[module.tone],
                      },
                    ]}
                  />
                  <View style={styles.body}>
                    <View style={styles.titleRow}>
                      <ThemedText style={[Type.mono, { color: theme.ink2 }]}>
                        {module.no}
                      </ThemedText>
                      <ThemedText style={[Type.rowTitle, styles.name, { color: theme.ink }]}>
                        {module.name}
                      </ThemedText>
                    </View>
                    <ThemedText style={[Type.micro, { color: theme.ink2 }]}>
                      {copy.modDesc[index]}
                    </ThemedText>
                    <View style={styles.progressRow}>
                      <View style={styles.progressBar}>
                        <ProgressBar percent={(done / module.total) * 100} tone={module.tone} />
                      </View>
                      <ThemedText style={[Type.mono, { color: theme.ink2 }]}>
                        {done}/{module.total}
                      </ThemedText>
                    </View>
                  </View>
                  <View style={styles.status}>
                    {state === 'done' ? (
                      <View style={[styles.check, { backgroundColor: theme.sun }]}>
                        <ThemedText style={[Type.small, { color: theme.onSun }]}>✓</ThemedText>
                      </View>
                    ) : locked ? (
                      <LockGlyph color={theme.ink2} />
                    ) : null}
                  </View>
                </Pressable>
              );
            })}
          </View>
        ) : (
          <ModuleSkeleton />
        )}
      </ScreenShell>

      {toast ? <ToastMessage message={toast} onDismiss={dismissToast} /> : null}
    </View>
  );
}

/** 15×11 body with an 8px arch — a lock, drawn without an icon dependency. */
function LockGlyph({ color }: { color: string }) {
  return (
    <View style={styles.lock}>
      <View style={[styles.lockArch, { borderColor: color }]} />
      <View style={[styles.lockBody, { backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { paddingTop: Spacing.three },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: Spacing.three,
  },
  list: { gap: 10, paddingBottom: Spacing.six },
  row: {
    borderRadius: Radius.panel,
    borderWidth: 1.5,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  icon: { width: 46, height: 46, borderRadius: Radius.icon, borderWidth: 1.5 },
  body: { flex: 1, gap: 5 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  name: { flex: 1 },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, marginTop: 2 },
  progressBar: { flex: 1 },
  status: { width: 26, alignItems: 'center' },
  check: {
    width: 20,
    height: 20,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lock: { alignItems: 'center' },
  lockArch: {
    width: 9,
    height: 6,
    borderWidth: 1.5,
    borderBottomWidth: 0,
    borderTopLeftRadius: Radius.xs,
    borderTopRightRadius: Radius.xs,
    opacity: 0.75,
  },
  lockBody: { width: 15, height: 11, borderRadius: 2, opacity: 0.75 },
});
