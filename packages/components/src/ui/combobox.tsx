import * as Haptics from 'expo-haptics';
import { Check, ChevronsUpDown, Search, X } from 'lucide-react-native';
import * as React from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutDown } from 'react-native-reanimated';
import { cn } from '../../lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

type ComboboxValue = string | string[];

interface ComboboxContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  value?: ComboboxValue;
  onValueChange?: (value: ComboboxValue) => void;
  /** Whether multiple items can be selected simultaneously. */
  multiple: boolean;
  search: string;
  setSearch: (search: string) => void;
  /**
   * Matched item count — written by ComboboxItem, read by ComboboxEmpty.
   * Replaces the original itemCount state which was tracked but never used.
   */
  matchedCount: number;
  setMatchedCount: React.Dispatch<React.SetStateAction<number>>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ComboboxContext = React.createContext<ComboboxContextValue | null>(null);

function useCombobox() {
  const ctx = React.useContext(ComboboxContext);
  if (!ctx) throw new Error('Combobox compound components must be used inside <Combobox>');
  return ctx;
}

/** Close the combobox and reset search — used in multiple places. */
function useCloseCombobox() {
  const { setOpen, setSearch } = useCombobox();
  return React.useCallback(() => {
    setOpen(false);
    setSearch('');
  }, [setOpen, setSearch]);
}

// ─── Root ─────────────────────────────────────────────────────────────────────

interface ComboboxProps extends Omit<React.ComponentPropsWithoutRef<typeof View>, 'children'> {
  value?: ComboboxValue;
  onValueChange?: (value: ComboboxValue) => void;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Allow selecting multiple items. When true:
   *   - value should be string[]
   *   - The dropdown stays open after each selection
   *   - A clear-all affordance is shown when items are selected
   */
  multiple?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Combobox = React.forwardRef<React.ElementRef<typeof View>, ComboboxProps>(
  (
    {
      className,
      value,
      onValueChange,
      defaultOpen = false,
      open: controlledOpen,
      onOpenChange,
      multiple = false,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
    const [search, setSearch] = React.useState('');
    const [matchedCount, setMatchedCount] = React.useState(0);

    const open = controlledOpen ?? uncontrolledOpen;
    const setOpen = React.useCallback(
      (next: boolean) => {
        if (controlledOpen === undefined) setUncontrolledOpen(next);
        onOpenChange?.(next);
      },
      [controlledOpen, onOpenChange]
    );

    return (
      <ComboboxContext.Provider
        value={{
          open,
          setOpen,
          value,
          onValueChange,
          multiple,
          search,
          setSearch,
          matchedCount,
          setMatchedCount,
        }}>
        {/*
         * FIX: removed `relative z-50` from root View.
         * Content renders inside a Modal — it's not positioned relative to
         * this View at all, so these classes were meaningless.
         */}
        <View ref={ref} className={cn(className)} {...props}>
          {children}
        </View>
      </ComboboxContext.Provider>
    );
  }
);
Combobox.displayName = 'Combobox';

// ─── Trigger ──────────────────────────────────────────────────────────────────

const ComboboxTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'children'> & {
    asChild?: boolean;
    children?: React.ReactNode | ((state: { pressed: boolean }) => React.ReactNode);
    placeholder?: string;
  }
>(({ className, children, asChild, onPress, placeholder, ...props }, ref) => {
  const { open, setOpen, value, multiple } = useCombobox();

  // Derive a display label from the current value for the default trigger UI
  const selectedCount = Array.isArray(value) ? value.length : value ? 1 : 0;

  const handlePress = (e: any) => {
    onPress?.(e);
    setOpen(!open);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onPress: handlePress,
      ...props,
    });
  }

  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      accessibilityRole="combobox"
      accessibilityState={{ expanded: open }}
      className={cn(
        // FIX: removed web-only focus:ring-*, placeholder:*, ring-offset-* classes
        'border-input bg-background flex-row items-center justify-between rounded-md border px-3 py-2 disabled:opacity-50',
        className
      )}
      {...props}>
      {typeof children === 'function' ? (
        children({ pressed: false })
      ) : typeof children === 'string' ? (
        <Text className="text-foreground flex-1 text-sm">{children}</Text>
      ) : children ? (
        children
      ) : (
        // Default trigger: show placeholder or selection summary
        <Text
          className={cn(
            'flex-1 text-sm',
            selectedCount > 0 ? 'text-foreground' : 'text-muted-foreground'
          )}>
          {selectedCount > 0
            ? multiple
              ? `${selectedCount} selected`
              : Array.isArray(value)
                ? value[0]
                : value
            : (placeholder ?? 'Select...')}
        </Text>
      )}
      <ChevronsUpDown size={16} className="text-muted-foreground ml-2 shrink-0" />
    </Pressable>
  );
});
ComboboxTrigger.displayName = 'ComboboxTrigger';

// ─── Content ──────────────────────────────────────────────────────────────────

const ComboboxContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const { open } = useCombobox();
  const close = useCloseCombobox();

  if (!open) return null;

  return (
    <Modal
      transparent
      animationType="none"
      visible={open}
      statusBarTranslucent
      onRequestClose={close}>
      {/* Animated backdrop */}
      <Animated.View
        entering={FadeIn.duration(150)}
        exiting={FadeOut.duration(150)}
        style={{ flex: 1 }}>
        <Pressable className="flex-1 items-center justify-center bg-black/60 px-4" onPress={close}>
          {/* Animated content panel — slides up slightly on enter */}
          <Animated.View
            entering={FadeInDown.duration(200).springify().damping(24).stiffness(260)}
            exiting={FadeOutDown.duration(150)}
            className="w-full max-w-sm">
            <Pressable
              onPress={(e) => e.stopPropagation()}
              className={cn(
                'border-border bg-popover w-full overflow-hidden rounded-xl border shadow-lg',
                className
              )}>
              <View ref={ref} {...props}>
                {children}
              </View>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Animated.View>
    </Modal>
  );
});
ComboboxContent.displayName = 'ComboboxContent';

// ─── Search Input ─────────────────────────────────────────────────────────────

const ComboboxInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, ...props }, ref) => {
  const { search, setSearch } = useCombobox();

  return (
    <View className="border-border flex-row items-center border-b px-3">
      <Search size={16} className="text-muted-foreground mr-2 shrink-0" />
      <TextInput
        ref={ref}
        value={search}
        onChangeText={setSearch}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        // FIX: removed web-only outline-none, text-sm (invalid on TextInput in RN)
        className={cn('text-foreground h-11 flex-1 bg-transparent text-base', className)}
        placeholderTextColor="hsl(var(--muted-foreground))"
        {...props}
      />
      {/* Clear search button — only visible when search has content */}
      {search.length > 0 && (
        <Pressable
          onPress={() => setSearch('')}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityLabel="Clear search">
          <X size={16} className="text-muted-foreground" />
        </Pressable>
      )}
    </View>
  );
});
ComboboxInput.displayName = 'ComboboxInput';

// ─── List ─────────────────────────────────────────────────────────────────────

const ComboboxList = React.forwardRef<
  React.ElementRef<typeof ScrollView>,
  React.ComponentPropsWithoutRef<typeof ScrollView>
>(({ className, children, ...props }, ref) => {
  return (
    <ScrollView
      ref={ref}
      className={cn('p-1', className)}
      style={{ maxHeight: 300 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      {...props}>
      {children}
    </ScrollView>
  );
});
ComboboxList.displayName = 'ComboboxList';

// ─── Empty ────────────────────────────────────────────────────────────────────

const ComboboxEmpty = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const { matchedCount } = useCombobox();

  /*
   * FIX: auto-hides when any items match the current search.
   * The original always rendered with a comment saying detection was "complex".
   * It's not — ComboboxItem increments matchedCount, so we just check it here.
   */
  if (matchedCount > 0) return null;

  return (
    <View ref={ref} className={cn('items-center py-8', className)} {...props}>
      {typeof children === 'string' ? (
        <Text className="text-muted-foreground text-sm">{children}</Text>
      ) : (
        (children ?? <Text className="text-muted-foreground text-sm">No results found.</Text>)
      )}
    </View>
  );
});
ComboboxEmpty.displayName = 'ComboboxEmpty';

// ─── Group ────────────────────────────────────────────────────────────────────

const ComboboxGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { heading?: string }
>(({ className, heading, children, ...props }, ref) => {
  return (
    <View ref={ref} className={cn('overflow-hidden', className)} {...props}>
      {heading && (
        // FIX: updated to match our Label typography variant —
        // uppercase + wide tracking distinguishes group headings from items
        <Text className="text-muted-foreground px-2 py-1.5 text-xs font-semibold uppercase tracking-widest">
          {heading}
        </Text>
      )}
      {children}
    </View>
  );
});
ComboboxGroup.displayName = 'ComboboxGroup';

// ─── Item ─────────────────────────────────────────────────────────────────────

const ComboboxItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'children'> & {
    label: string;
    value: string;
    children?: React.ReactNode;
  }
>(({ className, children, label, value: itemValue, onPress, ...props }, ref) => {
  const { value, onValueChange, setOpen, setSearch, search, multiple, setMatchedCount } =
    useCombobox();

  const isFiltered = search.length > 0 && !label.toLowerCase().includes(search.toLowerCase());

  // Register match count with context so ComboboxEmpty can auto-show/hide.
  // We use a layout effect so the count updates synchronously before paint.
  React.useLayoutEffect(() => {
    if (!isFiltered) {
      setMatchedCount((n) => n + 1);
      return () => setMatchedCount((n) => n - 1);
    }
  }, [isFiltered, setMatchedCount]);

  if (isFiltered) return null;

  const isSelected = Array.isArray(value) ? value.includes(itemValue) : value === itemValue;

  const handlePress = (e: any) => {
    onPress?.(e);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (multiple) {
      // Multi-select: toggle item, keep dropdown open
      const current = Array.isArray(value) ? value : [];
      const next = current.includes(itemValue)
        ? current.filter((v) => v !== itemValue)
        : [...current, itemValue];
      onValueChange?.(next);
      // Don't close or reset search — user may want to select more
    } else {
      // Single-select: close and clear search on selection
      onValueChange?.(itemValue);
      setOpen(false);
      setSearch('');
    }
  };

  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      accessibilityRole="menuitem"
      accessibilityState={{ selected: isSelected }}
      // FIX: py-3 for 44pt touch target (was py-1.5 — ~12pt, too small)
      className={cn(
        'active:bg-accent relative w-full select-none flex-row items-center rounded-sm py-3 pl-2 pr-8',
        isSelected && 'bg-accent',
        className
      )}
      {...props}>
      {/* Checkmark — right-aligned */}
      <View className="absolute right-2 h-4 w-4 items-center justify-center">
        {isSelected && <Check size={14} className="text-foreground" />}
      </View>

      {typeof children === 'string' ? (
        <Text className={cn('text-foreground text-sm', isSelected && 'font-medium')}>
          {children}
        </Text>
      ) : children ? (
        children
      ) : (
        <Text className={cn('text-foreground text-sm', isSelected && 'font-medium')}>{label}</Text>
      )}
    </Pressable>
  );
});
ComboboxItem.displayName = 'ComboboxItem';

// ─── Separator ────────────────────────────────────────────────────────────────

const ComboboxSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('bg-border -mx-1 my-1 h-px', className)} {...props} />
));
ComboboxSeparator.displayName = 'ComboboxSeparator';

// ─── Exports ──────────────────────────────────────────────────────────────────

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
export type { ComboboxProps };
