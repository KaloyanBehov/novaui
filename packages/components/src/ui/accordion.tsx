import { ChevronDown } from 'lucide-react-native';
import * as React from 'react';
import { Platform, Pressable, StyleSheet, UIManager, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { cn } from '../../lib/utils';
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionContext = React.createContext<{
  value?: string | string[];
  onValueChange?: (value: string) => void;
  type?: 'single' | 'multiple';
  collapsible?: boolean;
} | null>(null);

const Accordion = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    type?: 'single' | 'multiple';
    collapsible?: boolean;
    defaultValue?: string | string[];
    onValueChange?: (value: string | string[]) => void;
  }
>(
  (
    {
      className,
      type = 'single',
      collapsible = true,
      defaultValue,
      onValueChange,
      children,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = React.useState<string | string[]>(
      defaultValue || (type === 'multiple' ? [] : '')
    );

    const handleValueChange = (itemValue: string) => {
      let newValue: string | string[];
      if (type === 'single') {
        newValue = value === itemValue && collapsible ? '' : itemValue;
      } else {
        const currentValues = Array.isArray(value) ? value : [];
        newValue = currentValues.includes(itemValue)
          ? currentValues.filter((v) => v !== itemValue)
          : [...currentValues, itemValue];
      }
      setValue(newValue);
      onValueChange?.(newValue);
    };

    return (
      <AccordionContext.Provider
        value={{ value, onValueChange: handleValueChange, type, collapsible }}>
        <View ref={ref} className={cn('gap-2', className)} {...props}>
          {children}
        </View>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = 'Accordion';

const AccordionItemContext = React.createContext<{ value: string } | null>(null);

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { value: string }
>(({ className, value, ...props }, ref) => (
  <AccordionItemContext.Provider value={{ value }}>
    <View ref={ref} className={cn('border-border border-b', className)} {...props} />
  </AccordionItemContext.Provider>
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ className, children, ...props }, ref) => {
  const { value } = React.useContext(AccordionContext)!;
  const { value: itemValue } = React.useContext(AccordionItemContext)!;

  const isExpanded = Array.isArray(value) ? value.includes(itemValue) : value === itemValue;

  // Use a derived value for the rotation to keep UI thread in sync
  const progress = useDerivedValue(() => {
    return withTiming(isExpanded ? 1 : 0, {
      duration: 300,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
  });

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }],
  }));

  return (
    <Pressable
      ref={ref}
      className={cn('flex-row items-center justify-between py-4', className)}
      {...props}>
      {/* ... (Keep children logic) */}
      <Animated.View style={chevronStyle}>
        <ChevronDown size={18} className="text-muted-foreground" />
      </Animated.View>
    </Pressable>
  );
});

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const { value } = React.useContext(AccordionContext)!;
  const { value: itemValue } = React.useContext(AccordionItemContext)!;

  const isExpanded = Array.isArray(value) ? value.includes(itemValue) : value === itemValue;

  const heightValue = useSharedValue(0);
  const [measuredHeight, setMeasuredHeight] = React.useState(0);

  // We animate to the measured height or 0
  React.useEffect(() => {
    heightValue.value = withTiming(isExpanded ? measuredHeight : 0, {
      duration: 300,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
  }, [isExpanded, measuredHeight]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
    opacity: withTiming(isExpanded ? 1 : 0, { duration: 200 }),
    overflow: 'hidden',
  }));

  return (
    <Animated.View style={animatedStyle}>
      <View
        style={styles.contentInternal}
        onLayout={(e) => {
          // Captures actual intrinsic height of children
          const layoutHeight = e.nativeEvent.layout.height;
          if (layoutHeight > 0 && layoutHeight !== measuredHeight) {
            setMeasuredHeight(layoutHeight);
          }
        }}>
        <View className={cn('pb-4', className)}>{children}</View>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  contentInternal: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
