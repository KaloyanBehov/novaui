import * as React from 'react';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { cn } from '../../lib/utils';

const SIZE = {
  default: { trackWidth: 32, trackHeight: 18.4, thumbSize: 16 },
  sm: { trackWidth: 24, trackHeight: 14, thumbSize: 12 },
} as const;

const Switch = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    size?: 'sm' | 'default';
    className?: string;
  }
>(({ className, checked, onCheckedChange, disabled, size = 'default', ...props }, ref) => {
  const isControlled = checked !== undefined;
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(false);
  const value = isControlled ? checked : uncontrolledChecked;

  const { trackWidth, trackHeight, thumbSize } = SIZE[size];
  const thumbOffset = trackWidth - thumbSize - 2; // shadcn: data-[state=checked]:translate-x-[calc(100%-2px)]
  const thumbTop = (trackHeight - thumbSize) / 2;

  const translateX = useSharedValue(value ? thumbOffset : 0);

  React.useEffect(() => {
    translateX.value = withTiming(value ? thumbOffset : 0, { duration: 150 });
  }, [value, thumbOffset]);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handlePress = () => {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setUncontrolledChecked(next);
    onCheckedChange?.(next);
  };

  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      className={cn(
        'shrink-0 justify-center rounded-full border border-transparent shadow-xs',
        'active:opacity-90 disabled:cursor-not-allowed disabled:opacity-50',
        value ? 'bg-primary' : 'bg-input',
        size === 'default' && 'h-[18.4px] w-8',
        size === 'sm' && 'h-3.5 w-6',
        className
      )}
      style={[
        size === 'default' && { height: 18.4, width: 32 },
        size === 'sm' && { height: 14, width: 24 },
      ]}
      {...props}>
      <Animated.View
        pointerEvents="none"
        className="bg-background absolute left-0.5 rounded-full"
        style={[
          thumbStyle,
          {
            top: thumbTop,
            width: thumbSize,
            height: thumbSize,
            marginLeft: 2,
          },
        ]}
      />
    </Pressable>
  );
});
Switch.displayName = 'Switch';

export { Switch };
