import * as React from "react"
import { TextInput, View, StyleSheet, Pressable } from "react-native"
import { Minus } from "lucide-react-native"
import { cn } from "../../lib/utils"
import { Text } from "./text"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput> & {
    containerClassName?: string
    maxLength: number
  }
>(({ className, containerClassName, value, onChangeText, maxLength, children, ...props }, ref) => {
  const inputRef = React.useRef<TextInput>(null)
  const [isFocused, setIsFocused] = React.useState(false)

  React.useImperativeHandle(ref, () => inputRef.current!)

  const handlePress = () => {
    inputRef.current?.focus()
  }

  return (
    <View className={cn("flex items-center gap-2 relative", containerClassName)}>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ position: 'absolute', width: 1, height: 1, opacity: 0 }}
        caretHidden
        {...props}
      />
      <Pressable 
          onPress={handlePress} 
          className={cn("flex-row items-center gap-2", className)}
      >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  // @ts-ignore
                  otpValue: value,
                  otpMaxLength: maxLength,
                  otpIsFocused: isFocused,
                } as any)
            }
            return child
          })}
      </Pressable>
    </View>
  )
})
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    otpValue?: string
    otpMaxLength?: number
    otpIsFocused?: boolean
  }
>(({ className, children, otpValue, otpMaxLength, otpIsFocused, ...props }, ref) => {
  return (
    <View ref={ref} className={cn("flex-row items-center", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            // @ts-ignore
            otpValue,
            otpMaxLength,
            otpIsFocused,
          } as any)
        }
        return child
      })}
    </View>
  )
})
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { 
    index: number
    otpValue?: string
    otpMaxLength?: number
    otpIsFocused?: boolean
  }
>(({ index, className, otpValue = "", otpMaxLength, otpIsFocused, ...props }, ref) => {
  const char = otpValue[index]
  const isActive = otpIsFocused && index === otpValue.length && otpValue.length < (otpMaxLength || 0)

  return (
    <View
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border border-input bg-background text-sm",
        isActive && "border-primary border-2",
        className
      )}
      {...props}
    >
      <Text className="text-sm">{char}</Text>
      {isActive && (
         <View className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <View className="h-4 w-px bg-foreground" />
        </View>
      )}
    </View>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ ...props }, ref) => (
  <View ref={ref} role="separator" {...props}>
    <Minus size={16} className="text-muted-foreground" />
  </View>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
