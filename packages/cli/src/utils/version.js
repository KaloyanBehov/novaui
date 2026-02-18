import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CLI_PACKAGE_JSON_PATH = path.resolve(__dirname, '../../package.json')

export function getCliVersion() {
  try {
    const pkg = JSON.parse(fs.readFileSync(CLI_PACKAGE_JSON_PATH, 'utf8'))
    return pkg.version || 'unknown'
  } catch {
    return 'unknown'
  }
}
