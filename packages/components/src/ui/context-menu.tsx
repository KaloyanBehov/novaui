import { Check, ChevronRight, Circle } from 'lucide-react-native';
import * as React from 'react';
import { Dimensions, Modal, Pressable, Text, View } from 'react-native';
import { cn } from '../../lib/utils';

const ContextMenuContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position: { x: number; y: number };
  setPosition: (position: { x: number; y: number }) => void;
} | null>(null);

const ContextMenu = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  return (
    <ContextMenuContext.Provider value={{ open, onOpenChange: setOpen, position, setPosition }}>
      <View style={{ flex: 1 }}>{children}</View>
    </ContextMenuContext.Provider>
  );
};

const ContextMenuTrigger = ({ children, className, disabled, ...props }: any) => {
  const { onOpenChange, setPosition } = React.useContext(ContextMenuContext)!;

  const handleLongPress = (event: any) => {
    if (disabled) return;
    const { pageX, pageY } = event.nativeEvent;
    setPosition({ x: pageX, y: pageY });
    onOpenChange(true);
  };

  return (
    <Pressable onLongPress={handleLongPress} className={cn(className)} {...props}>
      {children}
    </Pressable>
  );
};

const ContextMenuContent = ({ className, children, ...props }: any) => {
  const { open, onOpenChange, position } = React.useContext(ContextMenuContext)!;
  const [contentSize, setContentSize] = React.useState({ width: 0, height: 0 });
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  if (!open) return null;

  let top = position.y;
  let left = position.x;

  // Basic boundary adjustments
  if (contentSize.width > 0 && contentSize.height > 0) {
    if (left + contentSize.width > screenWidth) {
      left = screenWidth - contentSize.width - 10;
    }
    if (top + contentSize.height > screenHeight) {
      top = screenHeight - contentSize.height - 10;
    }
  }

  return (
    <Modal
      transparent
      visible={open}
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}>
      <Pressable style={{ flex: 1 }} onPress={() => onOpenChange(false)}>
        <View
          style={{
            position: 'absolute',
            top,
            left,
          }}
          onLayout={(e) => setContentSize(e.nativeEvent.layout)}>
          <View
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
};

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    inset?: boolean;
    checked?: boolean;
  }
>(({ className, inset, children, checked, ...props }, ref) => {
  const { onOpenChange } = React.useContext(ContextMenuContext)!;

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
ContextMenuItem.displayName = 'ContextMenuItem';

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    checked?: boolean;
  }
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuItem
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
  </ContextMenuItem>
));
ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem';

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    checked?: boolean;
  }
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuItem
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
  </ContextMenuItem>
));
ContextMenuRadioItem.displayName = 'ContextMenuRadioItem';

const ContextMenuLabel = React.forwardRef<
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
ContextMenuLabel.displayName = 'ContextMenuLabel';

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('bg-border -mx-1 my-1 h-px', className)} {...props} />
));
ContextMenuSeparator.displayName = 'ContextMenuSeparator';

const ContextMenuShortcut = ({
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
ContextMenuShortcut.displayName = 'ContextMenuShortcut';

const ContextMenuGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => <View ref={ref} className={cn(className)} {...props} />);
ContextMenuGroup.displayName = 'ContextMenuGroup';

const ContextMenuPortal = View;

const ContextMenuSub = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => <View ref={ref} className={cn(className)} {...props} />);
ContextMenuSub.displayName = 'ContextMenuSub';

const ContextMenuSubTrigger = React.forwardRef<
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
ContextMenuSubTrigger.displayName = 'ContextMenuSubTrigger';

const ContextMenuSubContent = React.forwardRef<
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
ContextMenuSubContent.displayName = 'ContextMenuSubContent';

const ContextMenuRadioGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => <View ref={ref} className={cn(className)} {...props} />);
ContextMenuRadioGroup.displayName = 'ContextMenuRadioGroup';

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
};
