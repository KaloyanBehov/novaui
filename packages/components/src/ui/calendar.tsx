import * as React from "react"
import { View, Pressable } from "react-native"
import { ChevronLeft, ChevronRight } from "lucide-react-native"
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
} from "date-fns"
import { cn } from "../../lib/utils"
import { Text } from "./text"
import { Button, buttonVariants } from "./button"

export type CalendarProps = {
  mode?: "single" | "range" | "multiple"
  selected?: Date | Date[] | { from: Date; to: Date } | undefined
  onSelect?: (date: Date | undefined) => void
  className?: string
  classNames?: Record<string, string>
  showOutsideDays?: boolean
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  mode = "single",
  selected,
  onSelect,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())

  const days = React.useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth))
    const end = endOfWeek(endOfMonth(currentMonth))
    return eachDayOfInterval({ start, end })
  }, [currentMonth])

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1))
  }

  const handleDayPress = (day: Date) => {
    if (mode === "single" && onSelect) {
      onSelect(day)
    }
    // Implement range/multiple logic here if needed
  }

  const isSelected = (day: Date) => {
    if (mode === "single" && selected instanceof Date) {
      return isSameDay(day, selected)
    }
    return false
  }

  return (
    <View className={cn("p-3 bg-background rounded-md border border-border", className)} {...props}>
      <View className="flex-row items-center justify-between mb-4">
        <Button
          variant="outline"
          className="h-7 w-7 p-0 bg-transparent"
          onPress={handlePreviousMonth}
        >
          <ChevronLeft size={14} className="text-foreground" />
        </Button>
        <Text className="text-sm font-medium text-foreground">
          {format(currentMonth, "MMMM yyyy")}
        </Text>
        <Button
          variant="outline"
          className="h-7 w-7 p-0 bg-transparent"
          onPress={handleNextMonth}
        >
          <ChevronRight size={14} className="text-foreground" />
        </Button>
      </View>

      <View className="flex-row mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <View key={day} className="flex-1 items-center justify-center">
            <Text className="text-[0.8rem] text-muted-foreground font-normal">
              {day}
            </Text>
          </View>
        ))}
      </View>

      <View className="flex-row flex-wrap">
        {days.map((day, dayIdx) => {
          const isSelectedDay = isSelected(day)
          const isTodayDay = isToday(day)
          const isOutsideDay = !isSameMonth(day, currentMonth)

          if (isOutsideDay && !showOutsideDays) {
            return <View key={day.toString()} className="w-[14.28%] aspect-square" />
          }

          return (
            <Pressable
              key={day.toString()}
              onPress={() => handleDayPress(day)}
              className={cn(
                "w-[14.28%] aspect-square items-center justify-center",
                isOutsideDay && "opacity-50"
              )}
            >
              <View
                className={cn(
                  "items-center justify-center h-9 w-9 rounded-md",
                  isSelectedDay && "bg-primary",
                  !isSelectedDay && isTodayDay && "bg-accent"
                )}
              >
                <Text
                  className={cn(
                    "text-sm font-normal text-center",
                    isSelectedDay ? "text-primary-foreground" : "text-foreground",
                    isOutsideDay && "text-muted-foreground"
                  )}
                >
                  {format(day, "d")}
                </Text>
              </View>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
