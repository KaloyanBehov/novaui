import * as React from "react"
import { View, Text, Modal, Pressable, Dimensions, StyleSheet } from "react-native"
import { Check, ChevronRight, Circle } from "lucide-react-native"
import { cn } from "../../lib/utils"

const MenubarContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
  position: { x: number; y: number; width: number; height: number }
  setPosition: (position: { x: number; y: number; width: number; height: number }) => void
} | null>(null)

const Menubar = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "flex-row h-10 items-center space-x-1 rounded-md border border-border bg-background p-1",
      className
    )}
    {...props}
  />
))
Menubar.displayName = "Menubar"

const MenubarMenu = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false)
  const [position, setPosition] = React.useState({ x: 0, y: 0, width: 0, height: 0 })

  return (
    <MenubarContext.Provider value={{ open, onOpenChange: setOpen, position, setPosition }}>
      <View>{children}</View>
    </MenubarContext.Provider>
  )
}

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { asChild?: boolean }
>(({ children, asChild, onPress, className, ...props }, ref) => {
  const { onOpenChange, setPosition, open } = React.useContext(MenubarContext)!
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
      className={cn(
        "flex-row items-center rounded-sm px-3 py-1.5 text-sm font-medium",
        open && "bg-accent text-accent-foreground",
        className
      )}
      {...props}
    >
      {typeof children === 'string' ? <Text className="text-sm font-medium text-foreground">{children}</Text> : children}
    </Pressable>
  )
})
MenubarTrigger.displayName = "MenubarTrigger"

const MenubarPortal = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>
}
MenubarPortal.displayName = "MenubarPortal"

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
      align?: "start" | "center" | "end"
      sideOffset?: number
      className?: string
  }
>(({ className, children, align = "start", sideOffset = 8, ...props }, ref) => {
    const { open, onOpenChange, position } = React.useContext(MenubarContext)!
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
        if (left + contentSize.width > screenWidth) {
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
                        className={cn("min-w-[12rem] overflow-hidden rounded-md border border-border bg-popover p-1 shadow-md", className)} 
                        {...props}
                     >
                        {children}
                     </View>
                </View>
            </Pressable>
        </Modal>
    )
})
MenubarContent.displayName = "MenubarContent"

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    inset?: boolean
    checked?: boolean
  }
>(({ className, inset, children, checked, ...props }, ref) => {
    const { onOpenChange } = React.useContext(MenubarContext)!
    
    return (
        <Pressable
            ref={ref}
            className={cn(
                "relative flex-row cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none active:bg-accent active:text-accent-foreground",
                inset && "pl-8",
                className
            )}
            onPress={(e) => {
                props.onPress?.(e)
                onOpenChange(false)
            }}
            {...props}
        >
            {React.Children.map(children, (child) => {
                if (typeof child === 'string') {
                    return <Text className="text-sm text-foreground">{child}</Text>
                }
                return child
            })}
        </Pressable>
    )
})
MenubarItem.displayName = "MenubarItem"

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    checked?: boolean
  }
>(({ className, children, checked, ...props }, ref) => (
  <MenubarItem
    ref={ref}
    className={cn("relative pl-8", className)}
    checked={checked}
    {...props}
  >
    <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && (
            <Check className="h-4 w-4 text-foreground" size={14} />
        )}
    </View>
    {children}
  </MenubarItem>
))
MenubarCheckboxItem.displayName = "MenubarCheckboxItem"

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    checked?: boolean
    value?: string
  }
>(({ className, children, checked, ...props }, ref) => (
  <MenubarItem
    ref={ref}
    className={cn("relative pl-8", className)}
    checked={checked}
    {...props}
  >
    <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && (
            <Circle className="h-2 w-2 fill-current text-foreground" size={8} />
        )}
    </View>
    {children}
  </MenubarItem>
))
MenubarRadioItem.displayName = "MenubarRadioItem"

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = "MenubarLabel"

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
MenubarSeparator.displayName = "MenubarSeparator"

const MenubarShortcut = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Text>) => {
  return (
    <Text
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayName = "MenubarShortcut"

const MenubarGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn(className)} {...props} />
))
MenubarGroup.displayName = "MenubarGroup"

const MenubarSub = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn(className)} {...props} />
))
MenubarSub.displayName = "MenubarSub"

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <Pressable
    ref={ref}
    className={cn(
      "flex-row cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none active:bg-accent active:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {React.Children.map(children, (child) => {
        if (typeof child === 'string') {
            return <Text className="text-sm text-foreground">{child}</Text>
        }
        return child
    })}
    <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" size={14} />
  </Pressable>
))
MenubarSubTrigger.displayName = "MenubarSubTrigger"

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 shadow-md",
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = "MenubarSubContent"

const MenubarRadioGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { value?: string }
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn(className)} {...props} />
))
MenubarRadioGroup.displayName = "MenubarRadioGroup"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarGroup,
  MenubarPortal,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarRadioGroup,
}
