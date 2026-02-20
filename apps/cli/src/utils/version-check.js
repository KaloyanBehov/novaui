import pc from 'picocolors'
import { getCliVersion } from './version.js'
import { fetchWithTimeout } from './fetch.js'

const NPM_REGISTRY_URL = 'https://registry.npmjs.org/novaui-cli/latest'
const CHECK_INTERVAL_MS = 24 * 60 * 60 * 1000 // 24 hours
const CACHE_FILE = '.novaui-version-check'

/**
 * Compare two semantic versions
 * Returns: 1 if v1 > v2, -1 if v1 < v2, 0 if equal
 */
function compareVersions(v1, v2) {
  const parts1 = v1.split('.').map(Number)
  const parts2 = v2.split('.').map(Number)
  
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const part1 = parts1[i] || 0
    const part2 = parts2[i] || 0
    
    if (part1 > part2) return 1
    if (part1 < part2) return -1
  }
  
  return 0
}

/**
 * Fetch the latest version from npm registry
 */
async function getLatestVersion() {
  try {
    const response = await fetchWithTimeout(NPM_REGISTRY_URL)
    if (!response.ok) return null
    
    const data = await response.json()
    return data.version || null
  } catch {
    return null
  }
}

/**
 * Check if we should run the version check based on cache
 */
function shouldCheckVersion(cwd) {
  const fs = require('node:fs')
  const path = require('node:path')
  const os = require('node:os')
  
  const cacheDir = path.join(os.homedir(), '.novaui')
  const cachePath = path.join(cacheDir, CACHE_FILE)
  
  if (!fs.existsSync(cachePath)) {
    return true
  }
  
  try {
    const cache = JSON.parse(fs.readFileSync(cachePath, 'utf-8'))
    const lastCheck = new Date(cache.lastCheck).getTime()
    const now = Date.now()
    
    return (now - lastCheck) > CHECK_INTERVAL_MS
  } catch {
    return true
  }
}

/**
 * Update the version check cache
 */
function updateCache(latestVersion) {
  const fs = require('node:fs')
  const path = require('node:path')
  const os = require('node:os')
  
  const cacheDir = path.join(os.homedir(), '.novaui')
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true })
  }
  
  const cachePath = path.join(cacheDir, CACHE_FILE)
  const cache = {
    lastCheck: new Date().toISOString(),
    latestVersion,
  }
  
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf-8')
}

/**
 * Check for CLI updates and warn user if outdated
 * Runs once per day to avoid slowing down commands
 */
export async function checkForUpdates() {
  const currentVersion = getCliVersion()
  
  if (currentVersion === 'unknown') {
    return
  }
  
  // Only check once per day
  const cwd = process.cwd()
  if (!shouldCheckVersion(cwd)) {
    return
  }
  
  const latestVersion = await getLatestVersion()
  
  if (!latestVersion) {
    return
  }
  
  updateCache(latestVersion)
  
  if (compareVersions(latestVersion, currentVersion) > 0) {
    console.log('')
    console.log(pc.yellow(`  ⚠  A new version of novaui-cli is available!`))
    console.log(pc.dim(`     Current: ${currentVersion}`))
    console.log(pc.dim(`     Latest:  ${latestVersion}`))
    console.log('')
    console.log(pc.cyan(`     Update with: npm install -g novaui-cli@latest`))
    console.log('')
  }
}

/**
 * Get version info for error reporting
 */
export function getVersionInfo() {
  const currentVersion = getCliVersion()
  return {
    cli: currentVersion,
    node: process.version,
  }
}
