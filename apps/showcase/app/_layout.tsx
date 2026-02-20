import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as LucideIcons from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import { View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { cn } from '@/lib/utils';
import '../global.css';

// Register all Lucide icons with NativeWind for className support
Object.values(LucideIcons).forEach((Icon: any) => {
  if (Icon && typeof Icon === 'function') {
    cssInterop(Icon, {
      className: {
        target: 'style',
        nativeStyleToProp: {
          color: true,
        },
      },
    });
  }
});

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const { isDark } = useColorScheme();

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <View className={cn('flex-1', isDark ? 'dark' : 'light')}>
          <StatusBar style={isDark ? 'light' : 'dark'} />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
        </View>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
