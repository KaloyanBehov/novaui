#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import readline from "node:readline"
import { execFileSync } from "node:child_process"
import { fileURLToPath } from "node:url"

const BASE_URL =
  "https://raw.githubusercontent.com/KaloyanBehov/novaui/main"

const CONFIG_FILENAME = "components.json"
const FETCH_TIMEOUT_MS = 15000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const CLI_PACKAGE_JSON_PATH = path.resolve(__dirname, "../package.json")

const DEFAULT_CONFIG = {
  globalCss: "src/global.css",
  componentsUi: "src/components/ui",
  lib: "src/lib",
}

// ─── ANSI styles (no dependency, TTY-safe) ──────────────────────────────────

const isTty = process.stdout.isTTY === true
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
}
function style(use, text) {
  return isTty && use ? use + text + c.reset : text
}

const ASCII_BANNER = `
${style(c.cyan, "   _   __     __    ____ ___   __")}
${style(c.cyan, "  / | / /__  / /   /  _//   | / /")}
${style(c.cyan, " /  |/ / _ \\/ /    / / / /| |/ / ")}
${style(c.cyan, "/_/|_/ \\___/_/   /___/_/ |_/_/  ")}
${style(c.dim, "   React Native + NativeWind UI")}
`

// ─── CSS Variables (global.css) ─────────────────────────────────────────────

const GLOBAL_CSS_CONTENT = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}
`

// ─── Tailwind Config ────────────────────────────────────────────────────────

function getTailwindConfigContent(config) {
  const contentPaths = [
    '"./App.{js,jsx,ts,tsx}"',
    '"./src/**/*.{js,jsx,ts,tsx}"',
    `"./${config.componentsUi}/**/*.{js,jsx,ts,tsx}"`,
  ]
  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    ${contentPaths.join(",\n    ")},
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
`
}

// ─── Utils ──────────────────────────────────────────────────────────────────

const UTILS_CONTENT = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`

// ─── Helpers ────────────────────────────────────────────────────────────────

function detectPackageManager() {
  const userAgent = process.env.npm_config_user_agent || ""
  if (userAgent.startsWith("yarn")) return { command: "yarn", baseArgs: ["add"] }
  if (userAgent.startsWith("pnpm")) return { command: "pnpm", baseArgs: ["add"] }
  if (userAgent.startsWith("bun")) return { command: "bun", baseArgs: ["add"] }
  return { command: "npm", baseArgs: ["install"] }
}

function installPackages(packages) {
  if (!Array.isArray(packages) || packages.length === 0) return
  const { command, baseArgs } = detectPackageManager()
  execFileSync(command, [...baseArgs, ...packages], { stdio: "inherit" })
}

function getInstallHint(packages) {
  const { command, baseArgs } = detectPackageManager()
  return `${command} ${[...baseArgs, ...packages].join(" ")}`
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function writeIfNotExists(filePath, content, label) {
  if (fs.existsSync(filePath)) {
    console.log(style(c.dim, `   ℹ  ${label} already exists, skipping.`))
    return false
  }
  fs.writeFileSync(filePath, content, "utf8")
  console.log(style(c.green, `   ✓  Created ${label}`))
  return true
}

/** Returns which of the requested deps are not listed in package.json (dependencies or devDependencies). */
function getMissingDeps(cwd, deps) {
  const pkgPath = path.join(cwd, "package.json")
  if (!fs.existsSync(pkgPath)) {
    return [...deps]
  }
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"))
  const installed = new Set([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ])
  return deps.filter((d) => !installed.has(d))
}

/** Ask user a question; returns trimmed answer or default. */
function ask(question, defaultAnswer = "") {
  if (process.stdin.isTTY !== true) {
    return Promise.resolve(defaultAnswer)
  }
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const defaultPart = defaultAnswer ? style(c.dim, ` (${defaultAnswer})`) : ""
  const prompt = style(c.cyan, "   ? ") + question + defaultPart + style(c.dim, " ")
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close()
      const trimmed = answer.trim()
      resolve(trimmed !== "" ? trimmed : defaultAnswer)
    })
  })
}

/** Load components.json from cwd; returns null if missing or invalid. */
function loadConfig(cwd) {
  const configPath = path.join(cwd, CONFIG_FILENAME)
  if (!fs.existsSync(configPath)) return null
  try {
    const raw = JSON.parse(fs.readFileSync(configPath, "utf8"))
    return { ...DEFAULT_CONFIG, ...raw }
  } catch {
    return null
  }
}

/** Write components.json to cwd. */
function writeConfig(cwd, config) {
  const configPath = path.join(cwd, CONFIG_FILENAME)
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8")
}

function getCliVersion() {
  try {
    const pkg = JSON.parse(fs.readFileSync(CLI_PACKAGE_JSON_PATH, "utf8"))
    return pkg.version || "unknown"
  } catch {
    return "unknown"
  }
}

function assertValidComponentConfig(componentName, componentConfig) {
  if (!componentConfig || typeof componentConfig !== "object") {
    throw new Error(`Registry entry for "${componentName}" is invalid.`)
  }

  const { files, dependencies } = componentConfig
  if (!Array.isArray(files) || files.some((file) => typeof file !== "string" || file.trim() === "")) {
    throw new Error(`Registry entry for "${componentName}" must include a valid "files" array.`)
  }

  if (
    dependencies !== undefined &&
    (!Array.isArray(dependencies) ||
      dependencies.some((dep) => typeof dep !== "string" || dep.trim() === ""))
  ) {
    throw new Error(`Registry entry for "${componentName}" has an invalid "dependencies" array.`)
  }
}

async function fetchWithTimeout(url) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    return await fetch(url, { signal: controller.signal })
  } catch (error) {
    if (error && error.name === "AbortError") {
      throw new Error(`Request timed out after ${FETCH_TIMEOUT_MS}ms: ${url}`)
    }
    throw error
  } finally {
    clearTimeout(timeout)
  }
}

function formatError(error) {
  if (error instanceof Error && error.message) return error.message
  return String(error)
}

// ─── Commands ───────────────────────────────────────────────────────────────

async function init() {
  const cwd = process.cwd()
  const existingConfig = loadConfig(cwd)

  // ─── Banner ───────────────────────────────────────────────────────────────
  console.log(ASCII_BANNER)
  console.log(style(c.bold, "   Welcome to NovaUI"))
  console.log(style(c.dim, "   Let's set up your project in a few steps."))
  console.log("")

  let config
  if (existingConfig) {
    console.log(style(c.blue, "   ⚙  Config"))
    console.log(style(c.dim, "   components.json found in this directory."))
    console.log("")
    const reconfig = await ask("Re-configure paths? (y/N)", "n")
    if (reconfig.toLowerCase() === "y" || reconfig.toLowerCase() === "yes") {
      config = {
        globalCss: (await ask("Where should global.css be placed?", DEFAULT_CONFIG.globalCss)).replace(/\\/g, "/"),
        componentsUi: (await ask("Where should UI components be placed?", DEFAULT_CONFIG.componentsUi)).replace(/\\/g, "/"),
        lib: (await ask("Where should lib (e.g. utils) be placed?", DEFAULT_CONFIG.lib)).replace(/\\/g, "/"),
      }
      writeConfig(cwd, config)
      console.log("")
      console.log(style(c.green, "   ✓  Updated components.json"))
    } else {
      config = existingConfig
    }
  } else {
    console.log(style(c.blue, "   ⚙  Configure paths"))
    console.log(style(c.dim, "   Where should NovaUI put its files? Press Enter for defaults."))
    console.log("")
    config = {
      globalCss: (await ask("Path for global.css?", DEFAULT_CONFIG.globalCss)).replace(/\\/g, "/"),
      componentsUi: (await ask("Path for UI components?", DEFAULT_CONFIG.componentsUi)).replace(/\\/g, "/"),
      lib: (await ask("Path for lib (utils)?", DEFAULT_CONFIG.lib)).replace(/\\/g, "/"),
    }
    writeConfig(cwd, config)
    console.log("")
    console.log(style(c.green, "   ✓  Created components.json"))
  }

  // ─── Setup files ──────────────────────────────────────────────────────────
  console.log("")
  console.log(style(c.blue, "   📁 Setting up project"))
  console.log("")

  const utilsDir = path.join(cwd, config.lib)
  ensureDir(utilsDir)
  const utilsPath = path.join(utilsDir, "utils.ts")
  writeIfNotExists(utilsPath, UTILS_CONTENT, `${config.lib}/utils.ts`)

  const globalCssDir = path.dirname(path.join(cwd, config.globalCss))
  ensureDir(globalCssDir)
  writeIfNotExists(path.join(cwd, config.globalCss), GLOBAL_CSS_CONTENT, config.globalCss)

  const tailwindContent = getTailwindConfigContent(config)
  writeIfNotExists(
    path.join(cwd, "tailwind.config.js"),
    tailwindContent,
    "tailwind.config.js"
  )

  // ─── Dependencies ─────────────────────────────────────────────────────────
  const deps = [
    "nativewind",
    "tailwindcss",
    "clsx",
    "tailwind-merge",
    "class-variance-authority",
  ]
  const missingDeps = getMissingDeps(cwd, deps)

  console.log("")
  console.log(style(c.blue, "   📦 Dependencies"))
  console.log("")

  if (missingDeps.length === 0) {
    console.log(style(c.dim, "   ✓  All required packages already in package.json, skipping install."))
  } else {
    console.log(style(c.dim, `   Installing: ${missingDeps.join(", ")}`))
    console.log("")
    try {
      installPackages(missingDeps)
    } catch {
      console.error("")
      console.error(style(c.yellow, "   ✗  Install failed. Run manually:"))
      console.error(style(c.dim, `     ${getInstallHint(missingDeps)}`))
    }
  }

  // ─── Success ───────────────────────────────────────────────────────────────
  console.log("")
  console.log(style(c.green, "   ┌─────────────────────────────────────────┐"))
  console.log(style(c.green, "   │  ✓  NovaUI is ready!                     │"))
  console.log(style(c.green, "   └─────────────────────────────────────────┘"))
  console.log("")
  console.log(style(c.bold, "   Next steps:"))
  console.log("")
  console.log(style(c.dim, "   1. Import global CSS in your root entry (e.g. App.tsx):"))
  console.log(style(c.cyan, `      import "${config.globalCss}"`))
  console.log("")
  console.log(style(c.dim, "   2. Add components:"))
  console.log(style(c.cyan, "      npx novaui add button"))
  console.log(style(c.cyan, "      npx novaui add card"))
  console.log("")
}

async function add(componentName) {
  if (!componentName) {
    console.error("Usage: novaui add <component-name>")
    process.exit(1)
  }

  const cwd = process.cwd()

  console.log("")
  console.log(`  ◆  NovaUI – Adding "${componentName}"...`)
  console.log("")

  // 1. Fetch registry
  console.log("  Fetching registry...")
  const registryResponse = await fetchWithTimeout(`${BASE_URL}/registry.json`)

  if (!registryResponse.ok) {
    throw new Error(`Failed to fetch registry: ${registryResponse.statusText}`)
  }

  const registry = await registryResponse.json()
  if (!registry || typeof registry !== "object" || Array.isArray(registry)) {
    throw new Error("Registry response is not a valid object.")
  }

  if (!registry[componentName]) {
    console.error(`  ✗  Component "${componentName}" not found in registry.`)
    console.log("")
    console.log("  Available components:")
    console.log("    " + Object.keys(registry).join(", "))
    process.exit(1)
  }

  const componentConfig = registry[componentName]
  assertValidComponentConfig(componentName, componentConfig)
  const projectConfig = loadConfig(cwd) || DEFAULT_CONFIG
  const targetBaseDir = path.join(cwd, projectConfig.componentsUi)
  ensureDir(targetBaseDir)

  // 2. Ensure utils.ts exists (in configured lib dir)
  const utilsDir = path.join(cwd, projectConfig.lib)
  const utilsPath = path.join(utilsDir, "utils.ts")

  if (!fs.existsSync(utilsPath)) {
    ensureDir(utilsDir)
    fs.writeFileSync(utilsPath, UTILS_CONTENT)
    console.log(`  ✓  Created ${projectConfig.lib}/utils.ts`)
  }

  if (!loadConfig(cwd)) {
    console.log("")
    console.log("  ℹ  No components.json found. Using default paths. Run 'npx novaui init' to customize.")
    console.log("")
  }

  // 3. Fetch and write component files
  for (const file of componentConfig.files) {
    const fileUrl = `${BASE_URL}/${file}`
    const fileName = path.basename(file)
    const destPath = path.join(targetBaseDir, fileName)

    console.log(`  Downloading ${fileName}...`)
    const fileResponse = await fetchWithTimeout(fileUrl)

    if (!fileResponse.ok) {
      console.error(`  ✗  Failed to download ${fileName}`)
      continue
    }

    const content = await fileResponse.text()
    fs.writeFileSync(destPath, content, "utf8")
    console.log(`  ✓  Added ${fileName}`)
  }

  // 4. Install component dependencies (only those not already in package.json)
  if (componentConfig.dependencies && componentConfig.dependencies.length > 0) {
    const missingDeps = getMissingDeps(cwd, componentConfig.dependencies)
    if (missingDeps.length === 0) {
      console.log("")
      console.log("  ✓  Component dependencies already in package.json, skipping install.")
    } else {
      console.log("")
      console.log(`  Installing dependencies: ${missingDeps.join(", ")}...`)
      try {
        installPackages(missingDeps)
      } catch {
        console.error("  ✗  Failed to install dependencies automatically.")
      }
    }
  }

  console.log("")
  console.log(`  ✓  Successfully added "${componentName}"!`)
  console.log("")
}

function showHelp() {
  console.log(ASCII_BANNER)
  console.log(style(c.dim, `   Version: ${getCliVersion()}`))
  console.log("")
  console.log(style(c.bold, "   Usage"))
  console.log(style(c.dim, "   novaui init              Set up NovaUI (config, Tailwind, global.css, utils)"))
  console.log(style(c.dim, "   novaui add <component>  Add a component (e.g. button, card)"))
  console.log(style(c.dim, "   novaui --version         Show CLI version"))
  console.log("")
  console.log(style(c.bold, "   Examples"))
  console.log(style(c.cyan, "   npx novaui init"))
  console.log(style(c.cyan, "   npx novaui add button"))
  console.log(style(c.cyan, "   npx novaui add card"))
  console.log("")
}

function showVersion() {
  console.log(getCliVersion())
}

// ─── Exports (for testing) ──────────────────────────────────────────────────

export {
  DEFAULT_CONFIG,
  CONFIG_FILENAME,
  GLOBAL_CSS_CONTENT,
  UTILS_CONTENT,
  getTailwindConfigContent,
  detectPackageManager,
  ensureDir,
  writeIfNotExists,
  getMissingDeps,
  loadConfig,
  writeConfig,
  assertValidComponentConfig,
  fetchWithTimeout,
  formatError,
  getCliVersion,
  init,
  add,
}

// ─── Main ───────────────────────────────────────────────────────────────────

const isDirectRun = (() => {
  if (!process.argv[1]) return false
  try {
    return fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
  } catch {
    return process.argv[1].endsWith("/bin.js")
  }
})()

if (isDirectRun) {
  const command = process.argv[2]
  const arg = process.argv[3]

  async function main() {
    try {
      switch (command) {
        case "init":
          await init()
          break
        case "add":
          await add(arg)
          break
        case "--help":
        case "-h":
          showHelp()
          break
        case "--version":
        case "-v":
          showVersion()
          break
        default:
          if (command) {
            await add(command)
          } else {
            showHelp()
          }
          break
      }
    } catch (error) {
      console.error("")
      console.error(`  ✗  Error: ${formatError(error)}`)
      process.exit(1)
    }
  }

  main()
}
