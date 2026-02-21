#!/usr/bin/env node

/**
 * Prebuild script for novaui-cli
 * 
 * Validates the CLI package before publishing to npm.
 * 
 * Runtime fetching approach:
 * - Registry: Fetched from GitHub at runtime
 * - Themes: Default bundled, others fetched from GitHub
 * - Components: Fetched from GitHub at runtime
 * 
 * Run automatically via prepublishOnly script.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pc from 'picocolors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CLI_ROOT = path.resolve(__dirname, '../')

function validateCLI() {
  const pkgPath = path.join(CLI_ROOT, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  
  console.log(pc.cyan('  Validating CLI package...'))
  
  // Ensure no monorepo dependencies leak into published package
  const monorepoPackages = ['@novaui/registry', '@novaui/themes', '@novaui/components']
  
  for (const pkgName of monorepoPackages) {
    if (pkg.dependencies && pkg.dependencies[pkgName]) {
      console.error(pc.red(`  ✗ CLI has ${pkgName} in dependencies. Remove it before publishing.`))
      process.exit(1)
    }
  }
  
  // Verify required files exist
  const requiredFiles = [
    'src/bin.js',
    'src/constants.js',
    'src/themes/index.js',
    'src/commands/init.js',
    'src/commands/add.js',
  ]
  
  for (const file of requiredFiles) {
    const filePath = path.join(CLI_ROOT, file)
    if (!fs.existsSync(filePath)) {
      console.error(pc.red(`  ✗ Required file missing: ${file}`))
      process.exit(1)
    }
  }
  
  console.log(pc.green('  ✓ CLI package validation passed'))
  console.log(pc.dim('  ℹ Registry, themes, and components fetched from GitHub at runtime'))
  console.log(pc.dim('  ℹ Default theme bundled as fallback'))
}

console.log(pc.bold('\n  📦 NovaUI CLI Prebuild\n'))

try {
  validateCLI()
  console.log(pc.green('\n  ✓ Prebuild completed successfully\n'))
} catch (error) {
  console.error(pc.red(`\n  ✗ Prebuild failed: ${error.message}\n`))
  process.exit(1)
}
