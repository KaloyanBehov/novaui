import fs from 'node:fs'
import pc from 'picocolors'

export function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

export function writeIfNotExists(filePath, content, label) {
  if (fs.existsSync(filePath)) {
    console.log(pc.dim(`   ℹ  ${label} already exists, skipping.`))
    return false
  }
  fs.writeFileSync(filePath, content, 'utf8')
  console.log(pc.green(`   ✓  Created ${label}`))
  return true
}
