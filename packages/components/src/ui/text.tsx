import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Text as RNText } from 'react-native';
import { cn } from '../../lib/utils';

const textVariants = cva('text-foreground', {
  variants: {
    variant: {
      default: 'text-base',
      h1: 'text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'text-2xl font-semibold tracking-tight',
      h4: 'text-xl font-semibold tracking-tight',
      p: 'leading-7',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      lead: 'text-muted-foreground text-xl',
      large: 'text-lg font-semibold',
      small: 'text-sm leading-none font-medium',
      muted: 'text-muted-foreground text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface TextProps
  extends React.ComponentPropsWithoutRef<typeof RNText>, VariantProps<typeof textVariants> {
  className?: string;
}

const Text = React.forwardRef<React.ElementRef<typeof RNText>, TextProps>(
  ({ className, variant, ...props }, ref) => {
    return <RNText className={cn(textVariants({ variant, className }))} ref={ref} {...props} />;
  }
);
Text.displayName = 'Text';

export { Text, textVariants };
