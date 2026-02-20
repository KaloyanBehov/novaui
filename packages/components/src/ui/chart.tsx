import * as React from 'react';
import { View } from 'react-native';
import { cn } from '../../lib/utils';

/**
 * ChartConfig defines the theme and labels for the chart.
 * This matches the structure from shadcn/ui but adapted for our usage.
 */
export type ChartConfig = {
  [k in string]: {
    label?: string;
    color?: string;
    // Theme support is simplified here
    theme?: Record<string, string>;
  };
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }

  return context;
}

const ChartContainer = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    config: ChartConfig;
  }
>(({ config, className, children, ...props }, ref) => {
  return (
    <ChartContext.Provider value={{ config }}>
      <View ref={ref} className={cn('flex-1 justify-center', className)} {...props}>
        {children}
      </View>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = 'ChartContainer';

const ChartTooltip = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('border-border bg-background rounded-lg border px-3 py-2 shadow-sm', className)}
    {...props}>
    {children}
  </View>
));
ChartTooltip.displayName = 'ChartTooltip';

const ChartTooltipContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => (
  <View ref={ref} className={cn('flex-col gap-1', className)} {...props}>
    {children}
  </View>
));
ChartTooltipContent.displayName = 'ChartTooltipContent';

const ChartLegend = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('mt-4 flex-row items-center justify-center gap-4', className)}
    {...props}>
    {children}
  </View>
));
ChartLegend.displayName = 'ChartLegend';

const ChartLegendContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => (
  <View ref={ref} className={cn('flex-row items-center gap-2', className)} {...props}>
    {children}
  </View>
));
ChartLegendContent.displayName = 'ChartLegendContent';

export {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  useChart,
};
