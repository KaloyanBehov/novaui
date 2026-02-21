import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { cn } from '../../lib/utils';
import { Button } from './button';
import { Text } from './text';

export type CalendarProps = {
  mode?: 'single' | 'range' | 'multiple';
  selected?: Date | Date[] | { from: Date; to: Date } | undefined;
  onSelect?: (date: Date | undefined) => void;
  className?: string;
  classNames?: Record<string, string>;
  showOutsideDays?: boolean;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  mode = 'single',
  selected,
  onSelect,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const days = React.useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const handleDayPress = (day: Date) => {
    if (mode === 'single' && onSelect) {
      onSelect(day);
    }
    // Implement range/multiple logic here if needed
  };

  const isSelected = (day: Date) => {
    if (mode === 'single' && selected instanceof Date) {
      return isSameDay(day, selected);
    }
    return false;
  };

  return (
    <View className={cn('bg-background border-border rounded-md border p-3', className)} {...props}>
      <View className="mb-4 flex-row items-center justify-between">
        <Button
          variant="outline"
          className="h-7 w-7 bg-transparent p-0"
          onPress={handlePreviousMonth}>
          <ChevronLeft size={14} className="text-foreground" />
        </Button>
        <Text className="text-foreground text-sm font-medium">
          {format(currentMonth, 'MMMM yyyy')}
        </Text>
        <Button variant="outline" className="h-7 w-7 bg-transparent p-0" onPress={handleNextMonth}>
          <ChevronRight size={14} className="text-foreground" />
        </Button>
      </View>

      <View className="mb-2 flex-row">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <View key={day} className="flex-1 items-center justify-center">
            <Text className="text-muted-foreground text-[0.8rem] font-normal">{day}</Text>
          </View>
        ))}
      </View>

      <View className="flex-row flex-wrap">
        {days.map((day, dayIdx) => {
          const isSelectedDay = isSelected(day);
          const isTodayDay = isToday(day);
          const isOutsideDay = !isSameMonth(day, currentMonth);

          if (isOutsideDay && !showOutsideDays) {
            return <View key={day.toString()} className="aspect-square w-[14.28%]" />;
          }

          return (
            <Pressable
              key={day.toString()}
              onPress={() => handleDayPress(day)}
              className={cn(
                'aspect-square w-[14.28%] items-center justify-center',
                isOutsideDay && 'opacity-50'
              )}>
              <View
                className={cn(
                  'h-9 w-9 items-center justify-center rounded-md',
                  isSelectedDay && 'bg-primary',
                  !isSelectedDay && isTodayDay && 'bg-accent'
                )}>
                <Text
                  className={cn(
                    'text-center text-sm font-normal',
                    isSelectedDay ? 'text-primary-foreground' : 'text-foreground',
                    isOutsideDay && 'text-muted-foreground'
                  )}>
                  {format(day, 'd')}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };
