import * as React from "react"
import { View } from "react-native"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Text } from "./text"

const alertVariants = cva(
  "relative w-full rounded-lg border border-border p-4",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> &
    VariantProps<typeof alertVariants> & {
      icon?: React.ReactNode
    }
>(({ className, variant, children, icon, ...props }, ref) => {
  
  // If an icon is provided explicitly prop, or we try to detect it (hard in RN without slots)
  // We will use a simpler approach: 
  // If the user passes an icon, they should probably wrap it or we just rely on absolute positioning if they follow the pattern.
  // But to make it robust, let's support an 'icon' prop OR just children.
  
  // To match shadcn API (children only), we can try to use the absolute positioning hack
  // which is what the original code did.
  
  return (
    <View
      ref={ref}
      role="alert"
      className={cn(
        alertVariants({ variant }), 
        // If we have an SVG child, we want to add padding. 
        // NativeWind v4 supports has-[...] but it depends on the structure.
        // Let's try to just style the SVG if it exists.
        "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
        variant === "destructive" && "[&>svg]:text-destructive",
        className
      )}
      {...props}
    >
      {children}
    </View>
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight text-foreground", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
