import * as React from "react"
import { View } from "react-native"
import { GestureDetector, Gesture } from "react-native-gesture-handler"
import { runOnJS } from "react-native-reanimated"
import { GripVertical, GripHorizontal } from "lucide-react-native"
import { cn } from "../../lib/utils"

type ResizablePanelGroupProps = React.ComponentPropsWithoutRef<typeof View> & {
  direction?: "horizontal" | "vertical"
}

const ResizablePanelGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  ResizablePanelGroupProps
>(({ className, direction = "horizontal", children, ...props }, ref) => {
  const [containerSize, setContainerSize] = React.useState({ width: 0, height: 0 })
  
  const defaultSizes = React.useMemo(() => {
    const out: number[] = []
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        const name = (child.type as any)?.displayName || (child.type as any)?.name
        if (name === "ResizablePanel") {
          out.push((child.props as { defaultSize?: number }).defaultSize ?? 0)
        }
      }
    })
    const totalDefined = out.reduce((a, b) => a + b, 0)
    const countUndefined = out.filter((s) => s === 0).length
    if (countUndefined > 0) {
      const remaining = 100 - totalDefined
      const split = remaining / countUndefined
      return out.map((s) => (s === 0 ? split : s))
    }
    if (totalDefined !== 100 && totalDefined > 0) {
      return out.map((s) => (s / totalDefined) * 100)
    }
    return out.length > 0 ? out : [100]
  }, [children])

  const [sizes, setSizes] = React.useState<number[]>(() => defaultSizes)
  React.useEffect(() => {
    setSizes(defaultSizes)
  }, [defaultSizes])

  const onLayout = (e: any) => {
    const { width, height } = e.nativeEvent.layout
    setContainerSize({ width, height })
    props.onLayout?.(e)
  }

  const handleResize = React.useCallback(
    (handleIndex: number, deltaPixels: number) => {
      const total = direction === "horizontal" ? containerSize.width : containerSize.height
      if (total <= 0) return
      const deltaPercent = (deltaPixels / total) * 100
      setSizes((prev) => {
        const prevSize = prev[handleIndex] ?? 0
        const nextSize = prev[handleIndex + 1] ?? 0
        if (prevSize === undefined || nextSize === undefined) return prev
        const newPrev = Math.max(0, Math.min(100, prevSize + deltaPercent))
        const newNext = Math.max(0, Math.min(100, nextSize - deltaPercent))
        const actualDelta = newPrev - prevSize
        const next = [...prev]
        next[handleIndex] = prevSize + actualDelta
        next[handleIndex + 1] = nextSize - actualDelta
        return next
      })
    },
    [direction, containerSize.width, containerSize.height]
  )

  let panelIndex = 0
  let handleIndex = 0
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child
    const name = (child.type as any)?.displayName || (child.type as any)?.name

    if (name === "ResizablePanel") {
      const idx = panelIndex++
      return React.cloneElement(child, {
        ...(typeof child.props === "object" && child.props !== null ? child.props : {}),
        index: idx,
        size: sizes[idx] ?? defaultSizes[idx],
        direction,
      } as any)
    }
    if (name === "ResizableHandle") {
      const idx = handleIndex++
      return React.cloneElement(child, {
        ...(typeof child.props === "object" && child.props !== null ? child.props : {}),
        index: idx,
        direction,
        containerSize,
        onResize: handleResize,
      } as any)
    }
    return child
  })

  return (
    <View
      ref={ref}
      className={cn(
        "flex-1 w-full h-full overflow-hidden",
        direction === "horizontal" ? "flex-row" : "flex-col",
        className
      )}
      onLayout={onLayout}
      {...props}
    >
      {enhancedChildren}
    </View>
  )
})
ResizablePanelGroup.displayName = "ResizablePanelGroup"

type ResizablePanelProps = React.ComponentPropsWithoutRef<typeof View> & {
  defaultSize?: number
  minSize?: number
  maxSize?: number
  className?: string
}

const ResizablePanel = React.forwardRef<
  React.ElementRef<typeof View>,
  ResizablePanelProps
>(({ className, defaultSize, minSize, maxSize, ...props }, ref) => {
  const { index, size, direction } = props as any
  const sizeNum = typeof size === "number" ? size : defaultSize ?? 100
  const style = React.useMemo(
    () => ({
      [direction === "horizontal" ? "width" : "height"]: `${sizeNum}%`,
    }),
    [direction, sizeNum]
  )
  return (
    <View
      ref={ref}
      className={cn("overflow-hidden", className)}
      style={style}
      {...props}
    />
  )
})
ResizablePanel.displayName = "ResizablePanel"

type ResizableHandleProps = React.ComponentPropsWithoutRef<typeof View> & {
  withHandle?: boolean
}

const ResizableHandle = React.forwardRef<
  React.ElementRef<typeof View>,
  ResizableHandleProps
>(({ className, withHandle, ...props }, ref) => {
  const { index, direction, containerSize, onResize } = props as any
  const isHorizontal = direction === "horizontal"

  const onResizeRef = React.useRef(onResize)
  onResizeRef.current = onResize

  const triggerResize = React.useCallback((handleIndex: number, deltaPx: number) => {
    onResizeRef.current?.(handleIndex, deltaPx)
  }, [])

  const gesture = React.useMemo(
    () =>
      Gesture.Pan()
        .minDistance(0)
        .activeOffsetX(isHorizontal ? [-5, 5] : 0)
        .activeOffsetY(isHorizontal ? 0 : [-5, 5])
        .onChange((e) => {
          const delta = isHorizontal ? e.changeX : e.changeY
          runOnJS(triggerResize)(index, delta)
        }),
    [index, isHorizontal, triggerResize]
  )

  return (
    <GestureDetector gesture={gesture}>
      <View
        ref={ref}
        collapsable={false}
        className={cn(
          "relative flex items-center justify-center z-10 bg-transparent",
          isHorizontal ? "w-8 h-full -mx-4" : "h-8 w-full -my-4",
          className
        )}
        style={[
          isHorizontal ? { minWidth: 32 } : { minHeight: 32 },
        ]}
        {...props}
      >
        <View
          pointerEvents="none"
          className={cn("bg-border", isHorizontal ? "w-px absolute left-1/2 top-0 bottom-0" : "h-px absolute top-1/2 left-0 right-0")}
          style={isHorizontal ? { marginLeft: -0.5 } : { marginTop: -0.5 }}
        />
        {withHandle && (
          <View pointerEvents="none" className="absolute bg-muted border border-border flex h-6 w-5 items-center justify-center rounded z-20">
            {isHorizontal ? (
              <GripVertical size={14} className="text-foreground" />
            ) : (
              <GripHorizontal size={14} className="text-foreground" />
            )}
          </View>
        )}
      </View>
    </GestureDetector>
  )
})
ResizableHandle.displayName = "ResizableHandle"

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
