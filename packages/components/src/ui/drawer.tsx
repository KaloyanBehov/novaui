import * as React from "react"
import { View, Modal, Pressable, Text, Dimensions, Platform, StyleSheet } from "react-native"
import { cn } from "../../lib/utils"
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withSpring, 
    withTiming, 
    runOnJS,
    SlideInDown,
    SlideOutDown,
    FadeIn,
    FadeOut
} from "react-native-reanimated"
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler"
import { X } from "lucide-react-native"

const DrawerContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
} | null>(null)

const Drawer = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    shouldScaleBackground?: boolean
  }
>(({ children, open: controlledOpen, onOpenChange: controlledOnOpenChange, shouldScaleBackground = true, ...props }, ref) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
    const open = controlledOpen ?? uncontrolledOpen
    const onOpenChange = controlledOnOpenChange ?? setUncontrolledOpen

    return (
        <DrawerContext.Provider value={{ open, onOpenChange }}>
            <View ref={ref} {...props}>
                {children}
            </View>
        </DrawerContext.Provider>
    )
})
Drawer.displayName = "Drawer"

const DrawerTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { asChild?: boolean }
>(({ children, asChild, onPress, ...props }, ref) => {
    const { onOpenChange } = React.useContext(DrawerContext)!

    const handlePress = (e: any) => {
        onPress?.(e)
        onOpenChange(true)
    }

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            // @ts-ignore
            onPress: handlePress,
            ...props,
        })
    }

    return (
        <Pressable ref={ref} onPress={handlePress} {...props}>
            {children}
        </Pressable>
    )
})
DrawerTrigger.displayName = "DrawerTrigger"

const DrawerPortal = ({ children }: { children: React.ReactNode }) => {
    const { open, onOpenChange } = React.useContext(DrawerContext)!
    
    return (
        <Modal
            transparent
            visible={open}
            onRequestClose={() => onOpenChange(false)}
            animationType="none"
            statusBarTranslucent
        >
            {open && children}
        </Modal>
    )
}
DrawerPortal.displayName = "DrawerPortal"

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ className, ...props }, ref) => {
    const { onOpenChange } = React.useContext(DrawerContext)!
    
    return (
        <Animated.View 
            entering={FadeIn} 
            exiting={FadeOut} 
            style={{ ...StyleSheet.absoluteFillObject, zIndex: 0 }}
        >
            <Pressable
                ref={ref}
                className={cn("flex-1 bg-black/80", className)}
                onPress={() => onOpenChange(false)}
                {...props}
            />
        </Animated.View>
    )
})
DrawerOverlay.displayName = "DrawerOverlay"

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const { onOpenChange } = React.useContext(DrawerContext)!
  const translateY = useSharedValue(0)
  const context = useSharedValue({ y: 0 })

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value }
    })
    .onUpdate((event) => {
      translateY.value = Math.max(0, event.translationY + context.value.y)
    })
    .onEnd((event) => {
      if (event.translationY > 100 || event.velocityY > 500) {
        runOnJS(onOpenChange)(false)
      } else {
        translateY.value = withSpring(0)
      }
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }))
  
  return (
    <DrawerPortal>
        <GestureHandlerRootView style={{ flex: 1 }}>
            <DrawerOverlay />
            <View className="flex-1 justify-end z-50 pointer-events-box-none">
                <GestureDetector gesture={gesture}>
                    <Animated.View
                        entering={SlideInDown}
                        exiting={SlideOutDown}
                        style={[animatedStyle]}
                        className={cn(
                            "bg-background flex h-auto flex-col rounded-t-[10px] border border-border mt-24 max-h-[96%]",
                            className
                        )}
                        {...props}
                    >
                        <View className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
                        <View className="p-4">
                            {children}
                        </View>
                    </Animated.View>
                </GestureDetector>
            </View>
        </GestureHandlerRootView>
    </DrawerPortal>
  )
})
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text> & { className?: string }
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight text-foreground",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text> & { className?: string }
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = "DrawerDescription"

const DrawerClose = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { asChild?: boolean }
>(({ children, asChild, onPress, ...props }, ref) => {
    const { onOpenChange } = React.useContext(DrawerContext)!

    const handlePress = (e: any) => {
        onPress?.(e)
        onOpenChange(false)
    }

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            // @ts-ignore
            onPress: handlePress,
            ...props,
        })
    }

    return (
        <Pressable ref={ref} onPress={handlePress} {...props}>
            {children}
        </Pressable>
    )
})
DrawerClose.displayName = "DrawerClose"

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
