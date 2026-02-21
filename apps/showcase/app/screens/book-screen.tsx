import ChaptersSection from '@/components/sections/chapters-section';
import SharePreview from '@/components/share-preview';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import {
  AspectRatio,
  Button,
  Drawer,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  H1,
  Label,
  P,
  Progress,
} from '@novaui/components';
import {
  Bookmark,
  BookOpen,
  ChevronDown,
  Clock,
  Download,
  Globe,
  Heart,
  Info,
  MoreHorizontal,
  Pause,
  Play,
  Share,
  SkipBack,
  SkipForward,
  Star,
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const bookData = {
  name: '1984',
  author: 'George Orwell',
  description:
    'Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real. Follow Winston Smith as he rebels against a totalitarian regime.',
  image:
    'https://images.unsplash.com/photo-1507839719874-92fa3f555525?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  rating: 4.5,
  reviews: 120,
  duration: '3h 45m',
  chapters: 7,
  language: 'English',
};

export default function BookScreen() {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const iconColor = Colors[theme].icon;
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(33); // Starting at 33%

  // Progress simulation effect
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1; // Slow increment for smooth preview
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Derived time formatting
  const totalSeconds = 3 * 3600 + 45 * 60; // 3h 45m = 13500 seconds
  const currentSeconds = Math.floor((progress / 100) * totalSeconds);
  const remainingSeconds = totalSeconds - currentSeconds;

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView className="bg-background flex-1" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pb-4 pt-2">
        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10 rounded-full transition-transform active:scale-95">
          <ChevronDown size={24} color={iconColor} strokeWidth={2} />
        </Button>
        <P className="text-foreground text-[11px] font-bold uppercase tracking-[0.2em] opacity-80">
          Now Playing
        </P>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="h-10 w-10 rounded-full transition-transform active:scale-95">
              <MoreHorizontal size={24} color={iconColor} strokeWidth={2} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem className="flex-row items-center gap-3 py-3">
              <Download size={18} color={iconColor} strokeWidth={2} />
              <Label className="text-base">Download</Label>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex-row items-center gap-3 py-3">
              <Info size={18} color={iconColor} strokeWidth={2} />
              <Label className="text-base">View Details</Label>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>
        {/* Artwork */}
        <View className="w-full items-center px-10 py-6">
          <View
            className="w-full rounded-3xl"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 20 },
              shadowOpacity: 0.15,
              shadowRadius: 30,
              elevation: 20,
            }}>
            <AspectRatio ratio={1} className="overflow-hidden rounded-3xl">
              <Image
                source={require('@/assets/cover.png')}
                className="h-full w-full"
                resizeMode="cover"
              />
            </AspectRatio>
          </View>
        </View>

        {/* Title & Metadata */}
        <View className="mt-4 items-center px-10">
          <H1
            className="text-foreground mb-1.5 text-center text-3xl font-bold tracking-tight"
            numberOfLines={1}>
            1984
          </H1>
          <P
            className="text-muted-foreground mb-3 text-center text-lg font-medium"
            numberOfLines={1}>
            George Orwell
          </P>

          {/* Rating */}
          <View className="mb-5 mt-1 flex-row items-center justify-center gap-1.5">
            <Star size={18} color="#FF8A00" fill="#FF8A00" />
            <P className="text-foreground text-base font-bold">4.5</P>
            <P className="text-muted-foreground text-sm font-medium">(120 reviews)</P>
          </View>
        </View>

        {/* Book Info Chips */}
        <View className="mb-6 flex-row flex-wrap items-center justify-center gap-3 px-6">
          <View className="bg-secondary/40 flex-row items-center gap-2 rounded-full px-3.5 py-1.5">
            <Clock size={14} color={iconColor} strokeWidth={2.5} />
            <P className="text-foreground text-xs font-semibold">3h 45m</P>
          </View>
          <View className="bg-secondary/40 flex-row items-center gap-2 rounded-full px-3.5 py-1.5">
            <BookOpen size={14} color={iconColor} strokeWidth={2.5} />
            <P className="text-foreground text-xs font-semibold">7 Chapters</P>
          </View>
          <View className="bg-secondary/40 flex-row items-center gap-2 rounded-full px-3.5 py-1.5">
            <Globe size={14} color={iconColor} strokeWidth={2.5} />
            <P className="text-foreground text-xs font-semibold">English</P>
          </View>
        </View>

        {/* Summary */}
        <View className="mb-8 px-8">
          <P
            className="text-muted-foreground/80 text-center text-sm font-medium leading-relaxed"
            numberOfLines={3}>
            Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that
            grows more haunting as its futuristic purgatory becomes more real. Follow Winston Smith
            as he rebels against a totalitarian regime.
          </P>
        </View>

        {/* Progress */}
        <View className="mt-2 gap-3 px-8">
          <Progress className="h-1.5 w-full rounded-full" value={progress} />
          <View className="flex-row items-center justify-between">
            <P className="text-muted-foreground/80 text-left text-xs font-semibold tabular-nums tracking-wider">
              {formatTime(currentSeconds)}
            </P>
            <P className="text-muted-foreground/80 text-right text-xs font-semibold tabular-nums tracking-wider">
              -{formatTime(remainingSeconds)}
            </P>
          </View>
        </View>

        {/* Primary Controls */}
        <View className="mt-4 flex-row items-center justify-center gap-8 px-8">
          <Button
            size="icon"
            variant="ghost"
            radius="full"
            className="h-16 w-16 bg-transparent transition-transform active:scale-95">
            <SkipBack size={24} color={iconColor} strokeWidth={1.5} fill={iconColor} />
          </Button>

          <Button
            size="icon"
            radius="full"
            className="h-16 w-16 shadow-xl transition-transform active:scale-95"
            style={{ backgroundColor: '#FF8A00', shadowColor: '#FF8A00' }}
            onPress={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <Pause size={36} color="#fff" fill="#fff" />
            ) : (
              <Play size={36} color="#fff" fill="#fff" style={{ marginLeft: 4 }} />
            )}
          </Button>

          <Button
            size="icon"
            variant="ghost"
            radius="full"
            className="h-16 w-16 bg-transparent transition-transform active:scale-95">
            <SkipForward size={24} color={iconColor} strokeWidth={1.5} fill={iconColor} />
          </Button>
        </View>

        {/* Secondary controls */}
        <View className="mb-10 mt-10 flex-row items-center justify-between px-12">
          <Button
            variant="ghost"
            size="icon"
            radius="full"
            className="h-12 w-12 bg-transparent opacity-70 transition-transform active:scale-90 active:opacity-100"
            onPress={() => setIsLiked(!isLiked)}>
            <Heart
              size={26}
              color={isLiked ? '#ef4444' : iconColor}
              fill={isLiked ? '#ef4444' : 'transparent'}
              strokeWidth={isLiked ? 0 : 2}
            />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            radius="full"
            className="h-12 w-12 bg-transparent opacity-70 transition-transform active:scale-90 active:opacity-100"
            onPress={() => setIsBookmarked(!isBookmarked)}>
            <Bookmark
              size={26}
              color={isBookmarked ? '#000000' : iconColor}
              fill={isBookmarked ? '#000000' : 'transparent'}
              strokeWidth={isBookmarked ? 0 : 2}
            />
          </Button>

          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                radius="full"
                className="h-12 w-12 bg-transparent opacity-70 transition-transform active:scale-90 active:opacity-100">
                <Share size={26} color={iconColor} strokeWidth={2} />
              </Button>
            </DrawerTrigger>
            <SharePreview
              image={bookData.image}
              title={bookData.name}
              description={bookData.description}
            />
          </Drawer>
        </View>

        <ChaptersSection isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      </ScrollView>
    </SafeAreaView>
  );
}
