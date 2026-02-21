import * as Haptics from 'expo-haptics';
import { Check, Minus } from 'lucide-react-native';
import * as React from 'react';
import { Pressable } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { cn } from '../../lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

type CheckedState = boolean | 'indeterminate';

interface CheckboxProps extends Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'onPress'> {
  /**
   * Controlled checked state.
   * Pass `'indeterminate'` for a mixed/partial selection state
   * (e.g. "select all" when only some children are selected).
   */
  checked?: CheckedState;
  /** Default value for uncontrolled usage. */
  defaultChecked?: boolean;
  onCheckedChange?: (checked: CheckedState) => void;
  disabled?: boolean;
  className?: string;
}

// ─── Animation config ─────────────────────────────────────────────────────────

const CHECK_SPRING = { damping: 18, stiffness: 300, mass: 0.6 };

// ─── Component ────────────────────────────────────────────────────────────────

const Checkbox = React.forwardRef<React.ElementRef<typeof Pressable>, CheckboxProps>(
  (
    { className, checked: controlledChecked, defaultChecked, onCheckedChange, disabled, ...props },
    ref
  ) => {
    // ── Controlled / uncontrolled ───────────────────────────────────────────
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState<CheckedState>(
      defaultChecked ?? false
    );
    const checked = controlledChecked ?? uncontrolledChecked;
    const isChecked = checked === true;
    const isIndeterminate = checked === 'indeterminate';
    const isActive = isChecked || isIndeterminate;

    // ── Animation ───────────────────────────────────────────────────────────
    const progress = useSharedValue(isActive ? 1 : 0);

    React.useEffect(() => {
      progress.value = isActive ? withSpring(1, CHECK_SPRING) : withTiming(0, { duration: 150 });
    }, [isActive]);

    const iconAnimatedStyle = useAnimatedStyle(() => ({
      opacity: progress.value,
      transform: [
        {
          scale: interpolate(progress.value, [0, 0.5, 1], [0.3, 1.2, 1], Extrapolation.CLAMP),
        },
      ],
    }));

    // ── Interaction ─────────────────────────────────────────────────────────
    const handlePress = () => {
      if (disabled) return;

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      const next: CheckedState = isChecked || isIndeterminate ? false : true;

      if (controlledChecked === undefined) {
        // Uncontrolled: update internal state
        setUncontrolledChecked(next);
      }
      onCheckedChange?.(next);
    };

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        disabled={disabled}
        accessibilityRole="checkbox"
        accessibilityState={{
          checked: isIndeterminate ? 'mixed' : isChecked,
          disabled: !!disabled,
        }}
        // hitSlop extends the touch area to 44×44pt without changing visual size.
        // The checkbox is 20×20pt visually; we add 12pt on each side.
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        className={cn(
          // 20×20pt — visible enough on mobile, still compact alongside text
          'h-5 w-5 shrink-0 rounded-md border-2',
          // State-driven border + fill
          isActive ? 'border-primary bg-primary' : 'border-input bg-background',
          disabled && 'opacity-50',
          className
        )}
        {...props}>
        <Animated.View style={iconAnimatedStyle} className="flex-1 items-center justify-center">
          {isIndeterminate ? (
            <Minus size={12} color="white" strokeWidth={3} />
          ) : (
            <Check size={12} color="white" strokeWidth={3} />
          )}
        </Animated.View>
      </Pressable>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
export type { CheckboxProps, CheckedState };
