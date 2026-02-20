import { Search } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { cn } from '../../lib/utils';
import { Dialog, DialogContent } from './dialog';
import { Text } from './text';

const CommandContext = React.createContext<{
  search: string;
  setSearch: (search: string) => void;
} | null>(null);

const Command = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    filter?: (value: string, search: string) => number;
    className?: string;
  }
>(({ className, filter, children, ...props }, ref) => {
  const [search, setSearch] = React.useState('');

  return (
    <CommandContext.Provider value={{ search, setSearch }}>
      <View
        ref={ref}
        className={cn(
          'bg-popover text-popover-foreground flex w-full flex-col overflow-hidden rounded-md',
          className
        )}
        {...props}>
        {children}
      </View>
    </CommandContext.Provider>
  );
});
Command.displayName = 'Command';

interface CommandDialogProps extends React.ComponentProps<typeof Dialog> {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg" showCloseButton={false}>
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, ...props }, ref) => {
  const { search, setSearch } = React.useContext(CommandContext)!;

  return (
    <View
      className="border-border flex-row items-center border-b px-3"
      importantForAccessibility="no-hide-descendants">
      <Search className="text-foreground mr-2 h-4 w-4 shrink-0 opacity-50" size={20} />
      <TextInput
        ref={ref}
        value={search}
        onChangeText={setSearch}
        className={cn(
          'placeholder:text-muted-foreground text-foreground h-11 flex-1 rounded-md bg-transparent py-3 text-sm outline-none',
          className
        )}
        placeholderTextColor="hsl(var(--muted-foreground))"
        {...props}
      />
    </View>
  );
});
CommandInput.displayName = 'CommandInput';

const CommandList = React.forwardRef<
  React.ElementRef<typeof ScrollView>,
  React.ComponentPropsWithoutRef<typeof ScrollView>
>(({ className, ...props }, ref) => (
  <ScrollView
    ref={ref}
    className={cn('max-h-[300px] overflow-x-hidden overflow-y-auto', className)}
    keyboardShouldPersistTaps="handled"
    {...props}
  />
));
CommandList.displayName = 'CommandList';

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => (
  <View ref={ref} className={cn('items-center justify-center py-6', className)} {...props}>
    {typeof children === 'string' ? (
      <Text className="text-muted-foreground text-center text-sm">{children}</Text>
    ) : (
      children
    )}
  </View>
));
CommandEmpty.displayName = 'CommandEmpty';

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { heading?: string }
>(({ className, heading, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      'text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
      className
    )}
    {...props}>
    {heading && (
      <Text className="text-muted-foreground px-2 py-1.5 text-xs font-medium">{heading}</Text>
    )}
    {children}
  </View>
));
CommandGroup.displayName = 'CommandGroup';

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('bg-border -mx-1 h-px', className)} {...props} />
));
CommandSeparator.displayName = 'CommandSeparator';

const CommandItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    value?: string;
    onSelect?: () => void;
  }
>(({ className, children, value, onSelect, onPress, ...props }, ref) => {
  const { search } = React.useContext(CommandContext)!;

  const textValue = value || (typeof children === 'string' ? children : '');

  if (search && textValue && !textValue.toLowerCase().includes(search.toLowerCase())) {
    return null;
  }

  return (
    <Pressable
      ref={ref}
      onPress={(e) => {
        onPress?.(e);
        onSelect?.();
      }}
      className={cn(
        'active:bg-accent active:text-accent-foreground relative cursor-default flex-row items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}>
      {typeof children === 'string' ? (
        <Text className="text-foreground text-sm font-medium">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
});
CommandItem.displayName = 'CommandItem';

const CommandShortcut = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Text>) => {
  return (
    <Text
      className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
      {...props}
    />
  );
};
CommandShortcut.displayName = 'CommandShortcut';

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
