import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Text, View } from 'react-native';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'web:transition-colors web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2 inline-flex items-center rounded-full border px-2.5 py-0.5',
  {
    variants: {
      variant: {
        default: 'bg-primary web:hover:bg-primary/80 border-transparent shadow',
        secondary: 'bg-secondary web:hover:bg-secondary/80 border-transparent',
        destructive: 'bg-destructive web:hover:bg-destructive/80 border-transparent shadow',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const badgeTextVariants = cva('text-xs font-semibold', {
  variants: {
    variant: {
      default: 'dark:text-primary-foreground text-primary-foreground',
      secondary: 'dark:text-secondary-foreground text-secondary-foreground',
      destructive: 'dark:text-destructive-foreground text-destructive-foreground',
      outline: 'dark:text-foreground text-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface BadgeProps
  extends React.ComponentPropsWithoutRef<typeof View>, VariantProps<typeof badgeVariants> {
  label?: string;
  labelClasses?: string;
}

function Badge({ className, variant, label, labelClasses, children, ...props }: BadgeProps) {
  return (
    <View className={cn(badgeVariants({ variant }), className)} {...props}>
      {label ? (
        <Text className={cn(badgeTextVariants({ variant }), labelClasses)}>{label}</Text>
      ) : (
        <View className={cn(badgeTextVariants({ variant }), labelClasses)}>
          {typeof children === 'string' ? <Text>{children}</Text> : children}
        </View>
      )}
    </View>
  );
}

export { Badge, badgeVariants };
