import { BookCard } from '@/components/cards/book-card';
import { Section } from '@/components/section';
import { bestSellers } from '@/mock/data';
import { Text } from '@novaui/components';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const CATEGORIES = ['Browse by Category', 'Browse by Author', 'Podcast'];

export default function HomeScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(0);

  // Use mock data to populate sections
  const newReleases = bestSellers.slice(0, 4);
  const mostPopular = bestSellers.slice(4, 8);
  const trending = bestSellers.slice(8, 12);

  const navigateToBook = (id: string) => {
    // In a real app we would pass the ID, but for the showcase we have a single screen
    router.push({
      pathname: '/screens/book-screen',
    });
  };

  return (
    <View className="bg-background flex-1">
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Categories horizontal scroll */}
        <View className="mt-2">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 10 }}
            className="mb-8">
            {CATEGORIES.map((pill, i) => {
              const isActive = activeCategory === i;
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => setActiveCategory(i)}
                  className={`rounded-full border px-5 py-2.5 transition-colors ${
                    isActive ? 'border-brand bg-brand' : 'border-border bg-surface'
                  }`}>
                  <Text
                    className={`text-sm font-bold tracking-tight ${
                      isActive ? 'text-brand-foreground' : 'text-muted-foreground'
                    }`}>
                    {pill}
                  </Text>
                </TouchableOpacity>
              );
            })}
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
              onPress={() => navigateToBook(book.id)}
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
              onPress={() => navigateToBook(book.id)}
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
              onPress={() => navigateToBook(book.id)}
            />
          ))}
        </Section>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100, // Extra padding for the floating tab bar
    paddingTop: 12,
  },
});
