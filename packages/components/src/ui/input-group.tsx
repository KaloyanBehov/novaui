import * as React from "react"
import { View, TextInput, Pressable } from "react-native"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Input } from "./input"
import { Textarea } from "./textarea"
import { Button } from "./button"
import { Text } from "./text"

const InputGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => {
  return (
      <View
        ref={ref}
        className={cn(
          "flex-row items-center rounded-md border border-input bg-background overflow-hidden",
          className
        )}
        {...props}
      />
  )
})
InputGroup.displayName = "InputGroup"

const inputGroupAddonVariants = cva(
  "flex items-center justify-center px-3 bg-muted",
  {
    variants: {
      align: {
        "inline-start": "border-r border-input",
        "inline-end": "border-l border-input",
        "block-start": "border-b border-input w-full",
        "block-end": "border-t border-input w-full",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

const InputGroupAddon = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof inputGroupAddonVariants> & { className?: string }
>(({ className, align = "inline-start", children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(inputGroupAddonVariants({ align }), className)}
      {...props}
    >
        {typeof children === 'string' ? (
            <Text className="text-sm text-muted-foreground font-medium">{children}</Text>
        ) : children}
    </View>
  )
})
InputGroupAddon.displayName = "InputGroupAddon"

const inputGroupButtonVariants = cva(
  "rounded-none bg-transparent",
  {
    variants: {
      size: {
        xs: "h-8 px-2",
        sm: "h-9 px-3",
        "icon-xs": "h-8 w-8 p-0",
        "icon-sm": "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

const InputGroupButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  Omit<React.ComponentProps<typeof Button>, "size"> & VariantProps<typeof inputGroupButtonVariants>
>(({ className, variant = "ghost", size = "xs", ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
})
InputGroupButton.displayName = "InputGroupButton"

const InputGroupText = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(
        "flex items-center justify-center px-3",
        className
      )}
      {...props}
    >
        {typeof children === 'string' ? (
             <Text className="text-sm text-muted-foreground">{children}</Text>
        ) : children}
    </View>
  )
})
InputGroupText.displayName = "InputGroupText"

const InputGroupInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      className={cn(
        "flex-1 border-0 bg-transparent rounded-none focus-visible:ring-0 h-10",
        className
      )}
      {...props}
    />
  )
})
InputGroupInput.displayName = "InputGroupInput"

const InputGroupTextarea = React.forwardRef<
  React.ElementRef<typeof Textarea>,
  React.ComponentProps<typeof Textarea>
>(({ className, ...props }, ref) => {
  return (
    <Textarea
      ref={ref}
      className={cn(
        "flex-1 border-0 bg-transparent rounded-none focus-visible:ring-0 min-h-[80px]",
        className
      )}
      {...props}
    />
  )
})
InputGroupTextarea.displayName = "InputGroupTextarea"

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
