import { X } from 'lucide-react-native';
import * as React from 'react';
import { Dimensions, Modal, Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '../../lib/utils';

// ─── Context ──────────────────────────────────────────────────────────────────

interface SheetContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextValue | null>(null);

function useSheet() {
  const ctx = React.useContext(SheetContext);
  if (!ctx) throw new Error('Sheet compound components must be used inside <Sheet>');
  return ctx;
}

// ─── Animation ────────────────────────────────────────────────────────────────

/**
 * Why custom useAnimatedStyle instead of Reanimated's SlideIn* presets:
 *
 * SlideInRight/Left/Up/Down translate FROM the center of the screen TOWARD
 * the edge — not from the edge itself. This makes the sheet appear to start
 * in the middle of the viewport and jump to its resting position, which looks
 * broken on bottom/right/left sheets.
 *
 * Instead we drive a single translateX or translateY shared value from
 * 100% of the sheet's own dimension → 0. Because we use the sheet's measured
 * size (not the screen size) the animation always originates exactly at the
 * correct edge with no visible jump.
 */

const SPRING_CONFIG = {
  damping: 28, // higher = less oscillation
  stiffness: 250, // higher = snappier
  mass: 0.8, // lighter feel
  overshootClamping: false,
};

const CLOSE_TIMING = { duration: 220 };

type SheetSide = 'top' | 'bottom' | 'left' | 'right';

function useSheetAnimation(open: boolean, side: SheetSide) {
  const { width: screenW, height: screenH } = Dimensions.get('window');

  // Shared values for translation on each axis
  const translateX = useSharedValue(side === 'left' ? -screenW : side === 'right' ? screenW : 0);
  const translateY = useSharedValue(side === 'top' ? -screenH : side === 'bottom' ? screenH : 0);

  React.useEffect(() => {
    if (open) {
      // Enter: spring to resting position (translate = 0)
      translateX.value = withSpring(0, SPRING_CONFIG);
      translateY.value = withSpring(0, SPRING_CONFIG);
    } else {
      // Exit: quick timing back off-screen (spring exits feel sluggish)
      const exitX = side === 'left' ? -screenW : side === 'right' ? screenW : 0;
      const exitY = side === 'top' ? -screenH : side === 'bottom' ? screenH : 0;
      translateX.value = withTiming(exitX, CLOSE_TIMING);
      translateY.value = withTiming(exitY, CLOSE_TIMING);
    }
  }, [open, side]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }));

  return animatedStyle;
}

// ─── Root ─────────────────────────────────────────────────────────────────────

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

// ─── Trigger ──────────────────────────────────────────────────────────────────

const SheetTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { asChild?: boolean }
>(({ children, asChild, onPress, ...props }, ref) => {
  const { onOpenChange } = useSheet();

  const handlePress = (e: any) => {
    onPress?.(e);
    onOpenChange(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
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

// ─── Portal ───────────────────────────────────────────────────────────────────

const SheetPortal = ({ children }: { children: React.ReactNode }) => {
  const { open, onOpenChange } = useSheet();

  return (
    <Modal
      transparent
      visible={open}
      onRequestClose={() => onOpenChange(false)}
      animationType="none"
      statusBarTranslucent>
      {/*
       * Guard: only mount children when open. Prevents Reanimated from
       * attempting to run exit animations on an already-unmounted tree.
       */}
      {open && children}
    </Modal>
  );
};
SheetPortal.displayName = 'SheetPortal';

// ─── Overlay ──────────────────────────────────────────────────────────────────

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ className, ...props }, ref) => {
  const { onOpenChange } = useSheet();

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(150)}
      style={[StyleSheet.absoluteFillObject, { zIndex: 0 }]}>
      <Pressable
        ref={ref}
        style={StyleSheet.absoluteFillObject}
        className={cn('bg-black/60', className)}
        onPress={() => onOpenChange(false)}
        accessibilityLabel="Close sheet"
        {...props}
      />
    </Animated.View>
  );
});
SheetOverlay.displayName = 'SheetOverlay';

// ─── Content ──────────────────────────────────────────────────────────────────

interface SheetContentProps {
  side?: SheetSide;
  children?: React.ReactNode;
  className?: string;
  /**
   * React Native style — merged after className, so it takes precedence.
   * Primary use case: applying safe area insets manually when you need
   * fine-grained control (e.g. only top inset, custom padding adjustments).
   *
   * @example
   * // Manual insets
   * <SheetContent style={{ paddingTop: insets.top + 16 }} />
   */
  style?: ViewStyle;
  /**
   * Automatically pad the sheet content using safe area insets.
   * Each side is only applied when it faces an open edge — e.g. a bottom
   * sheet gets `paddingBottom` from `insets.bottom`; a right sheet gets
   * `paddingTop` and `paddingBottom` since both vertical edges are exposed.
   *
   * Set to false if you handle insets yourself via the `style` prop.
   * @default true
   */
  safeArea?: boolean;
  /**
   * Whether to show the default close (×) button in the top-right corner.
   * @default true
   */
  showCloseButton?: boolean;
}

/**
 * Returns which inset edges are exposed (i.e. face a device edge, not a
 * screen edge covered by the sheet itself) so we only apply relevant insets.
 *
 *  bottom sheet → exposed: top? No. bottom: yes. left/right: no (full-width)
 *  right sheet  → exposed: top: yes. bottom: yes. left: no. right: yes
 */
function getExposedInsets(side: SheetSide): {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
} {
  return {
    top: side !== 'top',
    bottom: side !== 'bottom',
    left: side === 'top' || side === 'bottom' || side === 'right',
    right: side === 'top' || side === 'bottom' || side === 'left',
  };
}

// Maps each side to its NativeWind layout classes.
const SIDE_STYLES: Record<SheetSide, string> = {
  top: 'inset-x-0 top-0 w-full border-b rounded-b-2xl',
  bottom: 'inset-x-0 bottom-0 w-full border-t rounded-t-2xl',
  left: 'inset-y-0 left-0 h-full w-3/4 max-w-sm border-r',
  right: 'inset-y-0 right-0 h-full w-3/4 max-w-sm border-l',
};

const SheetContent = React.forwardRef<React.ElementRef<typeof View>, SheetContentProps>(
  (
    { className, style, children, side = 'right', showCloseButton = true, safeArea = true },
    ref
  ) => {
    const { open, onOpenChange } = useSheet();
    const animatedStyle = useSheetAnimation(open, side);
    const insets = useSafeAreaInsets();

    // Build inset padding — only apply edges that are actually exposed.
    // Base content padding is p-6 (24px) from className; we add insets on
    // top of that so content is never hidden under notch / home indicator.
    const insetStyle = React.useMemo<ViewStyle>(() => {
      if (!safeArea) return {};
      const exposed = getExposedInsets(side);
      return {
        paddingTop: exposed.top ? 24 + insets.top : 24,
        paddingBottom: exposed.bottom ? 24 + insets.bottom : 24,
        paddingLeft: exposed.left ? 24 + insets.left : 24,
        paddingRight: exposed.right ? 24 + insets.right : 24,
      };
    }, [safeArea, side, insets]);

    return (
      <SheetPortal>
        <SheetOverlay />
        <Animated.View
          ref={ref}
          style={[{ zIndex: 50 }, animatedStyle, insetStyle, style]}
          accessibilityViewIsModal
          className={cn(
            // p-6 removed from className — padding is now fully driven by
            // insetStyle so there's a single source of truth for spacing.
            'bg-background border-border absolute gap-4 shadow-lg',
            SIDE_STYLES[side],
            className
          )}>
          {children}

          {showCloseButton && (
            <Pressable
              className="active:bg-muted absolute right-3 top-3 h-11 w-11 items-center justify-center rounded-full"
              onPress={() => onOpenChange(false)}
              accessibilityRole="button"
              accessibilityLabel="Close">
              <X size={20} className="text-muted-foreground" />
            </Pressable>
          )}
        </Animated.View>
      </SheetPortal>
    );
  }
);
SheetContent.displayName = 'SheetContent';

// ─── Header ───────────────────────────────────────────────────────────────────

const SheetHeader = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) => (
  <View className={cn('flex-col gap-1.5', className)} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

// ─── Footer ───────────────────────────────────────────────────────────────────

const SheetFooter = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) => (
  <View className={cn('mt-auto flex-col gap-2', className)} {...props} />
);
SheetFooter.displayName = 'SheetFooter';

// ─── Title ────────────────────────────────────────────────────────────────────

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    accessibilityRole="header"
    className={cn('text-foreground text-lg font-semibold leading-tight tracking-tight', className)}
    {...props}
  />
));
SheetTitle.displayName = 'SheetTitle';

// ─── Description ─────────────────────────────────────────────────────────────

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn('text-muted-foreground text-sm leading-normal', className)}
    {...props}
  />
));
SheetDescription.displayName = 'SheetDescription';

// ─── Close ────────────────────────────────────────────────────────────────────

const SheetClose = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { asChild?: boolean }
>(({ children, asChild, onPress, ...props }, ref) => {
  const { onOpenChange } = useSheet();

  const handlePress = (e: any) => {
    onPress?.(e);
    onOpenChange(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
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

// ─── Exports ──────────────────────────────────────────────────────────────────

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
