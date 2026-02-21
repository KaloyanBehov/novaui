import { THEMES_BASE_URL, DEFAULT_THEME_CSS } from '../constants.js'
import { fetchWithTimeout } from '../utils/fetch.js'

// Available theme names (fetched from GitHub)
export const THEME_KEYS = ['default', 'ocean', 'sunset']

/**
 * Fetch theme CSS content from GitHub.
 * Falls back to bundled default theme if fetch fails or theme is 'default'.
 * 
 * @param {string} themeName - The theme name (default, ocean, sunset)
 * @returns {Promise<string>} The theme CSS content
 */
export async function getThemeCssContent(themeName) {
  const normalized = (typeof themeName === 'string' ? themeName : 'default').trim().toLowerCase()
  const theme = THEME_KEYS.includes(normalized) ? normalized : 'default'
  
  // Use bundled default theme (no network call needed)
  if (theme === 'default') {
    return DEFAULT_THEME_CSS
  }
  
  // Fetch other themes from GitHub
  const themeUrl = `${THEMES_BASE_URL}/${theme}.js`
  
  try {
    const response = await fetchWithTimeout(themeUrl)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch theme: ${response.status}`)
    }
    
    const content = await response.text()
    
    // Extract the CSS content from the export statement
    // Example: export const OCEAN_THEME_CSS = `...`
    const match = content.match(/export const \w+_THEME_CSS = `([^`]*)`/s)
    if (match && match[1]) {
      return match[1]
    }
    
    throw new Error('Invalid theme format')
  } catch (error) {
    // Fallback to default theme on error
    console.warn(`Warning: Could not fetch "${theme}" theme, using default. ${error.message}`)
    return DEFAULT_THEME_CSS
  }
}
