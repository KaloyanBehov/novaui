import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import fs from "node:fs"
import path from "node:path"
import os from "node:os"

import {
  DEFAULT_CONFIG,
  CONFIG_FILENAME,
  GLOBAL_CSS_CONTENT,
  UTILS_CONTENT,
  getTailwindConfigContent,
  loadConfig,
  writeConfig,
  init,
  add,
} from "../bin.js"

// ─── Test helpers ───────────────────────────────────────────────────────────

function makeTmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "novaui-cmd-test-"))
}

function cleanTmpDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true })
}

// ─── init command ───────────────────────────────────────────────────────────

describe("init command", () => {
  let tmp
  let originalCwd

  beforeEach(() => {
    tmp = makeTmpDir()
    originalCwd = process.cwd()
    process.chdir(tmp)

    // Create a minimal package.json so getMissingDeps works
    fs.writeFileSync(
      path.join(tmp, "package.json"),
      JSON.stringify({
        name: "test-project",
        dependencies: {
          nativewind: "^4.0.0",
          tailwindcss: "^3.0.0",
          clsx: "^2.0.0",
          "tailwind-merge": "^3.0.0",
          "class-variance-authority": "^0.7.0",
        },
      }),
      "utf8"
    )
  })

  afterEach(() => {
    process.chdir(originalCwd)
    cleanTmpDir(tmp)
  })

  it("creates components.json with default config", async () => {
    // Non-TTY stdin means `ask()` returns defaults automatically
    await init()

    const configPath = path.join(tmp, CONFIG_FILENAME)
    expect(fs.existsSync(configPath)).toBe(true)

    const config = JSON.parse(fs.readFileSync(configPath, "utf8"))
    expect(config.globalCss).toBe(DEFAULT_CONFIG.globalCss)
    expect(config.componentsUi).toBe(DEFAULT_CONFIG.componentsUi)
    expect(config.lib).toBe(DEFAULT_CONFIG.lib)
  })

  it("creates utils.ts in the lib directory", async () => {
    await init()

    const utilsPath = path.join(tmp, DEFAULT_CONFIG.lib, "utils.ts")
    expect(fs.existsSync(utilsPath)).toBe(true)

    const content = fs.readFileSync(utilsPath, "utf8")
    expect(content).toContain("export function cn")
    expect(content).toBe(UTILS_CONTENT)
  })

  it("creates global.css", async () => {
    await init()

    const cssPath = path.join(tmp, DEFAULT_CONFIG.globalCss)
    expect(fs.existsSync(cssPath)).toBe(true)

    const content = fs.readFileSync(cssPath, "utf8")
    expect(content).toContain("@tailwind base")
    expect(content).toContain("--primary:")
    expect(content).toContain(".dark")
    expect(content).toBe(GLOBAL_CSS_CONTENT)
  })

  it("creates tailwind.config.js with correct theme", async () => {
    await init()

    const twPath = path.join(tmp, "tailwind.config.js")
    expect(fs.existsSync(twPath)).toBe(true)

    const content = fs.readFileSync(twPath, "utf8")
    expect(content).toContain("module.exports")
    expect(content).toContain('require("nativewind/preset")')
    expect(content).toContain("hsl(var(--primary))")
    expect(content).toContain("hsl(var(--background))")
    expect(content).toContain("hsl(var(--border))")
    expect(content).toContain("var(--radius)")
  })

  it("does not overwrite existing files on second run", async () => {
    await init()

    // Modify utils.ts
    const utilsPath = path.join(tmp, DEFAULT_CONFIG.lib, "utils.ts")
    fs.writeFileSync(utilsPath, "// custom content")

    await init()

    // Should still have custom content
    expect(fs.readFileSync(utilsPath, "utf8")).toBe("// custom content")
  })

  it("creates all expected directories", async () => {
    await init()

    expect(fs.existsSync(path.join(tmp, "src", "lib"))).toBe(true)
    expect(fs.existsSync(path.join(tmp, "src"))).toBe(true)
  })

  it("preserves existing components.json on re-init (non-TTY defaults to no)", async () => {
    const customConfig = {
      globalCss: "app/styles.css",
      componentsUi: "app/ui",
      lib: "app/utils",
    }
    writeConfig(tmp, customConfig)

    await init()

    const loaded = loadConfig(tmp)
    expect(loaded.globalCss).toBe("app/styles.css")
    expect(loaded.componentsUi).toBe("app/ui")
    expect(loaded.lib).toBe("app/utils")
  })
})

// ─── add command ────────────────────────────────────────────────────────────

describe("add command", () => {
  let tmp
  let originalCwd
  let originalFetch

  beforeEach(() => {
    tmp = makeTmpDir()
    originalCwd = process.cwd()
    process.chdir(tmp)
    originalFetch = globalThis.fetch

    // Create package.json
    fs.writeFileSync(
      path.join(tmp, "package.json"),
      JSON.stringify({ name: "test-project", dependencies: {} }),
      "utf8"
    )
  })

  afterEach(() => {
    process.chdir(originalCwd)
    globalThis.fetch = originalFetch
    cleanTmpDir(tmp)
  })

  it("creates utils.ts if missing", async () => {
    // Mock fetch for registry and component file
    globalThis.fetch = vi.fn(async (url) => {
      if (url.endsWith("registry.json")) {
        return {
          ok: true,
          json: async () => ({
            button: {
              files: ["src/components/ui/button.tsx"],
              dependencies: [],
            },
          }),
        }
      }
      if (url.endsWith("button.tsx")) {
        return {
          ok: true,
          text: async () => 'export function Button() { return null }',
        }
      }
      return { ok: false, statusText: "Not Found" }
    })

    await add("button")

    const utilsPath = path.join(tmp, DEFAULT_CONFIG.lib, "utils.ts")
    expect(fs.existsSync(utilsPath)).toBe(true)
    expect(fs.readFileSync(utilsPath, "utf8")).toBe(UTILS_CONTENT)
  })

  it("downloads component file to the correct directory", async () => {
    const componentCode = `import React from "react"\nexport function Button() { return null }`

    globalThis.fetch = vi.fn(async (url) => {
      if (url.endsWith("registry.json")) {
        return {
          ok: true,
          json: async () => ({
            button: {
              files: ["src/components/ui/button.tsx"],
              dependencies: [],
            },
          }),
        }
      }
      if (url.endsWith("button.tsx")) {
        return { ok: true, text: async () => componentCode }
      }
      return { ok: false, statusText: "Not Found" }
    })

    await add("button")

    const dest = path.join(tmp, DEFAULT_CONFIG.componentsUi, "button.tsx")
    expect(fs.existsSync(dest)).toBe(true)
    expect(fs.readFileSync(dest, "utf8")).toBe(componentCode)
  })

  it("uses paths from components.json if present", async () => {
    const customConfig = {
      globalCss: "app/global.css",
      componentsUi: "app/ui",
      lib: "app/lib",
    }
    writeConfig(tmp, customConfig)

    globalThis.fetch = vi.fn(async (url) => {
      if (url.endsWith("registry.json")) {
        return {
          ok: true,
          json: async () => ({
            card: { files: ["src/components/ui/card.tsx"], dependencies: [] },
          }),
        }
      }
      if (url.endsWith("card.tsx")) {
        return { ok: true, text: async () => "export function Card() {}" }
      }
      return { ok: false, statusText: "Not Found" }
    })

    await add("card")

    const dest = path.join(tmp, "app", "ui", "card.tsx")
    expect(fs.existsSync(dest)).toBe(true)
  })

  it("throws when registry fetch fails", async () => {
    globalThis.fetch = vi.fn(async () => ({
      ok: false,
      statusText: "Internal Server Error",
    }))

    await expect(add("button")).rejects.toThrow(/Failed to fetch registry/)
  })

  it("throws when registry is not a valid object", async () => {
    globalThis.fetch = vi.fn(async () => ({
      ok: true,
      json: async () => [1, 2, 3],
    }))

    await expect(add("button")).rejects.toThrow(/not a valid object/)
  })

  it("handles component with multiple files", async () => {
    globalThis.fetch = vi.fn(async (url) => {
      if (url.endsWith("registry.json")) {
        return {
          ok: true,
          json: async () => ({
            dialog: {
              files: [
                "src/components/ui/dialog.tsx",
                "src/components/ui/dialog-overlay.tsx",
              ],
              dependencies: [],
            },
          }),
        }
      }
      if (url.endsWith("dialog.tsx")) {
        return { ok: true, text: async () => "// dialog" }
      }
      if (url.endsWith("dialog-overlay.tsx")) {
        return { ok: true, text: async () => "// overlay" }
      }
      return { ok: false, statusText: "Not Found" }
    })

    await add("dialog")

    const uiDir = path.join(tmp, DEFAULT_CONFIG.componentsUi)
    expect(fs.existsSync(path.join(uiDir, "dialog.tsx"))).toBe(true)
    expect(fs.existsSync(path.join(uiDir, "dialog-overlay.tsx"))).toBe(true)
  })

  it("continues when a single file download fails", async () => {
    globalThis.fetch = vi.fn(async (url) => {
      if (url.endsWith("registry.json")) {
        return {
          ok: true,
          json: async () => ({
            multi: {
              files: ["src/components/ui/a.tsx", "src/components/ui/b.tsx"],
              dependencies: [],
            },
          }),
        }
      }
      if (url.endsWith("a.tsx")) {
        return { ok: false, statusText: "Not Found" }
      }
      if (url.endsWith("b.tsx")) {
        return { ok: true, text: async () => "// b component" }
      }
      return { ok: false, statusText: "Not Found" }
    })

    await add("multi")

    const uiDir = path.join(tmp, DEFAULT_CONFIG.componentsUi)
    expect(fs.existsSync(path.join(uiDir, "a.tsx"))).toBe(false)
    expect(fs.existsSync(path.join(uiDir, "b.tsx"))).toBe(true)
  })
})
