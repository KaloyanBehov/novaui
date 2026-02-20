/**
 * Fuzzy matching utilities for better error messages
 * Helps users find components when they mistype names
 */

/**
 * Calculate Levenshtein distance between two strings
 * Used for finding similar component names
 */
function levenshteinDistance(str1, str2) {
  const len1 = str1.length
  const len2 = str2.length
  const matrix = []

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      )
    }
  }

  return matrix[len1][len2]
}

/**
 * Find similar component names based on typo distance
 * Returns up to maxResults similar names, sorted by similarity
 */
export function findSimilarComponents(input, availableComponents, maxResults = 5) {
  const normalizedInput = input.toLowerCase().trim()
  
  const scored = availableComponents
    .map(name => ({
      name,
      distance: levenshteinDistance(normalizedInput, name.toLowerCase()),
      startsWithSame: name.toLowerCase().startsWith(normalizedInput[0]),
    }))
    .filter(item => item.distance <= 4) // Only suggest if reasonably close
    .sort((a, b) => {
      if (a.distance !== b.distance) {
        return a.distance - b.distance
      }
      if (a.startsWithSame !== b.startsWithSame) {
        return a.startsWithSame ? -1 : 1
      }
      return a.name.localeCompare(b.name)
    })
    .slice(0, maxResults)
    .map(item => item.name)
  
  return scored
}

/**
 * Format a helpful error message for missing components
 */
export function formatComponentNotFoundError(componentName, availableComponents) {
  const similar = findSimilarComponents(componentName, availableComponents)
  
  let message = `Component "${componentName}" not found in registry.`
  
  if (similar.length > 0) {
    message += '\n\n  Did you mean one of these?'
    similar.forEach(name => {
      message += `\n    • ${name}`
    })
  }
  
  message += '\n\n  Available components:'
  
  const sorted = [...availableComponents].sort()
  const columns = 3
  const itemsPerColumn = Math.ceil(sorted.length / columns)
  
  for (let i = 0; i < itemsPerColumn; i++) {
    let row = '    '
    for (let col = 0; col < columns; col++) {
      const idx = i + col * itemsPerColumn
      if (idx < sorted.length) {
        row += sorted[idx].padEnd(20)
      }
    }
    message += '\n' + row.trimEnd()
  }
  
  return message
}
