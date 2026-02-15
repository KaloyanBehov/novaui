import * as React from "react"
import { View, Text } from "react-native"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 web:transition-colors web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary shadow web:hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary web:hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive shadow web:hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const badgeTextVariants = cva("text-xs font-semibold", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive-foreground",
      outline: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface BadgeProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof badgeVariants> {
    label?: string
    labelClasses?: string
}

function Badge({ className, variant, label, labelClasses, children, ...props }: BadgeProps) {
  return (
    <View className={cn(badgeVariants({ variant }), className)} {...props}>
      {label ? (
         <Text className={cn(badgeTextVariants({ variant }), labelClasses)}>{label}</Text>
      ) : (
        children
      )}
    </View>
  )
}

export { Badge, badgeVariants }
