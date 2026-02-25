import { BookCard } from '@/components/cards/book-card';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { bestSellers } from '@/mock/data';
import { Button, H1 } from '@novaui/components';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MostPopularScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const iconColor = Colors[theme].icon;
  const data = bestSellers.slice(0, 10);

  const navigateToBook = (id: string) => {
    router.push({
      pathname: '/screens/book-screen',
      params: { id },
    });
  };

  return (
    <SafeAreaView className="bg-background flex-1" edges={['top']}>
      {/* Custom Header */}
      <View className="flex-row items-center px-4 pb-2 pt-2">
        <Button
          size="icon"
          variant="ghost"
          radius="full"
          onPress={() => router.back()}
          className="mr-2 h-12 w-12">
          <ChevronLeft size={24} color={iconColor} strokeWidth={2} />
        </Button>
        <H1 className="text-foreground text-xl font-bold">Most Popular</H1>
      </View>

      <View className="flex-1 px-4">
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <BookCard
              className="w-[48%]"
              name={item.name}
              author={item.author}
              image={item.image}
              rating={item.rating}
              duration={item.duration}
              isEbook={index % 2 === 0}
              onPress={() => navigateToBook(item.id)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
