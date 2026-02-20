#!/usr/bin/env node

/**
 * Prebuild script for novaui-cli
 * 
 * Syncs registry.json and theme files from packages/ into apps/cli/src/
 * before publishing to npm. This ensures the CLI is standalone.
 * 
 * Run automatically via prepublishOnly script.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pc from 'picocolors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const MONOREPO_ROOT = path.resolve(__dirname, '../../../')
const CLI_ROOT = path.resolve(__dirname, '../')

function syncRegistry() {
  const sourcePath = path.join(MONOREPO_ROOT, 'packages/registry/registry.json')
  const targetPath = path.join(CLI_ROOT, 'src/registry.json')
  
  if (!fs.existsSync(sourcePath)) {
    console.error(pc.red('  ✗ Registry source not found at packages/registry/registry.json'))
    process.exit(1)
  }
  
  const registryData = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'))
  fs.writeFileSync(targetPath, JSON.stringify(registryData, null, 2), 'utf-8')
  
  console.log(pc.green('  ✓ Synced registry.json'))
}

function syncThemes() {
  const themesSourceDir = path.join(MONOREPO_ROOT, 'packages/themes')
  const themesTargetDir = path.join(CLI_ROOT, 'src/themes')
  
  if (!fs.existsSync(themesSourceDir)) {
    console.error(pc.red('  ✗ Themes source not found at packages/themes'))
    process.exit(1)
  }
  
  if (!fs.existsSync(themesTargetDir)) {
    fs.mkdirSync(themesTargetDir, { recursive: true })
  }
  
  const themeFiles = ['default.js', 'ocean.js', 'sunset.js', 'index.js']
  
  for (const file of themeFiles) {
    const sourcePath = path.join(themesSourceDir, file)
    const targetPath = path.join(themesTargetDir, file)
    
    if (!fs.existsSync(sourcePath)) {
      console.warn(pc.yellow(`  ⚠ Theme file not found: ${file}`))
      continue
    }
    
    fs.copyFileSync(sourcePath, targetPath)
  }
  
  console.log(pc.green('  ✓ Synced theme files'))
}

function validateCLI() {
  const pkgPath = path.join(CLI_ROOT, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  
  if (pkg.dependencies && pkg.dependencies['@novaui/registry']) {
    console.error(pc.red('  ✗ CLI still depends on @novaui/registry. Remove it before publishing.'))
    process.exit(1)
  }
  
  if (pkg.dependencies && pkg.dependencies['@novaui/themes']) {
    console.error(pc.red('  ✗ CLI still depends on @novaui/themes. Remove it before publishing.'))
    process.exit(1)
  }
  
  const registryPath = path.join(CLI_ROOT, 'src/registry.json')
  if (!fs.existsSync(registryPath)) {
    console.error(pc.red('  ✗ registry.json not found in CLI src/'))
    process.exit(1)
  }
  
  const themesPath = path.join(CLI_ROOT, 'src/themes/index.js')
  if (!fs.existsSync(themesPath)) {
    console.error(pc.red('  ✗ themes not found in CLI src/themes/'))
    process.exit(1)
  }
  
  console.log(pc.green('  ✓ CLI package validation passed'))
}

console.log(pc.bold('\n  📦 NovaUI CLI Prebuild\n'))

try {
  syncRegistry()
  syncThemes()
  validateCLI()
  console.log(pc.green('\n  ✓ Prebuild completed successfully\n'))
} catch (error) {
  console.error(pc.red(`\n  ✗ Prebuild failed: ${error.message}\n`))
  process.exit(1)
}
