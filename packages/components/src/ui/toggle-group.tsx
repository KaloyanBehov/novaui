import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { View } from 'react-native';
import { cn } from '../../lib/utils';
import { toggleVariants } from './toggle';

const ToggleGroupContext = React.createContext<{
  size?: VariantProps<typeof toggleVariants>['size'];
  variant?: VariantProps<typeof toggleVariants>['variant'];
  value: string | string[];
  onValueChange: (value: string) => void;
  type: 'single' | 'multiple';
}>({
  size: 'default',
  variant: 'default',
  value: '',
  onValueChange: () => {},
  type: 'single',
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> &
    VariantProps<typeof toggleVariants> & {
      type: 'single' | 'multiple';
      value?: string | string[];
      onValueChange?: (value: string | string[]) => void;
    }
>(
  (
    { className, variant, size, children, type, value: valueProp, onValueChange, ...props },
    ref
  ) => {
    const [value, setValue] = React.useState<string | string[]>(
      valueProp || (type === 'multiple' ? [] : '')
    );

    const handleValueChange = (itemValue: string) => {
      let newValue: string | string[];
      if (type === 'single') {
        newValue = itemValue === value ? '' : itemValue;
      } else {
        const currentValues = Array.isArray(value) ? value : [];
        newValue = currentValues.includes(itemValue)
          ? currentValues.filter((v) => v !== itemValue)
          : [...currentValues, itemValue];
      }
      setValue(newValue);
      onValueChange?.(newValue);
    };

    return (
      <ToggleGroupContext.Provider
        value={{ variant, size, value, onValueChange: handleValueChange, type }}>
        <View
          ref={ref}
          className={cn('flex flex-row items-center justify-center gap-1', className)}
          {...props}>
          {children}
        </View>
      </ToggleGroupContext.Provider>
    );
  }
);
ToggleGroup.displayName = 'ToggleGroup';

import { Toggle } from './toggle';

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof Toggle>,
  React.ComponentPropsWithoutRef<typeof Toggle> & { value: string }
>(({ className, children, value, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);
  const pressed = Array.isArray(context.value)
    ? context.value.includes(value)
    : context.value === value;

  return (
    <Toggle
      ref={ref}
      variant={context.variant}
      size={context.size}
      pressed={pressed}
      onPressedChange={() => context.onValueChange(value)}
      className={cn(className)}
      {...props}>
      {children}
    </Toggle>
  );
});
ToggleGroupItem.displayName = 'ToggleGroupItem';

export { ToggleGroup, ToggleGroupItem };
