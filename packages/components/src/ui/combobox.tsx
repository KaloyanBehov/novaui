import * as React from "react"
import { View, Text, Modal, Pressable, TextInput, FlatList, ScrollView, Platform } from "react-native"
import { Check, ChevronsUpDown, Search, X } from "lucide-react-native"
import { cn } from "../../lib/utils"

const ComboboxContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  search: string
  setSearch: (search: string) => void
  itemCount: number
  setItemCount: React.Dispatch<React.SetStateAction<number>>
} | null>(null)

const Combobox = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    value?: string | string[]
    onValueChange?: (value: string | string[]) => void
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
    className?: string
  }
>(({ className, value, onValueChange, defaultOpen = false, open: controlledOpen, onOpenChange: controlledOnOpenChange, children, ...props }, ref) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const [search, setSearch] = React.useState("")
  const [itemCount, setItemCount] = React.useState(0)

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = controlledOnOpenChange ?? setUncontrolledOpen

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
        setItemCount
      }}
    >
      <View ref={ref} className={cn("relative z-50", className)} {...props}>
        {children}
      </View>
    </ComboboxContext.Provider>
  )
})
Combobox.displayName = "Combobox"

const ComboboxTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { asChild?: boolean }
>(({ className, children, asChild, onPress, ...props }, ref) => {
  const { open, setOpen, value } = React.useContext(ComboboxContext)!

  const handlePress = (e: any) => {
    onPress?.(e)
    setOpen(!open)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      // @ts-ignore
      onPress: handlePress,
      ...props,
    })
  }

  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      className={cn(
        "flex-row items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {typeof children === 'string' ? <Text className="text-sm text-foreground">{children}</Text> : children}
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-foreground" size={16} />
    </Pressable>
  )
})
ComboboxTrigger.displayName = "ComboboxTrigger"

const ComboboxContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const { open, setOpen, setSearch } = React.useContext(ComboboxContext)!

  if (!open) return null

  return (
    <Modal
      transparent
      animationType="fade"
      visible={open}
      onRequestClose={() => {
        setOpen(false)
        setSearch("")
      }}
    >
      <Pressable 
        className="flex-1 bg-black/50 justify-center items-center p-4"
        onPress={() => {
            setOpen(false)
            setSearch("")
        }}
      >
        <Pressable 
            className={cn(
                "w-full max-w-sm rounded-md border border-border bg-popover p-0 shadow-md",
                className
            )}
            onPress={(e) => e.stopPropagation()}
        >
          <View ref={ref} {...props}>
            {children}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
})
ComboboxContent.displayName = "ComboboxContent"

const ComboboxInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, ...props }, ref) => {
  const { search, setSearch } = React.useContext(ComboboxContext)!
  
  return (
    <View className="flex-row items-center border-b border-input px-3" android_importantForAccessibility="no-hide-descendants">
      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-foreground" size={16} />
      <TextInput
        ref={ref}
        value={search}
        onChangeText={setSearch}
        className={cn(
          "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground text-foreground",
          className
        )}
        placeholderTextColor="hsl(var(--muted-foreground))"
        {...props}
      />
    </View>
  )
})
ComboboxInput.displayName = "ComboboxInput"

const ComboboxList = React.forwardRef<
  React.ElementRef<typeof ScrollView>,
  React.ComponentPropsWithoutRef<typeof ScrollView>
>(({ className, children, ...props }, ref) => {
  return (
    <ScrollView
      ref={ref}
      className={cn("max-h-[300px] p-1", className)}
      keyboardShouldPersistTaps="handled"
      {...props}
    >
      {children}
    </ScrollView>
  )
})
ComboboxList.displayName = "ComboboxList"

const ComboboxEmpty = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
    // Simple implementation: always render, user conditionally renders it based on their own logic 
    // or we could try to detect if all items are hidden, but that's complex with composition.
    // For now, let's just render it as a styled View.
  return (
    <View
      ref={ref}
      className={cn("py-6 text-center text-sm", className)}
      {...props}
    >
        {typeof children === 'string' ? (
            <Text className="text-center text-sm text-muted-foreground">{children}</Text>
        ) : children}
    </View>
  )
})
ComboboxEmpty.displayName = "ComboboxEmpty"

const ComboboxGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { heading?: string }
>(({ className, heading, children, ...props }, ref) => {
  return (
    <View ref={ref} className={cn("overflow-hidden", className)} {...props}>
        {heading && (
            <Text className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                {heading}
            </Text>
        )}
      {children}
    </View>
  )
})
ComboboxGroup.displayName = "ComboboxGroup"

const ComboboxItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { 
    label: string
    value: string
  }
>(({ className, children, label, value: itemValue, onPress, ...props }, ref) => {
  const { value, onValueChange, setOpen, search, setSearch } = React.useContext(ComboboxContext)!
  
  if (search && !label.toLowerCase().includes(search.toLowerCase())) {
      return null
  }

  const isSelected = Array.isArray(value) ? value.includes(itemValue) : value === itemValue

  return (
    <Pressable
      ref={ref}
      onPress={(e) => {
        onPress?.(e)
        onValueChange?.(itemValue)
        setOpen(false)
        setSearch("")
      }}
      className={cn(
        "relative flex-row w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 outline-none active:bg-accent active:text-accent-foreground",
        isSelected && "bg-accent",
        className
      )}
      {...props}
    >
      {isSelected && (
        <View className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
            <Check className="h-4 w-4 text-foreground" size={16} />
        </View>
      )}
      {typeof children === 'string' ? (
          <Text className={cn("text-sm text-foreground", isSelected && "font-medium")}>{children}</Text>
      ) : children}
    </Pressable>
  )
})
ComboboxItem.displayName = "ComboboxItem"

const ComboboxSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
ComboboxSeparator.displayName = "ComboboxSeparator"

export {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxSeparator,
}
