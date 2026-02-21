import { Check, ChevronRight, Circle } from 'lucide-react-native';
import * as React from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { cn } from '../../lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

type Position = { x: number; y: number; width: number; height: number };

type DropdownMenuContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position: Position;
  setPosition: (position: Position) => void;
};

// ─── Context ──────────────────────────────────────────────────────────────────

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenu() {
  const ctx = React.useContext(DropdownMenuContext);
  if (!ctx) throw new Error('DropdownMenu compound components must be used inside <DropdownMenu>');
  return ctx;
}

// ─── Root ─────────────────────────────────────────────────────────────────────

const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState<Position>({ x: 0, y: 0, width: 0, height: 0 });

  return (
    <DropdownMenuContext.Provider value={{ open, onOpenChange: setOpen, position, setPosition }}>
      {/*
       * Do NOT wrap in flex:1 — that forces the container to fill available
       * space and breaks inline / intrinsic-size layouts.
       */}
      <View>{children}</View>
    </DropdownMenuContext.Provider>
  );
};

// ─── Trigger ──────────────────────────────────────────────────────────────────

const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { asChild?: boolean }
>(({ children, asChild, onPress, ...props }, ref) => {
  const { onOpenChange, setPosition } = useDropdownMenu();

  /*
   * FIX: The original code declared `triggerRef` and passed it to an inner
   * <View> wrapper that didn't exist, so `.measure()` was called on an
   * unmeasured node and silently returned zeros — preventing the menu from
   * ever opening.
   *
   * Solution: use a single `triggerRef` and attach it directly to the
   * <Pressable> (or clone it into the child when `asChild` is true).
   * We merge the forwarded `ref` so callers can still obtain the node.
   */
  const triggerRef = React.useRef<View>(null);

  // Merge the forwarded ref with our internal ref.
  const mergedRef = React.useCallback(
    (node: View | null) => {
      (triggerRef as React.MutableRefObject<View | null>).current = node;
      if (typeof ref === 'function') ref(node as any);
      else if (ref) (ref as React.MutableRefObject<View | null>).current = node;
    },
    [ref]
  );

  const handlePress = (e: any) => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      /*
       * Use measureInWindow instead of measure — it returns coordinates
       * relative to the window (what we need for absolute Modal positioning)
       * without requiring a hostInstance root ref.
       */
      setPosition({ x, y, width, height });
      onOpenChange(true);
    });
    onPress?.(e);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onPress: handlePress,
      ref: mergedRef,
      ...props,
    });
  }

  return (
    <Pressable ref={mergedRef} onPress={handlePress} {...props}>
      {children}
    </Pressable>
  );
});
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

// ─── Portal (pass-through) ────────────────────────────────────────────────────

const DropdownMenuPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>;
DropdownMenuPortal.displayName = 'DropdownMenuPortal';

// ─── Content ──────────────────────────────────────────────────────────────────

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    sideOffset?: number;
    align?: 'start' | 'center' | 'end';
    className?: string;
  }
>(({ className, children, sideOffset = 4, align = 'start', ...props }, ref) => {
  const { open, onOpenChange, position } = useDropdownMenu();
  const [contentSize, setContentSize] = React.useState({ width: 0, height: 0 });
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  if (!open) return null;

  // ── Horizontal alignment ──────────────────────────────────────────────────
  let left = position.x;
  if (align === 'center') {
    left = position.x + position.width / 2 - contentSize.width / 2;
  } else if (align === 'end') {
    left = position.x + position.width - contentSize.width;
  }

  // ── Vertical placement with flip ──────────────────────────────────────────
  const spaceBelow = screenHeight - (position.y + position.height);
  const spaceAbove = position.y;
  const menuHeight = contentSize.height;

  // Place below by default; flip above if it overflows bottom and there's
  // more room above.
  let top =
    menuHeight > 0 && menuHeight > spaceBelow && spaceAbove > spaceBelow
      ? position.y - menuHeight - sideOffset // flip upward
      : position.y + position.height + sideOffset; // default: below

  // ── Boundary clamping ─────────────────────────────────────────────────────
  const MARGIN = 10;
  if (contentSize.width > 0) {
    if (left + contentSize.width > screenWidth - MARGIN) {
      left = screenWidth - contentSize.width - MARGIN;
    }
    if (left < MARGIN) left = MARGIN;
  }
  if (contentSize.height > 0) {
    if (top + contentSize.height > screenHeight - MARGIN) {
      top = screenHeight - contentSize.height - MARGIN;
    }
    if (top < MARGIN) top = MARGIN;
  }

  return (
    <Modal
      transparent
      visible={open}
      animationType="fade"
      statusBarTranslucent // ensures coordinates match on Android
      onRequestClose={() => onOpenChange(false)}>
      {/* Full-screen backdrop — closes menu on outside tap */}
      <Pressable style={StyleSheet.absoluteFill} onPress={() => onOpenChange(false)}>
        {/* Inner Pressable stops tap propagation so tapping the menu itself
            doesn't immediately close it */}
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={{ position: 'absolute', top, left }}
          onLayout={(e) => setContentSize(e.nativeEvent.layout)}>
          <View
            ref={ref}
            className={cn(
              'border-border bg-popover min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md',
              className
            )}
            {...props}>
            {children}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
});
DropdownMenuContent.displayName = 'DropdownMenuContent';

// ─── Item ─────────────────────────────────────────────────────────────────────

/**
 * We omit `children` from Pressable's props and re-declare it to accept both:
 *   - ReactNode          → standard JSX children (used by sub-components)
 *   - render-prop form   → (state: PressableStateCallbackType) => ReactNode
 *
 * Pressable's built-in children union is not assignable to ReactNode, which
 * causes TS errors whenever we spread DropdownMenuItemProps children into
 * JSX (e.g. inside CheckboxItem / RadioItem). By re-declaring we own the type.
 */
type DropdownMenuItemProps = Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'children'> & {
  children?: React.ReactNode | ((state: PressableStateCallbackType) => React.ReactNode);
  inset?: boolean;
  checked?: boolean; // consumed here, never forwarded to Pressable
  destructive?: boolean;
};

/** Type guard — distinguishes the render-prop from plain ReactNode children */
function isRenderProp(
  children: React.ReactNode | ((state: PressableStateCallbackType) => React.ReactNode)
): children is (state: PressableStateCallbackType) => React.ReactNode {
  return typeof children === 'function';
}

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  DropdownMenuItemProps
>(({ className, inset, children, checked, destructive, onPress, ...props }, ref) => {
  const { onOpenChange } = useDropdownMenu();

  const renderChildren = () => {
    if (isRenderProp(children)) {
      // Delegate to Pressable's own render-prop mechanism via the `children`
      // prop — cast required because we re-declared the type above.
      return children as (state: PressableStateCallbackType) => React.ReactNode;
    }
    // Wrap bare string children in a styled <Text> so callers can write:
    //   <DropdownMenuItem>Label</DropdownMenuItem>
    return React.Children.map(children, (child) =>
      typeof child === 'string' ? (
        <Text className={cn('text-foreground text-sm', destructive && 'text-destructive')}>
          {child}
        </Text>
      ) : (
        child
      )
    );
  };

  return (
    <Pressable
      ref={ref}
      accessibilityRole="menuitem"
      className={cn(
        'active:bg-accent relative flex-row items-center rounded-sm px-2 py-3 outline-none select-none',
        inset && 'pl-8',
        destructive && 'active:bg-destructive/10',
        className
      )}
      onPress={(e) => {
        onPress?.(e);
        onOpenChange(false);
      }}
      {...props}>
      {renderChildren()}
    </Pressable>
  );
});
DropdownMenuItem.displayName = 'DropdownMenuItem';

// ─── Checkbox Item ────────────────────────────────────────────────────────────

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  Omit<DropdownMenuItemProps, 'inset' | 'children'> & {
    checked?: boolean;
    children?: React.ReactNode;
  }
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuItem
    ref={ref}
    className={cn('pl-8', className)}
    accessibilityRole="checkbox"
    accessibilityState={{ checked: !!checked }}
    // Strip `checked` — not a valid Pressable prop
    {...props}>
    <View className="absolute left-2 h-4 w-4 items-center justify-center">
      {checked && <Check className="text-foreground" size={14} />}
    </View>
    {children}
  </DropdownMenuItem>
));
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

// ─── Radio Item ───────────────────────────────────────────────────────────────

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  Omit<DropdownMenuItemProps, 'inset' | 'children'> & {
    checked?: boolean;
    children?: React.ReactNode;
  }
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuItem
    ref={ref}
    className={cn('pl-8', className)}
    accessibilityRole="radio"
    accessibilityState={{ checked: !!checked }}
    // Strip `checked` — not a valid Pressable prop
    {...props}>
    <View className="absolute left-2 h-4 w-4 items-center justify-center">
      {checked && <Circle className="text-foreground fill-current" size={8} />}
    </View>
    {children}
  </DropdownMenuItem>
));
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

// ─── Label ────────────────────────────────────────────────────────────────────

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn(
      'text-muted-foreground px-2 py-1.5 text-xs font-semibold tracking-widest uppercase',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

// ─── Separator ────────────────────────────────────────────────────────────────

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('bg-border -mx-1 my-1 h-px', className)} {...props} />
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

// ─── Shortcut ─────────────────────────────────────────────────────────────────

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Text>) => (
  <Text
    className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
    {...props}
  />
);
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

// ─── Group ────────────────────────────────────────────────────────────────────

const DropdownMenuGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => <View ref={ref} className={cn(className)} {...props} />);
DropdownMenuGroup.displayName = 'DropdownMenuGroup';

// ─── Sub (placeholder — full nested menu needs its own context) ───────────────

const DropdownMenuSub = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => <View ref={ref} className={cn(className)} {...props} />);
DropdownMenuSub.displayName = 'DropdownMenuSub';

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'children'> & {
    inset?: boolean;
    children?: React.ReactNode | ((state: PressableStateCallbackType) => React.ReactNode);
  }
>(({ className, inset, children, ...props }, ref) => {
  const renderChildren = () => {
    if (typeof children === 'function')
      return children as (state: PressableStateCallbackType) => React.ReactNode;
    return React.Children.map(children, (child) =>
      typeof child === 'string' ? <Text className="text-foreground text-sm">{child}</Text> : child
    );
  };

  return (
    <Pressable
      ref={ref}
      accessibilityRole="menuitem"
      className={cn(
        'active:bg-accent flex-row items-center rounded-sm px-2 py-3 outline-none select-none',
        inset && 'pl-8',
        className
      )}
      {...props}>
      {renderChildren()}
      <ChevronRight className="text-muted-foreground ml-auto" size={14} />
    </Pressable>
  );
});
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

const DropdownMenuSubContent = React.forwardRef<
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
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

// ─── Radio Group ──────────────────────────────────────────────────────────────

const DropdownMenuRadioGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => <View ref={ref} className={cn(className)} {...props} />);
DropdownMenuRadioGroup.displayName = 'DropdownMenuRadioGroup';

// ─── Exports ──────────────────────────────────────────────────────────────────

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
