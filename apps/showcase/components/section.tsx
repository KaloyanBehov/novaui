import { H3 } from '@novaui/components';
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
    <View className="mb-8">
      <View className="mb-4 flex-row items-center justify-between px-6">
        <H3 className="text-foreground text-xl font-bold tracking-tight">{title}</H3>
        {onSeeAll && (
          <TouchableOpacity onPress={onSeeAll} hitSlop={8}>
            <ArrowRight
              size={20}
              className=" text-[#FF8A00]"
              color="#FF8A00"
            />
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
