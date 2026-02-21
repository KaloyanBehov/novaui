import { useColorScheme as useNativeWindColorScheme } from 'nativewind';

/**
 * Web-specific color scheme hook.
 *
 * On web, NativeWind's useColorScheme works correctly with SSR hydration
 * without the old bare React Native useColorScheme fallback.
 * We use the same hook shape as the native version for a unified API.
 */
export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useNativeWindColorScheme();

  return {
    colorScheme: colorScheme ?? 'light',
    isDark: colorScheme === 'dark',
    setColorScheme,
    toggleColorScheme,
  };
}
