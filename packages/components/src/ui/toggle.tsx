import * as React from "react"
import { Pressable, Text, View } from "react-native"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> &
    VariantProps<typeof toggleVariants> & {
      pressed?: boolean
      onPressedChange?: (pressed: boolean) => void
    }
>(({ className, variant, size, pressed, onPressedChange, children, ...props }, ref) => (
  <Pressable
    ref={ref}
    onPress={() => onPressedChange?.(!pressed)}
    className={cn(
      toggleVariants({ variant, size, className }),
      pressed && "bg-accent text-accent-foreground"
    )}
    {...props}
  >
    {typeof children === 'string' ? (
        <Text className={cn("text-sm font-medium", pressed ? "text-accent-foreground" : "text-foreground")}>
            {children}
        </Text>
    ) : (
        // Inject color prop if child is an icon? For now just render child.
        // Users should style their icons based on pressed state if needed, or we can use a context.
        children
    )}
  </Pressable>
))
Toggle.displayName = "Toggle"

export { Toggle, toggleVariants }
