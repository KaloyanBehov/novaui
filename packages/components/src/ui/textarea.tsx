import * as React from "react"
import { TextInput } from "react-native"
import { cn } from "../../lib/utils"

export interface TextareaProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {}

const Textarea = React.forwardRef<React.ElementRef<typeof TextInput>, TextareaProps>(
  ({ className, numberOfLines = 4, placeholderTextColor, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        multiline
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        placeholderTextColor={placeholderTextColor || "hsl(var(--muted-foreground))"}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
