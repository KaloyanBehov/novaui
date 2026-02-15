# NovaUI

A comprehensive React Native UI component library built with [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native). Inspired by shadcn/ui, adapted for mobile.

50+ beautifully crafted, accessible components. The CLI copies components directly into your project -- you own the code, customize anything.

---

## Quick Start

### 1. Initialize your project

```bash
npx novaui-cli init
```

This will:
- Create `tailwind.config.js` with the NovaUI theme (colors, border radius, etc.)
- Create `src/global.css` with light/dark theme CSS variables
- Create `src/lib/utils.ts` with the `cn()` helper
- Install required dependencies (`nativewind`, `tailwindcss`, `clsx`, `tailwind-merge`, `class-variance-authority`)

### 2. Import global.css

Add this to your root layout or entry file:

```tsx
import "./src/global.css"
```

### 3. Add components

```bash
npx novaui-cli add button
npx novaui-cli add card
npx novaui-cli add dialog
```

Components are copied into `src/components/ui/` in your project.

### 4. Use them

```tsx
import { Button } from "./src/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "./src/components/ui/card"

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

## CLI Commands

| Command | Description |
|---|---|
| `npx novaui-cli init` | Initialize project (tailwind config, global.css, utils) |
| `npx novaui-cli add <component>` | Add a component to `src/components/ui/` |
| `npx novaui-cli --help` | Show help |

---

## Manual Setup

If you prefer to set things up yourself instead of using the CLI:

### 1. Install dependencies

```bash
npm install nativewind tailwindcss clsx tailwind-merge class-variance-authority
```

### 2. Create `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
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

## Available Components

| Component | File | Key Exports |
|---|---|---|
| Accordion | `accordion.tsx` | `Accordion, AccordionItem, AccordionTrigger, AccordionContent` |
| Alert | `alert.tsx` | `Alert, AlertTitle, AlertDescription` |
| Alert Dialog | `alert-dialog.tsx` | `AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel` |
| Aspect Ratio | `aspect-ratio.tsx` | `AspectRatio` |
| Avatar | `avatar.tsx` | `Avatar, AvatarImage, AvatarFallback` |
| Badge | `badge.tsx` | `Badge, badgeVariants` |
| Breadcrumb | `breadcrumb.tsx` | `Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis` |
| Button | `button.tsx` | `Button, buttonVariants, buttonTextVariants` |
| Button Group | `button-group.tsx` | `ButtonGroup, ButtonGroupText` |
| Calendar | `calendar.tsx` | `Calendar` |
| Card | `card.tsx` | `Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent` |
| Carousel | `carousel.tsx` | `Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext` |
| Chart | `chart.tsx` | `ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent` |
| Checkbox | `checkbox.tsx` | `Checkbox` |
| Collapsible | `collapsible.tsx` | `Collapsible, CollapsibleTrigger, CollapsibleContent` |
| Combobox | `combobox.tsx` | `Combobox, ComboboxTrigger, ComboboxContent, ComboboxInput, ComboboxList, ComboboxEmpty, ComboboxGroup, ComboboxItem, ComboboxSeparator` |
| Command | `command.tsx` | `Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator` |
| Context Menu | `context-menu.tsx` | `ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ...` |
| Dialog | `dialog.tsx` | `Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, ...` |
| Drawer | `drawer.tsx` | `Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, ...` |
| Dropdown Menu | `dropdown-menu.tsx` | `DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, ...` |
| Empty | `empty.tsx` | `Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle` |
| Field | `field.tsx` | `Field, FieldLabel, FieldDescription, FieldError, FieldGroup, ...` |
| Hover Card | `hover-card.tsx` | `HoverCard, HoverCardTrigger, HoverCardContent` |
| Input | `input.tsx` | `Input` |
| Input Group | `input-group.tsx` | `InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupInput, InputGroupTextarea` |
| Input OTP | `input-otp.tsx` | `InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator` |
| Item | `item.tsx` | `Item, ItemMedia, ItemContent, ItemActions, ItemGroup, ...` |
| Label | `label.tsx` | `Label` |
| Menubar | `menubar.tsx` | `Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, ...` |
| Navigation Menu | `navigation-menu.tsx` | `NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, ...` |
| Pagination | `pagination.tsx` | `Pagination, PaginationContent, PaginationLink, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis` |
| Popover | `popover.tsx` | `Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverHeader, PopoverTitle, PopoverDescription` |
| Progress | `progress.tsx` | `Progress` |
| Radio Group | `radio-group.tsx` | `RadioGroup, RadioGroupItem` |
| Resizable | `resizable.tsx` | `ResizablePanelGroup, ResizablePanel, ResizableHandle` |
| Scroll Area | `scroll-area.tsx` | `ScrollArea, ScrollBar` |
| Select | `select.tsx` | `Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, ...` |
| Separator | `separator.tsx` | `Separator` |
| Sheet | `sheet.tsx` | `Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, ...` |
| Skeleton | `skeleton.tsx` | `Skeleton` |
| Spinner | `spinner.tsx` | `Spinner` |
| Switch | `switch.tsx` | `Switch` |
| Table | `table.tsx` | `Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption` |
| Tabs | `tabs.tsx` | `Tabs, TabsList, TabsTrigger, TabsContent` |
| Text | `text.tsx` | `Text, textVariants` |
| Textarea | `textarea.tsx` | `Textarea` |
| Toggle | `toggle.tsx` | `Toggle, toggleVariants` |
| Toggle Group | `toggle-group.tsx` | `ToggleGroup, ToggleGroupItem` |
| Typography | `typography.tsx` | `H1, H2, H3, H4, H5, P, typographyVariants` |

Add any component with:

```bash
npx novaui-cli add <name>
```

For example: `npx novaui-cli add button`, `npx novaui-cli add card`, `npx novaui-cli add dialog`

---

## Customization

### Theming

NovaUI uses CSS custom properties for theming. Edit the variables in `src/global.css` to customize colors, border radius, and more. Both light and dark themes are supported out of the box.

### The `cn()` utility

All components use the `cn()` helper to merge Tailwind classes. Use it in your own components:

```tsx
import { cn } from "../lib/utils"

function MyComponent({ className, ...props }) {
  return (
    <View className={cn("flex-1 bg-background p-4", className)} {...props} />
  )
}
```

---

## Requirements

| Package | Version |
|---|---|
| react | >= 18 |
| react-native | >= 0.72 |
| nativewind | >= 4 |
| tailwindcss | >= 3 |

---

## License

MIT
