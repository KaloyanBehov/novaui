import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { View } from 'react-native';
import { cn } from '../../lib/utils';
import { Text } from './text';

const buttonGroupVariants = cva('flex-row items-stretch overflow-hidden rounded-md', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const ButtonGroupContext = React.createContext<{ orientation?: 'horizontal' | 'vertical' }>({
  orientation: 'horizontal',
});

const ButtonGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof buttonGroupVariants>
>(({ className, orientation = 'horizontal', children, ...props }, ref) => {
  return (
    <ButtonGroupContext.Provider value={{ orientation: orientation || 'horizontal' }}>
      <View
        ref={ref}
        role="group"
        className={cn(buttonGroupVariants({ orientation }), className)}
        {...props}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child;

          const isFirst = index === 0;
          const isLast = index === React.Children.count(children) - 1;

          const childElement = child as React.ReactElement<{ className?: string }>;

          return React.cloneElement(childElement, {
            className: cn(
              childElement.props.className,
              'rounded-none',
              orientation === 'horizontal' && !isFirst && 'border-l-0',
              orientation === 'vertical' && !isFirst && 'border-t-0'
            ),
          });
        })}
      </View>
    </ButtonGroupContext.Provider>
  );
});
ButtonGroup.displayName = 'ButtonGroup';

const ButtonGroupText = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(
        'bg-muted border-input flex-row items-center justify-center border px-4 py-2',
        className
      )}
      {...props}>
      {typeof children === 'string' ? (
        <Text className="text-foreground text-sm font-medium">{children}</Text>
      ) : (
        children
      )}
    </View>
  );
});
ButtonGroupText.displayName = 'ButtonGroupText';

export { ButtonGroup, ButtonGroupText };
