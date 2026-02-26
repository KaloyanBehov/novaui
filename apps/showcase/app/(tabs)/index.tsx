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
    router.push({
      pathname: '/screens/book-screen',
      params: { id: id.toString() },
    });
  };

  return (
    <View className="bg-background flex-1">
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Categories horizontal scroll */}
        <View className="px-6 pt-4 pb-2">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
            className="flex-row">
            {CATEGORIES.map((pill, i) => {
              const isActive = activeCategory === i;
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => setActiveCategory(i)}
                  activeOpacity={0.7}
                  hitSlop={8}
                  className={`rounded-full border px-5 py-3 ${
                    isActive
                      ? 'border-primary/40 bg-primary/10'
                      : 'border-border bg-transparent'
                  }`}>
                  <Text
                    className={`text-sm font-semibold tracking-tight ${
                      isActive ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                    {pill}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Sections */}
        <Section title="New releases" onSeeAll={() => router.push('/screens/new-releases')}>
          {newReleases.map((book, i) => (
            <BookCard
              key={book.id}
              name={book.name}
              author={book.author}
              image={book.image}
              rating={book.rating}
              duration={book.duration}
              id={book.id}
              isEbook={i % 2 !== 0}
            />
          ))}
        </Section>

        <Section title="Most popular" onSeeAll={() => router.push('/screens/most-popular')}>
          {mostPopular.map((book, i) => (
            <BookCard
              key={book.id}
              name={book.name}
              author={book.author}
              image={book.image}
              rating={book.rating}
              duration={book.duration}
              isEbook={i % 2 === 0}
              id={book.id}
            />
          ))}
        </Section>

        <Section title="Trending" onSeeAll={() => router.push('/screens/trending')}>
          {trending.map((book, i) => (
            <BookCard
              key={book.id}
              name={book.name}
              author={book.author}
              id={book.id}
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
    paddingBottom: 120,
    paddingTop: 8,
  },
  categoryScroll: {
    paddingRight: 24,
    gap: 12,
  },
});
