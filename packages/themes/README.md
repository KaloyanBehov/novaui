# @novaui/themes

Internal package for NovaUI theme CSS definitions.

## Purpose

Provides CSS variable definitions for different color schemes used during `novaui-cli init`.

## Available Themes

- **default**: Clean neutral theme with balanced contrast
- **ocean**: Cool blue ocean-inspired palette
- **sunset**: Warm sunset-inspired palette

## Structure

```
themes/
├── index.js      # Theme exports and utilities
├── default.js    # Default theme CSS
├── ocean.js      # Ocean theme CSS
└── sunset.js     # Sunset theme CSS
```

## Theme Format

Each theme exports a CSS string with Tailwind layers and CSS variables:

```javascript
export const DEFAULT_THEME_CSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    /* ... more variables */
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    /* ... dark mode variables */
  }
}
`
```

## Usage

### In CLI (After Sync)

```javascript
import { getThemeCssContent, THEME_KEYS } from './themes/index.js'

const css = getThemeCssContent('ocean')
// Returns OCEAN_THEME_CSS content
```

### In Monorepo

```javascript
import { getThemeCssContent } from '@novaui/themes'
```

## Syncing to CLI

Themes are automatically synced to the CLI during publish:

1. Developer runs `npm publish` in `apps/cli/`
2. `prepublishOnly` script runs `apps/cli/scripts/prebuild.js`
3. Script copies theme files → `apps/cli/src/themes/`
4. CLI is published with embedded themes

## Adding a New Theme

1. Create `packages/themes/my-theme.js`:
   ```javascript
   export const MY_THEME_CSS = `@tailwind base;
   @tailwind components;
   @tailwind utilities;
   
   @layer base {
     :root {
       --background: 0 0% 100%;
       /* ... your theme variables */
     }
     
     .dark {
       /* ... dark mode variables */
     }
   }
   `
   ```

2. Update `packages/themes/index.js`:
   ```javascript
   import { MY_THEME_CSS } from './my-theme.js'
   
   export const THEMES = {
     default: DEFAULT_THEME_CSS,
     ocean: OCEAN_THEME_CSS,
     sunset: SUNSET_THEME_CSS,
     'my-theme': MY_THEME_CSS,
   }
   ```

3. Theme will be available in CLI after next publish

## CSS Variable Reference

Required CSS variables for all themes:

```css
:root {
  /* Colors */
  --background: H S L;
  --foreground: H S L;
  --card: H S L;
  --card-foreground: H S L;
  --popover: H S L;
  --popover-foreground: H S L;
  --primary: H S L;
  --primary-foreground: H S L;
  --secondary: H S L;
  --secondary-foreground: H S L;
  --muted: H S L;
  --muted-foreground: H S L;
  --accent: H S L;
  --accent-foreground: H S L;
  --destructive: H S L;
  --destructive-foreground: H S L;
  --border: H S L;
  --input: H S L;
  --ring: H S L;
  
  /* Spacing */
  --radius: 0.5rem;
}
```

All colors use HSL format: `hue saturation lightness` (no commas).

## Internal Only

This package is **not published to npm**. It's only used within the monorepo and synced to the CLI before publish.
