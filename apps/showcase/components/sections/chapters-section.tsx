import { cn } from '@/lib/utils';
import { chapters } from '@/mock/data';
import {
  Button,
  H3,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  Text,
} from '@novaui/components';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

// Chapter Sections Component
const ChaptersSection = ({
  isPlaying,
  setIsPlaying,
}: {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}) => {
  const [activeChapter, setActiveChapter] = useState(1);

  const handleChapterPress = (chapterId: number) => {
    setActiveChapter(chapterId);
    if (activeChapter !== chapterId) {
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <View className="mb-12 px-8">
      <View className="mb-4 flex-row items-center justify-between">
        <H3 className="text-foreground text-2xl font-bold leading-tight tracking-tight">
          Chapters
        </H3>
        <Button variant="ghost" size="sm" className="h-9 bg-transparent px-2">
          <Text className="text-brand text-sm font-semibold">See all</Text>
        </Button>
      </View>

      <ItemGroup className="gap-3">
        {chapters.map((chapter) => {
          const isActive = activeChapter === chapter.id;

          return (
            <TouchableOpacity
              key={chapter.id}
              activeOpacity={0.7}
              onPress={() => handleChapterPress(chapter.id)}>
              <Item
                variant={isActive ? 'muted' : 'default'}
                className={cn(
                  'rounded-2xl border border-transparent p-4',
                  isActive && 'border-brand/20 bg-brand/5'
                )}>
                <ItemMedia className="bg-surface-2 h-12 w-12 items-center justify-center rounded-xl">
                  {isActive && isPlaying ? (
                    <View className="h-5 flex-row items-end justify-center gap-[2px]">
                      <View className="bg-brand h-full w-[3px] rounded-full" />
                      <View className="bg-brand h-3/5 w-[3px] rounded-full" />
                      <View className="bg-brand h-4/5 w-[3px] rounded-full" />
                    </View>
                  ) : (
                    <Text
                      className={cn(
                        'text-lg font-bold tabular-nums',
                        isActive ? 'text-brand' : 'text-muted-foreground/60'
                      )}>
                      {chapter.id}
                    </Text>
                  )}
                </ItemMedia>
                <ItemContent className="ml-4">
                  <ItemTitle>
                    <Text
                      className={cn(
                        'text-base font-bold leading-none',
                        isActive ? 'text-brand' : 'text-foreground'
                      )}>
                      {chapter.title}
                    </Text>
                  </ItemTitle>
                  <ItemDescription className="text-muted-foreground/60 mt-1 text-xs font-medium">
                    {chapter.description}
                  </ItemDescription>
                </ItemContent>
                <View className="ml-2 items-end justify-center">
                  <Text className="text-muted-foreground/50 text-[11px] font-bold tabular-nums">
                    {chapter.duration}
                  </Text>
                </View>
              </Item>
            </TouchableOpacity>
          );
        })}
      </ItemGroup>
    </View>
  );
};
export default ChaptersSection;
