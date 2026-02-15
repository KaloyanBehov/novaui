import * as React from "react"
import { View, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Platform } from "react-native"
import { ArrowLeft, ArrowRight } from "lucide-react-native"
import { cn } from "../../lib/utils"
import { Button } from "./button"

type CarouselApi = {
  scrollPrev: () => void
  scrollNext: () => void
  scrollTo: (index: number) => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

type CarouselProps = {
  opts?: any
  plugins?: any
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: React.RefObject<ScrollView>
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  orientation: "horizontal" | "vertical"
  itemSize: number
  setItemSize: (size: number) => void
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof View> & CarouselProps) {
  const carouselRef = React.useRef<ScrollView>(null)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)
  const [scrollPos, setScrollPos] = React.useState(0)
  const [contentSize, setContentSize] = React.useState(0)
  const [containerSize, setContainerSize] = React.useState(0)
  const [itemSize, setItemSize] = React.useState(0)

  const scrollPrev = React.useCallback(() => {
    const step = itemSize > 0 ? itemSize : containerSize
    const nextPos = Math.max(0, scrollPos - step)
    
    if (orientation === "horizontal") {
      carouselRef.current?.scrollTo({ x: nextPos, animated: true })
    } else {
      carouselRef.current?.scrollTo({ y: nextPos, animated: true })
    }
  }, [scrollPos, itemSize, containerSize, orientation])

  const scrollNext = React.useCallback(() => {
    const step = itemSize > 0 ? itemSize : containerSize
    const maxScroll = contentSize - containerSize
    const nextPos = Math.min(maxScroll, scrollPos + step)

    if (orientation === "horizontal") {
      carouselRef.current?.scrollTo({ x: nextPos, animated: true })
    } else {
      carouselRef.current?.scrollTo({ y: nextPos, animated: true })
    }
  }, [scrollPos, itemSize, containerSize, contentSize, orientation])

  const scrollTo = React.useCallback((index: number) => {
      const step = itemSize > 0 ? itemSize : containerSize
      const nextPos = step * index
      if (orientation === "horizontal") {
        carouselRef.current?.scrollTo({ x: nextPos, animated: true })
      } else {
        carouselRef.current?.scrollTo({ y: nextPos, animated: true })
      }
  }, [itemSize, containerSize, orientation])

  const handleScroll = React.useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent
    const currentPos = orientation === "horizontal" ? contentOffset.x : contentOffset.y
    const size = orientation === "horizontal" ? contentSize.width : contentSize.height
    const layoutSize = orientation === "horizontal" ? layoutMeasurement.width : layoutMeasurement.height

    setScrollPos(currentPos)
    setContentSize(size)
    setContainerSize(layoutSize)
    
    setCanScrollPrev(currentPos > 0)
    // Use a small epsilon for float comparison
    setCanScrollNext(currentPos + layoutSize < size - 1)
  }, [orientation])

  React.useEffect(() => {
    if (setApi) {
      setApi({
        scrollPrev,
        scrollNext,
        scrollTo,
        canScrollPrev,
        canScrollNext
      })
    }
  }, [scrollPrev, scrollNext, scrollTo, canScrollPrev, canScrollNext, setApi])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        itemSize,
        setItemSize
      }}
    >
      <View
        className={cn("relative", className)}
        role="region"
        aria-label="carousel"
        {...props}
      >
        <ScrollView
          ref={carouselRef}
          horizontal={orientation === "horizontal"}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={orientation === "horizontal" ? { flexDirection: 'row' } : { flexDirection: 'col' }}
          className="overflow-hidden"
        >
            <View className={cn("flex", orientation === "horizontal" ? "flex-row" : "flex-col")}>
                {children}
            </View>
        </ScrollView>
      </View>
    </CarouselContext.Provider>
  )
}
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <View
      ref={ref}
      className={cn(
        "flex",
        orientation === "horizontal" ? "-ml-4 flex-row" : "-mt-4 flex-col",
        className
      )}
      {...props}
    />
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  const { orientation, setItemSize } = useCarousel()

  return (
    <View
      ref={ref}
      role="group"
      aria-roledescription="slide"
      onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout
          setItemSize(orientation === "horizontal" ? width : height)
      }}
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onPress={scrollPrev}
      {...props}
    >
      <ArrowLeft size={16} className={cn("text-foreground", !canScrollPrev && "opacity-50")} />
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onPress={scrollNext}
      {...props}
    >
      <ArrowRight size={16} className={cn("text-foreground", !canScrollNext && "opacity-50")} />
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
