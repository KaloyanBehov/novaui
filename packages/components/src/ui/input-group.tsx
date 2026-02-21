import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { View } from 'react-native';
import { cn } from '../../lib/utils';
import { Button } from './button';
import { Input } from './input';
import { Text } from './text';
import { Textarea } from './textarea';

const InputGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(
        'border-input bg-background flex-row items-center overflow-hidden rounded-md border',
        className
      )}
      {...props}
    />
  );
});
InputGroup.displayName = 'InputGroup';

const inputGroupAddonVariants = cva('bg-muted flex items-center justify-center px-3', {
  variants: {
    align: {
      'inline-start': 'border-input border-r',
      'inline-end': 'border-input border-l',
      'block-start': 'border-input w-full border-b',
      'block-end': 'border-input w-full border-t',
    },
  },
  defaultVariants: {
    align: 'inline-start',
  },
});

const InputGroupAddon = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> &
    VariantProps<typeof inputGroupAddonVariants> & { className?: string }
>(({ className, align = 'inline-start', children, ...props }, ref) => {
  return (
    <View ref={ref} className={cn(inputGroupAddonVariants({ align }), className)} {...props}>
      {typeof children === 'string' ? (
        <Text className="text-muted-foreground text-sm font-medium">{children}</Text>
      ) : (
        children
      )}
    </View>
  );
});
InputGroupAddon.displayName = 'InputGroupAddon';

const inputGroupButtonVariants = cva('rounded-none bg-transparent', {
  variants: {
    size: {
      xs: 'h-8 px-2',
      sm: 'h-9 px-3',
      'icon-xs': 'h-8 w-8 p-0',
      'icon-sm': 'h-9 w-9 p-0',
    },
  },
  defaultVariants: {
    size: 'xs',
  },
});

const InputGroupButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  Omit<React.ComponentProps<typeof Button>, 'size'> & VariantProps<typeof inputGroupButtonVariants>
>(({ className, variant = 'ghost', size = 'xs', ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
});
InputGroupButton.displayName = 'InputGroupButton';

const InputGroupText = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, children, ...props }, ref) => {
  return (
    <View ref={ref} className={cn('flex items-center justify-center px-3', className)} {...props}>
      {typeof children === 'string' ? (
        <Text className="text-muted-foreground text-sm">{children}</Text>
      ) : (
        children
      )}
    </View>
  );
});
InputGroupText.displayName = 'InputGroupText';

const InputGroupInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      className={cn(
        'h-10 flex-1 rounded-none border-0 bg-transparent focus-visible:ring-0',
        className
      )}
      {...props}
    />
  );
});
InputGroupInput.displayName = 'InputGroupInput';

const InputGroupTextarea = React.forwardRef<
  React.ElementRef<typeof Textarea>,
  React.ComponentProps<typeof Textarea>
>(({ className, ...props }, ref) => {
  return (
    <Textarea
      ref={ref}
      className={cn(
        'min-h-[80px] flex-1 rounded-none border-0 bg-transparent focus-visible:ring-0',
        className
      )}
      {...props}
    />
  );
});
InputGroupTextarea.displayName = 'InputGroupTextarea';

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};
