import { Check, ChevronRight, Circle } from 'lucide-react-native';
import * as React from 'react';
import { Dimensions, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { cn } from '../../lib/utils';

const MenubarContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position: { x: number; y: number; width: number; height: number };
  setPosition: (position: { x: number; y: number; width: number; height: number }) => void;
} | null>(null);

const Menubar = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      'border-border bg-background h-10 flex-row items-center space-x-1 rounded-md border p-1',
      className
    )}
    {...props}
  />
));
Menubar.displayName = 'Menubar';

const MenubarMenu = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0, width: 0, height: 0 });

  return (
    <MenubarContext.Provider value={{ open, onOpenChange: setOpen, position, setPosition }}>
      <View>{children}</View>
    </MenubarContext.Provider>
  );
};

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { asChild?: boolean }
>(({ children, asChild, onPress, className, ...props }, ref) => {
  const { onOpenChange, setPosition, open } = React.useContext(MenubarContext)!;
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
    <Pressable
      ref={triggerRef}
      onPress={handlePress}
      className={cn(
        'flex-row items-center rounded-sm px-3 py-1.5 text-sm font-medium',
        open && 'bg-accent text-accent-foreground',
        className
      )}
      {...props}>
      {typeof children === 'string' ? (
        <Text className="text-foreground text-sm font-medium">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
});
MenubarTrigger.displayName = 'MenubarTrigger';

const MenubarPortal = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
MenubarPortal.displayName = 'MenubarPortal';

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
    className?: string;
  }
>(({ className, children, align = 'start', sideOffset = 8, ...props }, ref) => {
  const { open, onOpenChange, position } = React.useContext(MenubarContext)!;
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
MenubarContent.displayName = 'MenubarContent';

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    inset?: boolean;
    checked?: boolean;
  }
>(({ className, inset, children, checked, ...props }, ref) => {
  const { onOpenChange } = React.useContext(MenubarContext)!;

  return (
    <Pressable
      ref={ref}
      className={cn(
        'active:bg-accent active:text-accent-foreground relative cursor-default flex-row items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none',
        inset && 'pl-8',
        className
      )}
      onPress={(e) => {
        props.onPress?.(e);
        onOpenChange(false);
      }}
      {...props}>
      {typeof children === 'function'
        ? children({ pressed: false })
        : React.Children.map(children, (child) => {
            if (typeof child === 'string') {
              return <Text className="text-foreground text-sm">{child}</Text>;
            }
            return child;
          })}
    </Pressable>
  );
});
MenubarItem.displayName = 'MenubarItem';

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    checked?: boolean;
  }
>(({ className, children, checked, ...props }, ref) => (
  <MenubarItem ref={ref} className={cn('relative pl-8', className)} checked={checked} {...props}>
    {
      (typeof children === 'function' ? null : (
        <>
          <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            {checked && <Check className="text-foreground h-4 w-4" size={14} />}
          </View>
          {children}
        </>
      )) as any
    }
  </MenubarItem>
));
MenubarCheckboxItem.displayName = 'MenubarCheckboxItem';

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    checked?: boolean;
    value?: string;
  }
>(({ className, children, checked, ...props }, ref) => (
  <MenubarItem ref={ref} className={cn('relative pl-8', className)} checked={checked} {...props}>
    {
      (typeof children === 'function' ? null : (
        <>
          <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            {checked && <Circle className="text-foreground h-2 w-2 fill-current" size={8} />}
          </View>
          {children}
        </>
      )) as any
    }
  </MenubarItem>
));
MenubarRadioItem.displayName = 'MenubarRadioItem';

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn('text-foreground px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
    {...props}
  />
));
MenubarLabel.displayName = 'MenubarLabel';

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('bg-border -mx-1 my-1 h-px', className)} {...props} />
));
MenubarSeparator.displayName = 'MenubarSeparator';

const MenubarShortcut = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Text>) => {
  return (
    <Text
      className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
      {...props}
    />
  );
};
MenubarShortcut.displayName = 'MenubarShortcut';

const MenubarGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => <View ref={ref} className={cn(className)} {...props} />);
MenubarGroup.displayName = 'MenubarGroup';

const MenubarSub = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => <View ref={ref} className={cn(className)} {...props} />);
MenubarSub.displayName = 'MenubarSub';

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <Pressable
    ref={ref}
    className={cn(
      'active:bg-accent active:text-accent-foreground cursor-default flex-row items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none',
      inset && 'pl-8',
      className
    )}
    {...props}>
    {typeof children === 'function'
      ? children({ pressed: false })
      : React.Children.map(children, (child) => {
          if (typeof child === 'string') {
            return <Text className="text-foreground text-sm">{child}</Text>;
          }
          return child;
        })}
    <ChevronRight className="text-muted-foreground ml-auto h-4 w-4" size={14} />
  </Pressable>
));
MenubarSubTrigger.displayName = 'MenubarSubTrigger';

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      'border-border bg-popover min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md',
      className
    )}
    {...props}
  />
));
MenubarSubContent.displayName = 'MenubarSubContent';

const MenubarRadioGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { value?: string }
>(({ className, ...props }, ref) => <View ref={ref} className={cn(className)} {...props} />);
MenubarRadioGroup.displayName = 'MenubarRadioGroup';

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
};
