import useThemeStore from '@/store/theme-store';
import { Button } from '@novaui/components';
import { Moon, Sun } from 'lucide-react-native';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <Button
      onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      variant="ghost"
      size="icon"
      radius="full"
      className="h-11 w-11 transition-transform active:scale-90">
      {theme === 'dark' ? (
        <Sun size={22} className="text-foreground" />
      ) : (
        <Moon size={22} className="text-foreground" />
      )}
    </Button>

  );
};

export default ThemeSwitcher;
