import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { useState } from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import { cn } from '../../lib/utils'

// Hit slop for the button to make it easier to tap on small devices
const DEFAULT_HIT_SLOP = { top: 10, bottom: 10, left: 10, right: 10 }
const buttonVariants = cva(
  'group flex-row items-center justify-center web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary active:opacity-90 web:hover:bg-primary/90',
        destructive: 'bg-destructive active:opacity-90 web:hover:bg-destructive/90',
        outline:
          'border border-input bg-background active:bg-accent web:hover:bg-accent web:hover:text-accent-foreground',
        secondary: 'bg-secondary active:opacity-80 web:hover:bg-secondary/80',
        ghost: 'active:bg-accent web:hover:bg-accent web:hover:text-accent-foreground',
        link: 'web:underline-offset-4 web:hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2 native:h-12 native:px-5 native:py-3',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8 native:h-14',
        icon: 'h-10 w-10',
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        full: 'rounded-full',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
      radius: 'md',
    },
  },
)

const buttonTextVariants = cva('text-sm font-medium web:transition-colors text-center', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground group-active:text-accent-foreground',
      secondary: 'text-secondary-foreground',
      ghost: 'text-foreground group-active:text-accent-foreground',
      link: 'text-primary group-active:underline',
    },
      size: {
        default: 'text-base',
        sm: 'text-sm',
        lg: 'text-xl',
        icon: 'text-base',
      },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants> & {
    label?: string
    labelClasses?: string
    isLoading?: boolean
    disabled?: boolean
    className?: string
  }

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ className, variant, size, radius, label, labelClasses, children, isLoading, disabled, ...props }, ref) => {
    const isDisabled = disabled || isLoading
    const [isPressed, setIsPressed] = useState(false)

    return (
      <Pressable
        className={cn(
          buttonVariants({ variant, size, radius, className }),
          isPressed && 'opacity-80',
          isDisabled && 'opacity-50',
        )}
        ref={ref}
        hitSlop={DEFAULT_HIT_SLOP}
        role="button"
        disabled={isDisabled}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        {...props}
      >
        {isLoading && (
          <View style={label || children ? { marginRight: 8 } : undefined}>
            <ActivityIndicator
              size="small"
              color={variant === 'default' || variant === 'destructive' ? '#ffffff' : undefined}
            />
          </View>
        )}
        {label ? <Text className={cn(buttonTextVariants({ variant, size }), labelClasses)}>{label}</Text> : children}
      </Pressable>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonTextVariants, buttonVariants }
export type { ButtonProps }
