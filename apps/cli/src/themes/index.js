import { DEFAULT_THEME_CSS } from './default.js'
import { OCEAN_THEME_CSS } from './ocean.js'
import { SUNSET_THEME_CSS } from './sunset.js'

export const THEMES = {
  default: DEFAULT_THEME_CSS,
  ocean: OCEAN_THEME_CSS,
  sunset: SUNSET_THEME_CSS,
}

export const THEME_KEYS = Object.keys(THEMES)

export function getThemeCssContent(themeName) {
  if (typeof themeName !== 'string') return THEMES.default
  const normalized = themeName.trim().toLowerCase()
  return THEMES[normalized] || THEMES.default
}
