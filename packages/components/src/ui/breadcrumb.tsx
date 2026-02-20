import { ChevronRight, MoreHorizontal } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { cn } from '../../lib/utils';
import { Text } from './text';

const Breadcrumb = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ ...props }, ref) => <View ref={ref} role="navigation" aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbList = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('flex-row flex-wrap items-center gap-1.5 break-words sm:gap-2.5', className)}
    {...props}
  />
));
BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('inline-flex flex-row items-center gap-1.5', className)}
    {...props}
  />
));
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { asChild?: boolean }
>(({ asChild, className, children, ...props }, ref) => {
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      // @ts-ignore
      className: cn(
        'text-muted-foreground hover:text-foreground transition-colors',
        child.props.className,
        className
      ),
      ...props,
    });
  }

  return (
    <Pressable
      ref={ref}
      className={cn('transition-colors active:opacity-70', className)}
      {...props}>
      {typeof children === 'string' ? (
        <Text className="text-muted-foreground hover:text-foreground text-sm font-medium">
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
});
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    role="link"
    aria-disabled={true}
    aria-current="page"
    className={cn('text-foreground text-sm font-normal', className)}
    {...props}
  />
));
BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View
    role="presentation"
    aria-hidden={true}
    className={cn('[&>svg]:h-3.5 [&>svg]:w-3.5', className)}
    {...props}>
    {children ?? <ChevronRight size={14} className="text-muted-foreground" />}
  </View>
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View
    role="presentation"
    aria-hidden={true}
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}>
    <MoreHorizontal size={16} className="text-muted-foreground" />
    <Text className="sr-only">More</Text>
  </View>
);
BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis';

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
