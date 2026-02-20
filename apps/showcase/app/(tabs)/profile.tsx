import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Separator,
  Text,
} from '@novaui/components';
import { Image } from 'expo-image';
import { Grid3x3, Menu, PersonStanding, Play, Plus, UserRoundPlus } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ─── Mock data ────────────────────────────────────────────────────────────────

const STORIES = [
  { id: '1', label: 'Text here', image: 'https://picsum.photos/seed/s1/80/80' },
  { id: '2', label: 'Text here', image: 'https://picsum.photos/seed/s2/80/80' },
  { id: '3', label: 'Text here', image: 'https://picsum.photos/seed/s3/80/80' },
  { id: '4', label: 'Text here', image: 'https://picsum.photos/seed/s4/80/80' },
  { id: '5', label: 'Text here', image: 'https://picsum.photos/seed/s5/80/80' },
];

const POSTS = [
  { id: '1', image: 'https://picsum.photos/seed/p1/400/400', hasReel: false },
  { id: '2', image: 'https://picsum.photos/seed/p2/400/400', hasReel: true },
  { id: '3', image: 'https://picsum.photos/seed/p3/400/400', hasReel: false },
  { id: '4', image: 'https://picsum.photos/seed/p4/400/400', hasReel: false },
  { id: '5', image: 'https://picsum.photos/seed/p5/400/400', hasReel: false },
  { id: '6', image: 'https://picsum.photos/seed/p6/400/400', hasReel: true },
];

const FOLLOWERS_PREVIEW = [
  'https://picsum.photos/seed/f1/40/40',
  'https://picsum.photos/seed/f2/40/40',
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatColumn({ value, label }: { value: string; label: string }) {
  return (
    <View className="flex-1 items-center gap-0.5">
      <Text className="text-foreground text-base font-bold">{value}</Text>
      <Text className="text-foreground text-xs">{label}</Text>
    </View>
  );
}

function StoryCircle({ image, label }: { image: string; label: string }) {
  return (
    <Pressable className="items-center gap-1.5" style={{ width: 68 }}>
      {/* Ring border */}
      <View
        style={{
          width: 68,
          height: 68,
          borderRadius: 34,
          borderWidth: 3,
          borderColor: '#E1306C',
          padding: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            overflow: 'hidden',
          }}>
          <Image source={image} style={{ width: 56, height: 56 }} contentFit="cover" />
        </View>
      </View>
      <Text className="text-foreground text-xs" numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

type GridTab = 'grid' | 'reels' | 'tagged';

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<GridTab>('grid');

  return (
    <SafeAreaView className="bg-background flex-1" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}>
        {/* ── Top bar ─────────────────────────────────────── */}
        <View className="flex-row items-center justify-between px-4 py-2">
          <View className="flex-row items-center gap-1.5">
            <Text className="text-foreground text-2xl font-bold">username</Text>
            <Badge variant="destructive" label="10+" className="rounded-full px-1.5 py-0" />
          </View>
          <View className="flex-row items-center gap-4">
            <Pressable className="h-9 w-9 items-center justify-center">
              <Plus size={22} className="text-foreground" />
            </Pressable>
            <Pressable className="h-9 w-9 items-center justify-center">
              <Menu size={22} className="text-foreground" />
            </Pressable>
          </View>
        </View>

        {/* ── Profile header ──────────────────────────────── */}
        <View className="flex-row items-center gap-4 px-4 pb-4 pt-2">
          {/* Avatar with gradient ring */}
          <View
            style={{
              width: 84,
              height: 84,
              borderRadius: 42,
              padding: 3,
              borderWidth: 3,
              borderColor: '#E1306C',
            }}>
            <Avatar size="lg" className="h-[74px] w-[74px]">
              <AvatarImage src="https://picsum.photos/seed/profile/200/200" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </View>

          {/* Stats */}
          <View className="flex-1 flex-row justify-around">
            <StatColumn value="1,234" label="Posts" />
            <StatColumn value="5,678" label="Followers" />
            <StatColumn value="9,101" label="Following" />
          </View>
        </View>

        {/* ── Bio ─────────────────────────────────────────── */}
        <View className="gap-0.5 px-4 pb-3">
          <Text className="text-foreground text-sm font-bold">Username</Text>
          <Text className="text-muted-foreground text-sm">Category/Genre text</Text>
          <Text className="text-foreground text-sm leading-[20px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt <Text className="text-sm text-blue-500">#hashtag</Text>
          </Text>
          <Text className="mt-0.5 text-sm font-semibold text-blue-500">Link goes here</Text>
        </View>

        {/* ── Followers preview ────────────────────────────── */}
        <View className="flex-row items-center gap-2 px-4 pb-4">
          <View className="flex-row">
            {FOLLOWERS_PREVIEW.map((uri, i) => (
              <View
                key={uri}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  marginLeft: i > 0 ? -8 : 0,
                  borderWidth: 1.5,
                  borderColor: 'white',
                  overflow: 'hidden',
                }}>
                <Image source={uri} style={{ width: 24, height: 24 }} contentFit="cover" />
              </View>
            ))}
          </View>
          <Text className="text-foreground flex-1 flex-wrap text-xs" numberOfLines={2}>
            Followed by <Text className="text-xs font-bold">username, username</Text> and{' '}
            <Text className="text-xs font-bold">100 others</Text>
          </Text>
        </View>

        {/* ── Action buttons ───────────────────────────────── */}
        <View className="flex-row items-center gap-2 px-4 pb-4">
          <Button
            variant="secondary"
            className="bg-muted h-9 flex-1 rounded-lg"
            size="sm"
            label="Edit profile"
            labelClasses="text-foreground text-sm font-semibold"
          />
          <Pressable className="bg-muted h-9 w-9 items-center justify-center rounded-lg">
            <UserRoundPlus size={18} className="text-foreground" />
          </Pressable>
        </View>

        {/* ── Story highlights ─────────────────────────────── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 12, paddingBottom: 8 }}>
          {STORIES.map((story) => (
            <StoryCircle key={story.id} image={story.image} label={story.label} />
          ))}
        </ScrollView>

        <Separator className="mt-2" />

        {/* ── Content tabs ─────────────────────────────────── */}
        <View className="flex-row">
          {(
            [
              { key: 'grid', Icon: Grid3x3 },
              { key: 'reels', Icon: Play },
              { key: 'tagged', Icon: PersonStanding },
            ] as { key: GridTab; Icon: React.ElementType }[]
          ).map(({ key, Icon }) => (
            <Pressable
              key={key}
              onPress={() => setActiveTab(key)}
              className="flex-1 items-center py-3"
              style={{
                borderBottomWidth: activeTab === key ? 1.5 : 0,
                borderBottomColor: activeTab === key ? '#000' : 'transparent',
              }}>
              <Icon
                size={22}
                className={activeTab === key ? 'text-foreground' : 'text-muted-foreground'}
              />
            </Pressable>
          ))}
        </View>

        {/* ── Photo grid ───────────────────────────────────── */}
        <View className="flex-row flex-wrap">
          {POSTS.map((post, i) => (
            <View
              key={post.id}
              style={{
                width: '33.33%',
                aspectRatio: 1,
                padding: 0.75,
              }}>
              <View style={{ flex: 1, overflow: 'hidden' }}>
                <Image
                  source={post.image}
                  style={{ width: '100%', height: '100%' }}
                  contentFit="cover"
                />
                {/* Reel badge overlay */}
                {post.hasReel && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 6,
                      right: 6,
                    }}>
                    <View
                      className="items-center justify-center rounded-sm bg-black/60"
                      style={{ width: 20, height: 20 }}>
                      <Play size={10} color="white" fill="white" />
                    </View>
                  </View>
                )}
                {/* Multi-photo badge */}
                {i === 2 && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 6,
                      right: 6,
                    }}>
                    <View
                      className="items-center justify-center rounded-sm bg-black/60"
                      style={{ width: 20, height: 20 }}>
                      <Grid3x3 size={10} color="white" />
                    </View>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
