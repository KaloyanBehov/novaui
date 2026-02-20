import * as React from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { cn } from '../../lib/utils';

const CollapsibleContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
} | null>(null);

const Collapsible = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
    disabled?: boolean;
  }
>(
  (
    {
      open: controlledOpen,
      onOpenChange: controlledOnOpenChange,
      defaultOpen = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
    const open = controlledOpen ?? uncontrolledOpen;
    const onOpenChange = controlledOnOpenChange ?? setUncontrolledOpen;

    return (
      <CollapsibleContext.Provider value={{ open, onOpenChange }}>
        <View ref={ref} {...props}>
          {children}
        </View>
      </CollapsibleContext.Provider>
    );
  }
);
Collapsible.displayName = 'Collapsible';

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { asChild?: boolean }
>(({ asChild, children, onPress, ...props }, ref) => {
  const { open, onOpenChange } = React.useContext(CollapsibleContext)!;

  const handlePress = (e: any) => {
    onPress?.(e);
    onOpenChange(!open);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      // @ts-ignore
      onPress: handlePress,
      ...props,
    });
  }

  return (
    <Pressable ref={ref} onPress={handlePress} {...props}>
      {children}
    </Pressable>
  );
});
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const { open } = React.useContext(CollapsibleContext)!;

  const progress = useSharedValue(open ? 1 : 0);
  const bodyRef = useAnimatedRef<View>();
  const height = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming(open ? 1 : 0, { duration: 250 });
  }, [open]);

  const style = useAnimatedStyle(() => {
    return {
      height: height.value * progress.value + 1,
      opacity: progress.value === 0 ? 0 : 1,
    };
  });

  return (
    <Animated.View style={[{ overflow: 'hidden' }, style]}>
      <View
        ref={bodyRef}
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        className={cn(className)}
        {...props}>
        {children}
      </View>
    </Animated.View>
  );
});
CollapsibleContent.displayName = 'CollapsibleContent';

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
