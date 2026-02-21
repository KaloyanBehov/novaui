import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'

import {
  checkPackageJson,
  checkReactNativeProject,
  checkBabelConfig,
  checkNativeWindInBabel,
  checkReactNativeVersion,
  checkNativeWindVersion,
  runInitPreflightChecks,
  runAddPreflightChecks,
} from '../utils/preflight.js'

// Test helpers
function makeTmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'novaui-preflight-test-'))
}

function cleanTmpDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true })
}

describe('checkPackageJson', () => {
  let tmp

  beforeEach(() => {
    tmp = makeTmpDir()
  })

  afterEach(() => {
    cleanTmpDir(tmp)
  })

  it('throws when package.json does not exist', () => {
    expect(() => checkPackageJson(tmp)).toThrow(/package.json not found/)
  })

  it('returns parsed package.json when valid', () => {
    const pkg = { name: 'test-app', version: '1.0.0' }
    fs.writeFileSync(path.join(tmp, 'package.json'), JSON.stringify(pkg))

    const result = checkPackageJson(tmp)
    expect(result).toEqual(pkg)
  })

  it('throws when package.json is invalid JSON', () => {
    fs.writeFileSync(path.join(tmp, 'package.json'), 'not valid json')

    expect(() => checkPackageJson(tmp)).toThrow(/invalid or cannot be parsed/)
  })
})

describe('checkReactNativeProject', () => {
  let consoleLogSpy

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
  })

  it('warns when react-native is not in dependencies', () => {
    const pkg = { dependencies: {} }
    checkReactNativeProject(pkg)

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('react-native or expo not found')
    )
  })

  it('does not warn when react-native is present', () => {
    const pkg = { dependencies: { 'react-native': '0.80.0' } }
    checkReactNativeProject(pkg)

    expect(consoleLogSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('react-native or expo not found')
    )
  })

  it('does not warn when expo is present', () => {
    const pkg = { dependencies: { expo: '~54.0.0' } }
    checkReactNativeProject(pkg)

    expect(consoleLogSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('react-native or expo not found')
    )
  })

  it('checks devDependencies too', () => {
    const pkg = { devDependencies: { 'react-native': '0.80.0' } }
    checkReactNativeProject(pkg)

    expect(consoleLogSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('react-native or expo not found')
    )
  })
})

describe('checkBabelConfig', () => {
  let tmp

  beforeEach(() => {
    tmp = makeTmpDir()
  })

  afterEach(() => {
    cleanTmpDir(tmp)
  })

  it('returns path to babel.config.js when it exists', () => {
    const babelPath = path.join(tmp, 'babel.config.js')
    fs.writeFileSync(babelPath, 'module.exports = {}')

    const result = checkBabelConfig(tmp)
    expect(result).toBe(babelPath)
  })

  it('returns path to .babelrc when it exists', () => {
    const babelPath = path.join(tmp, '.babelrc')
    fs.writeFileSync(babelPath, '{}')

    const result = checkBabelConfig(tmp)
    expect(result).toBe(babelPath)
  })

  it('returns null when no babel config exists', () => {
    const result = checkBabelConfig(tmp)
    expect(result).toBeNull()
  })

  it('prefers babel.config.js over .babelrc', () => {
    const jsPath = path.join(tmp, 'babel.config.js')
    const rcPath = path.join(tmp, '.babelrc')
    fs.writeFileSync(jsPath, 'module.exports = {}')
    fs.writeFileSync(rcPath, '{}')

    const result = checkBabelConfig(tmp)
    expect(result).toBe(jsPath)
  })
})

describe('checkNativeWindInBabel', () => {
  let tmp
  let consoleLogSpy

  beforeEach(() => {
    tmp = makeTmpDir()
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    cleanTmpDir(tmp)
    consoleLogSpy.mockRestore()
  })

  it('returns false and warns when babel config not found', () => {
    const result = checkNativeWindInBabel(tmp)

    expect(result).toBe(false)
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('babel.config.js not found')
    )
  })

  it('returns true when nativewind/babel is found', () => {
    const babelPath = path.join(tmp, 'babel.config.js')
    fs.writeFileSync(
      babelPath,
      'module.exports = { plugins: ["nativewind/babel"] }'
    )

    const result = checkNativeWindInBabel(tmp)
    expect(result).toBe(true)
  })

  it('returns false and warns when nativewind/babel is not found', () => {
    const babelPath = path.join(tmp, 'babel.config.js')
    fs.writeFileSync(babelPath, 'module.exports = { plugins: [] }')

    const result = checkNativeWindInBabel(tmp)

    expect(result).toBe(false)
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('NativeWind not detected in Babel config')
    )
  })

  it('handles babel config read errors gracefully', () => {
    const babelPath = path.join(tmp, 'babel.config.js')
    fs.writeFileSync(babelPath, 'module.exports = {}')
    fs.chmodSync(babelPath, 0o000) // Make unreadable

    const result = checkNativeWindInBabel(tmp)

    expect(result).toBe(false)

    // Cleanup
    fs.chmodSync(babelPath, 0o644)
  })
})

describe('checkReactNativeVersion', () => {
  let consoleLogSpy

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
  })

  it('returns true for React Native 0.72+', () => {
    const pkg = { dependencies: { 'react-native': '0.72.0' } }
    const result = checkReactNativeVersion(pkg)

    expect(result).toBe(true)
    expect(consoleLogSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('React Native version is below 0.72')
    )
  })

  it('returns true for React Native 0.80+', () => {
    const pkg = { dependencies: { 'react-native': '0.80.5' } }
    const result = checkReactNativeVersion(pkg)

    expect(result).toBe(true)
  })

  it('warns for React Native < 0.72', () => {
    const pkg = { dependencies: { 'react-native': '0.71.0' } }
    const result = checkReactNativeVersion(pkg)

    expect(result).toBe(false)
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('React Native version is below 0.72')
    )
  })

  it('returns true when react-native not in dependencies', () => {
    const pkg = { dependencies: {} }
    const result = checkReactNativeVersion(pkg)

    expect(result).toBe(true)
  })

  it('handles version with caret (^)', () => {
    const pkg = { dependencies: { 'react-native': '^0.72.0' } }
    const result = checkReactNativeVersion(pkg)

    expect(result).toBe(true)
  })

  it('handles version with tilde (~)', () => {
    const pkg = { dependencies: { 'react-native': '~0.80.0' } }
    const result = checkReactNativeVersion(pkg)

    expect(result).toBe(true)
  })
})

describe('checkNativeWindVersion', () => {
  let consoleLogSpy

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
  })

  it('returns false and warns when nativewind not found', () => {
    const pkg = { dependencies: {} }
    const result = checkNativeWindVersion(pkg)

    expect(result).toBe(false)
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('NativeWind not found in package.json')
    )
  })

  it('returns true for NativeWind 4.x', () => {
    const pkg = { dependencies: { nativewind: '^4.0.0' } }
    const result = checkNativeWindVersion(pkg)

    expect(result).toBe(true)
  })

  it('returns true for NativeWind 5.x', () => {
    const pkg = { dependencies: { nativewind: '^5.0.0' } }
    const result = checkNativeWindVersion(pkg)

    expect(result).toBe(true)
  })

  it('warns for NativeWind < 4', () => {
    const pkg = { dependencies: { nativewind: '^3.0.0' } }
    const result = checkNativeWindVersion(pkg)

    expect(result).toBe(false)
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('NativeWind version is below 4.0')
    )
  })

  it('checks devDependencies', () => {
    const pkg = { devDependencies: { nativewind: '^4.0.0' } }
    const result = checkNativeWindVersion(pkg)

    expect(result).toBe(true)
  })
})

describe('runInitPreflightChecks', () => {
  let tmp
  let consoleLogSpy

  beforeEach(() => {
    tmp = makeTmpDir()
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    cleanTmpDir(tmp)
    consoleLogSpy.mockRestore()
  })

  it('runs all checks successfully for valid setup', () => {
    fs.writeFileSync(
      path.join(tmp, 'package.json'),
      JSON.stringify({
        dependencies: {
          'react-native': '0.80.0',
          nativewind: '^4.0.0',
        },
      })
    )
    fs.writeFileSync(
      path.join(tmp, 'babel.config.js'),
      'module.exports = { plugins: ["nativewind/babel"] }'
    )

    expect(() => runInitPreflightChecks(tmp)).not.toThrow()
  })

  it('throws when package.json is missing', () => {
    expect(() => runInitPreflightChecks(tmp)).toThrow(/package.json not found/)
  })
})

describe('runAddPreflightChecks', () => {
  let tmp

  beforeEach(() => {
    tmp = makeTmpDir()
  })

  afterEach(() => {
    cleanTmpDir(tmp)
  })

  it('returns package json on success', () => {
    const pkg = { name: 'test', version: '1.0.0' }
    fs.writeFileSync(path.join(tmp, 'package.json'), JSON.stringify(pkg))

    const result = runAddPreflightChecks(tmp)
    expect(result).toEqual(pkg)
  })

  it('throws when package.json is missing', () => {
    expect(() => runAddPreflightChecks(tmp)).toThrow(/package.json not found/)
  })
})
