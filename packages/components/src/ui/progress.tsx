import * as React from "react"
import { View } from "react-native"
import { cn } from "../../lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof View> {
  value?: number
  max?: number
  className?: string
}

const Progress = React.forwardRef<React.ElementRef<typeof View>, ProgressProps>(
  ({ className, value = 0, max = 100, ...props }, ref) => {
    const percentage = Math.min(Math.max(value || 0, 0), max) / max * 100

    return (
      <View
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
          className
        )}
        {...props}
      >
        <View
          className="h-full bg-primary"
          style={{ width: `${percentage}%` }}
        />
      </View>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }
