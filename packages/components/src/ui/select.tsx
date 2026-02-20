import { Check, ChevronDown, ChevronUp } from 'lucide-react-native';
import * as React from 'react';
import { Dimensions, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { cn } from '../../lib/utils';

interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  position: { x: number; y: number; width: number; height: number };
  setPosition: (p: { x: number; y: number; width: number; height: number }) => void;
}

const SelectContext = React.createContext<SelectContextValue>({
  open: false,
  setOpen: () => {},
  position: { x: 0, y: 0, width: 0, height: 0 },
  setPosition: () => {},
});

const Select = ({
  value,
  onValueChange,
  children,
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0, width: 0, height: 0 });

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen, position, setPosition }}>
      <View>{children}</View>
    </SelectContext.Provider>
  );
};
Select.displayName = 'Select';

const SelectGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => <View ref={ref} className={cn(className)} {...props} />);
SelectGroup.displayName = 'SelectGroup';

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'children'> & {
    size?: 'sm' | 'default';
    className?: string;
    children?: React.ReactNode;
  }
>(({ className, size = 'default', children, ...props }, ref) => {
  const { setOpen, setPosition } = React.useContext(SelectContext);
  const triggerRef = React.useRef<View>(null);

  const onPress = () => {
    triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setPosition({ x: pageX, y: pageY, width, height });
      setOpen(true);
    });
    props.onPress?.(undefined as any);
  };

  return (
    <Pressable
      ref={triggerRef}
      onPress={onPress}
      className={cn(
        'border-input flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs',
        'active:opacity-90 disabled:cursor-not-allowed disabled:opacity-50',
        size === 'default' && 'h-9',
        size === 'sm' && 'h-8',
        className
      )}
      {...props}>
      {children}
      <ChevronDown
        size={16}
        className="text-muted-foreground pointer-events-none shrink-0 opacity-50"
      />
    </Pressable>
  );
});
SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { placeholder?: string; className?: string }
>(({ className, placeholder, ...props }, ref) => {
  const { value } = React.useContext(SelectContext);
  const hasValue = !!value;
  return (
    <View ref={ref} className={cn('flex-1 flex-row items-center gap-2', className)} {...props}>
      <Text
        className={cn(
          'line-clamp-1 text-sm',
          hasValue ? 'text-foreground' : 'text-muted-foreground'
        )}
        numberOfLines={1}>
        {value ?? placeholder}
      </Text>
    </View>
  );
});
SelectValue.displayName = 'SelectValue';

const SelectContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    position?: 'item-aligned' | 'popper';
    align?: 'start' | 'center' | 'end';
    className?: string;
  }
>(({ className, children, position = 'item-aligned', align = 'center', ...props }, ref) => {
  const { open, setOpen, position: pos } = React.useContext(SelectContext);
  const [contentSize, setContentSize] = React.useState({ width: 0, height: 0 });
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const sideOffset = 4;

  if (!open) return null;

  let top = pos.y + pos.height + sideOffset;
  let left = pos.x;
  const contentWidth = Math.max(pos.width, contentSize.width, 128);
  if (align === 'center') {
    left = pos.x + pos.width / 2 - contentWidth / 2;
  } else if (align === 'end') {
    left = pos.x + pos.width - contentWidth;
  }
  if (left + contentWidth > screenWidth - 8) left = screenWidth - contentWidth - 8;
  if (left < 8) left = 8;
  const maxHeight = Math.min(300, screenHeight - top - 16);

  return (
    <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
      <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)}>
        <View
          style={{ position: 'absolute', top, left, width: contentWidth, maxHeight }}
          onLayout={(e) => setContentSize(e.nativeEvent.layout)}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View
              ref={ref}
              className={cn(
                'bg-popover text-popover-foreground relative z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-md',
                className
              )}
              {...props}>
              <ScrollView
                className="p-1"
                style={{ maxHeight }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                {children}
              </ScrollView>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
});
SelectContent.displayName = 'SelectContent';

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text> & { className?: string }
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
    {...props}
  />
));
SelectLabel.displayName = 'SelectLabel';

const SelectItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'children'> & {
    value: string;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
  }
>(({ className, children, value, disabled, ...props }, ref) => {
  const { value: selectedValue, onValueChange, setOpen } = React.useContext(SelectContext);
  const isSelected = selectedValue === value;

  return (
    <Pressable
      ref={ref}
      disabled={disabled}
      onPress={() => {
        if (disabled) return;
        onValueChange?.(value);
        setOpen(false);
      }}
      className={cn(
        'relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none',
        'active:bg-accent active:text-accent-foreground',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
      {...props}>
      <View className="absolute right-2 flex size-3.5 items-center justify-center">
        {isSelected && <Check size={16} className="text-foreground pointer-events-none shrink-0" />}
      </View>
      {typeof children === 'string' ? (
        <Text className="text-popover-foreground text-sm">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
});
SelectItem.displayName = 'SelectItem';

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('bg-border -mx-1 my-1 h-px', className)} {...props} />
));
SelectSeparator.displayName = 'SelectSeparator';

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('flex items-center justify-center py-1', className)} {...props}>
    <ChevronUp size={16} className="text-muted-foreground" />
  </View>
));
SelectScrollUpButton.displayName = 'SelectScrollUpButton';

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('flex items-center justify-center py-1', className)} {...props}>
    <ChevronDown size={16} className="text-muted-foreground" />
  </View>
));
SelectScrollDownButton.displayName = 'SelectScrollDownButton';

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
