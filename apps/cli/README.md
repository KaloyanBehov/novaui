# novaui-cli

The CLI for **NovaUI** — a React Native UI component library with 50+ components built on [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native).

Inspired by [shadcn/ui](https://ui.shadcn.com), adapted for mobile. Components are copied directly into your project — you own the code, customize anything.

## Prerequisites

Before using NovaUI CLI, ensure you have:

- **React** >= 18
- **React Native** >= 0.72
- **NativeWind** >= 4 (must be set up first — see [NativeWind docs](https://www.nativewind.dev/docs/getting-started/installation))
- **Tailwind CSS** >= 3

> **⚠️ Important**: NovaUI requires NativeWind to be properly configured. If you haven't set up NativeWind yet, please follow the [NativeWind installation guide](https://www.nativewind.dev/docs/getting-started/installation) before proceeding.

## Quick Start

### Step 1: Set Up NativeWind

NovaUI requires NativeWind to be installed and configured. If you haven't done this yet:

1. Install NativeWind and Tailwind CSS:
   ```bash
   npm install nativewind
   npm install -D tailwindcss
   ```

2. Initialize Tailwind:
   ```bash
   npx tailwindcss init
   ```

3. Configure NativeWind in your `tailwind.config.js`:
   ```js
   module.exports = {
     content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
     presets: [require("nativewind/preset")],
   }
   ```

4. Add NativeWind to your Babel config (`babel.config.js`):
   ```js
   module.exports = {
     plugins: ["nativewind/babel"],
   }
   ```

For complete setup instructions, visit the [NativeWind documentation](https://www.nativewind.dev/docs/getting-started/installation).

### Step 2: Initialize NovaUI

Run the interactive setup command:

```bash
npx novaui-cli init
```

The CLI will prompt you to configure file paths:

```
? Path for global.css? (src/global.css)
? Path for UI components? (src/components/ui)
? Path for lib (utils)? (src/lib)
```

Press Enter to accept defaults or type custom paths.

#### What Gets Created

The `init` command creates:

- **`components.json`** — Stores your configured paths for future component additions
- **`tailwind.config.js`** — NovaUI theme configuration with colors, border radius, and NativeWind preset
- **`global.css`** — Light and dark theme CSS variables
- **`lib/utils.ts`** — The `cn()` utility function for merging Tailwind classes

#### Dependencies Installed

The CLI automatically installs:

- `nativewind` — Tailwind CSS for React Native
- `tailwindcss` — Tailwind CSS framework
- `clsx` — Utility for constructing className strings
- `tailwind-merge` — Utility to merge Tailwind CSS classes without conflicts
- `class-variance-authority` — Utility for creating type-safe component variants

### Step 3: Import Global Styles

Import the `global.css` file in your root entry file (typically `App.tsx`):

```tsx
import "./src/global.css"

export default function App() {
  // Your app content
}
```

This ensures NovaUI's theme variables are available throughout your app.

### Step 4: Add Components

Add components to your project:

```bash
npx novaui-cli add button
npx novaui-cli add card
npx novaui-cli add dialog
```

Components are copied into your configured directory (default: `src/components/ui/`). Each component's dependencies are installed automatically.

**Component naming**: Use the filename without extension — `button`, `card`, `alert-dialog`, `dropdown-menu`, etc.

### Step 5: Use Components

Import and use components in your app:

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

## CLI Commands

| Command | Description |
|---------|-------------|
| `npx novaui-cli init` | Interactive setup — creates config, Tailwind config, global CSS, and utils |
| `npx novaui-cli add <name>` | Add a component to your project |
| `npx novaui-cli --version` | Show CLI version |
| `npx novaui-cli --help` | Show help and available commands |

## Available Components

NovaUI includes 50+ components ready to use:

**Layout & Structure**: Accordion, Alert, Alert Dialog, Aspect Ratio, Card, Collapsible, Dialog, Drawer, Separator, Sheet

**Navigation**: Breadcrumb, Command, Context Menu, Dropdown Menu, Menubar, Navigation Menu, Tabs

**Forms & Input**: Button, Button Group, Checkbox, Combobox, Field, Input, Input Group, Input OTP, Label, Radio Group, Select, Switch, Textarea, Toggle, Toggle Group

**Data Display**: Avatar, Badge, Calendar, Carousel, Chart, Empty, Pagination, Progress, Skeleton, Spinner, Table, Typography

**Overlays**: Hover Card, Popover, Resizable, Scroll Area

**Text**: Text

Add any component with:

```bash
npx novaui-cli add <component-name>
```

**Component naming**: Use the filename without extension — `button`, `card`, `alert-dialog`, `dropdown-menu`, etc.

## Configuration

### Customizing Paths

Running `init` creates a `components.json` file in your project root:

```json
{
  "globalCss": "src/global.css",
  "componentsUi": "src/components/ui",
  "lib": "src/lib"
}
```

To change these paths:
- Edit `components.json` directly, or
- Run `npx novaui-cli init` again to reconfigure

### Customizing Themes

NovaUI components use CSS variables for theming. Customize colors, spacing, and design tokens in your `global.css` file. The generated `tailwind.config.js` includes a comprehensive theme configuration you can customize.

## Troubleshooting

### Components Not Styling Correctly

- ✅ Ensure `global.css` is imported in your root file
- ✅ Verify NativeWind is configured in `babel.config.js`
- ✅ Check that `tailwind.config.js` includes the NativeWind preset
- ✅ Ensure content paths in `tailwind.config.js` include your component directories

### Build Issues

- Clear cache: `npx react-native start --reset-cache`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Verify all peer dependencies are installed

## Requirements

| Package | Minimum Version |
|---------|----------------|
| react | >= 18 |
| react-native | >= 0.72 |
| nativewind | >= 4 |
| tailwindcss | >= 3 |

## Resources

- 📖 [NovaUI Documentation](https://github.com/KaloyanBehov/novaui) — Full component documentation
- 🎨 [NativeWind Documentation](https://www.nativewind.dev/docs) — Learn more about NativeWind
- 🐛 [GitHub Issues](https://github.com/KaloyanBehov/novaui/issues) — Report bugs or request features
- 💬 [GitHub Discussions](https://github.com/KaloyanBehov/novaui/discussions) — Ask questions

## For Maintainers

### Publishing Process

The CLI is standalone and can be published independently to npm.

#### Pre-publish Checklist

1. **Validate registry**:
   ```bash
   pnpm validate:registry
   ```

2. **Run tests**:
   ```bash
   cd apps/cli
   pnpm test
   ```

3. **Ensure no workspace dependencies**:
   ```bash
   cat package.json | grep "workspace:"
   ```
   Should return nothing.

#### Publishing

```bash
cd apps/cli

# Bump version (patch/minor/major)
npm version patch

# The prepublishOnly script automatically:
# - Syncs themes from packages/themes/
# - Validates CLI is standalone
# Note: Registry is fetched from GitHub at runtime (not bundled)

# Publish to npm
npm publish

# Tag and push
git tag cli-v1.1.3
git push origin cli-v1.1.3
```

#### What's Included in the Published Package

The CLI package includes:
- `src/**/*.js` - All CLI source code
- `src/themes/` - Theme CSS files (synced from packages/)
- `README.md` - This documentation

**Fetched at runtime** (not bundled):
- Component registry from GitHub (`packages/registry/registry.json`)
- Component source files from GitHub (`packages/components/src/ui/`)

**Not included** (via `.npmignore`):
- `__tests__/` - Test files
- `node_modules/` - Dependencies
- Development configs

#### Prebuild Script

The `scripts/prebuild.js` runs automatically before publish:

1. Copies theme files from packages/themes/
2. Validates no workspace dependencies remain
3. Ensures all required files exist

If validation fails, publish is aborted.

#### Architecture: Runtime Fetch (like shadcn/ui)

The CLI fetches components and registry from GitHub at runtime:

**Benefits:**
- ✅ Users always get latest components without updating CLI
- ✅ Smaller package size (no bundled JSON)
- ✅ Can support multiple versions via branches/tags

**Environment Variables:**
```bash
# Override GitHub branch (default: main)
NOVAUI_BRANCH=dev novaui-cli add button

# Useful for testing or using beta components
NOVAUI_BRANCH=beta novaui-cli add card
```

### Version Compatibility

The CLI checks for updates automatically (once per 24 hours) and warns users if they're running an outdated version.

Version format: `MAJOR.MINOR.PATCH`
- **Major**: Breaking changes
- **Minor**: New features, new components
- **Patch**: Bug fixes, improvements

### Registry Sync

The registry must be synced before every CLI publish:

```bash
# Manual sync (done automatically by prepublishOnly)
cd apps/cli
node scripts/prebuild.js
```

This ensures the CLI always has the latest component metadata.

## License

MIT
