import * as React from "react"
import { View, Pressable } from "react-native"
import { Circle } from "lucide-react-native"
import { cn } from "../../lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    value?: string
    onValueChange?: (value: string) => void
    className?: string
  }
>(({ className, value, onValueChange, children, ...props }, ref) => {
  return (
    <View ref={ref} className={cn("gap-2", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            // @ts-ignore
            checked: child.props.value === value,
            // @ts-ignore
            onPress: () => onValueChange?.(child.props.value),
          })
        }
        return child
      })}
    </View>
  )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    value: string
    checked?: boolean
    className?: string
  }
>(({ className, value, checked, ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary web:ring-offset-background web:focus:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 items-center justify-center",
        className
      )}
      {...props}
    >
      {checked && (
        <View className="h-2.5 w-2.5 rounded-full bg-primary" />
      )}
    </Pressable>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
