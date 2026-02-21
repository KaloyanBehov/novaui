#!/usr/bin/env node

/**
 * Registry Auto-Generation Script
 * 
 * Automatically generates registry entries from component files by:
 * 1. Scanning all .tsx files in packages/components/src/ui/
 * 2. Analyzing imports to extract dependencies
 * 3. Merging with existing registry entries
 * 4. Outputting updated registry.json
 * 
 * Run via: node packages/registry/scripts/generate.js
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const MONOREPO_ROOT = path.resolve(__dirname, '../../../')
const REGISTRY_PATH = path.join(MONOREPO_ROOT, 'packages/registry/registry.json')
const COMPONENTS_DIR = path.join(MONOREPO_ROOT, 'packages/components/src/ui')

// Known external dependencies that components might use
const DEPENDENCY_MAP = {
  'class-variance-authority': 'class-variance-authority',
  'cva': 'class-variance-authority',
  'clsx': 'clsx',
  'twMerge': 'tailwind-merge',
  'tailwind-merge': 'tailwind-merge',
  'lucide-react-native': 'lucide-react-native',
  'react-native-reanimated': 'react-native-reanimated',
  'react-native-gesture-handler': 'react-native-gesture-handler',
  'react-native-gifted-charts': 'react-native-gifted-charts',
  'expo-linear-gradient': 'expo-linear-gradient',
  'date-fns': 'date-fns',
}

// Core dependencies always needed
const CORE_DEPS = ['clsx', 'tailwind-merge']

function extractDependenciesFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const dependencies = new Set()
  
  // Add core dependencies by default
  CORE_DEPS.forEach(dep => dependencies.add(dep))
  
  // Match import statements
  const importRegex = /import\s+(?:{[^}]*}|[\w*\s,{}]+)\s+from\s+['"]([^'"]+)['"]/g
  let match
  
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1]
    
    // Check if it's an external package (not relative import)
    if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
      // Map to known dependency or use as-is
      const dep = DEPENDENCY_MAP[importPath] || importPath
      
      // Only add if it's a known external dependency
      if (Object.values(DEPENDENCY_MAP).includes(dep)) {
        dependencies.add(dep)
      }
    }
  }
  
  // Check for specific patterns that indicate dependency usage
  if (content.includes('cva(')) {
    dependencies.add('class-variance-authority')
  }
  
  if (content.includes('from \'lucide-react-native\'') || content.includes('from "lucide-react-native"')) {
    dependencies.add('lucide-react-native')
  }
  
  return Array.from(dependencies).sort()
}

function generateRegistryFromComponents() {
  console.log('\n📝 Generating registry from component files...\n')
  
  if (!fs.existsSync(COMPONENTS_DIR)) {
    throw new Error('Components directory not found')
  }
  
  // Load existing registry to preserve manual configurations
  let existingRegistry = {}
  if (fs.existsSync(REGISTRY_PATH)) {
    existingRegistry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'))
  }
  
  // Scan component files
  const files = fs.readdirSync(COMPONENTS_DIR)
    .filter(file => file.endsWith('.tsx') || file.endsWith('.ts'))
    .filter(file => file !== 'index.ts') // Skip index
  
  const newRegistry = {}
  const updated = []
  const created = []
  
  for (const file of files) {
    const componentName = file.replace(/\.tsx?$/, '')
    const filePath = path.join(COMPONENTS_DIR, file)
    const relativeFilePath = `packages/components/src/ui/${file}`
    
    // Extract dependencies from file
    const detectedDeps = extractDependenciesFromFile(filePath)
    
    // Check if entry exists
    const existingEntry = existingRegistry[componentName]
    
    if (existingEntry) {
      // Merge with existing entry (preserve manual overrides)
      newRegistry[componentName] = {
        name: componentName,
        dependencies: existingEntry.dependencies || detectedDeps,
        files: existingEntry.files || [relativeFilePath],
      }
      
      // Check if dependencies changed
      const depsChanged = JSON.stringify(existingEntry.dependencies?.sort()) !== JSON.stringify(detectedDeps)
      if (depsChanged) {
        updated.push({
          name: componentName,
          old: existingEntry.dependencies,
          new: detectedDeps,
        })
      }
    } else {
      // Create new entry
      newRegistry[componentName] = {
        name: componentName,
        dependencies: detectedDeps,
        files: [relativeFilePath],
      }
      created.push(componentName)
    }
  }
  
  // Sort registry alphabetically
  const sortedRegistry = Object.keys(newRegistry)
    .sort()
    .reduce((acc, key) => {
      acc[key] = newRegistry[key]
      return acc
    }, {})
  
  // Report changes
  console.log(`✓ Scanned ${files.length} component files\n`)
  
  if (created.length > 0) {
    console.log('📦 New entries created:')
    created.forEach(name => {
      console.log(`  • ${name}`)
      console.log(`    Dependencies: ${newRegistry[name].dependencies.join(', ')}`)
    })
    console.log('')
  }
  
  if (updated.length > 0) {
    console.log('🔄 Dependency updates detected:')
    updated.forEach(({ name, old, new: newDeps }) => {
      console.log(`  • ${name}`)
      console.log(`    Old: ${old?.join(', ') || 'none'}`)
      console.log(`    New: ${newDeps.join(', ')}`)
    })
    console.log('')
    console.log('⚠️  Review these changes carefully before committing.')
    console.log('   Dependencies are auto-detected and may need manual adjustment.')
    console.log('')
  }
  
  return sortedRegistry
}

function saveRegistry(registry, dryRun = false) {
  const json = JSON.stringify(registry, null, 2)
  
  if (dryRun) {
    console.log('🔍 Dry run mode - registry would be updated with:')
    console.log(json)
    return
  }
  
  fs.writeFileSync(REGISTRY_PATH, json + '\n', 'utf-8')
  console.log('✅ Registry updated successfully!\n')
  console.log(`   Entries: ${Object.keys(registry).length}`)
  console.log(`   Location: packages/registry/registry.json\n`)
}

// CLI
const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run') || args.includes('-d')
const help = args.includes('--help') || args.includes('-h')

if (help) {
  console.log(`
Registry Generator

Auto-generates registry.json from component files.

Usage:
  node scripts/generate.js [options]

Options:
  --dry-run, -d    Show what would change without writing
  --help, -h       Show this help message

Examples:
  node scripts/generate.js           # Update registry
  node scripts/generate.js --dry-run # Preview changes
`)
  process.exit(0)
}

try {
  const registry = generateRegistryFromComponents()
  saveRegistry(registry, dryRun)
  
  if (!dryRun) {
    console.log('💡 Next steps:')
    console.log('   1. Review the changes: git diff packages/registry/registry.json')
    console.log('   2. Validate: pnpm validate:registry')
    console.log('   3. Commit if everything looks good\n')
  }
} catch (error) {
  console.error(`\n❌ Generation failed: ${error.message}\n`)
  process.exit(1)
}
