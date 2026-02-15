import * as React from "react"
import { View, Text, Modal, Pressable, Dimensions, StyleSheet } from "react-native"
import { cn } from "../../lib/utils"

const PopoverContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
  position: { x: number; y: number; width: number; height: number }
  setPosition: (position: { x: number; y: number; width: number; height: number }) => void
} | null>(null)

const Popover = ({ children, open: controlledOpen, onOpenChange: setControlledOpen, defaultOpen = false }: { children: React.ReactNode, open?: boolean, onOpenChange?: (open: boolean) => void, defaultOpen?: boolean }) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const [position, setPosition] = React.useState({ x: 0, y: 0, width: 0, height: 0 })

  const open = controlledOpen ?? uncontrolledOpen
  const onOpenChange = setControlledOpen ?? setUncontrolledOpen

  return (
    <PopoverContext.Provider value={{ open, onOpenChange, position, setPosition }}>
      <View style={{ flex: 1 }}>{children}</View>
    </PopoverContext.Provider>
  )
}

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { asChild?: boolean }
>(({ children, asChild, onPress, ...props }, ref) => {
  const { onOpenChange, setPosition, open } = React.useContext(PopoverContext)!
  const triggerRef = React.useRef<View>(null)

  const handlePress = (e: any) => {
    triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setPosition({ x: pageX, y: pageY, width, height })
        onOpenChange(!open)
    })
    onPress?.(e)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref: triggerRef,
      // @ts-ignore
      onPress: handlePress,
      ...props,
    })
  }

  return (
    <Pressable
      ref={triggerRef}
      onPress={handlePress}
      {...props}
    >
      {children}
    </Pressable>
  )
})
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverAnchor = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ ...props }, ref) => {
  return <View ref={ref} {...props} />
})
PopoverAnchor.displayName = "PopoverAnchor"

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
      align?: "start" | "center" | "end"
      sideOffset?: number
      className?: string
  }
>(({ className, children, align = "center", sideOffset = 4, ...props }, ref) => {
    const { open, onOpenChange, position } = React.useContext(PopoverContext)!
    const [contentSize, setContentSize] = React.useState({ width: 0, height: 0 })
    const { width: screenWidth } = Dimensions.get("window")

    if (!open) return null

    let top = position.y + position.height + sideOffset
    let left = position.x

    if (align === "center") {
        left = position.x + (position.width / 2) - (contentSize.width / 2)
    } else if (align === "end") {
        left = position.x + position.width - contentSize.width
    }

    // Basic boundary adjustments
    if (contentSize.width > 0) {
         if (left + contentSize.width > screenWidth - 10) {
            left = screenWidth - contentSize.width - 10
        }
        if (left < 10) {
            left = 10
        }
    }

    return (
        <Modal
            transparent
            visible={open}
            animationType="fade"
            onRequestClose={() => onOpenChange(false)}
        >
            <Pressable 
                style={StyleSheet.absoluteFill} 
                onPress={() => onOpenChange(false)}
            >
                <View 
                    style={{ 
                        position: 'absolute', 
                        top, 
                        left,
                    }}
                    onLayout={(e) => setContentSize(e.nativeEvent.layout)}
                >
                     <View 
                        ref={ref}
                        className={cn("z-50 w-72 rounded-md border border-border bg-popover p-4 shadow-md outline-none", className)} 
                        {...props}
                     >
                        {children}
                     </View>
                </View>
            </Pressable>
        </Modal>
    )
})
PopoverContent.displayName = "PopoverContent"

const PopoverHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("flex-col gap-1.5 mb-2", className)}
    {...props}
  />
))
PopoverHeader.displayName = "PopoverHeader"

const PopoverTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text> & { className?: string }
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight text-foreground", className)}
    {...props}
  />
))
PopoverTitle.displayName = "PopoverTitle"

const PopoverDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text> & { className?: string }
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
PopoverDescription.displayName = "PopoverDescription"

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
}
