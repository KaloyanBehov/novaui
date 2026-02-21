import { BookCard } from '@/components/cards/book-card';
import Filters from '@/components/filters';
import { Section } from '@/components/section';
import { bestSellers } from '@/mock/data';
import { Button, H1, Text } from '@novaui/components';
import { Search } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  // Use mock data to populate sections
  const newReleases = bestSellers.slice(0, 4);
  const mostPopular = bestSellers.slice(4, 8);
  const trending = bestSellers.slice(8, 12);

  return (
    <SafeAreaView className="bg-background flex-1" edges={['top']}>
      {/* Header bar */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <H1 className="font-extrabold tracking-tight">Discover</H1>

        <View className="flex-1 flex-row items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            radius="full"
            className="h-10 w-10 rounded-full bg-transparent opacity-70 transition-transform active:scale-90 active:opacity-100">
            <Search size={22} className="text-foreground" />
          </Button>
          <Filters />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Categories horizontal scroll */}
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
            className="mb-10">
            {['Browse by Category', 'Browse by Author', 'Podcast'].map((pill, i) => (
              <TouchableOpacity
                key={i}
                className="border-border rounded-full border bg-transparent px-5 py-2.5">
                <Text className="text-muted-foreground text-[15px] font-medium">{pill}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Sections */}
        <Section title="New releases" onSeeAll={() => {}}>
          {newReleases.map((book, i) => (
            <BookCard
              key={book.id}
              name={book.name}
              author={book.author}
              image={book.image}
              rating={book.rating}
              duration={book.duration}
              isEbook={i % 2 !== 0} // just for demo variety
            />
          ))}
        </Section>

        <Section title="Most popular" onSeeAll={() => {}}>
          {mostPopular.map((book, i) => (
            <BookCard
              key={book.id}
              name={book.name}
              author={book.author}
              image={book.image}
              rating={book.rating}
              duration={book.duration}
              isEbook={i % 2 === 0}
            />
          ))}
        </Section>

        <Section title="Trending" onSeeAll={() => {}}>
          {trending.map((book, i) => (
            <BookCard
              key={book.id}
              name={book.name}
              author={book.author}
              image={book.image}
              rating={book.rating}
              duration={book.duration}
              isEbook={i % 2 !== 0}
            />
          ))}
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 60,
  },
});
