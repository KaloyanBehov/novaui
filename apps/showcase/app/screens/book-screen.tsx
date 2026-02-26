import ChaptersSection from '@/components/sections/chapters-section';
import SharePreview from '@/components/share-preview';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { bestSellers } from '@/mock/data';
import {
  AspectRatio,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Drawer,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  H1,
  H4,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Label,
  P,
  Progress,
} from '@novaui/components';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Bookmark,
  BookOpen,
  CalendarDays,
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

export default function BookScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const iconColor = Colors[theme].icon;
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();
  const bookData = bestSellers.find((book) => book.id === id) ?? undefined;

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
      <View className="flex-row items-center justify-between px-5 py-3">
        <Button
          size="icon"
          variant="ghost"
          radius="full"
          onPress={() => router.back()}
          className="h-11 w-11">
          <ChevronDown size={26} color={iconColor} strokeWidth={2} />
        </Button>
        <P className="text-foreground text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Now Playing
        </P>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" radius="full" className="h-11 w-11">
              <MoreHorizontal size={22} color={iconColor} strokeWidth={2} />
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
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}>
        {/* Artwork */}
        <View className="items-center px-8 pt-4 pb-6">
          <View className="w-full shadow-black/15 shadow-xl">
            <AspectRatio
              ratio={1}
              className="border-border overflow-hidden rounded-[32px] border-2">
              <Image
                source={{ uri: bookData?.image }}
                className="h-full w-full"
                resizeMode="cover"
              />
            </AspectRatio>
          </View>
        </View>

        {/* Title & Metadata */}
        <View className="items-center px-8">
          <H1
            className="text-foreground mb-1.5 text-center text-[28px] font-bold leading-tight tracking-tight"
            numberOfLines={2}>
            {bookData?.name ?? '1984'}
          </H1>
          <HoverCard>
            <HoverCardTrigger asChild>
              <P
                className="text-muted-foreground mb-5 text-center text-base font-medium"
                numberOfLines={1}>
                {bookData?.author}
              </P>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <View className="flex-row justify-between gap-4">
                <Avatar>
                  <AvatarImage
                    source={{
                      uri: bookData?.image,
                    }}
                  />
                  <AvatarFallback>{bookData?.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <View className="flex-1 gap-2">
                  <H4 className="text-sm font-semibold">@{bookData?.author}</H4>
                  <P className="text-sm">English novelist and essayist, journalist and critic.</P>
                  <View className="flex-row items-center pt-2">
                    <View className="mr-2">
                      <CalendarDays size={16} className="text-muted-foreground opacity-70" />
                    </View>
                    <P className="text-muted-foreground text-xs">Born June 1903</P>
                  </View>
                </View>
              </View>
            </HoverCardContent>
          </HoverCard>

          {/* Rating */}
          <View className="bg-muted/30 mb-8 flex-row items-center justify-center gap-2.5 rounded-full px-5 py-2">
            <Star size={16} color="#FF8A00" fill="#FF8A00" />
            <P className="text-foreground text-sm font-bold tabular-nums">4.5</P>
            <View className="bg-border h-3.5 w-px" />
            <P className="text-muted-foreground text-sm font-medium">120 reviews</P>
          </View>
        </View>

        {/* Book Info Chips */}
        <View className="mb-8 flex-row flex-wrap items-center justify-center gap-3 px-6">
          <View className="bg-muted/20 flex-row items-center gap-2 rounded-2xl px-4 py-3">
            <Clock size={16} color={iconColor} strokeWidth={2} />
            <P className="text-foreground text-sm font-semibold">3h 45m</P>
          </View>
          <View className="bg-muted/20 flex-row items-center gap-2 rounded-2xl px-4 py-3">
            <BookOpen size={16} color={iconColor} strokeWidth={2} />
            <P className="text-foreground text-sm font-semibold">7 Chapters</P>
          </View>
          <View className="bg-muted/20 flex-row items-center gap-2 rounded-2xl px-4 py-3">
            <Globe size={16} color={iconColor} strokeWidth={2} />
            <P className="text-foreground text-sm font-semibold">English</P>
          </View>
        </View>

        {/* Summary */}
        <View className="mb-10 px-8">
          <P
            className="text-muted-foreground text-center text-[15px] font-medium leading-[1.5]"
            numberOfLines={4}>
            {bookData?.description ??
              'Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real.'}
          </P>
        </View>

        {/* Progress */}
        <View className="mb-10 gap-3 px-8">
          <Progress className="bg-muted/30 h-2.5 w-full rounded-full" value={progress} />
          <View className="flex-row items-center justify-between">
            <P className="text-muted-foreground text-xs font-semibold tabular-nums">
              {formatTime(currentSeconds)}
            </P>
            <P className="text-muted-foreground text-xs font-semibold tabular-nums">
              -{formatTime(remainingSeconds)}
            </P>
          </View>
        </View>

        {/* Primary Controls */}
        <View className="mb-10 flex-row items-center justify-center gap-10 px-6">
          <Button size="icon" variant="ghost" radius="full" className="h-14 w-14">
            <SkipBack size={28} color={iconColor} strokeWidth={1.5} fill={iconColor} />
          </Button>

          <Button
            size="icon"
            radius="full"
            className="h-[72px] w-[72px] bg-orange-500 shadow-lg shadow-orange-500/40"
            onPress={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <Pause size={36} color="#fff" fill="#fff" />
            ) : (
              <Play size={36} color="#fff" fill="#fff" style={{ marginLeft: 4 }} />
            )}
          </Button>

          <Button size="icon" variant="ghost" radius="full" className="h-14 w-14">
            <SkipForward size={28} color={iconColor} strokeWidth={1.5} fill={iconColor} />
          </Button>
        </View>

        {/* Secondary controls */}
        <View className="mb-12 flex-row items-center justify-between px-12">
          <Button
            variant="ghost"
            size="icon"
            radius="full"
            className="h-12 w-12"
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
            className="h-12 w-12"
            onPress={() => setIsBookmarked(!isBookmarked)}>
            <Bookmark
              size={26}
              color={isBookmarked ? '#FF8A00' : iconColor}
              fill={isBookmarked ? '#FF8A00' : 'transparent'}
              strokeWidth={isBookmarked ? 0 : 2}
            />
          </Button>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" radius="full" className="h-12 w-12">
                <Share size={26} color={iconColor} strokeWidth={2} />
              </Button>
            </DrawerTrigger>
            <SharePreview
              image={bookData?.image ?? ''}
              title={bookData?.name ?? ''}
              description={bookData?.description ?? ''}
            />
          </Drawer>
        </View>

        <ChaptersSection isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      </ScrollView>
    </SafeAreaView>
  );
}
