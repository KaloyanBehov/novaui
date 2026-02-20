import { X } from 'lucide-react-native';
import * as React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  SlideOutDown,
  SlideOutLeft,
  SlideOutRight,
  SlideOutUp,
} from 'react-native-reanimated';
import { cn } from '../../lib/utils';

const SheetContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
} | null>(null);

const Sheet = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(({ children, open: controlledOpen, onOpenChange: controlledOnOpenChange, ...props }, ref) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const onOpenChange = controlledOnOpenChange ?? setUncontrolledOpen;

  return (
    <SheetContext.Provider value={{ open, onOpenChange }}>
      <View ref={ref} {...props}>
        {children}
      </View>
    </SheetContext.Provider>
  );
});
Sheet.displayName = 'Sheet';

const SheetTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { asChild?: boolean }
>(({ children, asChild, onPress, ...props }, ref) => {
  const { onOpenChange } = React.useContext(SheetContext)!;

  const handlePress = (e: any) => {
    onPress?.(e);
    onOpenChange(true);
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
SheetTrigger.displayName = 'SheetTrigger';

const SheetPortal = ({ children }: { children: React.ReactNode }) => {
  const { open, onOpenChange } = React.useContext(SheetContext)!;

  return (
    <Modal
      transparent
      visible={open}
      onRequestClose={() => onOpenChange(false)}
      animationType="none"
      statusBarTranslucent>
      {open && children}
    </Modal>
  );
};
SheetPortal.displayName = 'SheetPortal';

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ className, ...props }, ref) => {
  const { onOpenChange } = React.useContext(SheetContext)!;

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{ ...StyleSheet.absoluteFillObject, zIndex: 0 }}>
      <Pressable
        ref={ref}
        className={cn('flex-1 bg-black/80', className)}
        onPress={() => onOpenChange(false)}
        {...props}
      />
    </Animated.View>
  );
});
SheetOverlay.displayName = 'SheetOverlay';

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  side?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}

const SheetContent = React.forwardRef<React.ElementRef<typeof View>, SheetContentProps>(
  ({ className, children, side = 'right', ...props }, ref) => {
    const { onOpenChange } = React.useContext(SheetContext)!;

    const getEnteringAnimation = () => {
      switch (side) {
        case 'top':
          return SlideInUp;
        case 'bottom':
          return SlideInDown;
        case 'left':
          return SlideInLeft;
        case 'right':
          return SlideInRight;
        default:
          return SlideInRight;
      }
    };

    const getExitingAnimation = () => {
      switch (side) {
        case 'top':
          return SlideOutUp;
        case 'bottom':
          return SlideOutDown;
        case 'left':
          return SlideOutLeft;
        case 'right':
          return SlideOutRight;
        default:
          return SlideOutRight;
      }
    };

    const getSideStyles = () => {
      switch (side) {
        case 'top':
          return 'inset-x-0 top-0 border-b';
        case 'bottom':
          return 'inset-x-0 bottom-0 border-t';
        case 'left':
          return 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm';
        case 'right':
          return 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm';
        default:
          return 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm';
      }
    };

    return (
      <SheetPortal>
        <SheetOverlay />
        <Animated.View
          entering={getEnteringAnimation()}
          exiting={getExitingAnimation()}
          className={cn(
            'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out absolute z-50 gap-4 p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
            getSideStyles(),
            className
          )}
          {...props}>
          {children}
          <Pressable
            className="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
            onPress={() => onOpenChange(false)}>
            <X size={24} className="text-muted-foreground" />
            <span className="sr-only">Close</span>
          </Pressable>
        </Animated.View>
      </SheetPortal>
    );
  }
);
SheetContent.displayName = 'SheetContent';

const SheetHeader = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) => (
  <View className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) => (
  <View
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text ref={ref} className={cn('text-foreground text-lg font-semibold', className)} {...props} />
));
SheetTitle.displayName = 'SheetTitle';

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
));
SheetDescription.displayName = 'SheetDescription';

const SheetClose = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { asChild?: boolean }
>(({ children, asChild, onPress, ...props }, ref) => {
  const { onOpenChange } = React.useContext(SheetContext)!;

  const handlePress = (e: any) => {
    onPress?.(e);
    onOpenChange(false);
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
SheetClose.displayName = 'SheetClose';

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
