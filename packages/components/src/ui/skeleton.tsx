import * as React from 'react';
import { Animated, Easing, View } from 'react-native';
import { cn } from '../../lib/utils';

function Skeleton({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) {
  const pulseAnim = React.useRef(new Animated.Value(0.5)).current;

  React.useEffect(() => {
    const sharedAnimationConfig = {
      duration: 1000,
      useNativeDriver: true,
    };
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 1,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 0.5,
          easing: Easing.in(Easing.ease),
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <Animated.View
      style={{ opacity: pulseAnim }}
      className={cn('bg-muted rounded-md', className)}
      {...props}
    />
  );
}

export { Skeleton };
