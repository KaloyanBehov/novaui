import * as React from "react"
import { View } from "react-native"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Text } from "./text"

const buttonGroupVariants = cva(
  "flex-row items-stretch overflow-hidden rounded-md",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

const ButtonGroupContext = React.createContext<{ orientation?: "horizontal" | "vertical" }>({
  orientation: "horizontal",
})

const ButtonGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof buttonGroupVariants>
>(({ className, orientation = "horizontal", children, ...props }, ref) => {
  return (
    <ButtonGroupContext.Provider value={{ orientation: orientation || "horizontal" }}>
      <View
        ref={ref}
        role="group"
        className={cn(buttonGroupVariants({ orientation }), className)}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child

          const isFirst = index === 0
          const isLast = index === React.Children.count(children) - 1
          
          // We need to override styles of children (Buttons) to remove borders/radius
          // This is tricky in RN without CSS selectors like :first-child
          // So we pass a special prop or style to them if possible, or just rely on the container clipping
          
          // For now, we rely on the container's rounded-md and overflow-hidden to handle the outer radius.
          // For inner borders, we might need to adjust.
          
          // Let's try to clone and add specific styles
          return React.cloneElement(child as React.ReactElement<any>, {
            className: cn(
              child.props.className,
              "rounded-none", // Remove radius from all children
              orientation === "horizontal" && !isFirst && "border-l-0", // Remove left border for non-first items in horizontal
              orientation === "vertical" && !isFirst && "border-t-0", // Remove top border for non-first items in vertical
            )
          })
        })}
      </View>
    </ButtonGroupContext.Provider>
  )
})
ButtonGroup.displayName = "ButtonGroup"

const ButtonGroupText = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(
        "bg-muted flex-row items-center justify-center border border-input px-4 py-2",
        className
      )}
      {...props}
    >
        {typeof children === 'string' ? (
            <Text className="text-sm font-medium text-foreground">{children}</Text>
        ) : children}
    </View>
  )
})
ButtonGroupText.displayName = "ButtonGroupText"

export { ButtonGroup, ButtonGroupText }
