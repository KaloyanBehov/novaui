export const BASE_URL = 'https://raw.githubusercontent.com/KaloyanBehov/novaui/main'

export const CONFIG_FILENAME = 'components.json'

export const FETCH_TIMEOUT_MS = 15000

export const DEFAULT_CONFIG = {
  globalCss: 'global.css',
  componentsUi: 'components/ui',
  lib: 'lib',
  theme: 'default',
}

export const UTILS_CONTENT = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
