import * as React from "react"
import { View, Pressable, Text } from "react-native"
import { cn } from "../../lib/utils"

const Tabs = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    value: string
    onValueChange: (value: string) => void
  }
>(({ className, value, onValueChange, children, ...props }, ref) => (
  <View ref={ref} className={cn("", className)} {...props}>
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          // @ts-ignore
          value,
          // @ts-ignore
          onValueChange,
        })
      }
      return child
    })}
  </View>
))
Tabs.displayName = "Tabs"

const TabsList = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "inline-flex h-10 flex-row items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    value: string
    activeValue?: string
    onValueChange?: (value: string) => void
  }
>(({ className, value, activeValue, onValueChange, children, ...props }, ref) => {
    // Note: activeValue and onValueChange are injected by parent Tabs/TabsList if we structured it that way, 
    // but here we rely on the user passing context or we can use a Context API.
    // For simplicity in this "copy-paste" component, let's assume Tabs injects props or we use Context.
    // Let's switch to Context for cleaner API.
    return (
        <Pressable
            ref={ref}
            onPress={() => onValueChange?.(value)}
            className={cn(
                "inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                activeValue === value && "bg-background text-foreground shadow-sm",
                className
            )}
            {...props}
        >
            <Text className={cn("text-sm font-medium", activeValue === value ? "text-foreground" : "text-muted-foreground")}>
                {children}
            </Text>
        </Pressable>
    )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    value: string
    activeValue?: string
  }
>(({ className, value, activeValue, children, ...props }, ref) => {
  if (value !== activeValue) return null
  return (
    <View
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
        {children}
    </View>
  )
})
TabsContent.displayName = "TabsContent"

// Re-implementing Tabs with Context to make it work properly
const TabsContext = React.createContext<{
    value: string
    onValueChange: (value: string) => void
}>({ value: "", onValueChange: () => {} })

const TabsRoot = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    defaultValue: string
    onValueChange?: (value: string) => void
  }
>(({ className, defaultValue, onValueChange, children, ...props }, ref) => {
    const [value, setValue] = React.useState(defaultValue)
    const handleValueChange = (v: string) => {
        setValue(v)
        onValueChange?.(v)
    }

    return (
        <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
            <View ref={ref} className={cn("", className)} {...props}>
                {children}
            </View>
        </TabsContext.Provider>
    )
})
TabsRoot.displayName = "Tabs"

const TabsTriggerWithContext = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { value: string }
>(({ className, value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext)
    const isActive = context.value === value
    return (
        <Pressable
            ref={ref}
            onPress={() => context.onValueChange(value)}
            className={cn(
                "inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                isActive && "bg-background text-foreground shadow-sm",
                className
            )}
            {...props}
        >
             {typeof children === 'string' ? (
                <Text className={cn("text-sm font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>
                    {children}
                </Text>
            ) : children}
        </Pressable>
    )
})
TabsTriggerWithContext.displayName = "TabsTrigger"

const TabsContentWithContext = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { value: string }
>(({ className, value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext)
    if (context.value !== value) return null
    return (
        <View
            ref={ref}
            className={cn(
                "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                className
            )}
            {...props}
        >
            {children}
        </View>
    )
})
TabsContentWithContext.displayName = "TabsContent"

export { TabsRoot as Tabs, TabsList, TabsTriggerWithContext as TabsTrigger, TabsContentWithContext as TabsContent }
