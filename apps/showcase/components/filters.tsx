import { useColorScheme } from '@/hooks/use-color-scheme';
import {
  Button,
  Checkbox,
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  Muted,
  P,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Switch,
  ToggleGroup,
  ToggleGroupItem,
} from '@novaui/components';
import { SlidersHorizontal } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CATEGORIES = [
  { label: 'Fiction', value: 'fiction' },
  { label: 'Non-Fiction', value: 'non-fiction' },
  { label: 'Science', value: 'science' },
  { label: 'History', value: 'history' },
  { label: 'Biography', value: 'biography' },
];

const AUTHORS = [
  { label: 'Jane Austen', value: 'austen' },
  { label: 'George Orwell', value: 'orwell' },
  { label: 'J.K. Rowling', value: 'rowling' },
  { label: 'Stephen King', value: 'king' },
  { label: 'Isaac Asimov', value: 'asimov' },
];

const Filters = () => {
  const { isDark } = useColorScheme();
  const insets = useSafeAreaInsets();

  // State
  const [inStock, setInStock] = React.useState(true);
  const [format, setFormat] = React.useState('hardcover');
  const [rating, setRating] = React.useState<string | string[]>([]);
  const [bestseller, setBestseller] = React.useState(false);
  const [category, setCategory] = React.useState<string | undefined>();
  const [author, setAuthor] = React.useState<string | string[] | undefined>();

  const resetFilters = () => {
    setInStock(false);
    setFormat('hardcover');
    setRating([]);
    setBestseller(false);
    setCategory(undefined);
    setAuthor(undefined);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          radius="full"
          className="h-11 w-11 transition-transform active:scale-90">
          <SlidersHorizontal size={22} color={isDark ? '#FFFFFF' : '#000000'} />
        </Button>
      </SheetTrigger>


      <SheetContent
        className="border-border w-[340px]"
        side="right"
        style={{ paddingBottom: insets.bottom }}>
        {/* Header */}
        <SheetHeader className="mb-4">
          <SheetTitle className="text-xl font-bold tracking-tight">Filters</SheetTitle>
          <SheetDescription className="text-sm">Refine your search results</SheetDescription>
        </SheetHeader>

        {/* Scrollable Content */}
        <ScrollArea className="-mx-6 flex-1 px-6 pb-6">
          <View className="gap-8 pb-8">
            {/* 1. Switch: Availability */}
            <View className="flex-row items-center justify-between">
              <View className="gap-1">
                <Text className="text-foreground text-sm font-semibold">In Stock Only</Text>
                <Text className="text-muted-foreground text-xs">Hide out of stock items</Text>
              </View>
              <Switch checked={inStock} onCheckedChange={setInStock} />
            </View>

            {/* 2. Checkbox: Special */}
            <View className="flex-row items-center gap-3">
              <Checkbox
                checked={bestseller}
                onCheckedChange={(checked) =>
                  setBestseller(checked === 'indeterminate' ? false : (checked as boolean))
                }
                id="bestseller"
              />
              <View className="flex-1 gap-1">
                <P className="text-foreground text-sm font-semibold">NYT Bestsellers</P>
                <Muted className="text-xs">Show only award-winning books</Muted>
              </View>
            </View>

            {/* 3. RadioGroup: Format */}
            <View className="gap-3">
              <Text className="text-foreground text-sm font-semibold">Format</Text>
              <RadioGroup value={format} onValueChange={setFormat} className="gap-3">
                <Pressable
                  onPress={() => setFormat('hardcover')}
                  className="flex-row items-center gap-3">
                  <RadioGroupItem value="hardcover" />
                  <Text className="text-foreground text-sm">Hardcover</Text>
                </Pressable>
                <Pressable
                  onPress={() => setFormat('paperback')}
                  className="flex-row items-center gap-3">
                  <RadioGroupItem value="paperback" />
                  <Text className="text-foreground text-sm">Paperback</Text>
                </Pressable>
                <Pressable
                  onPress={() => setFormat('ebook')}
                  className="flex-row items-center gap-3">
                  <RadioGroupItem value="ebook" />
                  <Text className="text-foreground text-sm">eBook</Text>
                </Pressable>
              </RadioGroup>
            </View>

            {/* 4. ToggleGroup: Rating */}
            <View className="gap-3">
              <Text className="text-foreground text-sm font-semibold">Minimum Rating</Text>
              <ToggleGroup
                type="single"
                value={rating as string}
                onValueChange={setRating}
                className="justify-start gap-2">
                <ToggleGroupItem
                  value="4"
                  className="border-input h-9 rounded-full border px-4"
                  variant="outline">
                  <Text>4+ ⭐</Text>
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="4.5"
                  className="border-input h-9 rounded-full border px-4"
                  variant="outline">
                  <Text>4.5+ ⭐</Text>
                </ToggleGroupItem>
              </ToggleGroup>
            </View>

            {/* 5. Select: Category */}
            <View className="z-50 gap-3">
              <Text className="text-foreground text-sm font-semibold">Category</Text>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value} label={cat.label}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </View>

            {/* 6. Combobox: Author */}
            <View className="z-40 gap-3">
              <Text className="text-foreground text-sm font-semibold">Author</Text>
              <Combobox value={author} onValueChange={setAuthor}>
                <ComboboxTrigger className="h-11 w-full justify-between px-3 font-normal">
                  <Text className={author ? 'text-foreground' : 'text-muted-foreground'}>
                    {author ? AUTHORS.find((a) => a.value === author)?.label : 'Search author...'}
                  </Text>
                </ComboboxTrigger>
                <ComboboxContent>
                  <ComboboxInput placeholder="Search author..." />
                  <ComboboxList>
                    <ComboboxEmpty>No author found.</ComboboxEmpty>
                    {AUTHORS.map((authorObj) => (
                      <ComboboxItem
                        key={authorObj.value}
                        value={authorObj.value}
                        label={authorObj.label}>
                        {authorObj.label}
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </View>
          </View>
        </ScrollArea>

        {/* Footer */}
        <SheetFooter className="border-border mt-4 flex-row gap-3 border-t pt-4">
          <Button variant="outline" className="flex-1" onPress={resetFilters}>
            <Text className="text-foreground">Reset</Text>
          </Button>
          <Button className="flex-1">
            <Text className="text-primary-foreground">Apply Settings</Text>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Filters;
