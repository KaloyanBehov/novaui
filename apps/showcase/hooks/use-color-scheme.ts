import { useColorScheme as useNativeWindColorScheme } from 'nativewind';

export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useNativeWindColorScheme();
  return {
    colorScheme: colorScheme ?? 'light',
    isDark: colorScheme === 'dark',
    setColorScheme,
    toggleColorScheme,
  };
}
