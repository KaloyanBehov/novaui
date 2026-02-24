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
import { useRouter } from 'expo-router';
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
  const router = useRouter();
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
          return prev + 0.05; // Even slower for better visual stability
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
      <View className="flex-row items-center justify-between px-6 pb-2 pt-2">
        <Button
          size="icon"
          variant="ghost"
          radius="full"
          onPress={() => router.back()}
          className="h-11 w-11 ">
          <ChevronDown size={28} color={iconColor} strokeWidth={2} />
        </Button>
        <P className="text-foreground text-[10px] font-bold uppercase tracking-[0.25em] opacity-60">
          Now Playing
        </P>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" radius="full" className="h-11 w-11">
              <MoreHorizontal size={24} color={iconColor} strokeWidth={2} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52">
            <DropdownMenuItem className="flex-row items-center gap-3 py-3.5">
              <Download size={18} color={iconColor} strokeWidth={2} />
              <Label className="text-base font-semibold">Download</Label>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex-row items-center gap-3 py-3.5">
              <Info size={18} color={iconColor} strokeWidth={2} />
              <Label className="text-base font-semibold">View Details</Label>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}>
        {/* Artwork */}
        <View className="items-center px-10 py-8">
          <View className="shadow-brand/20 w-full shadow-2xl">
            <AspectRatio
              ratio={1}
              className="border-surface overflow-hidden rounded-[40px] border-4">
              <Image
                source={require('@/assets/cover.png')}
                className="h-full w-full"
                resizeMode="cover"
              />
            </AspectRatio>
          </View>
        </View>

        {/* Title & Metadata */}
        <View className="mt-2 items-center px-8">
          <H1
            className="text-foreground mb-1 text-center text-[32px] font-extrabold tracking-tight"
            numberOfLines={1}>
            1984
          </H1>
          <P
            className="text-muted-foreground/80 mb-4 text-center text-lg font-semibold"
            numberOfLines={1}>
            George Orwell
          </P>

          {/* Rating */}
          <View className="bg-surface-2 mb-8 flex-row items-center justify-center gap-2 rounded-full px-4 py-1.5">
            <Star size={16} color="#FF8A00" fill="#FF8A00" />
            <P className="text-foreground text-[15px] font-bold">4.5</P>
            <View className="bg-border mx-1 h-3 w-[1px]" />
            <P className="text-muted-foreground text-sm font-semibold">120 reviews</P>
          </View>
        </View>

        {/* Book Info Chips */}
        <View className="mb-8 flex-row flex-wrap items-center justify-center gap-3 px-6">
          <View className="bg-surface flex-row items-center gap-2 rounded-2xl px-4 py-2.5">
            <Clock size={16} color={iconColor} strokeWidth={2} />
            <P className="text-foreground text-xs font-bold">3h 45m</P>
          </View>
          <View className="bg-surface flex-row items-center gap-2 rounded-2xl px-4 py-2.5">
            <BookOpen size={16} color={iconColor} strokeWidth={2} />
            <P className="text-foreground text-xs font-bold">7 Chapters</P>
          </View>
          <View className="bg-surface flex-row items-center gap-2 rounded-2xl px-4 py-2.5">
            <Globe size={16} color={iconColor} strokeWidth={2} />
            <P className="text-foreground text-xs font-bold">English</P>
          </View>
        </View>

        {/* Summary */}
        <View className="mb-10 px-10">
          <P
            className="text-muted-foreground/70 text-center text-[15px] font-medium leading-relaxed"
            numberOfLines={3}>
            Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that
            grows more haunting as its futuristic purgatory becomes more real.
          </P>
        </View>

        {/* Progress */}
        <View className="mb-8 gap-3.5 px-10">
          <Progress className="bg-surface-2 h-2 w-full rounded-full" value={progress} />
          <View className="flex-row items-center justify-between">
            <P className="text-muted-foreground/60 text-left text-[11px] font-bold tabular-nums tracking-wider">
              {formatTime(currentSeconds)}
            </P>
            <P className="text-muted-foreground/60 text-right text-[11px] font-bold tabular-nums tracking-wider">
              -{formatTime(remainingSeconds)}
            </P>
          </View>
        </View>

        {/* Primary Controls */}
        <View className="mb-12 flex-row items-center justify-center gap-8 px-8">
          <Button size="icon" variant="ghost" radius="full" className="h-16 w-16">
            <SkipBack size={32} color={iconColor} strokeWidth={1.5} fill={iconColor} />
          </Button>

          <Button
            size="icon"
            radius="full"
            className="shadow-brand/40 bg-brand h-20 w-20 shadow-xl"
            onPress={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <Pause size={40} color="#fff" fill="#fff" />
            ) : (
              <Play size={40} color="#fff" fill="#fff" style={{ marginLeft: 6 }} />
            )}
          </Button>

          <Button size="icon" variant="ghost" radius="full" className="h-16 w-16 ">
            <SkipForward size={32} color={iconColor} strokeWidth={1.5} fill={iconColor} />
          </Button>
        </View>

        {/* Secondary controls */}
        <View className="mb-12 flex-row items-center justify-between px-16">
          <Button
            variant="ghost"
            size="icon"
            radius="full"
            className="h-14 w-14 "
            onPress={() => setIsLiked(!isLiked)}>
            <Heart
              size={28}
              color={isLiked ? '#ef4444' : iconColor}
              fill={isLiked ? '#ef4444' : 'transparent'}
              strokeWidth={isLiked ? 0 : 2}
            />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            radius="full"
            className="h-14 w-14"
            onPress={() => setIsBookmarked(!isBookmarked)}>
            <Bookmark
              size={28}
              color={isBookmarked ? '#FF8A00' : iconColor}
              fill={isBookmarked ? '#FF8A00' : 'transparent'}
              strokeWidth={isBookmarked ? 0 : 2}
            />
          </Button>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" radius="full" className="h-14 w-14 ">
                <Share size={28} color={iconColor} strokeWidth={2} />
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
