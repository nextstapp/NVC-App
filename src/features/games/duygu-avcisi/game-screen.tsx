import { useKeepAwake } from 'expo-keep-awake';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, BackHandler, Linking, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

import { ThemedText } from '@/components/themed-text';
import { Radius, Size, Spacing, Type } from '@/constants/theme';
import { getAppCopy, SITE_URL } from '@/content/app-copy';
import { GAME_HTML } from '@/features/games/duygu-avcisi/game-html.generated';
import { type GameStat, parseGameMessage } from '@/features/games/duygu-avcisi/game-message';
import { useTheme, useThemeName } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/use-profile-store';
import { useSessionsStore } from '@/stores/use-sessions-store';
import { useSettingsStore } from '@/stores/use-settings-store';

/**
 * The config goes into the document itself, ahead of the game's own script:
 * `injectedJavaScriptBeforeContentLoaded` is not guaranteed to run first on
 * Android for an inline `source.html`.
 */
function withEmbedConfig(config: object): string {
  return GAME_HTML.replace(
    /<head[^>]*>/i,
    (head) => `${head}<script>window.NVC_EMBED=${JSON.stringify(config)};</script>`,
  );
}

/**
 * Counts a play for the project's usage report; dev builds don't count.
 * ponytail: fire-and-forget, plays made offline are lost; queue them if the report needs those.
 */
function sendStat(stat: GameStat) {
  if (__DEV__) return;
  fetch(`${SITE_URL}/api/games/duygu-avcisi/stats`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ ...stat, source: 'app' }),
  }).catch(() => {});
}

export function DuyguAvcisiScreen() {
  useKeepAwake();
  const theme = useTheme();
  const themeName = useThemeName();
  const locale = useProfileStore((state) => state.locale);
  const { soundEnabled, setSoundEnabled } = useSettingsStore();
  const addSession = useSessionsStore((state) => state.addSession);
  const copy = getAppCopy(locale);

  // Built once: a changed setting must not reload a game in progress.
  const [html] = useState(() =>
    withEmbedConfig({ embed: 'app', lang: locale, theme: themeName, sound: soundEnabled }),
  );
  const [screen, setScreen] = useState('setup');
  // Bumped to remount the WebView after the OS kills its web content process.
  const [instance, setInstance] = useState(0);

  const close = useCallback(() => {
    if (screen !== 'game') return router.back();

    Alert.alert(copy.leaveTitle, copy.leaveBody, [
      { text: copy.stay, style: 'cancel' },
      { text: copy.leave, style: 'destructive', onPress: () => router.back() },
    ]);
  }, [screen, copy]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      close();
      return true;
    });
    return () => subscription.remove();
  }, [close]);

  const onMessage = (event: WebViewMessageEvent) => {
    const msg = parseGameMessage(event.nativeEvent.data);
    if (msg?.type === 'screen') setScreen(msg.screen);
    if (msg?.type === 'sound') setSoundEnabled(msg.enabled);
    if (msg?.type === 'finished') addSession(msg.result);
    if (msg?.type === 'stat') sendStat(msg.stat);
  };

  const restart = () => {
    setScreen('setup');
    setInstance((n) => n + 1);
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]}>
      <View style={[styles.bar, { borderBottomColor: theme.line }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={copy.close}
          onPress={close}
          hitSlop={Spacing.two}
          style={[styles.close, { borderColor: theme.line }]}
        >
          <ThemedText style={[Type.feedbackTitle, { color: theme.ink }]}>×</ThemedText>
        </Pressable>
        <ThemedText numberOfLines={1} style={[Type.gameTitle, styles.title, { color: theme.ink }]}>
          {copy.gameTitle}
        </ThemedText>
      </View>

      <WebView
        key={instance}
        source={{ html, baseUrl: '' }}
        originWhitelist={['*']}
        onMessage={onMessage}
        // Only the inline document may load; links leave for the system browser.
        onShouldStartLoadWithRequest={({ url }) => {
          if (url.startsWith('about:') || url.startsWith('data:')) return true;
          if (/^https?:/i.test(url)) Linking.openURL(url);
          return false;
        }}
        setSupportMultipleWindows={false}
        textZoom={100}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        bounces={false}
        overScrollMode="never"
        allowsLinkPreview={false}
        contentInsetAdjustmentBehavior="never"
        onContentProcessDidTerminate={restart}
        onRenderProcessGone={restart}
        // Transparent so the theme background shows through until the first paint.
        style={styles.web}
        containerStyle={{ backgroundColor: theme.bg }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderBottomWidth: 1,
  },
  close: {
    width: Size.backButton,
    height: Size.backButton,
    borderRadius: Radius.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { flex: 1 },
  web: { flex: 1, backgroundColor: 'transparent' },
});
