import { Button, Item, ItemContent, ItemMedia, Progress, Text } from '@novaui/components';
import {
  ArrowDownToLine,
  BookOpen,
  Clock,
  Headphones,
  MoreHorizontal,
  StopCircle,
} from 'lucide-react-native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

interface LibraryCardProps {
  name: string;
  author: string;
  image: string;
  duration: string;
  progressPercent: number; // 0 to 100
  timeString: string; // e.g. "60/85 minutes" or "18/40 minutes"
  isEbook?: boolean;
  status?: 'playing' | 'download' | 'downloaded';
}

export function LibraryCard({
  name,
  author,
  image,
  duration,
  progressPercent,
  timeString,
  isEbook,
  status = 'download',
}: LibraryCardProps) {
  return (
    <Item className="bg-card border-border mb-4 flex-row items-start gap-4 rounded-2xl p-4 shadow-sm transition-transform active:scale-[0.98]">
      <ItemMedia className="bg-muted m-0 h-[120px] w-[80px] overflow-hidden rounded-lg">
        <Image source={{ uri: image }} className="h-full w-full" resizeMode="cover" />
      </ItemMedia>

      <ItemContent className="h-[120px] flex-1 justify-between gap-0 py-0.5">
        <View>
          <View className="flex-row items-start justify-between">
            <Text
              className="text-foreground mr-2 flex-1 text-[16px] font-bold leading-tight"
              numberOfLines={2}>
              {name}
            </Text>
            <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <MoreHorizontal size={18} className="text-muted-foreground" />
            </TouchableOpacity>
          </View>
          <Text className="text-muted-foreground mt-1 text-[13px]" numberOfLines={1}>
            by {author}
          </Text>
        </View>

        <View className="mb-3 mt-auto flex-row items-center justify-between">
          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center gap-1.5">
              {isEbook ? (
                <BookOpen size={14} className="text-muted-foreground" color="#8b929e" />
              ) : (
                <Headphones size={14} className="text-muted-foreground" color="#8b929e" />
              )}
              <Text className="text-muted-foreground text-[12px] font-medium">
                {isEbook ? 'Ebook' : 'Audiobook'}
              </Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <Clock size={14} className="text-muted-foreground" color="#8b929e" />
              <Text className="text-muted-foreground text-[12px] font-medium">{duration}</Text>
            </View>
          </View>

          {/* Action Button */}
          <Button
            size="icon"
            variant={status === 'playing' ? 'outline' : 'secondary'}
            className={`h-[32px] w-[32px] rounded-full shadow-none ${status === 'playing' ? 'border-primary/20 bg-transparent' : 'bg-[#e7f5f0]'}`}
            style={status === 'playing' ? {} : { backgroundColor: 'rgba(76, 176, 140, 0.15)' }}>
            {status === 'playing' ? (
              <StopCircle size={16} fill="#FF8A00" color="#FF8A00" />
            ) : (
              <ArrowDownToLine size={16} color="#FF8A00" />
            )}
          </Button>
        </View>

        {/* Progress Section */}
        <View className="flex flex-col gap-2">
          <Progress
            value={progressPercent}
            className="bg-secondary h-[4px]"
            // the thumb or filled track is styled via Progress component default primary color, which we might want to override to match purple if we can't via props easily, let's keep it default primary or specify a color.
            // the progress component in the design has a purple color (#6366f1 roughly). We can rely on primary or just leave it.
          />
          <View className="flex-row items-center justify-between">
            <Text className="text-muted-foreground text-[11px] font-medium">{timeString}</Text>
            <Text className="text-foreground text-[11px] font-bold">
              {Math.round(progressPercent)}%
            </Text>
          </View>
        </View>
      </ItemContent>
    </Item>
  );
}
