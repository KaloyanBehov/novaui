import { useColorScheme } from '@/hooks/use-color-scheme';
import { cn } from '@/lib/utils';
import useThemeStore from '@/store/theme-store';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const { theme } = useThemeStore();
  const { setColorScheme } = useColorScheme();

  // Sync persisted theme to NativeWind so `dark:` classes and CSS variables resolve correctly
  useEffect(() => {
    setColorScheme(theme);
  }, [theme, setColorScheme]);

  const themeClass = theme === 'dark' ? 'dark' : 'light';

  return (
    <SafeAreaProvider>
      <View className={cn('flex-1', themeClass)}>
        <StatusBar hidden />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="screens/book-screen"
            options={{ headerShown: false, presentation: 'modal' }}
          />
          <Stack.Screen name="screens/most-popular" options={{ headerShown: false }} />
          <Stack.Screen name="screens/new-releases" options={{ headerShown: false }} />
          <Stack.Screen name="screens/trending" options={{ headerShown: false }} />
        </Stack>
      </View>
    </SafeAreaProvider>
  );
}
