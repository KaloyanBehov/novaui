import * as React from "react"
import { Modal, View, Pressable, Text } from "react-native"
import { X } from "lucide-react-native"
import { cn } from "../../lib/utils"

const DialogContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
} | null>(null)

const Dialog = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(({ children, open: controlledOpen, onOpenChange: controlledOnOpenChange, ...props }, ref) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
    const open = controlledOpen ?? uncontrolledOpen
    const onOpenChange = controlledOnOpenChange ?? setUncontrolledOpen

    return (
        <DialogContext.Provider value={{ open, onOpenChange }}>
            <View ref={ref} {...props}>
                {children}
            </View>
        </DialogContext.Provider>
    )
})
Dialog.displayName = "Dialog"

const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { asChild?: boolean }
>(({ children, asChild, onPress, ...props }, ref) => {
    const { onOpenChange } = React.useContext(DialogContext)!

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
DialogTrigger.displayName = "DialogTrigger"

const DialogPortal = ({ children }: { children: React.ReactNode }) => {
    const { open, onOpenChange } = React.useContext(DialogContext)!
    
    return (
        <Modal
            transparent
            animationType="fade"
            visible={open}
            onRequestClose={() => onOpenChange(false)}
        >
            {children}
        </Modal>
    )
}
DialogPortal.displayName = "DialogPortal"

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ className, ...props }, ref) => {
    const { onOpenChange } = React.useContext(DialogContext)!
    
    return (
        <Pressable
            ref={ref}
            className={cn("absolute inset-0 bg-black/50 z-50", className)}
            onPress={() => onOpenChange(false)}
            {...props}
        />
    )
})
DialogOverlay.displayName = "DialogOverlay"

const DialogContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
      showCloseButton?: boolean
      className?: string
  }
>(({ className, children, showCloseButton = true, ...props }, ref) => {
  const { onOpenChange } = React.useContext(DialogContext)!
  
  return (
    <View className="flex-1 items-center justify-center p-4 z-50">
        <DialogOverlay />
        <View
            ref={ref}
            className={cn(
            "w-full max-w-lg gap-4 rounded-lg border border-border bg-background p-6 shadow-lg z-50",
            className
            )}
            {...props}
        >
            {children}
            {showCloseButton && (
                <Pressable
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                onPress={() => onOpenChange(false)}
                >
                <X size={18} className="text-muted-foreground" />
                </Pressable>
            )}
        </View>
    </View>
  )
})
DialogContent.displayName = "DialogContent"

const DialogHeader = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
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
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = "DialogDescription"

const DialogClose = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { asChild?: boolean }
>(({ children, asChild, onPress, ...props }, ref) => {
    const { onOpenChange } = React.useContext(DialogContext)!

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
DialogClose.displayName = "DialogClose"

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
