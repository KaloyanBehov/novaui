import { Check, ChevronsUpDown, Search } from 'lucide-react-native';
import * as React from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { cn } from '../../lib/utils';

const ComboboxContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  search: string;
  setSearch: (search: string) => void;
  itemCount: number;
  setItemCount: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

const Combobox = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    value?: string | string[];
    onValueChange?: (value: string | string[]) => void;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
  }
>(
  (
    {
      className,
      value,
      onValueChange,
      defaultOpen = false,
      open: controlledOpen,
      onOpenChange: controlledOnOpenChange,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
    const [search, setSearch] = React.useState('');
    const [itemCount, setItemCount] = React.useState(0);

    const open = controlledOpen ?? uncontrolledOpen;
    const setOpen = controlledOnOpenChange ?? setUncontrolledOpen;

    return (
      <ComboboxContext.Provider
        value={{
          open,
          setOpen,
          value,
          onValueChange,
          search,
          setSearch,
          itemCount,
          setItemCount,
        }}>
        <View ref={ref} className={cn('relative z-50', className)} {...props}>
          {children}
        </View>
      </ComboboxContext.Provider>
    );
  }
);
Combobox.displayName = 'Combobox';

const ComboboxTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { asChild?: boolean }
>(({ className, children, asChild, onPress, ...props }, ref) => {
  const { open, setOpen, value } = React.useContext(ComboboxContext)!;

  const handlePress = (e: any) => {
    onPress?.(e);
    setOpen(!open);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      // @ts-ignore
      onPress: handlePress,
      ...props,
    });
  }

  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      className={cn(
        'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex-row items-center justify-between rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}>
      {typeof children === 'function' ? (
        children({ pressed: false })
      ) : typeof children === 'string' ? (
        <Text className="text-foreground text-sm">{children}</Text>
      ) : (
        children
      )}
      <ChevronsUpDown className="text-foreground ml-2 h-4 w-4 shrink-0 opacity-50" size={16} />
    </Pressable>
  );
});
ComboboxTrigger.displayName = 'ComboboxTrigger';

const ComboboxContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const { open, setOpen, setSearch } = React.useContext(ComboboxContext)!;

  if (!open) return null;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={open}
      onRequestClose={() => {
        setOpen(false);
        setSearch('');
      }}>
      <Pressable
        className="flex-1 items-center justify-center bg-black/50 p-4"
        onPress={() => {
          setOpen(false);
          setSearch('');
        }}>
        <Pressable
          className={cn(
            'border-border bg-popover w-full max-w-sm rounded-md border p-0 shadow-md',
            className
          )}
          onPress={(e) => e.stopPropagation()}>
          <View ref={ref} {...props}>
            {children}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
});
ComboboxContent.displayName = 'ComboboxContent';

const ComboboxInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, ...props }, ref) => {
  const { search, setSearch } = React.useContext(ComboboxContext)!;

  return (
    <View
      className="border-input flex-row items-center border-b px-3"
      importantForAccessibility="no-hide-descendants">
      <Search className="text-foreground mr-2 h-4 w-4 shrink-0 opacity-50" size={16} />
      <TextInput
        ref={ref}
        value={search}
        onChangeText={setSearch}
        className={cn(
          'placeholder:text-muted-foreground text-foreground flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none',
          className
        )}
        placeholderTextColor="hsl(var(--muted-foreground))"
        {...props}
      />
    </View>
  );
});
ComboboxInput.displayName = 'ComboboxInput';

const ComboboxList = React.forwardRef<
  React.ElementRef<typeof ScrollView>,
  React.ComponentPropsWithoutRef<typeof ScrollView>
>(({ className, children, ...props }, ref) => {
  return (
    <ScrollView
      ref={ref}
      className={cn('max-h-[300px] p-1', className)}
      keyboardShouldPersistTaps="handled"
      {...props}>
      {children}
    </ScrollView>
  );
});
ComboboxList.displayName = 'ComboboxList';

const ComboboxEmpty = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  // Simple implementation: always render, user conditionally renders it based on their own logic
  // or we could try to detect if all items are hidden, but that's complex with composition.
  // For now, let's just render it as a styled View.
  return (
    <View ref={ref} className={cn('py-6 text-center text-sm', className)} {...props}>
      {typeof children === 'string' ? (
        <Text className="text-muted-foreground text-center text-sm">{children}</Text>
      ) : (
        children
      )}
    </View>
  );
});
ComboboxEmpty.displayName = 'ComboboxEmpty';

const ComboboxGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { heading?: string }
>(({ className, heading, children, ...props }, ref) => {
  return (
    <View ref={ref} className={cn('overflow-hidden', className)} {...props}>
      {heading && (
        <Text className="text-muted-foreground px-2 py-1.5 text-xs font-medium">{heading}</Text>
      )}
      {children}
    </View>
  );
});
ComboboxGroup.displayName = 'ComboboxGroup';

const ComboboxItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    label: string;
    value: string;
  }
>(({ className, children, label, value: itemValue, onPress, ...props }, ref) => {
  const { value, onValueChange, setOpen, search, setSearch } = React.useContext(ComboboxContext)!;

  if (search && !label.toLowerCase().includes(search.toLowerCase())) {
    return null;
  }

  const isSelected = Array.isArray(value) ? value.includes(itemValue) : value === itemValue;

  return (
    <Pressable
      ref={ref}
      onPress={(e) => {
        onPress?.(e);
        onValueChange?.(itemValue);
        setOpen(false);
        setSearch('');
      }}
      className={cn(
        'active:bg-accent active:text-accent-foreground relative w-full cursor-default flex-row items-center rounded-sm py-1.5 pr-8 pl-2 outline-none select-none',
        isSelected && 'bg-accent',
        className
      )}
      {...props}>
      {isSelected && (
        <View className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
          <Check className="text-foreground h-4 w-4" size={16} />
        </View>
      )}
      {typeof children === 'function' ? (
        children({ pressed: false })
      ) : typeof children === 'string' ? (
        <Text className={cn('text-foreground text-sm', isSelected && 'font-medium')}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
});
ComboboxItem.displayName = 'ComboboxItem';

const ComboboxSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('bg-muted -mx-1 my-1 h-px', className)} {...props} />
));
ComboboxSeparator.displayName = 'ComboboxSeparator';

export {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
};
