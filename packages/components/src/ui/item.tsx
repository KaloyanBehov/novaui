import * as React from "react"
import { View, Pressable } from "react-native"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Separator } from "./separator"
import { Text } from "./text"

const ItemGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      role="list"
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
})
ItemGroup.displayName = "ItemGroup"

const ItemSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      orientation="horizontal"
      className={cn("my-0", className)}
      {...props}
    />
  )
})
ItemSeparator.displayName = "ItemSeparator"

const itemVariants = cva(
  "flex-row items-center border border-transparent rounded-md flex-wrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50",
      },
      size: {
        default: "p-4 gap-4",
        sm: "py-3 px-4 gap-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Item = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> &
    VariantProps<typeof itemVariants> & { className?: string }
>(({ className, variant, size, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
})
Item.displayName = "Item"

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "h-8 w-8 border border-border rounded-sm bg-muted",
        image: "h-10 w-10 rounded-sm overflow-hidden",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const ItemMedia = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof itemMediaVariants> & { className?: string }
>(({ className, variant, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
})
ItemMedia.displayName = "ItemMedia"

const ItemContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(
        "flex flex-1 flex-col gap-1",
        className
      )}
      {...props}
    />
  )
})
ItemContent.displayName = "ItemContent"

const ItemTitle = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(
        "flex-row w-full items-center gap-2",
        className
      )}
      {...props}
    >
        {typeof children === 'string' ? (
            <Text className="text-sm font-medium leading-snug">{children}</Text>
        ) : children}
    </View>
  )
})
ItemTitle.displayName = "ItemTitle"

const ItemDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={cn(
        "text-muted-foreground text-sm leading-normal font-normal",
        className
      )}
      numberOfLines={2}
      {...props}
    />
  )
})
ItemDescription.displayName = "ItemDescription"

const ItemActions = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn("flex-row items-center gap-2", className)}
      {...props}
    />
  )
})
ItemActions.displayName = "ItemActions"

const ItemHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(
        "flex-row w-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
})
ItemHeader.displayName = "ItemHeader"

const ItemFooter = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(
        "flex-row w-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
})
ItemFooter.displayName = "ItemFooter"

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}
