import { Check, ChevronRight, Circle } from 'lucide-react-native';
import * as React from 'react';
import { Dimensions, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { cn } from '../../lib/utils';

const DropdownMenuContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position: { x: number; y: number; width: number; height: number };
  setPosition: (position: { x: number; y: number; width: number; height: number }) => void;
} | null>(null);

const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0, width: 0, height: 0 });

  return (
    <DropdownMenuContext.Provider value={{ open, onOpenChange: setOpen, position, setPosition }}>
      <View style={{ flex: 1 }}>{children}</View>
    </DropdownMenuContext.Provider>
  );
};

const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { asChild?: boolean }
>(({ children, asChild, onPress, ...props }, ref) => {
  const { onOpenChange, setPosition } = React.useContext(DropdownMenuContext)!;
  const triggerRef = React.useRef<View>(null);

  const handlePress = (e: any) => {
    triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setPosition({ x: pageX, y: pageY, width, height });
      onOpenChange(true);
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
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

const DropdownMenuPortal = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
DropdownMenuPortal.displayName = 'DropdownMenuPortal';

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    sideOffset?: number;
    align?: 'start' | 'center' | 'end';
    className?: string;
  }
>(({ className, children, sideOffset = 4, align = 'start', ...props }, ref) => {
  const { open, onOpenChange, position } = React.useContext(DropdownMenuContext)!;
  const [contentSize, setContentSize] = React.useState({ width: 0, height: 0 });
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  if (!open) return null;

  let top = position.y + position.height + sideOffset;
  let left = position.x;

  if (align === 'center') {
    left = position.x + position.width / 2 - contentSize.width / 2;
  } else if (align === 'end') {
    left = position.x + position.width - contentSize.width;
  }

  // Basic boundary adjustments
  if (contentSize.width > 0 && contentSize.height > 0) {
    if (left + contentSize.width > screenWidth) {
      left = screenWidth - contentSize.width - 10;
    }
    if (left < 10) {
      left = 10;
    }
    // If it goes off bottom, flip it? For now just clamp or let it be.
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
              'border-border bg-popover min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md',
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
DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    inset?: boolean;
    checked?: boolean;
  }
>(({ className, inset, children, checked, ...props }, ref) => {
  const { onOpenChange } = React.useContext(DropdownMenuContext)!;

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
DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    checked?: boolean;
  }
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuItem
    ref={ref}
    className={cn('relative pl-8', className)}
    checked={checked}
    {...props}>
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
  </DropdownMenuItem>
));
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    checked?: boolean;
  }
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuItem
    ref={ref}
    className={cn('relative pl-8', className)}
    checked={checked}
    {...props}>
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
  </DropdownMenuItem>
));
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

const DropdownMenuLabel = React.forwardRef<
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
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('bg-border -mx-1 my-1 h-px', className)} {...props} />
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Text>) => {
  return (
    <Text
      className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

const DropdownMenuGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => <View ref={ref} className={cn(className)} {...props} />);
DropdownMenuGroup.displayName = 'DropdownMenuGroup';

const DropdownMenuSub = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => <View ref={ref} className={cn(className)} {...props} />);
DropdownMenuSub.displayName = 'DropdownMenuSub';

const DropdownMenuSubTrigger = React.forwardRef<
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
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

const DropdownMenuSubContent = React.forwardRef<
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
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

const DropdownMenuRadioGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => <View ref={ref} className={cn(className)} {...props} />);
DropdownMenuRadioGroup.displayName = 'DropdownMenuRadioGroup';

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
