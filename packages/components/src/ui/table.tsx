import * as React from "react"
import { View, ScrollView, Pressable } from "react-native"
import { cn } from "../../lib/utils"
import { Text } from "./text"

const Table = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} className="w-full" contentContainerStyle={{ minWidth: "100%" }}>
    <View
      ref={ref}
      className={cn("w-full", className)}
      {...props}
    />
  </ScrollView>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("border-b border-border", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("flex-1", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "bg-muted/50 border-t border-border font-medium",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ className, ...props }, ref) => (
  <Pressable
    ref={ref}
    className={cn(
      "flex-row border-b border-border transition-colors active:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "h-12 px-4 justify-center",
      className
    )}
    {...props}
  >
    {typeof children === 'string' ? (
        <Text className={cn("text-sm font-medium text-muted-foreground", className?.includes("text-right") && "text-right", className?.includes("text-center") && "text-center")}>{children}</Text>
    ) : children}
  </View>
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("p-4 justify-center", className)}
    {...props}
  >
     {typeof children === 'string' ? (
        <Text className={cn("text-sm text-foreground", className?.includes("text-right") && "text-right", className?.includes("text-center") && "text-center")}>{children}</Text>
    ) : children}
  </View>
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("mt-4 mb-4 items-center justify-center", className)}
    {...props}
  >
    {typeof children === 'string' ? (
        <Text className="text-sm text-muted-foreground">{children}</Text>
    ) : children}
  </View>
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
