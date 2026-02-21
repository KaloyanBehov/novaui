import { Check, ChevronDown, ChevronUp } from 'lucide-react-native';
import * as React from 'react';
import { Dimensions, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { cn } from '../../lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

type Position = { x: number; y: number; width: number; height: number };

interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  position: Position;
  setPosition: (p: Position) => void;
  /** Synchronously-resolved map of value → label, built by scanning JSX children. */
  itemLabels: Record<string, string>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const SelectContext = React.createContext<SelectContextValue>({
  open: false,
  setOpen: () => {},
  position: { x: 0, y: 0, width: 0, height: 0 },
  setPosition: () => {},
  itemLabels: {},
});

function useSelect() {
  return React.useContext(SelectContext);
}

/**
 * Recursively walk a ReactNode tree and collect every SelectItem's
 * value → label mapping. Runs synchronously during render so SelectValue
 * always has labels available on the very first paint — no useEffect,
 * no timing race with the registry pattern.
 *
 * Supports items nested inside SelectGroup, SelectContent, fragments, etc.
 */
function extractItemLabels(children: React.ReactNode): Record<string, string> {
  const labels: Record<string, string> = {};

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    const props = child.props as any;

    // Match SelectItem by checking for the `value` prop + string/label children
    if (typeof props?.value === 'string') {
      const label: string =
        props.label ??
        (typeof props.children === 'string' ? props.children : undefined) ??
        props.value;
      labels[props.value] = label;
    }

    // Recurse into any wrapper (SelectContent, SelectGroup, fragments…)
    if (props?.children) {
      Object.assign(labels, extractItemLabels(props.children));
    }
  });

  return labels;
}

// ─── Root ─────────────────────────────────────────────────────────────────────

const Select = ({
  value,
  onValueChange,
  children,
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState<Position>({ x: 0, y: 0, width: 0, height: 0 });

  // Build the label map synchronously on every render.
  // Cheap (just a shallow tree walk) and always in sync with declared children.
  const itemLabels = extractItemLabels(children);

  return (
    <SelectContext.Provider
      value={{ value, onValueChange, open, setOpen, position, setPosition, itemLabels }}>
      <View>{children}</View>
    </SelectContext.Provider>
  );
};
Select.displayName = 'Select';

// ─── Group ────────────────────────────────────────────────────────────────────

const SelectGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => <View ref={ref} className={cn(className)} {...props} />);
SelectGroup.displayName = 'SelectGroup';

// ─── Trigger ──────────────────────────────────────────────────────────────────

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'children'> & {
    size?: 'sm' | 'default';
    className?: string;
    children?: React.ReactNode;
  }
>(({ className, size = 'default', children, onPress, ...props }, ref) => {
  const { setOpen, setPosition } = useSelect();
  const triggerRef = React.useRef<View>(null);

  // Merge forwarded ref with our internal measurement ref
  const mergedRef = React.useCallback(
    (node: View | null) => {
      (triggerRef as React.MutableRefObject<View | null>).current = node;
      if (typeof ref === 'function') ref(node as any);
      else if (ref) (ref as React.MutableRefObject<View | null>).current = node;
    },
    [ref]
  );

  const handlePress = (e: any) => {
    /*
     * FIX: Use measureInWindow instead of measure.
     * measure() returns coords relative to the nearest positioned ancestor —
     * which can be offset inside nested layouts. measureInWindow always
     * returns coordinates relative to the device screen, which is what we
     * need for absolute Modal positioning.
     */
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setPosition({ x, y, width, height });
      setOpen(true);
    });
    onPress?.(e);
  };

  return (
    <Pressable
      ref={mergedRef}
      onPress={handlePress}
      accessibilityRole="combobox"
      accessibilityState={{ expanded: false }} // updated by open state ideally via context
      className={cn(
        'border-input shadow-xs flex-row items-center justify-between gap-2 rounded-md border bg-transparent px-3',
        'active:opacity-90 disabled:opacity-50',
        size === 'default' && 'h-11', // 44pt minimum touch target
        size === 'sm' && 'h-9',
        className
      )}
      {...props}>
      {children}
      <ChevronDown size={16} className="text-muted-foreground shrink-0 opacity-50" />
    </Pressable>
  );
});
SelectTrigger.displayName = 'SelectTrigger';

// ─── Value ────────────────────────────────────────────────────────────────────

const SelectValue = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    placeholder?: string;
    className?: string;
  }
>(({ className, placeholder, ...props }, ref) => {
  const { value, itemLabels } = useSelect();

  /*
   * FIX: Resolve the human-readable label from the item registry.
   * Previously this showed the raw `value` key (e.g. "us") instead of
   * the label text (e.g. "United States"). Items register themselves
   * on mount via SelectItem's useEffect.
   */
  const displayLabel = value != null ? (itemLabels[value] ?? value) : undefined;
  const hasValue = displayLabel != null;

  return (
    <View ref={ref} className={cn('flex-1 flex-row items-center', className)} {...props}>
      <Text
        className={cn('text-sm', hasValue ? 'text-foreground' : 'text-muted-foreground')}
        numberOfLines={1}>
        {displayLabel ?? placeholder}
      </Text>
    </View>
  );
});
SelectValue.displayName = 'SelectValue';

// ─── Content ──────────────────────────────────────────────────────────────────

const SelectContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
    className?: string;
  }
>(({ className, children, align = 'start', sideOffset = 4, ...props }, ref) => {
  const { open, setOpen, position: pos } = useSelect();
  const [contentSize, setContentSize] = React.useState({ width: 0, height: 0 });
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  if (!open) return null;

  // ── Width: at least as wide as the trigger ────────────────────────────────
  const contentWidth = Math.max(pos.width, contentSize.width, 128);

  // ── Horizontal alignment ──────────────────────────────────────────────────
  let left = pos.x;
  if (align === 'center') left = pos.x + pos.width / 2 - contentWidth / 2;
  else if (align === 'end') left = pos.x + pos.width - contentWidth;

  // ── Vertical placement with flip ──────────────────────────────────────────
  const MARGIN = 8;
  const spaceBelow = screenHeight - (pos.y + pos.height) - MARGIN;
  const spaceAbove = pos.y - MARGIN;
  const menuHeight = contentSize.height;
  const maxHeight = 300;

  const fitsBelow = menuHeight === 0 || menuHeight <= spaceBelow;
  const moreRoomAbove = spaceAbove > spaceBelow;

  const top =
    !fitsBelow && moreRoomAbove
      ? pos.y - Math.min(menuHeight || maxHeight, spaceAbove) - sideOffset // flip up
      : pos.y + pos.height + sideOffset; // default below

  const availableHeight =
    !fitsBelow && moreRoomAbove ? Math.min(maxHeight, spaceAbove) : Math.min(maxHeight, spaceBelow);

  // ── Horizontal boundary clamping ──────────────────────────────────────────
  const clampedLeft = Math.max(MARGIN, Math.min(left, screenWidth - contentWidth - MARGIN));

  return (
    <Modal
      transparent
      visible={open}
      animationType="fade"
      statusBarTranslucent // Android: include status bar in coordinate space
      onRequestClose={() => setOpen(false)}>
      {/* Backdrop — tapping outside closes */}
      <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)}>
        {/* Inner pressable stops propagation so tapping inside doesn't close */}
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            top,
            left: clampedLeft,
            width: contentWidth,
            maxHeight: availableHeight,
          }}
          onLayout={(e) => setContentSize(e.nativeEvent.layout)}>
          <View
            ref={ref}
            className={cn(
              'bg-popover text-popover-foreground relative z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-md',
              className
            )}
            {...props}>
            <ScrollView
              style={{ maxHeight: availableHeight }}
              className="p-1"
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              {children}
            </ScrollView>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
});
SelectContent.displayName = 'SelectContent';

// ─── Label ────────────────────────────────────────────────────────────────────

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text> & { className?: string }
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn(
      // Uppercase + wide tracking clearly differentiates group labels
      // from selectable items — matches our Label typography variant
      'text-muted-foreground px-2 py-1.5 text-xs font-semibold uppercase tracking-widest',
      className
    )}
    {...props}
  />
));
SelectLabel.displayName = 'SelectLabel';

// ─── Item ─────────────────────────────────────────────────────────────────────

const SelectItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'children'> & {
    value: string;
    label?: string; // explicit label; falls back to string children
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
  }
>(({ className, children, value, label, disabled, ...props }, ref) => {
  const { value: selectedValue, onValueChange, setOpen } = useSelect();
  const isSelected = selectedValue === value;

  // Resolve the display label: prefer explicit `label` prop, then string children.
  // Used only for rendering here — the Select root resolves this same logic
  // via extractItemLabels for SelectValue display.
  const resolvedLabel = label ?? (typeof children === 'string' ? children : undefined) ?? value;

  return (
    <Pressable
      ref={ref}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected, disabled: !!disabled }}
      onPress={() => {
        if (disabled) return;
        onValueChange?.(value);
        setOpen(false);
      }}
      className={cn(
        // py-3 → ~44pt touch target
        'relative w-full select-none flex-row items-center gap-2 rounded-sm py-3 pl-2 pr-8 outline-none',
        'active:bg-accent active:text-accent-foreground',
        disabled && 'opacity-50',
        className
      )}
      {...props}>
      {/* Selected indicator — right-aligned checkmark */}
      <View className="absolute right-2 h-4 w-4 items-center justify-center">
        {isSelected && <Check size={14} className="text-foreground" />}
      </View>

      {typeof children === 'string' ? (
        <Text className="text-popover-foreground text-sm">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
});
SelectItem.displayName = 'SelectItem';

// ─── Separator ────────────────────────────────────────────────────────────────

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('bg-border -mx-1 my-1 h-px', className)} {...props} />
));
SelectSeparator.displayName = 'SelectSeparator';

// ─── Scroll buttons ───────────────────────────────────────────────────────────

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('items-center justify-center py-1', className)} {...props}>
    <ChevronUp size={16} className="text-muted-foreground" />
  </View>
));
SelectScrollUpButton.displayName = 'SelectScrollUpButton';

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('items-center justify-center py-1', className)} {...props}>
    <ChevronDown size={16} className="text-muted-foreground" />
  </View>
));
SelectScrollDownButton.displayName = 'SelectScrollDownButton';

// ─── Exports ──────────────────────────────────────────────────────────────────

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
