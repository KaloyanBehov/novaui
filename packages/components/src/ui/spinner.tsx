import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { cn } from '../../lib/utils';

export interface SpinnerProps extends React.ComponentPropsWithoutRef<typeof ActivityIndicator> {
  className?: string;
}

const Spinner = React.forwardRef<React.ElementRef<typeof ActivityIndicator>, SpinnerProps>(
  ({ className, color, ...props }, ref) => {
    return (
      <ActivityIndicator
        ref={ref}
        color={color}
        className={cn('text-primary', className)}
        {...props}
      />
    );
  }
);
Spinner.displayName = 'Spinner';

export { Spinner };
