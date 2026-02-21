import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ThemeStore {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'theme', storage: createJSONStorage(() => AsyncStorage) }
  )
);

export default useThemeStore;
