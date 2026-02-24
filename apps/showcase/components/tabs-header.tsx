import { H1 } from '@novaui/components';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Filters from './filters';
import ThemeSwitcher from './theme-switcher';

const TabsHeader = ({ title }: { title: string }) => {
  return (
    <SafeAreaView edges={['top']} className="bg-background">
      <View className="flex-row items-center justify-between px-6 pb-2 pt-2">
        <H1 className="text-foreground text-3xl font-extrabold tracking-tight">{title}</H1>
        <View className="flex-row items-center justify-end gap-3">
          <ThemeSwitcher />
          <Filters />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TabsHeader;
