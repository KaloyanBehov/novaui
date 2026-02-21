import fs from 'node:fs'
import path from 'node:path'
import ora from 'ora'
import { multiselect, isCancel, cancel } from '@clack/prompts'
import pc from 'picocolors'

import { DEFAULT_CONFIG, UTILS_CONTENT, BASE_URL, REGISTRY_URL } from '../constants.js'
import { loadConfig } from '../utils/config.js'
import { ensureDir } from '../utils/fs-helpers.js'
import { getMissingDeps, installPackages, getInstallHint } from '../utils/deps.js'
import { fetchWithTimeout } from '../utils/fetch.js'
import { assertValidComponentConfig } from '../utils/validate.js'
import { runAddPreflightChecks } from '../utils/preflight.js'
import { formatComponentNotFoundError } from '../utils/fuzzy.js'

/**
 * Fetch the registry from GitHub.
 * Always gets the latest registry from the main branch.
 */
async function fetchRegistry() {
  const spinner = ora({ text: 'Loading component registry...', stream: process.stderr }).start()
  
  try {
    const response = await fetchWithTimeout(REGISTRY_URL)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch registry: ${response.status} ${response.statusText}`)
    }
    
    const registry = await response.json()
    spinner.stop()
    return registry
  } catch (error) {
    spinner.fail('Failed to load registry')
    throw new Error(`Could not fetch registry from GitHub: ${error.message}`)
  }
}

/**
 * Fetch the component registry and present an interactive multi-select for
 * the user to choose one or more components. Returns the selected names.
 * Only called in TTY mode.
 */
export async function pickComponentsInteractively() {
  const registry = await fetchRegistry()

  if (!registry || typeof registry !== 'object' || Array.isArray(registry)) {
    throw new Error('Registry is not a valid object.')
  }

  const selected = await multiselect({
    message: 'Select components to add',
    options: Object.keys(registry).map(name => ({ value: name, label: name })),
    required: true,
  })

  if (isCancel(selected)) {
    cancel('Cancelled.')
    process.exit(0)
  }

  return selected
}

/**
 * Add a single component by name.
 *
 * @param {string} componentName
 * @param {{ force?: boolean }} [options]
 */
export async function add(componentName, options = {}) {
  const { force = false } = options

  if (!componentName) {
    throw new Error('Missing component name. Usage: novaui@latest add <component-name>')
  }

  const cwd = process.cwd()
  runAddPreflightChecks(cwd)

  console.log('')
  console.log(`  ◆  NovaUI – Adding "${componentName}"...`)
  console.log('')

  // ─── 1. Fetch registry ────────────────────────────────────────────────────

  const registry = await fetchRegistry()

  if (!registry || typeof registry !== 'object' || Array.isArray(registry)) {
    throw new Error('Registry is not a valid object.')
  }

  if (!registry[componentName]) {
    throw new Error(formatComponentNotFoundError(componentName, Object.keys(registry)))
  }

  const componentConfig = registry[componentName]
  assertValidComponentConfig(componentName, componentConfig)

  const projectConfig = loadConfig(cwd) || DEFAULT_CONFIG
  const targetBaseDir = path.join(cwd, projectConfig.componentsUi)
  ensureDir(targetBaseDir)

  // ─── 2. Ensure utils.ts exists ─────────────────────────────────────────────

  const utilsDir = path.join(cwd, projectConfig.lib)
  const utilsPath = path.join(utilsDir, 'utils.ts')

  if (!fs.existsSync(utilsPath)) {
    ensureDir(utilsDir)
    fs.writeFileSync(utilsPath, UTILS_CONTENT)
    console.log(`  ✓  Created ${projectConfig.lib}/utils.ts`)
  }

  if (!loadConfig(cwd)) {
    console.log('')
    console.log("  ℹ  No components.json found. Using default paths. Run 'npx novaui-cli@latest init' to customize.")
    console.log('')
  }

  // ─── 3. Fetch and write component files ────────────────────────────────────

  for (const file of componentConfig.files) {
    const fileUrl = `${BASE_URL}/${file}`
    const fileName = path.basename(file)
    const destPath = path.join(targetBaseDir, fileName)

    if (!force && fs.existsSync(destPath)) {
      console.log(pc.dim(`  ℹ  ${fileName} already exists, skipping. (use --force to overwrite)`))
      continue
    }

    const fileSpinner = ora({ text: `  Downloading ${fileName}...`, stream: process.stderr }).start()
    const fileResponse = await fetchWithTimeout(fileUrl)

    if (!fileResponse.ok) {
      fileSpinner.fail(pc.red(`  Failed to download ${fileName}`))
      continue
    }

    const content = await fileResponse.text()
    fs.writeFileSync(destPath, content, 'utf8')
    fileSpinner.succeed(pc.green(`  ✓  Added ${fileName}`))
  }

  // ─── 4. Install component dependencies ────────────────────────────────────

  if (componentConfig.dependencies && componentConfig.dependencies.length > 0) {
    const missingDeps = getMissingDeps(cwd, componentConfig.dependencies)
    if (missingDeps.length === 0) {
      console.log('')
      console.log('  ✓  Component dependencies already in package.json, skipping install.')
    } else {
      console.log('')
      console.log(`  Installing dependencies: ${missingDeps.join(', ')}...`)
      try {
        installPackages(missingDeps)
      } catch {
        console.error(`  ✗  Failed to install dependencies automatically.`)
        console.error(pc.dim(`     Run manually: ${getInstallHint(missingDeps)}`))
      }
    }
  }

  console.log('')
  console.log(pc.green(`  ✓  Successfully added "${componentName}"!`))
  console.log('')
}
