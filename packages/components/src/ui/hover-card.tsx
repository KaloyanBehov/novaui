import * as React from 'react';
import { Dimensions, Modal, Pressable, StyleSheet, View } from 'react-native';
import { cn } from '../../lib/utils';

const HoverCardContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position: { x: number; y: number; width: number; height: number };
  setPosition: (position: { x: number; y: number; width: number; height: number }) => void;
} | null>(null);

const HoverCard = ({
  children,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  defaultOpen = false,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const [position, setPosition] = React.useState({ x: 0, y: 0, width: 0, height: 0 });

  const open = controlledOpen ?? uncontrolledOpen;
  const onOpenChange = setControlledOpen ?? setUncontrolledOpen;

  return (
    <HoverCardContext.Provider value={{ open, onOpenChange, position, setPosition }}>
      <View style={{ flex: 1 }}>{children}</View>
    </HoverCardContext.Provider>
  );
};

const HoverCardTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { asChild?: boolean }
>(({ children, asChild, onPress, ...props }, ref) => {
  const { onOpenChange, setPosition, open } = React.useContext(HoverCardContext)!;
  const triggerRef = React.useRef<View>(null);

  const handlePress = (e: any) => {
    triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setPosition({ x: pageX, y: pageY, width, height });
      onOpenChange(!open);
    });
    onPress?.(e);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      // @ts-ignore
      onPress: handlePress,
      ...props,
    });
  }

  return (
    <Pressable ref={triggerRef} onPress={handlePress} {...props}>
      {children}
    </Pressable>
  );
});
HoverCardTrigger.displayName = 'HoverCardTrigger';

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
    className?: string;
  }
>(({ className, children, align = 'center', sideOffset = 4, ...props }, ref) => {
  const { open, onOpenChange, position } = React.useContext(HoverCardContext)!;
  const [contentSize, setContentSize] = React.useState({ width: 0, height: 0 });
  const { width: screenWidth } = Dimensions.get('window');

  if (!open) return null;

  let top = position.y + position.height + sideOffset;
  let left = position.x;

  if (align === 'center') {
    left = position.x + position.width / 2 - contentSize.width / 2;
  } else if (align === 'end') {
    left = position.x + position.width - contentSize.width;
  }

  // Basic boundary adjustments
  if (contentSize.width > 0) {
    if (left + contentSize.width > screenWidth - 10) {
      left = screenWidth - contentSize.width - 10;
    }
    if (left < 10) {
      left = 10;
    }
  }

  return (
    <Modal
      transparent
      visible={open}
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}>
      <Pressable style={StyleSheet.absoluteFill} onPress={() => onOpenChange(false)}>
        <View
          style={{
            position: 'absolute',
            top,
            left,
          }}
          onLayout={(e) => setContentSize(e.nativeEvent.layout)}>
          <View
            ref={ref}
            className={cn(
              'border-border bg-popover z-50 w-64 rounded-md border p-4 shadow-md outline-none',
              className
            )}
            {...props}>
            {children}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
});
HoverCardContent.displayName = 'HoverCardContent';

export { HoverCard, HoverCardContent, HoverCardTrigger };
