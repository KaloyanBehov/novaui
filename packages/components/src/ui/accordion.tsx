import { ChevronDown } from 'lucide-react-native';
import * as React from 'react';
import { Platform, Pressable, Text, UIManager, View } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
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
  const { value, onValueChange } = React.useContext(AccordionContext)!;
  const { value: itemValue } = React.useContext(AccordionItemContext)!;

  const isExpanded = Array.isArray(value) ? value.includes(itemValue) : value === itemValue;
  const progress = useSharedValue(isExpanded ? 1 : 0);

  React.useEffect(() => {
    progress.value = withTiming(isExpanded ? 1 : 0, { duration: 250 });
  }, [isExpanded]);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }],
  }));

  return (
    <Pressable
      ref={ref}
      onPress={() => onValueChange?.(itemValue)}
      className={cn(
        'flex-row items-center justify-between py-4 font-medium transition-all',
        className
      )}
      {...props}>
      {typeof children === 'function' ? (
        children({ pressed: false })
      ) : typeof children === 'string' ? (
        <Text className="text-foreground text-sm font-medium">{children}</Text>
      ) : (
        children
      )}
      <Animated.View style={chevronStyle}>
        <ChevronDown size={18} className="text-muted-foreground" />
      </Animated.View>
    </Pressable>
  );
});
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const { value } = React.useContext(AccordionContext)!;
  const { value: itemValue } = React.useContext(AccordionItemContext)!;

  const isExpanded = Array.isArray(value) ? value.includes(itemValue) : value === itemValue;
  const progress = useSharedValue(isExpanded ? 1 : 0);
  const bodyRef = useAnimatedRef<View>();
  const height = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming(isExpanded ? 1 : 0, { duration: 250 });
  }, [isExpanded]);

  const style = useAnimatedStyle(() => ({
    height: height.value * progress.value + 1,
    opacity: progress.value === 0 ? 0 : 1,
  }));

  return (
    <Animated.View style={[{ overflow: 'hidden' }, style]}>
      <View
        ref={bodyRef}
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        className={cn('pt-0 pb-4', className)}>
        <View className="absolute top-0 w-full" style={{ opacity: 0 }} pointerEvents="none">
          {children}
        </View>
        {children}
      </View>
    </Animated.View>
  );
});
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
