import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { View } from 'react-native'
import { cn } from '../../lib/utils'
import { Text } from './text'

const emptyVariants = cva('min-w-0 w-full flex-col gap-6', {
  variants: {
    layout: {
      screen: 'flex-1 items-center justify-center',
      inline: 'items-center justify-start',
    },
    padding: {
      none: '',
      sm: 'px-4 py-4',
      md: 'px-6 py-6',
      lg: 'px-6 py-10',
    },
  },
  defaultVariants: {
    layout: 'screen',
    padding: 'md',
  },
})

const emptyHeaderVariants = cva('w-full max-w-sm flex-col items-center', {
  variants: {
    spacing: {
      sm: 'gap-1.5',
      md: 'gap-3',
      lg: 'gap-4',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
})

// Icon size mapping based on container size
const iconSizeMap = {
  sm: 20,
  icon: 24,
  lg: 32,
  xl: 40,
} as const

const emptyMediaVariants = cva(
  'flex shrink-0 items-center justify-center rounded-lg border border-border/50 bg-background/50 text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-transparent border-0',
        icon: 'border border-border bg-muted shadow-sm shadow-black/5',
      },
      size: {
        sm: 'size-10',
        icon: 'size-14',
        lg: 'size-16',
        xl: 'size-20',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'icon',
    },
  },
)

type EmptyProps = React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof emptyVariants>

const Empty = React.forwardRef<React.ElementRef<typeof View>, EmptyProps>(
  ({ className, layout, padding, ...props }, ref) => (
    <View ref={ref} className={cn(emptyVariants({ layout, padding }), className)} {...props} />
  ),
)
Empty.displayName = 'Empty'

type EmptyHeaderProps = React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof emptyHeaderVariants>

const EmptyHeader = React.forwardRef<React.ElementRef<typeof View>, EmptyHeaderProps>(
  ({ className, spacing, ...props }, ref) => (
    <View ref={ref} className={cn(emptyHeaderVariants({ spacing }), className)} {...props} />
  ),
)
EmptyHeader.displayName = 'EmptyHeader'

type EmptyMediaProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof emptyMediaVariants> & {
    iconSize?: number
  }

const EmptyMedia = React.forwardRef<React.ElementRef<typeof View>, EmptyMediaProps>(
  ({ className, variant = 'default', size = 'icon', iconSize, children, accessible, ...props }, ref) => {
    // Calculate icon size based on container size if not explicitly provided
    const calculatedIconSize = iconSize ?? iconSizeMap[size ?? 'icon']

    // Clone children and apply icon size if it's a React element
    const childrenWithSize = React.Children.map(children, child => {
      if (React.isValidElement(child) && typeof child.type !== 'string') {
        const childProps = child.props as any
        const newProps: any = {}

        // Apply size prop for icon libraries that support it (Ionicons, lucide-react-native, etc.)
        if ('size' in childProps || childProps.size !== undefined) {
          newProps.size = calculatedIconSize
        }

        // Apply width/height props if they exist
        if ('width' in childProps || childProps.width !== undefined) {
          newProps.width = calculatedIconSize
        }
        if ('height' in childProps || childProps.height !== undefined) {
          newProps.height = calculatedIconSize
        }

        // Handle className-based sizing (for lucide-react-native and similar)
        if ('className' in childProps || childProps.className !== undefined) {
          const existingClassName = childProps.className || ''
          // Remove existing size classes and add new ones
          const sizeClass = `h-[${calculatedIconSize}px] w-[${calculatedIconSize}px]`
          newProps.className = cn(existingClassName, sizeClass)
        }

        // Only clone if we have props to update
        if (Object.keys(newProps).length > 0) {
          return React.cloneElement(child as React.ReactElement<any>, newProps)
        }
      }
      return child
    })

    return (
      <View
        ref={ref}
        className={cn('relative items-center justify-center', className)}
        accessible={accessible ?? false}
        accessibilityElementsHidden={accessible === true ? undefined : true}
        importantForAccessibility={accessible === true ? undefined : 'no-hide-descendants'}
        {...props}
      >
        {variant === 'icon' ? (
          <>
            <View
              className={cn(
                emptyMediaVariants({ variant, size }),
                'absolute bottom-0 -translate-x-6 -rotate-12 scale-90  shadow-none bg-muted/60 border-border/90',
              )}
            />
            <View
              className={cn(
                emptyMediaVariants({ variant, size }),
                'absolute bottom-0 translate-x-6 rotate-12 scale-90  shadow-none bg-muted/60 border-border/90',
              )}
            />
          </>
        ) : null}
        <View className={cn(emptyMediaVariants({ variant, size }))}>{childrenWithSize}</View>
      </View>
    )
  },
)
EmptyMedia.displayName = 'EmptyMedia'

const EmptyTitle = React.forwardRef<React.ElementRef<typeof Text>, React.ComponentPropsWithoutRef<typeof Text>>(
  ({ className, accessibilityRole, ...props }, ref) => (
    <Text
      ref={ref}
      accessibilityRole={accessibilityRole ?? 'header'}
      className={cn('text-center text-xl font-semibold leading-tight text-foreground', className)}
      {...props}
    />
  ),
)
EmptyTitle.displayName = 'EmptyTitle'

const EmptyDescription = React.forwardRef<React.ElementRef<typeof Text>, React.ComponentPropsWithoutRef<typeof Text>>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      className={cn('text-center text-sm leading-relaxed text-muted-foreground max-w-xs', className)}
      {...props}
    />
  ),
)
EmptyDescription.displayName = 'EmptyDescription'

const EmptyContent = React.forwardRef<React.ElementRef<typeof View>, React.ComponentPropsWithoutRef<typeof View>>(
  ({ className, ...props }, ref) => (
    <View ref={ref} className={cn('w-full min-w-0 max-w-sm flex-col items-center gap-3 mt-2', className)} {...props} />
  ),
)
EmptyContent.displayName = 'EmptyContent'

export { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle }
