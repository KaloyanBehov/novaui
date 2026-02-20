import * as React from 'react';
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { cn } from '../../lib/utils';
import { Button } from './button';
import { Text } from './text';

interface AlertDialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertDialogContext = React.createContext<AlertDialogContextValue>(
  {} as AlertDialogContextValue
);

const AlertDialog = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
  }
>(
  (
    {
      open: controlledOpen,
      onOpenChange: controlledOnOpenChange,
      defaultOpen = false,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
    const open = controlledOpen ?? uncontrolledOpen;
    const onOpenChange = controlledOnOpenChange ?? setUncontrolledOpen;

    return (
      <AlertDialogContext.Provider value={{ open, onOpenChange }}>
        <View ref={ref} {...props}>
          {children}
        </View>
      </AlertDialogContext.Provider>
    );
  }
);
AlertDialog.displayName = 'AlertDialog';

const AlertDialogTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> & { asChild?: boolean }
>(({ asChild, children, onPress, ...props }, ref) => {
  const { onOpenChange } = React.useContext(AlertDialogContext);

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
    <Button ref={ref} onPress={handlePress} {...props}>
      {children}
    </Button>
  );
});
AlertDialogTrigger.displayName = 'AlertDialogTrigger';

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const { open, onOpenChange } = React.useContext(AlertDialogContext);

  if (!open) return null;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={open}
      onRequestClose={() => onOpenChange(false)}
      statusBarTranslucent>
      <View className="flex-1 items-center justify-center bg-black/50">
        <TouchableWithoutFeedback onPress={() => onOpenChange(false)}>
          <View style={StyleSheet.absoluteFill} />
        </TouchableWithoutFeedback>

        <Animated.View
          entering={FadeIn.springify().damping(20)}
          exiting={FadeOut}
          className={cn(
            'border-border bg-background z-50 w-[90%] max-w-lg gap-4 rounded-lg border p-6 shadow-lg',
            className
          )}
          {...props}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
});
AlertDialogContent.displayName = 'AlertDialogContent';

const AlertDialogHeader = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View className={cn('flex-col gap-2', className)} {...props} />
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View className={cn('flex-row items-center justify-end gap-2', className)} {...props} />
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text ref={ref} className={cn('text-foreground text-lg font-semibold', className)} {...props} />
));
AlertDialogTitle.displayName = 'AlertDialogTitle';

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
));
AlertDialogDescription.displayName = 'AlertDialogDescription';

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, onPress, ...props }, ref) => {
  const { onOpenChange } = React.useContext(AlertDialogContext);
  return (
    <Button
      ref={ref}
      className={cn(className)}
      onPress={(e) => {
        onPress?.(e);
        onOpenChange(false);
      }}
      {...props}
    />
  );
});
AlertDialogAction.displayName = 'AlertDialogAction';

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, onPress, variant = 'outline', ...props }, ref) => {
  const { onOpenChange } = React.useContext(AlertDialogContext);
  return (
    <Button
      ref={ref}
      variant={variant}
      className={cn('mt-0', className)}
      onPress={(e) => {
        onPress?.(e);
        onOpenChange(false);
      }}
      {...props}
    />
  );
});
AlertDialogCancel.displayName = 'AlertDialogCancel';

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
};
