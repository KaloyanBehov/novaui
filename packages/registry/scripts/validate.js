#!/usr/bin/env node

/**
 * Registry Validation Script
 * 
 * Ensures registry.json is in sync with the actual component source files.
 * Validates:
 * - All referenced files exist
 * - Component dependencies are declared
 * - No missing or orphaned entries
 * 
 * Run via: node packages/registry/scripts/validate.js
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const MONOREPO_ROOT = path.resolve(__dirname, '../../../')
const REGISTRY_PATH = path.join(MONOREPO_ROOT, 'packages/registry/registry.json')
const COMPONENTS_DIR = path.join(MONOREPO_ROOT, 'packages/components/src/ui')

const KNOWN_DEPS = [
  'clsx',
  'tailwind-merge',
  'class-variance-authority',
  'lucide-react-native',
  'react-native-reanimated',
  'react-native-gesture-handler',
  'date-fns',
  'expo-linear-gradient',
  'react-native-gifted-charts',
]

function loadRegistry() {
  if (!fs.existsSync(REGISTRY_PATH)) {
    throw new Error('registry.json not found')
  }
  return JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'))
}

function getComponentFiles() {
  if (!fs.existsSync(COMPONENTS_DIR)) {
    throw new Error('Components directory not found')
  }
  return fs.readdirSync(COMPONENTS_DIR)
    .filter(file => file.endsWith('.tsx') || file.endsWith('.ts'))
    .map(file => file.replace(/\.tsx?$/, ''))
}

function validateRegistry() {
  console.log('\n📋 Validating registry...\n')
  
  const registry = loadRegistry()
  const componentFiles = getComponentFiles()
  const errors = []
  const warnings = []
  
  // Check 1: All registry entries have valid files
  for (const [name, config] of Object.entries(registry)) {
    if (!config.files || !Array.isArray(config.files)) {
      errors.push(`${name}: missing or invalid "files" array`)
      continue
    }
    
    for (const filePath of config.files) {
      const fullPath = path.join(MONOREPO_ROOT, filePath)
      if (!fs.existsSync(fullPath)) {
        errors.push(`${name}: file not found: ${filePath}`)
      }
    }
    
    if (!config.dependencies || !Array.isArray(config.dependencies)) {
      warnings.push(`${name}: missing or invalid "dependencies" array`)
    }
    
    // Validate dependency names
    if (config.dependencies) {
      for (const dep of config.dependencies) {
        if (!KNOWN_DEPS.includes(dep)) {
          warnings.push(`${name}: unknown dependency "${dep}" - verify it's correct`)
        }
      }
    }
  }
  
  // Check 2: All component files have registry entries
  const registryNames = Object.keys(registry)
  for (const fileName of componentFiles) {
    if (!registryNames.includes(fileName)) {
      warnings.push(`Component file "${fileName}.tsx" exists but has no registry entry`)
    }
  }
  
  // Check 3: Registry name matches config.name
  for (const [key, config] of Object.entries(registry)) {
    if (config.name !== key) {
      errors.push(`${key}: config.name "${config.name}" doesn't match registry key "${key}"`)
    }
  }
  
  // Report results
  if (errors.length > 0) {
    console.log('❌ Validation failed:\n')
    errors.forEach(err => console.log(`  • ${err}`))
    console.log('')
  }
  
  if (warnings.length > 0) {
    console.log('⚠️  Warnings:\n')
    warnings.forEach(warn => console.log(`  • ${warn}`))
    console.log('')
  }
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ Registry validation passed!\n')
    console.log(`  • ${registryNames.length} components registered`)
    console.log(`  • ${componentFiles.length} component files found`)
    console.log('')
    return true
  }
  
  if (errors.length > 0) {
    process.exit(1)
  }
  
  return warnings.length === 0
}

try {
  validateRegistry()
} catch (error) {
  console.error(`\n❌ Validation error: ${error.message}\n`)
  process.exit(1)
}
