import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react-native';
import * as React from 'react';
import { Dimensions, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { cn } from '../../lib/utils';

const NavigationMenuContext = React.createContext<{
  value: string | undefined;
  onValueChange: (value: string | undefined) => void;
} | null>(null);

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    value?: string;
    onValueChange?: (value: string | undefined) => void;
  }
>(({ className, children, value, onValueChange, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState<string | undefined>();
  const activeValue = value !== undefined ? value : internalValue;
  const setActiveValue = onValueChange || setInternalValue;

  return (
    <NavigationMenuContext.Provider value={{ value: activeValue, onValueChange: setActiveValue }}>
      <View
        ref={ref}
        className={cn(
          'relative z-10 max-w-max flex-1 flex-row items-center justify-center',
          className
        )}
        {...props}>
        {children}
      </View>
    </NavigationMenuContext.Provider>
  );
});
NavigationMenu.displayName = 'NavigationMenu';

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('group flex-1 list-none flex-row items-center justify-center gap-1', className)}
    {...props}
  />
));
NavigationMenuList.displayName = 'NavigationMenuList';

const NavigationMenuItemContext = React.createContext<{
  value: string;
  position: { x: number; y: number; width: number; height: number } | null;
  setPosition: (pos: { x: number; y: number; width: number; height: number }) => void;
} | null>(null);

const NavigationMenuItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { value?: string }
>(({ className, value, children, ...props }, ref) => {
  const [position, setPosition] = React.useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const autoValue = React.useId();
  const itemValue = value || autoValue;

  return (
    <NavigationMenuItemContext.Provider value={{ value: itemValue, position, setPosition }}>
      <View ref={ref} className={cn('relative', className)} {...props}>
        {children}
      </View>
    </NavigationMenuItemContext.Provider>
  );
});
NavigationMenuItem.displayName = 'NavigationMenuItem';

const navigationMenuTriggerStyle = cva(
  'group bg-background active:bg-accent active:text-accent-foreground inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50'
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ className, children, onPress, ...props }, ref) => {
  const itemContext = React.useContext(NavigationMenuItemContext)!;
  const rootContext = React.useContext(NavigationMenuContext)!;
  const triggerRef = React.useRef<View>(null);

  const isOpen = rootContext.value === itemContext.value;

  const handlePress = (e: any) => {
    triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
      itemContext.setPosition({ x: pageX, y: pageY, width, height });
      rootContext.onValueChange(isOpen ? undefined : itemContext.value);
    });
    onPress?.(e);
  };

  return (
    <Pressable
      ref={triggerRef}
      className={cn(navigationMenuTriggerStyle(), 'group flex-row', className)}
      onPress={handlePress}
      {...props}>
      {typeof children === 'function' ? (
        children({ pressed: false })
      ) : typeof children === 'string' ? (
        <Text className="text-foreground text-sm font-medium">{children}</Text>
      ) : (
        children
      )}
      <ChevronDown
        className={cn(
          'text-foreground relative top-[1px] ml-1 h-3 w-3 transition duration-300',
          isOpen && 'rotate-180'
        )}
        size={12}
        aria-hidden={true}
      />
    </Pressable>
  );
});
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
  }
>(({ className, children, align = 'center', sideOffset = 4, ...props }, ref) => {
  const itemContext = React.useContext(NavigationMenuItemContext)!;
  const rootContext = React.useContext(NavigationMenuContext)!;
  const [contentSize, setContentSize] = React.useState({ width: 0, height: 0 });
  const { width: screenWidth } = Dimensions.get('window');

  const isOpen = rootContext.value === itemContext.value;
  const position = itemContext.position;

  if (!isOpen || !position) return null;

  let top = position.y + position.height + sideOffset;
  let left = position.x;

  if (align === 'center') {
    left = position.x + position.width / 2 - contentSize.width / 2;
  } else if (align === 'end') {
    left = position.x + position.width - contentSize.width;
  }

  // Basic boundary adjustments
  if (contentSize.width > 0) {
    if (left + contentSize.width > screenWidth) {
      left = screenWidth - contentSize.width - 10;
    }
    if (left < 10) {
      left = 10;
    }
  }

  return (
    <Modal
      transparent
      visible={isOpen}
      animationType="fade"
      onRequestClose={() => rootContext.onValueChange(undefined)}>
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={() => rootContext.onValueChange(undefined)}>
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
              'border-border bg-popover min-w-[12rem] overflow-hidden rounded-md border p-1 shadow-md',
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
NavigationMenuContent.displayName = 'NavigationMenuContent';

const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    active?: boolean;
  }
>(({ className, children, active, ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      className={cn(
        'active:bg-accent active:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
        active && 'bg-accent text-accent-foreground',
        className
      )}
      {...props}>
      {children}
    </Pressable>
  );
});
NavigationMenuLink.displayName = 'NavigationMenuLink';

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      'origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow-md md:w-[var(--radix-navigation-menu-viewport-width)]',
      className
    )}
    {...props}
  />
));
NavigationMenuViewport.displayName = 'NavigationMenuViewport';

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      'data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
      className
    )}
    {...props}>
    <View className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
  </View>
));
NavigationMenuIndicator.displayName = 'NavigationMenuIndicator';

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
};
