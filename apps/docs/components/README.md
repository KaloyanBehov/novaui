# Component Preview System

This directory contains components and utilities for displaying React Native component demos in MDX documentation files.

## Setup

The component preview system uses `react-native-web` to render React Native components in the browser. The setup includes:

1. **Webpack Configuration** (`next.config.mjs`) - Configures webpack to handle react-native-web
2. **Babel Configuration** (`babel.config.js`) - Sets up NativeWind Babel plugin
3. **Tailwind Configuration** (`tailwind.config.ts`) - Includes NativeWind preset
4. **Component Preview Wrapper** (`component-preview.tsx`) - Provides styled containers for demos

## Usage in MDX Files

### Basic Usage

Wrap your React Native components with `<ComponentPreview>`:

```mdx
import { ComponentPreview } from '../components/component-preview'
import { Button } from 'novaui-components'

<ComponentPreview title="Button Example">
  <Button label="Click me" />
</ComponentPreview>
```

### With Description

```mdx
<ComponentPreview 
  title="Button Variants" 
  description="Different button styles available"
>
  <Button variant="default" label="Default" />
</ComponentPreview>
```

### Inline Demo

For smaller inline demos, use `<ComponentDemo>`:

```mdx
import { ComponentDemo } from '../components/component-preview'

Here's a button: <ComponentDemo><Button label="Demo" /></ComponentDemo>
```

## Creating Demo Components

Create demo components in `components/demos/` for reusable examples:

```tsx
// components/demos/button-demo.tsx
'use client'

import { Button } from 'novaui-components'

export function ButtonVariantsDemo() {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Button variant="default" label="Default" />
      <Button variant="destructive" label="Destructive" />
    </div>
  )
}
```

Then use in MDX:

```mdx
import { ButtonVariantsDemo } from '../components/demos/button-demo'

<ComponentPreview>
  <ButtonVariantsDemo />
</ComponentPreview>
```

## Notes

- All React Native components will be rendered using `react-native-web`
- Components must use NativeWind classes (not regular CSS)
- The preview containers are styled with Tailwind CSS
- Make sure to import components from `novaui-components` package
