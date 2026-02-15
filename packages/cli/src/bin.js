#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { execSync } from "node:child_process"

const BASE_URL =
  "https://raw.githubusercontent.com/KaloyanBehov/native-ui/main"

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

const TAILWIND_CONFIG_CONTENT = `/** @type {import('tailwindcss').Config} */
const novaui = require("@novaui/components/tailwind");

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@novaui/components/src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset"), novaui],
  theme: {
    extend: {},
  },
  plugins: [],
};
`

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
  if (userAgent.startsWith("yarn")) return "yarn add"
  if (userAgent.startsWith("pnpm")) return "pnpm add"
  if (userAgent.startsWith("bun")) return "bun add"
  return "npm install"
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function writeIfNotExists(filePath, content, label) {
  if (fs.existsSync(filePath)) {
    console.log(`ℹ  ${label} already exists, skipping.`)
    return false
  }
  fs.writeFileSync(filePath, content)
  console.log(`✓  Created ${label}`)
  return true
}

// ─── Commands ───────────────────────────────────────────────────────────────

async function init() {
  console.log("")
  console.log("  ◆  NovaUI – Initializing project...")
  console.log("")

  const cwd = process.cwd()

  // 1. Create src/lib/utils.ts
  const utilsDir = path.join(cwd, "src", "lib")
  ensureDir(utilsDir)
  writeIfNotExists(path.join(utilsDir, "utils.ts"), UTILS_CONTENT, "src/lib/utils.ts")

  // 2. Create src/global.css
  const srcDir = path.join(cwd, "src")
  ensureDir(srcDir)
  writeIfNotExists(path.join(srcDir, "global.css"), GLOBAL_CSS_CONTENT, "src/global.css")

  // 3. Create tailwind.config.js
  writeIfNotExists(
    path.join(cwd, "tailwind.config.js"),
    TAILWIND_CONFIG_CONTENT,
    "tailwind.config.js"
  )

  // 4. Install core dependencies
  console.log("")
  console.log("  ◆  Installing dependencies...")
  console.log("")

  const installCmd = detectPackageManager()
  const deps = [
    "@novaui/components",
    "nativewind",
    "tailwindcss",
    "clsx",
    "tailwind-merge",
    "class-variance-authority",
  ]

  try {
    execSync(`${installCmd} ${deps.join(" ")}`, { stdio: "inherit" })
  } catch {
    console.error("")
    console.error("  ✗  Failed to install dependencies. Please install manually:")
    console.error(`     ${installCmd} ${deps.join(" ")}`)
  }

  console.log("")
  console.log("  ✓  Project initialized!")
  console.log("")
  console.log("  Next steps:")
  console.log('    1. Import "src/global.css" in your root layout/entry file')
  console.log("    2. Start adding components:")
  console.log("       npx novaui add button")
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
  const registryResponse = await fetch(`${BASE_URL}/registry.json`)

  if (!registryResponse.ok) {
    throw new Error(`Failed to fetch registry: ${registryResponse.statusText}`)
  }

  const registry = await registryResponse.json()

  if (!registry[componentName]) {
    console.error(`  ✗  Component "${componentName}" not found in registry.`)
    console.log("")
    console.log("  Available components:")
    console.log("    " + Object.keys(registry).join(", "))
    process.exit(1)
  }

  const config = registry[componentName]
  const targetBaseDir = path.join(cwd, "src", "components", "ui")
  ensureDir(targetBaseDir)

  // 2. Ensure utils.ts exists
  const utilsDir = path.join(cwd, "src", "lib")
  const utilsPath = path.join(utilsDir, "utils.ts")

  if (!fs.existsSync(utilsPath)) {
    ensureDir(utilsDir)
    fs.writeFileSync(utilsPath, UTILS_CONTENT)
    console.log("  ✓  Created src/lib/utils.ts")
  }

  // 3. Fetch and write component files
  for (const file of config.files) {
    const fileUrl = `${BASE_URL}/${file}`
    const fileName = path.basename(file)
    const destPath = path.join(targetBaseDir, fileName)

    console.log(`  Downloading ${fileName}...`)
    const fileResponse = await fetch(fileUrl)

    if (!fileResponse.ok) {
      console.error(`  ✗  Failed to download ${fileName}`)
      continue
    }

    const content = await fileResponse.text()
    fs.writeFileSync(destPath, content)
    console.log(`  ✓  Added ${fileName}`)
  }

  // 4. Install component dependencies
  if (config.dependencies && config.dependencies.length > 0) {
    console.log("")
    console.log(`  Installing dependencies: ${config.dependencies.join(", ")}...`)
    try {
      const installCmd = detectPackageManager()
      execSync(`${installCmd} ${config.dependencies.join(" ")}`, {
        stdio: "inherit",
      })
    } catch {
      console.error("  ✗  Failed to install dependencies automatically.")
    }
  }

  console.log("")
  console.log(`  ✓  Successfully added "${componentName}"!`)
  console.log("")
}

function showHelp() {
  console.log("")
  console.log("  NovaUI CLI")
  console.log("")
  console.log("  Usage:")
  console.log("    novaui init              Initialize project with Tailwind config, global.css, and utils")
  console.log("    novaui add <component>   Add a component to your project")
  console.log("")
  console.log("  Examples:")
  console.log("    npx @novaui/cli init")
  console.log("    npx @novaui/cli add button")
  console.log("    npx @novaui/cli add card")
  console.log("")
}

// ─── Main ───────────────────────────────────────────────────────────────────

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
      default:
        if (command) {
          // Backwards compatible: treat unknown command as component name
          await add(command)
        } else {
          showHelp()
        }
        break
    }
  } catch (error) {
    console.error("")
    console.error(`  ✗  Error: ${error.message}`)
    process.exit(1)
  }
}

main()
