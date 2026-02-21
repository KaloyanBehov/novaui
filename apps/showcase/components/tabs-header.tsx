import { H1 } from '@novaui/components';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Filters from './filters';
import ThemeSwitcher from './theme-switcher';
const TabsHeader = ({ title }: { title: string }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="bg-background flex-row items-center justify-between px-6 pb-2 pt-4"
      style={{ paddingTop: insets.top + 8 }}>
      <H1 className="text-3xl font-extrabold tracking-tight text-foreground">{title}</H1>

      <View className="flex-row items-center justify-end gap-3">
        <ThemeSwitcher />
        <Filters />
      </View>
    </View>
  );
};


export default TabsHeader;
