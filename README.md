# NovaUI

A comprehensive React Native UI component library built with [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native). Inspired by shadcn/ui, adapted for mobile.

50+ beautifully crafted, accessible components ready to use in your Expo and React Native projects.

---

## Quick Start

### 1. Install the package

```bash
npm install novaui-components
```

### 2. Initialize your project with the CLI

```bash
npx novaui-cli init
```

This will:
- Create `tailwind.config.js` with the NovaUI preset
- Create `src/global.css` with light/dark theme CSS variables
- Create `src/lib/utils.ts` with the `cn()` helper
- Install required peer dependencies

### 3. Import global.css

Add this to your root layout or entry file:

```tsx
import "./src/global.css"
```

### 4. Start using components

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from "novaui-components"

export default function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to NovaUI</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onPress={() => console.log("Pressed!")}>
          Get Started
        </Button>
      </CardContent>
    </Card>
  )
}
```

---

## CLI Usage

### Initialize a project

```bash
npx novaui-cli init
```

### Add individual components (from registry)

```bash
npx novaui-cli add button
npx novaui-cli add card
npx novaui-cli add dialog
```

### Help

```bash
npx novaui-cli --help
```

---

## Manual Setup

If you prefer to set things up yourself instead of using the CLI:

### 1. Install dependencies

```bash
npm install novaui-components nativewind tailwindcss clsx tailwind-merge class-variance-authority
```

### 2. Create `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
const novaui = require("novaui-components/tailwind");

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/novaui-components/src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset"), novaui],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 3. Create `src/global.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}
```

### 4. Create `src/lib/utils.ts`

```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Components

| Component | Import |
|---|---|
| Accordion | `Accordion, AccordionItem, AccordionTrigger, AccordionContent` |
| Alert | `Alert, AlertTitle, AlertDescription` |
| Alert Dialog | `AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel` |
| Aspect Ratio | `AspectRatio` |
| Avatar | `Avatar, AvatarImage, AvatarFallback` |
| Badge | `Badge, badgeVariants` |
| Breadcrumb | `Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis` |
| Button | `Button, buttonVariants, buttonTextVariants` |
| Button Group | `ButtonGroup, ButtonGroupText` |
| Calendar | `Calendar` |
| Card | `Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent` |
| Carousel | `Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext` |
| Chart | `ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent` |
| Checkbox | `Checkbox` |
| Collapsible | `Collapsible, CollapsibleTrigger, CollapsibleContent` |
| Combobox | `Combobox, ComboboxTrigger, ComboboxContent, ComboboxInput, ComboboxList, ComboboxEmpty, ComboboxGroup, ComboboxItem, ComboboxSeparator` |
| Command | `Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator` |
| Context Menu | `ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuGroup, ContextMenuPortal, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuRadioGroup` |
| Dialog | `Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription` |
| Drawer | `Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription` |
| Dropdown Menu | `DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuRadioGroup` |
| Empty | `Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle` |
| Field | `Field, FieldLabel, FieldDescription, FieldError, FieldGroup, FieldLegend, FieldSeparator, FieldSet, FieldContent, FieldTitle` |
| Hover Card | `HoverCard, HoverCardTrigger, HoverCardContent` |
| Input | `Input` |
| Input Group | `InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupInput, InputGroupTextarea` |
| Input OTP | `InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator` |
| Item | `Item, ItemMedia, ItemContent, ItemActions, ItemGroup, ItemSeparator, ItemTitle, ItemDescription, ItemHeader, ItemFooter` |
| Label | `Label` |
| Menubar | `Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarCheckboxItem, MenubarRadioItem, MenubarLabel, MenubarSeparator, MenubarShortcut, MenubarGroup, MenubarPortal, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarRadioGroup` |
| Navigation Menu | `NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport` |
| Pagination | `Pagination, PaginationContent, PaginationLink, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis` |
| Popover | `Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverHeader, PopoverTitle, PopoverDescription` |
| Progress | `Progress` |
| Radio Group | `RadioGroup, RadioGroupItem` |
| Resizable | `ResizablePanelGroup, ResizablePanel, ResizableHandle` |
| Scroll Area | `ScrollArea, ScrollBar` |
| Select | `Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue` |
| Separator | `Separator` |
| Sheet | `Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger` |
| Skeleton | `Skeleton` |
| Spinner | `Spinner` |
| Switch | `Switch` |
| Table | `Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption` |
| Tabs | `Tabs, TabsList, TabsTrigger, TabsContent` |
| Text | `Text, textVariants` |
| Textarea | `Textarea` |
| Toggle | `Toggle, toggleVariants` |
| Toggle Group | `ToggleGroup, ToggleGroupItem` |
| Typography | `H1, H2, H3, H4, H5, P, typographyVariants` |

All components are imported from `novaui-components`:

```tsx
import { Button, Card, Input, Dialog } from "novaui-components"
```

---

## Peer Dependencies

| Package | Version |
|---|---|
| react | >= 18 |
| react-native | >= 0.72 |
| nativewind | >= 4 |
| tailwindcss | >= 3 |

---

## Customization

### Theming

NovaUI uses CSS custom properties for theming. Edit the variables in `src/global.css` to customize colors, border radius, and more. Both light and dark themes are supported out of the box.

### Tailwind Config

The NovaUI Tailwind preset adds all the design tokens your components need. You can extend it further in your `tailwind.config.js`:

```js
const novaui = require("novaui-components/tailwind");

module.exports = {
  presets: [require("nativewind/preset"), novaui],
  theme: {
    extend: {
      // your custom extensions here
    },
  },
};
```

### The `cn()` utility

All components use the `cn()` helper to merge Tailwind classes. You can use it in your own components too:

```tsx
import { cn } from "novaui-components"

function MyComponent({ className, ...props }) {
  return (
    <View className={cn("flex-1 bg-background p-4", className)} {...props} />
  )
}
```

---

## License

MIT
