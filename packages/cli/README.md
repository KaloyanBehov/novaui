# novaui-cli

The CLI for **NovaUI** -- a React Native UI component library with 50+ components built on [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native).

Inspired by [shadcn/ui](https://ui.shadcn.com), adapted for mobile. Components are copied directly into your project -- you own the code, customize anything.

## Getting Started

### Initialize your project

```bash
npx novaui-cli init
```

The interactive setup walks you through configuring file paths:

```
   ? Path for global.css? (src/global.css)
   ? Path for UI components? (src/components/ui)
   ? Path for lib (utils)? (src/lib)
```

This creates:

- **`components.json`** -- stores your configured paths
- **`tailwind.config.js`** -- NovaUI theme with colors, border radius, and NativeWind preset
- **`global.css`** -- light and dark theme CSS variables
- **`lib/utils.ts`** -- the `cn()` class merging utility

It also installs the required dependencies: `nativewind`, `tailwindcss`, `clsx`, `tailwind-merge`, `class-variance-authority`.

### Add components

```bash
npx novaui-cli add button
npx novaui-cli add card
npx novaui-cli add dialog
```

Components are copied into your configured directory (default: `src/components/ui/`). Each component's dependencies are installed automatically.

### Use them

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

Don't forget to import your `global.css` in your root entry file (e.g. `App.tsx`):

```tsx
import "./src/global.css"
```

## Commands

| Command | Description |
|---|---|
| `npx novaui-cli init` | Interactive setup -- config, Tailwind, global CSS, utils |
| `npx novaui-cli add <name>` | Add a component to your project |
| `npx novaui-cli --version` | Show CLI version |
| `npx novaui-cli --help` | Show help |

## Available Components

Accordion, Alert, Alert Dialog, Aspect Ratio, Avatar, Badge, Breadcrumb, Button, Button Group, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Combobox, Command, Context Menu, Dialog, Drawer, Dropdown Menu, Empty, Field, Hover Card, Input, Input Group, Input OTP, Item, Label, Menubar, Navigation Menu, Pagination, Popover, Progress, Radio Group, Resizable, Scroll Area, Select, Separator, Sheet, Skeleton, Spinner, Switch, Table, Tabs, Text, Textarea, Toggle, Toggle Group, Typography

```bash
npx novaui-cli add <name>
```

Use the component filename without the extension: `button`, `card`, `alert-dialog`, `dropdown-menu`, etc.

## Configuration

Running `init` creates a `components.json` in your project root:

```json
{
  "globalCss": "src/global.css",
  "componentsUi": "src/components/ui",
  "lib": "src/lib"
}
```

Edit this file or run `npx novaui-cli init` again to change paths.

## Requirements

| Package | Version |
|---|---|
| react | >= 18 |
| react-native | >= 0.72 |
| nativewind | >= 4 |
| tailwindcss | >= 3 |

## Links

- [GitHub](https://github.com/KaloyanBehov/native-ui)

## License

MIT
