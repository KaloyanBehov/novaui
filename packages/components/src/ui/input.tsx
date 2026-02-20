import * as React from 'react';
import { TextInput } from 'react-native';
import { cn } from '../../lib/utils';

export interface InputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  className?: string;
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, placeholderTextColor, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          'web:flex border-input bg-background native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium lg:text-sm',
          props.editable === false && 'web:cursor-not-allowed opacity-50',
          className
        )}
        placeholderTextColor={placeholderTextColor || 'hsl(var(--muted-foreground))'}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
