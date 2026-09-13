import { Tabs } from 'expo-router';
import { StyleSheet, View, type ColorValue } from 'react-native';

import { FontFamily, Radius, Type } from '@/constants/theme';
import { getCopy } from '@/content/nvc-content';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/use-profile-store';

/** Placeholder tab glyphs: square, circle, diamond, ring. */
function TabIcon({
  shape,
  color,
}: {
  shape: 'square' | 'circle' | 'diamond' | 'ring';
  color: ColorValue;
}) {
  return (
    <View
      style={[
        styles.icon,
        styles[shape],
        shape === 'ring' ? { borderColor: color } : { backgroundColor: color },
      ]}
    />
  );
}

export default function TabsLayout() {
  const theme = useTheme();
  const { locale, age } = useProfileStore();
  const copy = getCopy(locale ?? 'tr', age ?? 12);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.sea,
        tabBarInactiveTintColor: theme.ink2,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.line,
          borderTopWidth: 1,
          // React Navigation adds the bottom inset itself; only the top padding is ours.
          paddingTop: 8,
          paddingHorizontal: 10,
        },
        tabBarLabelStyle: { fontFamily: FontFamily.extraBold, fontSize: Type.tabLabel.fontSize },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: copy.tabs.games,
          tabBarIcon: ({ color }) => <TabIcon shape="square" color={color} />,
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          // ponytail: no Practice design yet — hidden from the bar, route kept so
          // the tab reappears by deleting this line.
          href: null,
          title: copy.tabs.practice,
          tabBarIcon: ({ color }) => <TabIcon shape="circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="badges"
        options={{
          title: copy.tabs.badges,
          tabBarIcon: ({ color }) => <TabIcon shape="diamond" color={color} />,
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          // ponytail: no Me design yet — hidden like Practice.
          href: null,
          title: copy.tabs.me,
          tabBarIcon: ({ color }) => <TabIcon shape="ring" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: { width: 18, height: 18 },
  square: { borderRadius: 6 },
  circle: { borderRadius: Radius.full },
  diamond: { width: 15, height: 15, transform: [{ rotate: '45deg' }], borderRadius: 3 },
  ring: { borderRadius: Radius.full, borderWidth: 2.5, backgroundColor: 'transparent' },
});
