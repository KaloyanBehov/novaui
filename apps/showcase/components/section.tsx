import { H3, Text } from '@novaui/components';
import { ArrowRight } from 'lucide-react-native';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  onSeeAll?: () => void;
}

export function Section({ title, children, onSeeAll }: SectionProps) {
  return (
    <View className="mb-10">
      <View className="mb-5 flex-row items-end justify-between px-6">
        <H3 className="text-foreground text-2xl font-bold tracking-tight">{title}</H3>
        {onSeeAll && (
          <TouchableOpacity
            onPress={onSeeAll}
            hitSlop={12}
            activeOpacity={0.7}
            className="flex-row items-center">
            <Text className="text-brand mr-1 text-sm font-bold">See all</Text>
            <ArrowRight size={16} className="text-brand" />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}>
        {children}
      </ScrollView>
    </View>
  );
}
