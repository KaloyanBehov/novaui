import { cn } from '@/lib/utils';
import { AspectRatio, Badge, Card, Text } from '@novaui/components';
import { BookOpen, Headphones, Star, Timer } from 'lucide-react-native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface BookCardProps {
  name: string;
  author: string;
  image: string;
  rating: number;
  duration: string;
  isEbook?: boolean;
  onPress?: () => void;
  className?: string;
}

export function BookCard({
  name,
  author,
  image,
  rating,
  duration,
  isEbook,
  onPress,
  className,
}: BookCardProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const iconColor = isDark ? '#9BA1A6' : '#687076'; // Using muted colors for these icons

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={cn('w-[160px]', className)}>
      <Card className="w-full gap-3 border-0 bg-transparent p-0 shadow-none">
        <View className="shadow-lg shadow-black/15">
          <AspectRatio ratio={1} className="relative w-full overflow-hidden rounded-2xl">
            <Image source={{ uri: image }} className="h-full w-full" resizeMode="cover" />
            <Badge
              variant="default"
              className="bg-background/90 absolute left-2.5 top-2.5 border-0 px-1.5 py-0.5 shadow-sm">
              <Star size={10} fill="#FF8A00" color="#FF8A00" className="mr-1" />
              <Text className="text-foreground text-[10px] font-bold tabular-nums">
                {rating.toFixed(1)}
              </Text>
            </Badge>
          </AspectRatio>
        </View>
        <View className="flex flex-col gap-0.5 px-0.5">
          <Text
            className="text-foreground text-base font-bold leading-tight tracking-tight"
            numberOfLines={1}>
            {name}
          </Text>
          <Text className="text-muted-foreground text-xs font-medium" numberOfLines={1}>
            {author}
          </Text>
        </View>

        <View className="mt-0.5 flex-row items-center justify-between px-0.5">
          <View className="flex-row items-center gap-1.5">
            {isEbook ? (
              <BookOpen size={13} color={iconColor} />
            ) : (
              <Headphones size={13} color={iconColor} />
            )}
            <Text className="text-muted-foreground/80 text-[10px] font-semibold uppercase tracking-wider">
              {isEbook ? 'Ebook' : 'Audio'}
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Timer size={13} color={iconColor} />
            <Text className="text-muted-foreground/80 text-[10px] font-semibold tabular-nums">
              {duration}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}
