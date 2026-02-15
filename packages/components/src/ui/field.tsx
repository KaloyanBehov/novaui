import * as React from "react"
import { View, Text } from "react-native"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { Label } from "./label"
import { Separator } from "./separator"

function FieldSet({ className, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string }) {
  return (
    <View
      className={cn(
        "flex flex-col gap-6",
        className
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentPropsWithoutRef<typeof Text> & { variant?: "legend" | "label", className?: string }) {
  return (
    <Text
      className={cn(
        "mb-3 font-medium text-foreground",
        variant === "legend" && "text-base",
        variant === "label" && "text-sm",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string }) {
  return (
    <View
      className={cn(
        "flex w-full flex-col gap-7",
        className
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  "flex w-full gap-3",
  {
    variants: {
      orientation: {
        vertical: "flex-col",
        horizontal: "flex-row items-center",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof fieldVariants> & { className?: string }) {
  return (
    <View
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string }) {
  return (
    <View
      className={cn(
        "flex flex-1 flex-col gap-1.5",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      className={cn(
        "flex w-fit gap-2 leading-snug",
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentPropsWithoutRef<typeof Text> & { className?: string }) {
  return (
    <Text
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentPropsWithoutRef<typeof Text> & { className?: string }) {
  return (
    <Text
      className={cn(
        "text-muted-foreground text-sm leading-normal font-normal",
        className
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View> & {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <View
      className={cn(
        "relative flex items-center justify-center my-4 h-5",
        className
      )}
      {...props}
    >
      <Separator className="absolute w-full" />
      {children && (
        <View className="bg-background px-2 z-10">
            {typeof children === 'string' ? (
                <Text className="text-sm text-muted-foreground font-medium">{children}</Text>
            ) : children}
        </View>
      )}
    </View>
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentPropsWithoutRef<typeof View> & {
  errors?: Array<{ message?: string } | undefined>
  className?: string
}) {
  const content = React.useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors?.length === 1) {
      return <Text className="text-destructive text-sm font-normal">{uniqueErrors[0]?.message}</Text>
    }

    return (
      <View className="ml-4 flex flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && (
                <View key={index} className="flex-row items-start">
                    <Text className="text-destructive mr-2">•</Text>
                    <Text className="text-destructive text-sm font-normal">{error.message}</Text>
                </View>
            )
        )}
      </View>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <View
      role="alert"
      className={cn("text-destructive text-sm font-normal", className)}
      {...props}
    >
      {typeof content === 'string' ? <Text className="text-destructive text-sm font-normal">{content}</Text> : content}
    </View>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
