import { router } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { Mascot } from '@/components/mascot';
import { ScreenShell } from '@/components/screen-shell';
import { ThemedText } from '@/components/themed-text';
import { Radius, Shadow, Spacing, Type, type Tone } from '@/constants/theme';
import { getCopy, type Copy } from '@/content/nvc-content';
import { GameTopBar, sentenceFor } from '@/features/games/seeing-clearly/game-top-bar';
import {
  SORT_CARDS,
  useGameStore,
  type CardKey,
  type Zone,
} from '@/features/games/seeing-clearly/use-game-store';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/use-profile-store';

const HORIZONTAL = Spacing.four;
const ADVANCE_DELAY = 600;
const SHAKE_DURATION = 450;

type Rect = { x: number; y: number; width: number; height: number };

export function SortScreen() {
  const theme = useTheme();
  const locale = useProfileStore((state) => state.locale);
  const { selected, placed, wrong, missedThisRound, selectCard, dropOnZone, clearWrong } =
    useGameStore();
  const copy = getCopy(locale);
  const solved = Object.keys(placed).length === SORT_CARDS.length;

  // Window-space rectangles for the two targets, so a released card can be
  // hit-tested against them wherever it lands.
  const zoneRects = useRef<Partial<Record<Zone, Rect>>>({});
  const setZoneRect = useCallback((zone: Zone, rect: Rect) => {
    zoneRects.current[zone] = rect;
  }, []);

  const dropAtPoint = useCallback(
    (x: number, y: number, key: CardKey) => {
      const hit = (Object.entries(zoneRects.current) as [Zone, Rect][]).find(
        ([, rect]) =>
          x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height,
      );

      // Released outside both targets: the card just springs home, no penalty.
      if (hit) dropOnZone(hit[0], key);
    },
    [dropOnZone],
  );

  useEffect(() => {
    if (!solved) return;

    const timer = setTimeout(() => router.push('/games/seeing-clearly/feedback'), ADVANCE_DELAY);

    return () => clearTimeout(timer);
  }, [solved]);

  useEffect(() => {
    if (!wrong) return;

    const timer = setTimeout(clearWrong, SHAKE_DURATION);

    return () => clearTimeout(timer);
  }, [wrong, clearWrong]);

  const remaining = SORT_CARDS.filter((card) => !placed[card.key]);

  return (
    <ScreenShell
      horizontal={HORIZONTAL}
      topBar={<GameTopBar horizontal={HORIZONTAL} />}
      contentStyle={styles.content}
    >
      <ThemedText style={[Type.gameTitle, styles.title, { color: theme.ink }]}>
        {copy.sortTitle}
      </ThemedText>

      <View style={styles.zones}>
        <DropZone
          zone="coyote"
          tone="clay"
          title={copy.zoneCoyote}
          caption={copy.zoneJudgment}
          armed={selected !== null}
          placed={placed}
          copy={copy}
          onDrop={dropOnZone}
          onMeasure={setZoneRect}
        />
        <DropZone
          zone="giraffe"
          tone="sun"
          title={copy.zoneGiraffe}
          caption={copy.zoneCamera}
          armed={selected !== null}
          placed={placed}
          copy={copy}
          onDrop={dropOnZone}
          onMeasure={setZoneRect}
        />
      </View>

      <View style={styles.deck}>
        {remaining.map((card) => (
          <SortCard
            key={card.key}
            cardKey={card.key}
            sentence={sentenceFor(copy, card.key)}
            selected={selected === card.key}
            shaking={wrong === card.key}
            onPress={() => selectCard(card.key)}
            onDragEnd={dropAtPoint}
          />
        ))}
      </View>

      <View style={styles.hint}>
        <View
          style={[styles.hintDot, { backgroundColor: missedThisRound ? theme.clay : theme.sea }]}
        />
        <ThemedText
          accessibilityLiveRegion="polite"
          style={[
            Type.micro,
            styles.hintText,
            { color: missedThisRound ? theme.clay : theme.ink2 },
          ]}
        >
          {missedThisRound ? copy.sortMiss : copy.sortHint}
        </ThemedText>
      </View>
    </ScreenShell>
  );
}

function DropZone({
  zone,
  tone,
  title,
  caption,
  armed,
  placed,
  copy,
  onDrop,
  onMeasure,
}: {
  zone: Zone;
  tone: Tone;
  title: string;
  caption: string;
  armed: boolean;
  placed: Partial<Record<CardKey, Zone>>;
  copy: Copy;
  onDrop: (zone: Zone) => void;
  onMeasure: (zone: Zone, rect: Rect) => void;
}) {
  const theme = useTheme();
  const ref = useRef<View>(null);
  const landed = SORT_CARDS.filter((card) => placed[card.key] === zone);

  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={() => onDrop(zone)}
      // Re-measured on every layout pass, so a landed card growing the zone
      // never leaves the drop rectangle stale.
      onLayout={() =>
        ref.current?.measureInWindow((x, y, width, height) =>
          onMeasure(zone, { x, y, width, height }),
        )
      }
      style={[
        styles.zone,
        {
          backgroundColor: theme[`${tone}Soft`],
          // Armed only while a card is selected, so the target never leaks the answer.
          borderColor: armed ? theme[tone] : 'transparent',
          borderStyle: armed ? 'dashed' : 'solid',
        },
      ]}
    >
      <Mascot size={26} kind={zone === 'coyote' ? 'coyote' : 'giraffe'} />
      <ThemedText style={[Type.zoneTitle, { color: theme.ink }]}>{title}</ThemedText>
      <ThemedText style={[Type.overline, { color: theme.ink2 }]}>{caption}</ThemedText>

      {landed.map((card) => (
        <View
          key={card.key}
          style={[styles.landed, { backgroundColor: theme.surface, borderColor: theme[tone] }]}
        >
          <ThemedText style={[Type.small, { color: theme.ink }]}>
            {sentenceFor(copy, card.key)}
          </ThemedText>
        </View>
      ))}
    </Pressable>
  );
}

function SortCard({
  cardKey,
  sentence,
  selected,
  shaking,
  onPress,
  onDragEnd,
}: {
  cardKey: CardKey;
  sentence: string;
  selected: boolean;
  shaking: boolean;
  onPress: () => void;
  onDragEnd: (x: number, y: number, key: CardKey) => void;
}) {
  const theme = useTheme();
  // Shake and drag are kept on separate values: one is driven by an effect, the
  // other by the gesture, and sharing a value would make each clobber the other.
  const shakeX = useSharedValue(0);
  const dragX = useSharedValue(0);
  const dragY = useSharedValue(0);
  const dragging = useSharedValue(false);

  useEffect(() => {
    if (!shaking) return;

    // Wrong side: the card shakes back to where it was. Nothing is deducted.
    shakeX.value = withSequence(
      withTiming(-7, { duration: 70 }),
      withTiming(6, { duration: 70 }),
      withTiming(-4, { duration: 70 }),
      withTiming(3, { duration: 70 }),
      withTiming(0, { duration: 70 }),
    );
  }, [shaking, shakeX, cardKey]);

  // 8px of slop before the pan takes over, so a plain tap still selects the
  // card — tap-then-tap-a-zone stays the accessible path alongside dragging.
  const pan = Gesture.Pan()
    .minDistance(8)
    .onStart(() => {
      dragging.value = true;
    })
    .onUpdate((event) => {
      dragX.value = event.translationX;
      dragY.value = event.translationY;
    })
    .onEnd((event) => {
      runOnJS(onDragEnd)(event.absoluteX, event.absoluteY, cardKey);
    })
    .onFinalize(() => {
      dragging.value = false;
      // Spring home; a correct drop removes the card from the deck anyway.
      dragX.value = withSpring(0, { damping: 18 });
      dragY.value = withSpring(0, { damping: 18 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: dragX.value + shakeX.value },
      { translateY: dragY.value },
      { scale: dragging.value ? 1.03 : 1 },
    ],
    zIndex: dragging.value ? 1 : 0,
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={animatedStyle}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected }}
          onPress={onPress}
          style={[
            styles.card,
            {
              backgroundColor: theme.surface,
              borderColor: selected ? theme.sea : theme.line,
              borderWidth: selected ? 2 : 1.5,
            },
            selected ? [Shadow.lifted, styles.lifted] : Shadow.card,
          ]}
        >
          <ThemedText style={[Type.cardSentence, styles.cardText, { color: theme.ink }]}>
            {sentence}
          </ThemedText>
          <View style={styles.grip}>
            {[0, 1, 2].map((line) => (
              <View key={line} style={[styles.gripLine, { backgroundColor: theme.ink2 }]} />
            ))}
          </View>
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 14 },
  title: { textAlign: 'center' },
  zones: { flexDirection: 'row', gap: 10, marginTop: Spacing.four },
  zone: {
    flex: 1,
    minHeight: 132,
    borderRadius: Radius.panel,
    borderWidth: 2,
    paddingVertical: 13,
    paddingHorizontal: 11,
    alignItems: 'center',
    gap: 6,
  },
  landed: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: Radius.box,
    paddingVertical: 9,
    paddingHorizontal: 10,
  },
  deck: { gap: 9, marginTop: Spacing.four },
  card: {
    borderRadius: Radius.card,
    borderWidth: 1.5,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  lifted: { transform: [{ translateY: -2 }] },
  cardText: { flex: 1 },
  grip: { width: 16, gap: 3, opacity: 0.4 },
  gripLine: { height: 2, borderRadius: 1 },
  hint: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.four,
    alignItems: 'flex-start',
  },
  hintDot: { width: 9, height: 9, borderRadius: Radius.full, marginTop: 5 },
  hintText: { flex: 1 },
});
