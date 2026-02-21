import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { HomeIcon, Library, UserIcon } from 'lucide-react-native';

import TabsHeader from '@/components/tabs-header';
import useThemeStore from '@/store/theme-store';
import { BlurView } from 'expo-blur';
import { StyleSheet, View } from 'react-native';

export default function TabLayout() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const activeTintColor = isDark ? '#ffffff' : '#000000';
  const inactiveTintColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';

  const tabBarStyle = [styles.tabBar];

  const blurContainerStyle = [
    styles.blurContainer,
    { backgroundColor: isDark ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.35)' },
  ];

  const activeIconBackgroundStyle = {
    backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)',
  };

  const blurTint = isDark ? 'systemChromeMaterialDark' : 'systemChromeMaterialLight';

  return (
    <Tabs
      screenOptions={{
        header: ({ route, options }) => <TabsHeader title={options.title as string} />,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarShowLabel: false,
        tabBarStyle,
        tabBarItemStyle: styles.tabBarItem,
        tabBarBackground: () => (
          <View style={blurContainerStyle}>
            <BlurView tint={blurTint} intensity={90} style={StyleSheet.absoluteFill} />
          </View>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && activeIconBackgroundStyle]}>
              <HomeIcon size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && activeIconBackgroundStyle]}>
              <Library size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && activeIconBackgroundStyle]}>
              <UserIcon size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 24,
    right: 24,
    height: 64,

    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    shadowColor: 'rgba(0,0,0,0.12)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
  },
  tabBarItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  blurContainer: {
    flex: 1,
    borderRadius: 32,
    overflow: 'hidden',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
