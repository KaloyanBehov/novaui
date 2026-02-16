# Component Preview Setup Guide

This document explains how React Native component previews are set up in the NovaUI documentation.

## Architecture

The documentation uses **react-native-web** to render React Native components in the browser. This allows us to display actual component demos directly in MDX documentation files.

## Key Files

### Configuration Files

1. **`next.config.mjs`** - Webpack configuration for react-native-web
   - Aliases `react-native` to `react-native-web`
   - Handles asset registry for images
   - Adds `.web.js` extension support

2. **`babel.config.js`** - Babel configuration
   - Includes NativeWind Babel plugin for Tailwind CSS support

3. **`tailwind.config.ts`** - Tailwind configuration
   - Includes NativeWind preset
   - Configures content paths

4. **`package.json`** - Dependencies
   - `react-native` - React Native core
   - `react-native-web` - Web implementation
   - `nativewind` - Tailwind CSS for React Native
   - `novaui-components` - The component library (workspace dependency)

### Component Files

1. **`components/component-preview.tsx`** - Preview wrapper components
   - `<ComponentPreview>` - Full preview with title/description
   - `<ComponentDemo>` - Inline demo wrapper

2. **`components/demos/button-demo.tsx`** - Example demo components
   - Reusable demo components for MDX files

3. **`mdx-components.tsx`** - MDX component registry
   - Makes `ComponentPreview` and `ComponentDemo` available globally in MDX

## Usage

### Option 1: Direct Import in MDX

You can directly import and use React Native components in MDX files:

```mdx
import { Button } from 'novaui-components'

<ComponentPreview title="Button Example">
  <Button label="Click me" />
</ComponentPreview>
```

### Option 2: Demo Components

Create reusable demo components:

```tsx
// components/demos/my-demo.tsx
'use client'
import { Button } from 'novaui-components'

export function MyButtonDemo() {
  return <Button label="Demo" />
}
```

Then use in MDX:

```mdx
import { MyButtonDemo } from '../components/demos/my-demo'

<ComponentPreview>
  <MyButtonDemo />
</ComponentPreview>
```

## How It Works

1. **MDX Compilation**: Fumadocs compiles MDX files to React components
2. **React Native Web**: Components using `react-native` imports are automatically converted to web equivalents
3. **NativeWind**: Tailwind classes are processed by NativeWind Babel plugin
4. **Styling**: Components are styled using Tailwind CSS classes that work on both web and native

## Requirements

- React Native components must use NativeWind (Tailwind CSS classes)
- Components should be compatible with react-native-web
- All React Native imports will be resolved to react-native-web equivalents

## Troubleshooting

### Components Not Rendering

1. Check that `react-native-web` is installed
2. Verify webpack configuration in `next.config.mjs`
3. Ensure NativeWind is configured in `babel.config.js`
4. Check browser console for errors

### Styling Issues

1. Verify Tailwind config includes NativeWind preset
2. Check that `global.css` is imported in layout
3. Ensure NativeWind Babel plugin is active

### Import Errors

1. Verify `novaui-components` is in dependencies
2. Check workspace configuration in root `package.json`
3. Run `npm install` to ensure workspace links are set up

## Next Steps

To add more component previews:

1. Create demo components in `components/demos/`
2. Import them in MDX files
3. Wrap with `<ComponentPreview>` or `<ComponentDemo>`
4. Test in browser to ensure proper rendering
