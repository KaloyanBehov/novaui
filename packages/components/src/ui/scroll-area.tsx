import * as React from "react"
import { View, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from "react-native"
import { cn } from "../../lib/utils"

type ScrollAreaContextValue = {
  scrollY: number
  scrollX: number
  contentWidth: number
  contentHeight: number
  viewportWidth: number
  viewportHeight: number
}

const ScrollAreaContext = React.createContext<ScrollAreaContextValue>({
  scrollY: 0,
  scrollX: 0,
  contentWidth: 0,
  contentHeight: 0,
  viewportWidth: 0,
  viewportHeight: 0,
})

type ScrollAreaProps = React.ComponentPropsWithoutRef<typeof ScrollView> & {
  className?: string
  viewportClassName?: string
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollView>,
  ScrollAreaProps
>(({ className, viewportClassName, children, onScroll, onContentSizeChange, onLayout, ...props }, ref) => {
  const [scrollInfo, setScrollInfo] = React.useState<ScrollAreaContextValue>({
    scrollY: 0,
    scrollX: 0,
    contentWidth: 0,
    contentHeight: 0,
    viewportWidth: 0,
    viewportHeight: 0,
  })

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent
    setScrollInfo({
      scrollY: contentOffset.y,
      scrollX: contentOffset.x,
      contentWidth: contentSize.width,
      contentHeight: contentSize.height,
      viewportWidth: layoutMeasurement.width,
      viewportHeight: layoutMeasurement.height,
    })
    onScroll?.(e)
  }

  const handleContentSizeChange = (w: number, h: number) => {
    setScrollInfo((prev) => ({
      ...prev,
      contentWidth: w,
      contentHeight: h,
    }))
    onContentSizeChange?.(w, h)
  }

  const handleLayout = (e: any) => {
    const { width, height } = e.nativeEvent.layout
    setScrollInfo((prev) => ({
      ...prev,
      viewportWidth: width,
      viewportHeight: height,
    }))
    onLayout?.(e)
  }

  const viewportChildren: React.ReactNode[] = []
  const scrollBars: React.ReactNode[] = []
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && ((child.type as any)?.displayName === "ScrollBar")) {
      scrollBars.push(child)
    } else {
      viewportChildren.push(child)
    }
  })

  return (
    <ScrollAreaContext.Provider value={scrollInfo}>
      <View className={cn("relative flex-1", className)}>
        <ScrollView
          ref={ref}
          className={cn("flex-1 rounded-[inherit]", viewportClassName)}
          onScroll={handleScroll}
          onContentSizeChange={handleContentSizeChange}
          onLayout={handleLayout}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          {...props}
        >
          {viewportChildren}
        </ScrollView>
        {scrollBars.length > 0 ? scrollBars : <ScrollBar orientation="vertical" />}
      </View>
    </ScrollAreaContext.Provider>
  )
})
ScrollArea.displayName = "ScrollArea"

type ScrollBarProps = React.ComponentPropsWithoutRef<typeof View> & {
  orientation?: "vertical" | "horizontal"
  className?: string
}

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof View>,
  ScrollBarProps
>(({ className, orientation = "vertical", ...props }, ref) => {
  const { scrollY, scrollX, contentWidth, contentHeight, viewportWidth, viewportHeight } =
    React.useContext(ScrollAreaContext)

  const isVertical = orientation === "vertical"

  const thumbSize = isVertical
    ? viewportHeight > 0 && contentHeight > 0
      ? Math.max(20, (viewportHeight / contentHeight) * viewportHeight)
      : 0
    : viewportWidth > 0 && contentWidth > 0
      ? Math.max(20, (viewportWidth / contentWidth) * viewportWidth)
      : 0

  const scrollRange = isVertical
    ? contentHeight - viewportHeight
    : contentWidth - viewportWidth
  const trackSize = isVertical ? viewportHeight : viewportWidth
  const thumbOffset =
    scrollRange > 0 && trackSize > thumbSize
      ? isVertical
        ? (scrollY / scrollRange) * (trackSize - thumbSize)
        : (scrollX / scrollRange) * (trackSize - thumbSize)
      : 0

  const showBar = isVertical
    ? contentHeight > viewportHeight && viewportHeight > 0
    : contentWidth > viewportWidth && viewportWidth > 0

  if (!showBar) return null

  return (
    <View
      ref={ref}
      className={cn(
        "absolute touch-none p-0.5",
        isVertical
          ? "right-0 top-0 h-full w-2.5 border-l border-l-transparent"
          : "bottom-0 left-0 h-2.5 w-full flex-row border-t border-t-transparent",
        className
      )}
      pointerEvents="none"
      {...props}
    >
      <View
        className={cn(
          "bg-border rounded-full",
          isVertical ? "w-full" : "h-full"
        )}
        style={
          isVertical
            ? {
                position: "absolute",
                left: 2,
                right: 2,
                top: thumbOffset + 2,
                height: thumbSize - 4,
              }
            : {
                position: "absolute",
                top: 2,
                bottom: 2,
                left: thumbOffset + 2,
                width: thumbSize - 4,
              }
        }
      />
    </View>
  )
})
ScrollBar.displayName = "ScrollBar"

export { ScrollArea, ScrollBar }
