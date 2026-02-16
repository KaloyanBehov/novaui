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
  detectPackageManager,
  ensureDir,
  writeIfNotExists,
  getMissingDeps,
  loadConfig,
  writeConfig,
  assertValidComponentConfig,
  formatError,
} from "../bin.js"

// ─── Test helpers ───────────────────────────────────────────────────────────

function makeTmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "novaui-test-"))
}

function cleanTmpDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true })
}

// ─── DEFAULT_CONFIG ─────────────────────────────────────────────────────────

describe("DEFAULT_CONFIG", () => {
  it("has the expected default paths", () => {
    expect(DEFAULT_CONFIG).toEqual({
      globalCss: "src/global.css",
      componentsUi: "src/components/ui",
      lib: "src/lib",
    })
  })
})

// ─── detectPackageManager ───────────────────────────────────────────────────

describe("detectPackageManager", () => {
  const originalAgent = process.env.npm_config_user_agent

  afterEach(() => {
    if (originalAgent !== undefined) {
      process.env.npm_config_user_agent = originalAgent
    } else {
      delete process.env.npm_config_user_agent
    }
  })

  it("returns npm by default", () => {
    process.env.npm_config_user_agent = ""
    const result = detectPackageManager()
    expect(result.command).toBe("npm")
    expect(result.baseArgs).toEqual(["install"])
  })

  it("detects yarn", () => {
    process.env.npm_config_user_agent = "yarn/1.22.0 npm/? node/v18.0.0"
    const result = detectPackageManager()
    expect(result.command).toBe("yarn")
    expect(result.baseArgs).toEqual(["add"])
  })

  it("detects pnpm", () => {
    process.env.npm_config_user_agent = "pnpm/8.0.0 npm/? node/v18.0.0"
    const result = detectPackageManager()
    expect(result.command).toBe("pnpm")
    expect(result.baseArgs).toEqual(["add"])
  })

  it("detects bun", () => {
    process.env.npm_config_user_agent = "bun/1.0.0"
    const result = detectPackageManager()
    expect(result.command).toBe("bun")
    expect(result.baseArgs).toEqual(["add"])
  })
})

// ─── ensureDir ──────────────────────────────────────────────────────────────

describe("ensureDir", () => {
  let tmp

  beforeEach(() => {
    tmp = makeTmpDir()
  })

  afterEach(() => {
    cleanTmpDir(tmp)
  })

  it("creates a directory that does not exist", () => {
    const dir = path.join(tmp, "a", "b", "c")
    expect(fs.existsSync(dir)).toBe(false)
    ensureDir(dir)
    expect(fs.existsSync(dir)).toBe(true)
    expect(fs.statSync(dir).isDirectory()).toBe(true)
  })

  it("does nothing if directory already exists", () => {
    const dir = path.join(tmp, "existing")
    fs.mkdirSync(dir)
    ensureDir(dir)
    expect(fs.existsSync(dir)).toBe(true)
  })
})

// ─── writeIfNotExists ───────────────────────────────────────────────────────

describe("writeIfNotExists", () => {
  let tmp

  beforeEach(() => {
    tmp = makeTmpDir()
  })

  afterEach(() => {
    cleanTmpDir(tmp)
  })

  it("creates a file when it does not exist", () => {
    const filePath = path.join(tmp, "test.txt")
    const result = writeIfNotExists(filePath, "hello", "test.txt")
    expect(result).toBe(true)
    expect(fs.readFileSync(filePath, "utf8")).toBe("hello")
  })

  it("does not overwrite an existing file", () => {
    const filePath = path.join(tmp, "test.txt")
    fs.writeFileSync(filePath, "original")
    const result = writeIfNotExists(filePath, "new content", "test.txt")
    expect(result).toBe(false)
    expect(fs.readFileSync(filePath, "utf8")).toBe("original")
  })
})

// ─── getMissingDeps ─────────────────────────────────────────────────────────

describe("getMissingDeps", () => {
  let tmp

  beforeEach(() => {
    tmp = makeTmpDir()
  })

  afterEach(() => {
    cleanTmpDir(tmp)
  })

  it("returns all deps when no package.json exists", () => {
    const result = getMissingDeps(tmp, ["react", "react-native"])
    expect(result).toEqual(["react", "react-native"])
  })

  it("returns only missing deps", () => {
    const pkgJson = {
      dependencies: { react: "^18.0.0", clsx: "^2.0.0" },
      devDependencies: { typescript: "^5.0.0" },
    }
    fs.writeFileSync(path.join(tmp, "package.json"), JSON.stringify(pkgJson))

    const result = getMissingDeps(tmp, ["react", "nativewind", "typescript", "tailwindcss"])
    expect(result).toEqual(["nativewind", "tailwindcss"])
  })

  it("returns empty array when all deps are present", () => {
    const pkgJson = {
      dependencies: { react: "^18.0.0", nativewind: "^4.0.0" },
    }
    fs.writeFileSync(path.join(tmp, "package.json"), JSON.stringify(pkgJson))

    const result = getMissingDeps(tmp, ["react", "nativewind"])
    expect(result).toEqual([])
  })

  it("checks devDependencies too", () => {
    const pkgJson = {
      devDependencies: { vitest: "^1.0.0" },
    }
    fs.writeFileSync(path.join(tmp, "package.json"), JSON.stringify(pkgJson))

    const result = getMissingDeps(tmp, ["vitest"])
    expect(result).toEqual([])
  })
})

// ─── loadConfig / writeConfig ───────────────────────────────────────────────

describe("loadConfig / writeConfig", () => {
  let tmp

  beforeEach(() => {
    tmp = makeTmpDir()
  })

  afterEach(() => {
    cleanTmpDir(tmp)
  })

  it("returns null when no config file exists", () => {
    expect(loadConfig(tmp)).toBeNull()
  })

  it("writes and reads config correctly", () => {
    const config = {
      globalCss: "app/global.css",
      componentsUi: "app/components/ui",
      lib: "app/lib",
    }
    writeConfig(tmp, config)

    const configPath = path.join(tmp, CONFIG_FILENAME)
    expect(fs.existsSync(configPath)).toBe(true)

    const loaded = loadConfig(tmp)
    expect(loaded).toEqual({ ...DEFAULT_CONFIG, ...config })
  })

  it("merges with DEFAULT_CONFIG on partial config", () => {
    const partial = { globalCss: "custom/global.css" }
    fs.writeFileSync(
      path.join(tmp, CONFIG_FILENAME),
      JSON.stringify(partial),
      "utf8"
    )

    const loaded = loadConfig(tmp)
    expect(loaded.globalCss).toBe("custom/global.css")
    expect(loaded.componentsUi).toBe(DEFAULT_CONFIG.componentsUi)
    expect(loaded.lib).toBe(DEFAULT_CONFIG.lib)
  })

  it("returns null for invalid JSON", () => {
    fs.writeFileSync(path.join(tmp, CONFIG_FILENAME), "not json!", "utf8")
    expect(loadConfig(tmp)).toBeNull()
  })
})

// ─── getTailwindConfigContent ───────────────────────────────────────────────

describe("getTailwindConfigContent", () => {
  it("generates valid tailwind config with default paths", () => {
    const content = getTailwindConfigContent(DEFAULT_CONFIG)
    expect(content).toContain("module.exports")
    expect(content).toContain('require("nativewind/preset")')
    expect(content).toContain("hsl(var(--primary))")
    expect(content).toContain("hsl(var(--background))")
    expect(content).toContain("var(--radius)")
    expect(content).toContain("./src/**/*.{js,jsx,ts,tsx}")
  })

  it("includes custom componentsUi path in content array", () => {
    const config = { ...DEFAULT_CONFIG, componentsUi: "app/ui" }
    const content = getTailwindConfigContent(config)
    expect(content).toContain("./app/ui/**/*.{js,jsx,ts,tsx}")
  })
})

// ─── assertValidComponentConfig ─────────────────────────────────────────────

describe("assertValidComponentConfig", () => {
  it("accepts a valid config with files", () => {
    expect(() =>
      assertValidComponentConfig("button", {
        files: ["src/components/ui/button.tsx"],
      })
    ).not.toThrow()
  })

  it("accepts a valid config with files and dependencies", () => {
    expect(() =>
      assertValidComponentConfig("button", {
        files: ["src/components/ui/button.tsx"],
        dependencies: ["class-variance-authority"],
      })
    ).not.toThrow()
  })

  it("throws for null config", () => {
    expect(() => assertValidComponentConfig("button", null)).toThrow(
      /invalid/i
    )
  })

  it("throws for missing files array", () => {
    expect(() =>
      assertValidComponentConfig("button", { dependencies: [] })
    ).toThrow(/files/i)
  })

  it("throws for empty string in files array", () => {
    expect(() =>
      assertValidComponentConfig("button", { files: ["valid.tsx", ""] })
    ).toThrow(/files/i)
  })

  it("throws for non-string in files array", () => {
    expect(() =>
      assertValidComponentConfig("button", { files: [123] })
    ).toThrow(/files/i)
  })

  it("throws for invalid dependencies", () => {
    expect(() =>
      assertValidComponentConfig("button", {
        files: ["button.tsx"],
        dependencies: [123],
      })
    ).toThrow(/dependencies/i)
  })

  it("throws for empty string in dependencies", () => {
    expect(() =>
      assertValidComponentConfig("button", {
        files: ["button.tsx"],
        dependencies: ["valid", ""],
      })
    ).toThrow(/dependencies/i)
  })
})

// ─── GLOBAL_CSS_CONTENT ─────────────────────────────────────────────────────

describe("GLOBAL_CSS_CONTENT", () => {
  it("contains tailwind directives", () => {
    expect(GLOBAL_CSS_CONTENT).toContain("@tailwind base")
    expect(GLOBAL_CSS_CONTENT).toContain("@tailwind components")
    expect(GLOBAL_CSS_CONTENT).toContain("@tailwind utilities")
  })

  it("contains light theme variables", () => {
    expect(GLOBAL_CSS_CONTENT).toContain(":root")
    expect(GLOBAL_CSS_CONTENT).toContain("--background:")
    expect(GLOBAL_CSS_CONTENT).toContain("--primary:")
    expect(GLOBAL_CSS_CONTENT).toContain("--radius:")
  })

  it("contains dark theme variables", () => {
    expect(GLOBAL_CSS_CONTENT).toContain(".dark")
  })
})

// ─── UTILS_CONTENT ──────────────────────────────────────────────────────────

describe("UTILS_CONTENT", () => {
  it("exports the cn function", () => {
    expect(UTILS_CONTENT).toContain("export function cn")
    expect(UTILS_CONTENT).toContain("twMerge")
    expect(UTILS_CONTENT).toContain("clsx")
  })
})

// ─── formatError ────────────────────────────────────────────────────────────

describe("formatError", () => {
  it("extracts message from Error objects", () => {
    expect(formatError(new Error("test error"))).toBe("test error")
  })

  it("converts non-Error values to string", () => {
    expect(formatError("string error")).toBe("string error")
    expect(formatError(42)).toBe("42")
    expect(formatError(null)).toBe("null")
  })
})
