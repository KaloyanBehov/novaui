import { LibraryCard } from '@/components/cards/library-card';
import { bestSellers, recentPlays } from '@/mock/data';
import { Label, Select, SelectContent, SelectItem, SelectTrigger, Text } from '@novaui/components';
import { ArrowLeft, Search } from 'lucide-react-native';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyLibraryScreen() {
  // Use mock data to populate list
  // Connect recentPlays with bestSellers
  const libraryItems = recentPlays
    .map((play, index) => {
      const book = bestSellers.find((b) => b.id === play.bookId);
      return {
        id: play.bookId,
        book,
        progress: play.progress * 100,
        remaining: play.remainingTime,
        status: index === 1 ? 'playing' : ('download' as any),
      };
    })
    .filter((item) => item.book); // Ensure book exists

  // adding a couple more items to match the length of the design
  const extraItems = bestSellers.slice(5, 7).map((book, index) => ({
    id: book.id + '-extra',
    book,
    progress: (index + 2) * 15,
    remaining: '59 min',
    status: 'download' as any,
  }));

  const allItems = [...libraryItems, ...extraItems];

  const calculateMinutesString = (totalDurationStr: string, progress: number) => {
    // simplified mock formula for UI presentation: "60/85 minutes"
    const totalMinutes = parseInt(totalDurationStr) || 85;
    const current = Math.round((progress / 100) * totalMinutes);
    return `${current}/${totalMinutes} minutes`;
  };

  return (
    <SafeAreaView className="bg-background flex-1" edges={['top']}>
      {/* Header bar */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <View className="flex-1 items-start">
          <TouchableOpacity className="border-border h-[42px] w-[42px] items-center justify-center rounded-full border bg-transparent">
            <ArrowLeft size={20} className="text-foreground" />
          </TouchableOpacity>
        </View>

        <View className="flex-2 items-center justify-center">
          <Text className="text-foreground text-[17px] font-bold">My Library</Text>
        </View>

        <View className="flex-1 flex-row items-center justify-end">
          <TouchableOpacity>
            <Search size={22} className="text-foreground" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}>
        {/* Filter and Sort bar */}
        <View className="mb-6 mt-2 flex-row items-center justify-between px-6">
          <Select value="in-progress" onValueChange={(value) => console.log(value)}>
            <SelectTrigger className="border-border h-[40px] gap-2 rounded-xl bg-transparent px-4">
              <Label>In Progress</Label>
            </SelectTrigger>
            <SelectContent className="border-border w-[150px]">
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="favorites">Favorites</SelectItem>
              <SelectItem value="recently-added">Recently Added</SelectItem>
              <SelectItem value="recently-played">Recently Played</SelectItem>
              <SelectItem value="recently-downloaded">Recently Downloaded</SelectItem>
              <SelectItem value="recently-updated">Recently Updated</SelectItem>
              <SelectItem value="recently-viewed">Recently Viewed</SelectItem>
              <SelectItem value="recently-listened">Recently Listened</SelectItem>
            </SelectContent>
          </Select>

          <Select value="in-progress" onValueChange={(value) => console.log(value)}>
            <SelectTrigger className="border-border h-[40px] gap-2 rounded-xl bg-transparent px-4">
              <Label>Sort By</Label>
            </SelectTrigger>
            <SelectContent className="border-border w-[150px]">
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="author">Author</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
              <SelectItem value="progress">Progress</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </View>

        {/* List of library items */}
        <View className="px-6">
          {allItems.map((item) => (
            <LibraryCard
              key={item.id}
              name={item.book!.name}
              author={item.book!.author}
              image={item.book!.image}
              duration={item.book!.duration}
              progressPercent={item.progress}
              timeString={calculateMinutesString(item.book!.duration, item.progress)}
              isEbook={false}
              status={item.status}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
