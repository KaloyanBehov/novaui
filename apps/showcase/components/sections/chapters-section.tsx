import { cn } from '@/lib/utils';
import { chapters } from '@/mock/data';
import {
  Button,
  H1,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  P,
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
    setIsPlaying(!isPlaying);
  };
  return (
    <View className="mb-8 px-6">
      <View className="mb-4 flex-row items-center justify-between">
        <H1 className="text-xl font-bold">Chapters</H1>
        <Button variant="ghost" size="sm" className="h-8 bg-transparent px-2">
          <P className="text-sm font-semibold text-[#FF8A00]">See all</P>
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
                  'rounded-xl border border-transparent p-3',
                  isActive && 'border-[#FF8A00]/30 bg-[#FF8A00]/5'
                )}>
                <ItemMedia className="bg-secondary/50 h-12 w-12 items-center justify-center rounded-lg">
                  {isActive && isPlaying ? (
                    <View className="h-4 flex-row items-end justify-center gap-[2px]">
                      <View className="h-full w-1 rounded-full bg-[#FF8A00]" />
                      <View className="h-2/3 w-1 rounded-full bg-[#FF8A00]" />
                      <View className="h-3/4 w-1 rounded-full bg-[#FF8A00]" />
                    </View>
                  ) : (
                    <P
                      className={cn(
                        'text-lg font-bold',
                        isActive ? 'text-[#FF8A00]' : 'text-muted-foreground'
                      )}>
                      {chapter.id}
                    </P>
                  )}
                </ItemMedia>
                <ItemContent className="ml-3">
                  <ItemTitle>
                    <P className={cn('text-base font-bold', isActive && 'text-[#FF8A00]')}>
                      {chapter.title}
                    </P>
                  </ItemTitle>
                  <ItemDescription className="mt-0.5 text-xs">
                    {chapter.description}
                  </ItemDescription>
                </ItemContent>
                <View className="ml-2 items-end justify-center">
                  <P className="text-muted-foreground text-xs font-semibold">{chapter.duration}</P>
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
