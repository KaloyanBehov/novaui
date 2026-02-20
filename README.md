# NovaUI

Beautifully crafted React Native components with NativeWind. A shadcn-style component library for React Native - copy components directly into your project and own the code.

## Quick Start

```bash
# Initialize NovaUI in your React Native project
npx novaui-cli init

# Add components
npx novaui-cli add button
npx novaui-cli add card dialog
```

## Documentation

Visit [https://www.novaui.org](https://www.novaui.org) to view the full documentation.

## Features

- 50+ React Native components
- Built with NativeWind (Tailwind CSS for React Native)
- Copy-paste component system (you own the code)
- TypeScript support
- Dark mode ready
- Multiple themes included
- Customizable via CSS variables

## Monorepo Structure

```
novaui/
├── apps/
│   ├── cli/              # Standalone CLI (published to npm)
│   ├── showcase/         # React Native test/demo app
│   └── docs/             # Documentation website
├── packages/
│   ├── components/       # Component source of truth
│   ├── registry/         # Component metadata
│   ├── themes/           # Theme definitions
│   └── typescript-config/# Shared TypeScript configs
```

## Development

### Prerequisites

- Node.js >= 20.11.0
- pnpm >= 9.15.4

### Setup

```bash
git clone https://github.com/KaloyanBehov/novaui.git
cd novaui
pnpm install
```

### Commands

```bash
# Run showcase app (test components)
pnpm dev:showcase

# Run docs site
pnpm dev:docs

# Build all packages
pnpm build

# Run tests
pnpm test

# Validate registry
pnpm validate:registry

# Format code
pnpm format
```

### Workflow

1. **Add/modify components** in `packages/components/src/ui/`
2. **Update registry** in `packages/registry/registry.json`
3. **Validate** with `pnpm validate:registry`
4. **Test** in showcase app
5. **Publish CLI** with updated components

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) to get started.

- [Open an issue](https://github.com/KaloyanBehov/novaui/issues)
- [Submit a pull request](https://github.com/KaloyanBehov/novaui/pulls)

## License

Licensed under the [MIT](https://github.com/KaloyanBehov/novaui/blob/main/LICENSE) license.
