import * as React from 'react';
import { View } from 'react-native';
import { cn } from '../../lib/utils';

interface AspectRatioProps extends React.ComponentPropsWithoutRef<typeof View> {
  ratio?: number;
}

const AspectRatio = React.forwardRef<React.ElementRef<typeof View>, AspectRatioProps>(
  ({ className, ratio = 1, style, ...props }, ref) => (
    <View
      ref={ref}
      style={[style, { aspectRatio: ratio }]}
      className={cn('w-full', className)}
      {...props}
    />
  )
);
AspectRatio.displayName = 'AspectRatio';

export { AspectRatio };
