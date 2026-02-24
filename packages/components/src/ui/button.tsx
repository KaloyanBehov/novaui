import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { ActivityIndicator, Pressable, type PressableStateCallbackType } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { cn } from '../../lib/utils';
import { Text } from './text';

// ─── Variants ─────────────────────────────────────────────────────────────────

const buttonVariants = cva(
  // Base — web:* and native:* prefixes removed; cleaned to native-only classes
  'flex-row items-center justify-center gap-2 disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary active:opacity-90',
        destructive: 'bg-destructive active:opacity-90',
        outline: 'border-input bg-background active:bg-accent border',
        secondary: 'bg-secondary active:opacity-80',
        ghost: 'hover:bg-accent/20',
        /**
         * FIX: link variant had only web-only underline classes — no visual
         * distinction on native at all. Added padding-bottom for a native
         * underline-like affordance; text underline is handled in buttonTextVariants.
         */
        link: 'active:opacity-70',
      },
      size: {
        default: 'h-12 rounded-md px-5',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-14 rounded-lg px-8',
        icon: 'h-12 w-12 rounded-md',
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
  }
);
// ─── Pressed overlay colors per variant ──────────────────────────────────────
// Driven via JS instead of active: CSS classes, which get stuck on native.
const PRESSED_OVERLAY: Record<string, string> = {
  default: 'bg-primary/80',
  destructive: 'bg-destructive/80',
  outline: 'bg-accent',
  secondary: 'bg-secondary/70',
  ghost: 'bg-accent',
  link: '',
};
/**
 * Text variants — kept in sync with buttonVariants sizes.
 * FIX: removed the orphaned `md` size that had no matching buttonVariants entry.
 */
const buttonTextVariants = cva('text-center font-medium', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
      secondary: 'text-secondary-foreground',
      ghost: 'text-foreground',
      // FIX: native underline applied here on the Text node (not the Pressable)
      link: 'text-primary underline underline-offset-4',
    },
    size: {
      default: 'text-base',
      sm: 'text-sm',
      lg: 'text-lg',
      icon: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

// ─── Hit slop ─────────────────────────────────────────────────────────────────

/**
 * Only apply hitSlop to sizes that don't already meet 44pt minimum.
 * default (48pt) and lg (56pt) already exceed the threshold.
 * sm (36pt) and icon (48pt — but visually feels smaller) get extra area.
 */
const HIT_SLOP_BY_SIZE: Record<
  string,
  { top: number; bottom: number; left: number; right: number } | undefined
> = {
  sm: { top: 4, bottom: 4, left: 8, right: 8 }, // 36 → 44pt vertically
  icon: { top: 4, bottom: 4, left: 4, right: 4 }, // extra comfort area
};

// ─── Spring config for press feedback ────────────────────────────────────────

const PRESS_SPRING = { damping: 15, stiffness: 400, mass: 0.5 };

// ─── Types ────────────────────────────────────────────────────────────────────

type ButtonProps = Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'children'> &
  VariantProps<typeof buttonVariants> & {
    label?: string;
    labelClasses?: string;
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode | ((state: PressableStateCallbackType) => React.ReactNode);
  };

// ─── Component ────────────────────────────────────────────────────────────────

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      radius,
      label,
      labelClasses,
      children,
      isLoading,
      disabled,
      onPress,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    // ── Scale animation ───────────────────────────────────────────────────
    // Replaces the manual isPressed useState + opacity approach.
    // A spring scale gives a satisfying physical press feel without
    // the extra re-render that setState causes on every press/release.
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
      scale.value = withSpring(0.97, PRESS_SPRING);
    };

    const handlePressOut = () => {
      scale.value = withSpring(1, PRESS_SPRING);
    };

    // ── Spinner color ─────────────────────────────────────────────────────
    // FIX: ActivityIndicator doesn't accept className — it needs a `color` prop.
    // Derive the correct spinner color from the variant.
    const spinnerColor = (() => {
      switch (variant) {
        case 'default':
          return 'hsl(var(--primary-foreground))';
        case 'destructive':
          return 'hsl(var(--destructive-foreground))';
        case 'outline':
        case 'ghost':
        case 'link':
          return 'hsl(var(--foreground))';
        case 'secondary':
          return 'hsl(var(--secondary-foreground))';
        default:
          return 'hsl(var(--primary-foreground))';
      }
    })();

    return (
      <Animated.View style={animatedStyle}>
        <Pressable
          ref={ref}
          accessibilityRole="button"
          disabled={isDisabled}
          hitSlop={HIT_SLOP_BY_SIZE[size ?? 'default']}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onPress}
          className={cn(
            buttonVariants({ variant, size, radius }),
            isDisabled && 'opacity-50',
            className
          )}
          {...props}>
          {isLoading && (
            <ActivityIndicator
              size="small"
              color={spinnerColor}
              style={label || children ? { marginRight: 4 } : undefined}
            />
          )}

          {/* Label prop takes priority over children for simple text buttons */}
          {label ? (
            <Text className={cn(buttonTextVariants({ variant, size }), labelClasses)}>{label}</Text>
          ) : typeof children === 'function' ? (
            // FIX: render-prop children were silently dropped via the
            // `childrenNode` pattern. Delegate properly to Pressable.
            (children as (state: PressableStateCallbackType) => React.ReactNode)({ pressed: false })
          ) : (
            children
          )}
        </Pressable>
      </Animated.View>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
