import * as React from "react"
import { Pressable, View } from "react-native"
import { Check } from "lucide-react-native"
import { cn } from "../../lib/utils"

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<React.ElementRef<typeof Pressable>, CheckboxProps>(
  ({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
    return (
      <Pressable
        ref={ref}
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onPress={() => onCheckedChange?.(!checked)}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary bg-background web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          checked && "bg-primary text-primary-foreground",
          className
        )}
        {...props}
      >
        {checked && (
          <View className="flex items-center justify-center h-full w-full">
            <Check size={12} className="text-primary-foreground" color="white" strokeWidth={3} />
          </View>
        )}
      </Pressable>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
