# Contributing to NovaUI

Thank you for your interest in contributing to NovaUI! This guide will help you understand the monorepo structure and development workflow.

## Table of Contents

- [Monorepo Structure](#monorepo-structure)
- [Getting Started](#getting-started)
- [Adding a New Component](#adding-a-new-component)
- [Updating the Registry](#updating-the-registry)
- [Publishing the CLI](#publishing-the-cli)
- [Testing](#testing)
- [Code Style](#code-style)

## Monorepo Structure

NovaUI uses a pnpm workspace monorepo with Turborepo:

```
novaui/
├── apps/
│   ├── cli/              # Standalone CLI (published to npm)
│   ├── showcase/         # React Native test app
│   └── docs/             # Documentation website
├── packages/
│   ├── components/       # Component source of truth (internal only)
│   ├── registry/         # Component metadata
│   ├── themes/           # CSS theme definitions
│   └── typescript-config/# Shared TypeScript configs
```

### Package Roles

**apps/cli** - The `novaui-cli` npm package
- **Published to npm**: Yes
- **Purpose**: Standalone CLI tool for external users
- **Dependencies**: No workspace dependencies (standalone)
- **Distribution**: Users run `npx novaui-cli@latest add button`

**packages/components** - Component source
- **Published to npm**: No (internal only)
- **Purpose**: Single source of truth for all UI components
- **Usage**: CLI fetches raw files from GitHub, showcase imports locally

**packages/registry** - Component metadata
- **Published to npm**: No (internal only)
- **Purpose**: Tracks component files and dependencies
- **Synced to**: CLI's `src/registry.json` before publish

**packages/themes** - Theme definitions
- **Published to npm**: No (internal only)
- **Purpose**: CSS variable definitions for different color schemes
- **Synced to**: CLI's `src/themes/` before publish

## Getting Started

### Prerequisites

- Node.js >= 20.11.0
- pnpm >= 9.15.4

### Installation

```bash
git clone https://github.com/KaloyanBehov/novaui.git
cd novaui
pnpm install
```

### Development

```bash
# Run showcase app
pnpm dev:showcase

# Run docs site
pnpm dev:docs

# Build all packages
pnpm build

# Run tests
pnpm test

# Validate registry
pnpm validate:registry
```

## Adding a New Component

Follow these steps to add a new component to NovaUI:

### 1. Create the Component File

Create your component in `packages/components/src/ui/`:

```bash
touch packages/components/src/ui/my-component.tsx
```

Component structure:

```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { View } from 'react-native'
import { cn } from '../../lib/utils'

const myComponentVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        default: 'default-styles',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface MyComponentProps 
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof myComponentVariants> {}

export const MyComponent = React.forwardRef<
  React.ElementRef<typeof View>,
  MyComponentProps
>(({ className, variant, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(myComponentVariants({ variant }), className)}
      {...props}
    />
  )
})

MyComponent.displayName = 'MyComponent'
```

### 2. Add to Package Exports

Update `packages/components/src/index.ts`:

```typescript
export * from "./ui/my-component"
```

### 3. Update the Registry

Add an entry to `packages/registry/registry.json`:

```json
{
  "my-component": {
    "name": "my-component",
    "dependencies": ["clsx", "tailwind-merge", "class-variance-authority"],
    "files": ["packages/components/src/ui/my-component.tsx"]
  }
}
```

**Registry Field Reference**:
- `name`: Must match the registry key
- `dependencies`: Array of npm packages required by the component
- `files`: Array of file paths (relative to monorepo root)

**Common Dependencies**:
- `clsx` - Conditional classnames
- `tailwind-merge` - Merge Tailwind classes
- `class-variance-authority` - Variant management
- `lucide-react-native` - Icons
- `react-native-reanimated` - Animations
- `react-native-gesture-handler` - Gestures
- `date-fns` - Date utilities
- `expo-linear-gradient` - Gradients
- `react-native-gifted-charts` - Charts

### 4. Test the Component

Add the component to the showcase app:

```bash
cd apps/showcase
npx novaui-cli add my-component
```

Or import from the workspace package:

```tsx
import { MyComponent } from '@novaui/components'
```

### 5. Validate the Registry

```bash
pnpm validate:registry
```

This checks:
- All files in registry exist
- Dependencies are valid
- No orphaned entries

## Updating the Registry

The registry is the source of truth for the CLI. It must be kept in sync with component files.

### Manual Sync

Edit `packages/registry/registry.json` directly when:
- Adding a new component
- Changing component dependencies
- Renaming files

### Validation

Always run validation before committing:

```bash
pnpm validate:registry
```

## Publishing the CLI

The CLI is standalone and published to npm independently. Follow this process:

### Pre-publish Checklist

1. **Validate registry**:
   ```bash
   pnpm validate:registry
   ```

2. **Run tests**:
   ```bash
   cd apps/cli
   pnpm test
   ```

3. **Test in a real project**:
   - Create a fresh React Native project
   - Run `npx novaui-cli@latest init`
   - Add several components
   - Verify no errors

4. **Check for workspace dependencies**:
   ```bash
   cat apps/cli/package.json | grep "workspace:"
   ```
   Should return nothing. If it shows `@novaui/registry` or `@novaui/themes`, do not publish.

### Publish Process

```bash
cd apps/cli

# Bump version (patch, minor, or major)
npm version patch

# The prepublishOnly script will:
# - Sync registry.json from packages/registry/
# - Sync themes from packages/themes/
# - Validate CLI is standalone

# Publish to npm
npm publish

# Tag the release
git tag cli-v1.1.3
git push origin cli-v1.1.3
```

### What Happens During Publish

The `prepublishOnly` script (`apps/cli/scripts/prebuild.js`) runs automatically:

1. Copies `packages/registry/registry.json` → `apps/cli/src/registry.json`
2. Copies theme files from `packages/themes/` → `apps/cli/src/themes/`
3. Validates the CLI has no workspace dependencies
4. Ensures all required files exist

### Post-publish

1. Test the published version:
   ```bash
   npx novaui-cli@latest init
   ```

2. Update changelog
3. Create GitHub release with notes

## Testing

### Unit Tests

```bash
# Run all tests
pnpm test

# Watch mode
cd apps/cli
pnpm test:watch
```

### Integration Tests

Test the CLI in a real project:

```bash
# Create test React Native project
npx react-native init TestApp
cd TestApp

# Install NativeWind
npm install nativewind
npm install -D tailwindcss

# Test NovaUI CLI
npx novaui-cli init
npx novaui-cli add button card dialog

# Verify components work
npm run ios # or android
```

### Registry Validation

```bash
pnpm validate:registry
```

## Code Style

### General Guidelines

- Use ESM imports (`import/export`)
- Prefer functional components with hooks
- Use TypeScript for components, JavaScript for CLI
- Follow existing code patterns

### Components

- Use `class-variance-authority` for variants
- Export all sub-components
- Add proper TypeScript types
- Use `cn()` utility for className merging
- Follow React Native best practices

### CLI Code

- Keep functions pure and testable
- Use descriptive error messages
- Add JSDoc comments for public functions
- Handle both TTY and non-TTY modes
- Support all package managers (npm, yarn, pnpm, bun)

### Commit Messages

Follow conventional commits:

```
feat: add new calendar component
fix: resolve button variant styling issue
docs: update CLI usage instructions
chore: update dependencies
```

## Common Tasks

### Update All Component Dependencies

```bash
# Check for outdated packages
pnpm outdated

# Update specific package across workspace
pnpm up -r package-name
```

### Add a New Theme

1. Create theme file in `packages/themes/my-theme.js`:
   ```javascript
   export const MY_THEME_CSS = `...`
   ```

2. Update `packages/themes/index.js`:
   ```javascript
   export const THEMES = {
     default: DEFAULT_THEME_CSS,
     ocean: OCEAN_THEME_CSS,
     sunset: SUNSET_THEME_CSS,
     'my-theme': MY_THEME_CSS,
   }
   ```

3. The theme will be synced to CLI on next publish

### Fix Registry Validation Errors

Common issues and fixes:

**"file not found"**:
- Update file path in `registry.json`
- Or create the missing file

**"missing registry entry"**:
- Add component to `registry.json`

**"unknown dependency"**:
- Add dependency to `KNOWN_DEPS` in validation script
- Or remove if it's a typo

## Release Process

### Component Updates

1. Update component in `packages/components/src/ui/`
2. Update `registry.json` if dependencies changed
3. Validate: `pnpm validate:registry`
4. Test in showcase app
5. Commit changes
6. Publish CLI with new version

### CLI Updates

1. Make changes in `apps/cli/src/`
2. Add/update tests
3. Run tests: `cd apps/cli && pnpm test`
4. Validate registry: `pnpm validate:registry`
5. Bump version: `cd apps/cli && npm version patch`
6. Publish: `npm publish`

## Getting Help

- Open an issue on [GitHub](https://github.com/KaloyanBehov/novaui/issues)
- Check existing issues for similar problems
- Review the [documentation](https://www.novaui.org)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
