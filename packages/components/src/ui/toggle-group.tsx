import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { View } from 'react-native';
import { cn } from '../../lib/utils';
// Imports at the top — the original had `import { Toggle }` mid-file
// which is valid JS but breaks linters and is confusing to read.
import { Toggle, toggleVariants } from './toggle';

// ─── Types ────────────────────────────────────────────────────────────────────

type ToggleGroupSingleProps = {
  type: 'single';
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

type ToggleGroupMultipleProps = {
  type: 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
};

type ToggleGroupBaseProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof toggleVariants> & {
    disabled?: boolean;
    className?: string;
  };

type ToggleGroupProps = ToggleGroupBaseProps & (ToggleGroupSingleProps | ToggleGroupMultipleProps);

// ─── Context ──────────────────────────────────────────────────────────────────

interface ToggleGroupContextValue {
  size?: VariantProps<typeof toggleVariants>['size'];
  variant?: VariantProps<typeof toggleVariants>['variant'];
  type: 'single' | 'multiple';
  value: string | string[];
  onValueChange: (itemValue: string) => void;
  disabled?: boolean;
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  size: 'default',
  variant: 'default',
  type: 'single',
  // undefined is a better "nothing selected" sentinel than '' — an empty
  // string could be a legitimate value in some datasets.
  value: [],
  onValueChange: () => {},
  disabled: false,
});

function useToggleGroup() {
  return React.useContext(ToggleGroupContext);
}

// ─── ToggleGroup ──────────────────────────────────────────────────────────────

const ToggleGroup = React.forwardRef<React.ElementRef<typeof View>, ToggleGroupProps>(
  (
    {
      className,
      variant,
      size,
      children,
      type,
      value: controlledValue,
      defaultValue,
      onValueChange,
      disabled,
      ...props
    },
    ref
  ) => {
    // ── Controlled / uncontrolled ───────────────────────────────────────────
    // The original always used internal state initialised from valueProp,
    // meaning external `value` changes after mount were silently ignored.
    // We fix this with the standard controlled/uncontrolled pattern.
    const initialValue = defaultValue ?? (type === 'multiple' ? [] : undefined);
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string | string[] | undefined>(
      initialValue
    );

    // If caller passes `value`, use it; otherwise use internal state.
    const value = controlledValue ?? uncontrolledValue ?? (type === 'multiple' ? [] : undefined);

    const handleValueChange = React.useCallback(
      (itemValue: string) => {
        let next: string | string[];

        if (type === 'single') {
          // Tapping the active item deselects it (returns undefined → '').
          next = itemValue === value ? '' : itemValue;
          if (controlledValue === undefined) setUncontrolledValue(next);
          (onValueChange as ((v: string) => void) | undefined)?.(next as string);
        } else {
          const current = Array.isArray(value) ? value : [];
          next = current.includes(itemValue)
            ? current.filter((v) => v !== itemValue)
            : [...current, itemValue];
          if (controlledValue === undefined) setUncontrolledValue(next);
          (onValueChange as ((v: string[]) => void) | undefined)?.(next as string[]);
        }
      },
      [type, value, controlledValue, onValueChange]
    );

    return (
      <ToggleGroupContext.Provider
        value={{
          variant,
          size,
          type,
          value: value ?? [],
          onValueChange: handleValueChange,
          disabled,
        }}>
        <View
          ref={ref}
          accessibilityRole="toolbar"
          className={cn('flex-row items-center gap-1', className)}
          {...props}>
          {children}
        </View>
      </ToggleGroupContext.Provider>
    );
  }
);
ToggleGroup.displayName = 'ToggleGroup';

// ─── ToggleGroupItem ──────────────────────────────────────────────────────────

interface ToggleGroupItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Toggle>,
  'pressed' | 'onPressedChange'
> {
  value: string;
  /** Disables this item only. Group-level `disabled` also disables all items. */
  disabled?: boolean;
}

const ToggleGroupItem = React.forwardRef<React.ElementRef<typeof Toggle>, ToggleGroupItemProps>(
  ({ className, children, value, disabled: itemDisabled, ...props }, ref) => {
    const {
      variant,
      size,
      value: groupValue,
      onValueChange,
      disabled: groupDisabled,
    } = useToggleGroup();

    const isDisabled = !!itemDisabled || !!groupDisabled;
    const pressed = Array.isArray(groupValue) ? groupValue.includes(value) : groupValue === value;

    return (
      <Toggle
        ref={ref}
        variant={variant}
        size={size}
        pressed={pressed}
        disabled={isDisabled}
        onPressedChange={() => {
          if (!isDisabled) onValueChange(value);
        }}
        accessibilityState={{ selected: pressed, disabled: isDisabled }}
        className={cn(className)}
        {...props}>
        {children}
      </Toggle>
    );
  }
);
ToggleGroupItem.displayName = 'ToggleGroupItem';

// ─── Exports ──────────────────────────────────────────────────────────────────

export { ToggleGroup, ToggleGroupItem };
export type { ToggleGroupItemProps, ToggleGroupProps };
