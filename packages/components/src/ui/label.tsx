import * as React from "react"
import { Text, Pressable } from "react-native"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none text-foreground web:peer-disabled:cursor-not-allowed web:peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text> &
    VariantProps<typeof labelVariants> & { onPress?: () => void }
>(({ className, onPress, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn(labelVariants(), className)}
    onPress={onPress}
    {...props}
  />
))
Label.displayName = "Label"

export { Label }
