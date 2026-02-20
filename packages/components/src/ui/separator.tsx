import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { View } from 'react-native';
import { cn } from '../../lib/utils';

const separatorVariants = cva('bg-border shrink-0', {
  variants: {
    orientation: {
      horizontal: 'h-[1px] w-full',
      vertical: 'h-full w-[1px]',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof View>, VariantProps<typeof separatorVariants> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

const Separator = React.forwardRef<
  React.ElementRef<typeof View>,
  SeparatorProps & { className?: string }
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(separatorVariants({ orientation }), className)}
    role={decorative ? 'none' : 'separator'}
    {...props}
  />
));
Separator.displayName = 'Separator';

export { Separator };
