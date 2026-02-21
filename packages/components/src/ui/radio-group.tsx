import * as Haptics from 'expo-haptics';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { cn } from '../../lib/utils';

// ─── Context ──────────────────────────────────────────────────────────────────

/**
 * Context replaces the brittle React.cloneElement prop-injection pattern.
 *
 * The old approach passed `checked` and `onPress` by cloning each direct
 * child — this silently breaks the moment any wrapper element (View, fragment,
 * map result) sits between RadioGroup and RadioGroupItem, because cloneElement
 * only reaches one level deep.
 *
 * Context works at any nesting depth and requires no @ts-ignore hacks.
 */
interface RadioGroupContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({});

function useRadioGroup() {
  return React.useContext(RadioGroupContext);
}

// ─── Animation config ─────────────────────────────────────────────────────────

const DOT_SPRING = { damping: 18, stiffness: 320, mass: 0.5 };

// ─── RadioGroup ───────────────────────────────────────────────────────────────

interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof View> {
  /** Controlled selected value. */
  value?: string;
  /** Default value for uncontrolled usage. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Disables all items in the group. Individual items can also be disabled. */
  disabled?: boolean;
  className?: string;
}

const RadioGroup = React.forwardRef<React.ElementRef<typeof View>, RadioGroupProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      onValueChange,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string | undefined>(
      defaultValue
    );
    const value = controlledValue ?? uncontrolledValue;

    const handleValueChange = React.useCallback(
      (next: string) => {
        if (controlledValue === undefined) {
          setUncontrolledValue(next);
        }
        onValueChange?.(next);
      },
      [controlledValue, onValueChange]
    );

    return (
      <RadioGroupContext.Provider value={{ value, onValueChange: handleValueChange, disabled }}>
        <View
          ref={ref}
          accessibilityRole="radiogroup"
          className={cn('gap-3', className)}
          {...props}>
          {children}
        </View>
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

// ─── RadioGroupItem ───────────────────────────────────────────────────────────

interface RadioGroupItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Pressable>,
  'onPress'
> {
  value: string;
  /** Disables this item only. Group-level `disabled` also disables all items. */
  disabled?: boolean;
  className?: string;
}

const RadioGroupItem = React.forwardRef<React.ElementRef<typeof Pressable>, RadioGroupItemProps>(
  ({ className, value, disabled: itemDisabled, ...props }, ref) => {
    const { value: groupValue, onValueChange, disabled: groupDisabled } = useRadioGroup();

    const isChecked = groupValue === value;
    const isDisabled = !!itemDisabled || !!groupDisabled;

    // ── Animation ─────────────────────────────────────────────────────────
    const progress = useSharedValue(isChecked ? 1 : 0);

    React.useEffect(() => {
      progress.value = isChecked ? withSpring(1, DOT_SPRING) : withTiming(0, { duration: 150 });
    }, [isChecked]);

    const dotAnimatedStyle = useAnimatedStyle(() => ({
      opacity: progress.value,
      transform: [
        {
          scale: interpolate(progress.value, [0, 0.5, 1], [0.2, 1.3, 1], Extrapolation.CLAMP),
        },
      ],
    }));

    // ── Interaction ───────────────────────────────────────────────────────
    const handlePress = () => {
      if (isDisabled || isChecked) return; // no-op if already selected
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onValueChange?.(value);
    };

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        disabled={isDisabled}
        accessibilityRole="radio"
        accessibilityState={{ checked: isChecked, disabled: isDisabled }}
        // hitSlop: visual size is 20pt, extends touch area to 44pt
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        className={cn(
          'h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
          isChecked ? 'border-primary' : 'border-input',
          isDisabled && 'opacity-50',
          className
        )}
        {...props}>
        {/* Animated inner dot */}
        <Animated.View style={dotAnimatedStyle} className="bg-primary h-2.5 w-2.5 rounded-full" />
      </Pressable>
    );
  }
);
RadioGroupItem.displayName = 'RadioGroupItem';

// ─── Exports ──────────────────────────────────────────────────────────────────

export { RadioGroup, RadioGroupItem };
export type { RadioGroupItemProps, RadioGroupProps };
