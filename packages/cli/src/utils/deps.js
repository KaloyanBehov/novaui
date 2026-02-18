import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

export function detectPackageManager() {
  const userAgent = process.env.npm_config_user_agent || ''
  if (userAgent.startsWith('yarn')) return { command: 'yarn', baseArgs: ['add'] }
  if (userAgent.startsWith('pnpm')) return { command: 'pnpm', baseArgs: ['add'] }
  if (userAgent.startsWith('bun')) return { command: 'bun', baseArgs: ['add'] }
  return { command: 'npm', baseArgs: ['install'] }
}

export function installPackages(packages) {
  if (!Array.isArray(packages) || packages.length === 0) return
  const { command, baseArgs } = detectPackageManager()
  execFileSync(command, [...baseArgs, ...packages], { stdio: 'inherit' })
}

export function getInstallHint(packages) {
  const { command, baseArgs } = detectPackageManager()
  return `${command} ${[...baseArgs, ...packages].join(' ')}`
}

/** Returns which of the requested deps are not listed in package.json (dependencies or devDependencies). */
export function getMissingDeps(cwd, deps) {
  const pkgPath = path.join(cwd, 'package.json')
  if (!fs.existsSync(pkgPath)) {
    return [...deps]
  }
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
  const installed = new Set([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ])
  return deps.filter(d => !installed.has(d))
}
