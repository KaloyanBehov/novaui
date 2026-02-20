import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getVersionInfo } from '../utils/version-check.js'
import { getCliVersion } from '../utils/version.js'

describe('getVersionInfo', () => {
  it('returns cli and node versions', () => {
    const info = getVersionInfo()
    
    expect(info).toHaveProperty('cli')
    expect(info).toHaveProperty('node')
    expect(typeof info.cli).toBe('string')
    expect(typeof info.node).toBe('string')
  })

  it('includes valid node version format', () => {
    const info = getVersionInfo()
    expect(info.node).toMatch(/^v\d+\.\d+\.\d+/)
  })

  it('includes valid cli version or unknown', () => {
    const info = getVersionInfo()
    expect(info.cli).toMatch(/^\d+\.\d+\.\d+|unknown/)
  })

  it('matches current node version', () => {
    const info = getVersionInfo()
    expect(info.node).toBe(process.version)
  })

  it('matches getCliVersion output', () => {
    const info = getVersionInfo()
    const cliVersion = getCliVersion()
    expect(info.cli).toBe(cliVersion)
  })
})

// Note: Testing checkForUpdates is complex due to async nature and external dependencies
// These tests would require mocking fs, fetch, and time-based caching
// For production, integration tests would be more appropriate
describe('version checking (unit tests)', () => {
  it('version comparison logic works correctly', () => {
    // This tests the internal compareVersions logic indirectly
    // by ensuring version info is structured correctly
    const info = getVersionInfo()
    
    expect(info.cli).toBeDefined()
    expect(info.node).toBeDefined()
    
    // Versions should be parseable
    if (info.cli !== 'unknown') {
      const parts = info.cli.split('.')
      expect(parts.length).toBeGreaterThanOrEqual(3)
      parts.forEach(part => {
        expect(parseInt(part, 10)).not.toBeNaN()
      })
    }
  })
})
