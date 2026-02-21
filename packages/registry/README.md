# @novaui/registry

Internal package for managing NovaUI component metadata.

## Purpose

The registry package maintains `registry.json`, which is the source of truth for:
- Component file locations
- Component dependencies
- Component metadata

This registry is synced to the CLI before publishing to npm.

## Structure

```
registry/
├── index.js          # Registry exports and utilities
├── registry.json     # Component metadata (SOURCE OF TRUTH)
└── scripts/
    └── validate.js   # Validation script
```

## Registry Format

Each component entry in `registry.json`:

```json
{
  "button": {
    "name": "button",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "files": [
      "packages/components/src/ui/button.tsx"
    ]
  }
}
```

### Fields

- **name**: Component identifier (must match registry key)
- **dependencies**: npm packages required by this component
- **files**: Array of file paths (relative to monorepo root)

## Validation

Run validation to ensure registry is in sync:

```bash
pnpm validate:registry
```

Validates:
- All referenced files exist
- Component dependencies are declared
- No orphaned registry entries
- No missing components

## Syncing to CLI

The registry is automatically synced to the CLI during publish:

1. Developer runs `npm publish` in `apps/cli/`
2. `prepublishOnly` script runs `apps/cli/scripts/prebuild.js`
3. Script copies `registry.json` → `apps/cli/src/registry.json`
4. CLI is published with embedded registry

## Common Tasks

### Adding a Component

1. Create component in `packages/components/src/ui/`
2. Add entry to `registry.json`
3. Run validation: `pnpm validate:registry`

### Updating Dependencies

1. Update component imports in `packages/components/src/ui/`
2. Update `dependencies` array in `registry.json`
3. Run validation: `pnpm validate:registry`

### Finding Missing Entries

The validation script reports:
- Components without registry entries
- Registry entries without component files
- Invalid dependency declarations

## Usage in CLI

The CLI imports the registry at runtime:

```javascript
import REGISTRY from './registry.json' assert { type: 'json' }

const componentConfig = REGISTRY['button']
// { name: 'button', dependencies: [...], files: [...] }
```

## Internal Only

This package is **not published to npm**. It's only used within the monorepo.
