import { AspectRatio, Badge, Card, Text } from '@novaui/components';
import { BookOpen, Headphones, Star, Timer } from 'lucide-react-native';
import React from 'react';
import { Image, View } from 'react-native';

interface BookCardProps {
  name: string;
  author: string;
  image: string;
  rating: number;
  duration: string;
  isEbook?: boolean;
}

export function BookCard({ name, author, image, rating, duration, isEbook }: BookCardProps) {
  return (
    <Card className="w-[160px] gap-2.5 border-0 bg-transparent p-0 shadow-none">
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 20 },
          shadowOpacity: 0.15,
          shadowRadius: 30,
          elevation: 20,
        }}>
        <AspectRatio ratio={4 / 3} className="relative w-full overflow-hidden rounded-2xl">
          <Image source={{ uri: image }} className="h-full w-full" resizeMode="cover" />
          <Badge variant="default" className="bg-background/90 absolute left-2 top-2">
            <Star size={12} fill="#FACC15" color="#FACC15" className="mr-1" />
            <Text className="text-foreground text-[10px] font-bold">{rating.toFixed(1)}</Text>
          </Badge>
        </AspectRatio>
      </View>
      <View className="flex flex-col gap-0.5">
        <Text className="text-foreground text-[15px] font-semibold leading-tight" numberOfLines={1}>
          {name}
        </Text>
        <Text className="text-muted-foreground text-xs" numberOfLines={1}>
          by {author}
        </Text>
      </View>
      <View className="mt-1 flex-row items-center justify-between">
        <View className="flex-row items-center gap-1.5">
          {isEbook ? (
            <BookOpen size={14} className="text-muted-foreground" color="#8b929e" />
          ) : (
            <Headphones size={14} className="text-muted-foreground" color="#8b929e" />
          )}
          <Text className="text-muted-foreground text-[11px] font-medium">
            {isEbook ? 'Ebook' : 'Audiobook'}
          </Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Timer size={14} className="text-muted-foreground" color="#8b929e" />
          <Text className="text-muted-foreground text-[11px] font-medium">{duration}</Text>
        </View>
      </View>
    </Card>
  );
}
