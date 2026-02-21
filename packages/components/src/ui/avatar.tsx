import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Image, View } from 'react-native';
import { cn } from '../../lib/utils';
import { Text } from './text';

const avatarVariants = cva('relative flex shrink-0 overflow-hidden rounded-full', {
  variants: {
    size: {
      default: 'h-10 w-10',
      sm: 'h-6 w-6',
      lg: 'h-14 w-14',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const AvatarContext = React.createContext<{ size?: 'default' | 'sm' | 'lg' }>({});

const Avatar = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof avatarVariants>
>(({ className, size, ...props }, ref) => (
  <AvatarContext.Provider value={{ size: size || 'default' }}>
    <View ref={ref} className={cn(avatarVariants({ size, className }))} {...props} />
  </AvatarContext.Provider>
));
Avatar.displayName = 'Avatar';

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof Image>,
  React.ComponentPropsWithoutRef<typeof Image> & { src?: string }
>(({ className, src, ...props }, ref) => {
  const [hasError, setHasError] = React.useState(false);

  if (hasError) {
    return null;
  }

  const source = src ? { uri: src } : props.source;

  return (
    <Image
      ref={ref}
      source={source}
      className={cn('aspect-square h-full w-full', className)}
      onError={() => setHasError(true)}
      {...props}
    />
  );
});
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const { size } = React.useContext(AvatarContext);

  return (
    <View
      ref={ref}
      className={cn(
        'bg-muted flex h-full w-full items-center justify-center rounded-full',
        className
      )}
      {...props}>
      {typeof children === 'string' ? (
        <Text
          className={cn(
            'text-muted-foreground font-medium',
            size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-xl' : 'text-base'
          )}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
});
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarFallback, AvatarImage };
