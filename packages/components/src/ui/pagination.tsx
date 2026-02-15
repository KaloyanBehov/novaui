import * as React from "react"
import { View, Pressable } from "react-native"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react-native"
import { cn } from "../../lib/utils"
import { buttonVariants, type ButtonProps } from "./button"
import { Text } from "./text"

const Pagination = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex-row w-full justify-center", className)}
    {...props}
  />
))
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn(className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentPropsWithoutRef<typeof Pressable> & { className?: string }

const PaginationLink = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  PaginationLinkProps
>(({ className, isActive, size = "icon", children, ...props }, ref) => (
  <Pressable
    ref={ref}
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  >
    {typeof children === 'string' ? <Text className={cn(isActive ? "text-foreground" : "text-muted-foreground")}>{children}</Text> : children}
  </Pressable>
))
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = React.forwardRef<
  React.ElementRef<typeof PaginationLink>,
  React.ComponentPropsWithoutRef<typeof PaginationLink>
>(({ className, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 px-2.5", className)}
    {...props}
  >
    <ChevronLeft size={16} className="text-foreground" />
    <Text className="text-foreground">Previous</Text>
  </PaginationLink>
))
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = React.forwardRef<
  React.ElementRef<typeof PaginationLink>,
  React.ComponentPropsWithoutRef<typeof PaginationLink>
>(({ className, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 px-2.5", className)}
    {...props}
  >
    <Text className="text-foreground">Next</Text>
    <ChevronRight size={16} className="text-foreground" />
  </PaginationLink>
))
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal size={16} className="text-foreground" />
    <View className="sr-only" />
  </View>
))
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
