import { cva, type VariantProps } from 'class-variance-authority';
import * as Haptics from 'expo-haptics';
import * as React from 'react';
import { Pressable, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { cn } from '../../lib/utils';

// ─── Variants ─────────────────────────────────────────────────────────────────

/**
 * Native-only variant definitions.
 * All web-only classes from the original have been removed:
 *   ring-offset-background, hover:*, focus-visible:*, transition-colors,
 *   inline-flex, disabled:pointer-events-none — none of these do anything
 *   in React Native / NativeWind and only add noise.
 */
const toggleVariants = cva('flex-row items-center justify-center overflow-hidden rounded-md', {
  variants: {
    variant: {
      default: 'bg-transparent',
      outline: 'border-input border bg-transparent',
    },
    size: {
      default: 'h-10 gap-2 px-3',
      sm: 'h-9 gap-1.5 px-2.5',
      lg: 'h-11 gap-2.5 px-5',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

// ─── Pressed context ──────────────────────────────────────────────────────────

/**
 * Exposes `pressed` to any child — primarily icons.
 *
 * The original had a TODO comment about this exact problem:
 * "Inject color prop if child is an icon? For now just render child."
 *
 * With context, icon children can do:
 *   const { pressed } = useTogglePressed();
 *   <MyIcon color={pressed ? accentColor : foregroundColor} />
 *
 * Or more commonly, ToggleGroupItem / Toggle consumers can read it to
 * conditionally style icons without any prop threading.
 */
interface TogglePressedContextValue {
  pressed: boolean;
}

const TogglePressedContext = React.createContext<TogglePressedContextValue>({ pressed: false });

export function useTogglePressed() {
  return React.useContext(TogglePressedContext);
}

// ─── Animation config ─────────────────────────────────────────────────────────

const BG_SPRING = { damping: 20, stiffness: 280, mass: 0.6 };

// ─── Toggle ───────────────────────────────────────────────────────────────────

type ToggleProps = Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'onPress' | 'children'> &
  VariantProps<typeof toggleVariants> & {
    /** Controlled pressed state. */
    pressed?: boolean;
    /** Default value for uncontrolled usage. */
    defaultPressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
    /** Only ReactNode is supported (not Pressable's render-prop form). Use TogglePressedContext for state. */
    children?: React.ReactNode;
  };

const Toggle = React.forwardRef<React.ElementRef<typeof Pressable>, ToggleProps>(
  (
    {
      className,
      variant,
      size,
      pressed: controlledPressed,
      defaultPressed = false,
      onPressedChange,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // ── Controlled / uncontrolled ─────────────────────────────────────────
    const [uncontrolledPressed, setUncontrolledPressed] = React.useState(defaultPressed);
    const pressed = controlledPressed ?? uncontrolledPressed;

    // ── Animation ─────────────────────────────────────────────────────────
    // Animate a background overlay that fades in when pressed.
    // We can't animate className bg-accent directly, so we use an absolutely
    // positioned Animated.View underneath children with an opacity spring.
    const progress = useSharedValue(pressed ? 1 : 0);

    React.useEffect(() => {
      progress.value = withSpring(pressed ? 1 : 0, BG_SPRING);
    }, [pressed]);

    const overlayStyle = useAnimatedStyle(() => ({
      position: 'absolute',
      inset: 0,
      opacity: progress.value,
    }));

    // ── Interaction ───────────────────────────────────────────────────────
    const handlePress = () => {
      if (disabled) return;
      const next = !pressed;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      if (controlledPressed === undefined) setUncontrolledPressed(next);
      onPressedChange?.(next);
    };

    return (
      <TogglePressedContext.Provider value={{ pressed }}>
        <Pressable
          ref={ref}
          onPress={handlePress}
          disabled={disabled}
          accessibilityRole="switch"
          accessibilityState={{ checked: pressed, disabled: !!disabled }}
          className={cn(toggleVariants({ variant, size }), className)}
          {...props}>
          {/* Animated accent background — sits behind children */}
          <Animated.View style={overlayStyle} className="bg-accent rounded-md" />

          {/* Children rendered above the overlay */}
          {typeof children === 'string' ? (
            <Text
              className={cn(
                'text-sm font-medium',
                // Text color must be set on the Text node — not the Pressable —
                // because RN doesn't inherit color from parent Views.
                pressed ? 'text-accent-foreground' : 'text-foreground'
              )}>
              {children}
            </Text>
          ) : (
            children
          )}
        </Pressable>
      </TogglePressedContext.Provider>
    );
  }
);
Toggle.displayName = 'Toggle';

export { Toggle, toggleVariants };
export type { ToggleProps };
