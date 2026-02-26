import { LibraryCard } from '@/components/cards/library-card';
import { bestSellers, recentPlays } from '@/mock/data';
import { Label, Select, SelectContent, SelectItem, SelectTrigger } from '@novaui/components';
import React from 'react';
import { ScrollView, View } from 'react-native';

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
    <View className="bg-background flex-1">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}>
        {/* Filter and Sort bar */}
        <View className="px-6 pb-4 pt-4">
          <View className="bg-muted/20 flex-row items-center gap-3 rounded-2xl p-2">
            <View className="flex-1">
              <Select value="in-progress" onValueChange={(value) => console.log(value)}>
                <SelectTrigger className="border-border bg-background/60 h-11 gap-2 rounded-xl px-4">
                  <Label className="text-sm font-semibold tracking-tight">In Progress</Label>
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
            </View>

            <View className="flex-1">
              <Select value="in-progress" onValueChange={(value) => console.log(value)}>
                <SelectTrigger className="border-border bg-background/60 h-11 gap-2 rounded-xl px-4">
                  <Label className="text-sm font-semibold tracking-tight">Sort By</Label>
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
          </View>
        </View>

        {/* List of library items */}
        <View className="px-6 pb-2">
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
    </View>
  );
}
