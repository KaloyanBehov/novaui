# npm to pnpm Migration Summary

## Completed Changes

### 1. Configuration Files

- **Created** `pnpm-workspace.yaml` - Defines workspace structure
- **Created** `.npmrc` - pnpm-specific configurations including:
  - Shamefully hoist enabled for better compatibility
  - Auto-install peers enabled
  - Workspace linking enabled
  - Public hoist patterns for eslint, prettier, and @types

### 2. Package Manager Updates

- **Updated** `package.json`:
  - Changed `packageManager` from `npm@11.9.0` to `pnpm@9.15.4`
  - Converted `resolutions` to `pnpm.overrides`
  - Added `packageExtensions` for fumadocs-mdx zod compatibility
  - Removed `workspaces` field (handled by pnpm-workspace.yaml)

### 3. Dependency Management

- **Removed** `package-lock.json` (npm lockfile)
- **Generated** `pnpm-lock.yaml` (pnpm lockfile)
- **Installed** all dependencies successfully with pnpm

### 4. Git Configuration

- **Updated** `.gitignore` to include `pnpm-lock.yaml`

## Usage

All npm commands now use pnpm:

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build packages
pnpm build

# Run turbo commands
pnpm turbo run build --filter=package-name
```

## Known Issues

### fumadocs-mdx postinstall script

The `postinstall` script in `apps/docs/package.json` has been **temporarily disabled** due to a zod version incompatibility:

- fumadocs-mdx@14.2.7 requires zod with `looseObject()` method
- The bundled version of zod in fumadocs-mdx is outdated

**Workaround**: Run `fumadocs-mdx` manually when needed for type generation:

```bash
cd apps/docs
pnpm fumadocs-mdx
```

**Recommended Fix**: Update fumadocs packages when newer versions are available that resolve the zod compatibility issue.

## Benefits of pnpm

- Faster installation times
- More efficient disk space usage (content-addressable storage)
- Stricter dependency resolution (prevents phantom dependencies)
- Better monorepo support
- Faster CI/CD builds

## Verification

Run these commands to verify the migration:

```bash
# Check pnpm version
pnpm --version

# List workspace packages
pnpm list --depth=0

# Build all packages
pnpm turbo run build

# Run tests
pnpm test
```
