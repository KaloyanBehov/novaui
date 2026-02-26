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
    <View className="mb-12">
      <View className="mb-4 flex-row items-center justify-between px-6">
        <H3 className="text-foreground flex-1 text-2xl font-bold leading-tight tracking-tight">
          {title}
        </H3>
        {onSeeAll && (
          <TouchableOpacity
            onPress={onSeeAll}
            hitSlop={12}
            activeOpacity={0.7}
            className="flex-row items-center py-2 pr-1">
            <Text className="text-brand mr-1.5 text-sm font-semibold">See all</Text>
            <ArrowRight size={16} className="text-brand" />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingRight: 24, gap: 20 }}>
        {children}
      </ScrollView>
    </View>
  );
}
