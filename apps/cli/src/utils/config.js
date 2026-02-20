import fs from 'node:fs'
import path from 'node:path'
import { CONFIG_FILENAME, DEFAULT_CONFIG } from '../constants.js'

/** Load components.json from cwd; returns null if missing or invalid. */
export function loadConfig(cwd) {
  const configPath = path.join(cwd, CONFIG_FILENAME)
  if (!fs.existsSync(configPath)) return null
  try {
    const raw = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null
    return { ...DEFAULT_CONFIG, ...raw }
  } catch {
    return null
  }
}

/** Write components.json to cwd. */
export function writeConfig(cwd, config) {
  const configPath = path.join(cwd, CONFIG_FILENAME)
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8')
}
