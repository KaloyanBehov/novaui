import { describe, it, expect } from 'vitest'

import { findSimilarComponents, formatComponentNotFoundError } from '../utils/fuzzy.js'

describe('findSimilarComponents', () => {
  const availableComponents = [
    'button',
    'card',
    'dialog',
    'drawer',
    'dropdown-menu',
    'alert',
    'alert-dialog',
    'badge',
    'breadcrumb',
    'calendar',
  ]

  it('finds exact typo matches', () => {
    const result = findSimilarComponents('buton', availableComponents)
    expect(result).toContain('button')
  })

  it('finds similar names with single character difference', () => {
    const result = findSimilarComponents('crad', availableComponents)
    expect(result).toContain('card')
  })

  it('finds names starting with same letter', () => {
    const result = findSimilarComponents('but', availableComponents)
    expect(result[0]).toBe('button')
  })

  it('returns empty array for very different inputs', () => {
    const result = findSimilarComponents('xyz123', availableComponents)
    expect(result).toEqual([])
  })

  it('limits results to maxResults parameter', () => {
    const result = findSimilarComponents('a', availableComponents, 2)
    expect(result.length).toBeLessThanOrEqual(2)
  })

  it('sorts by similarity (closest match first)', () => {
    const result = findSimilarComponents('dilog', availableComponents)
    expect(result[0]).toBe('dialog')
  })

  it('finds close matches with reasonable threshold', () => {
    const result = findSimilarComponents('buton', availableComponents)
    // Should find button with 1 character difference
    expect(result).toContain('button')
  })

  it('handles case insensitivity', () => {
    const result = findSimilarComponents('BUTTON', availableComponents)
    expect(result).toContain('button')
  })

  it('handles whitespace in input', () => {
    const result = findSimilarComponents('  button  ', availableComponents)
    expect(result).toContain('button')
  })

  it('suggests exact matches and similar names', () => {
    const result = findSimilarComponents('alert', availableComponents)
    expect(result).toContain('alert')
    // May also include alert-dialog if distance is close enough
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns up to 5 results by default', () => {
    const result = findSimilarComponents('a', availableComponents)
    expect(result.length).toBeLessThanOrEqual(5)
  })

  it('prefers similar matches', () => {
    const result = findSimilarComponents('butn', availableComponents)
    // Should find button as closest match
    expect(result[0]).toBe('button')
  })

  it('handles component with multiple word separators', () => {
    const result = findSimilarComponents('alertdialog', availableComponents)
    expect(result).toContain('alert-dialog')
  })
})

describe('formatComponentNotFoundError', () => {
  const availableComponents = ['button', 'card', 'dialog', 'alert', 'badge']

  it('includes the component name in error message', () => {
    const error = formatComponentNotFoundError('buton', availableComponents)
    expect(error).toContain('buton')
    expect(error).toContain('not found in registry')
  })

  it('suggests similar component names', () => {
    const error = formatComponentNotFoundError('buton', availableComponents)
    expect(error).toContain('Did you mean one of these?')
    expect(error).toContain('button')
  })

  it('lists all available components', () => {
    const error = formatComponentNotFoundError('xyz', availableComponents)
    expect(error).toContain('Available components:')
    expect(error).toContain('button')
    expect(error).toContain('card')
    expect(error).toContain('dialog')
  })

  it('formats available components in columns', () => {
    const manyComponents = Array.from({ length: 20 }, (_, i) => `component-${i}`)
    const error = formatComponentNotFoundError('xyz', manyComponents)
    
    // Should have multiple lines
    const lines = error.split('\n')
    expect(lines.length).toBeGreaterThan(5)
  })

  it('does not suggest anything for very different names', () => {
    const error = formatComponentNotFoundError('xyz123abc', availableComponents)
    expect(error).not.toContain('Did you mean')
    expect(error).toContain('Available components:')
  })

  it('handles empty component list gracefully', () => {
    const error = formatComponentNotFoundError('button', [])
    expect(error).toContain('not found in registry')
    expect(error).toContain('Available components:')
  })

  it('suggests multiple matches when applicable', () => {
    const components = ['alert', 'alert-dialog', 'alert-box']
    const error = formatComponentNotFoundError('aler', components)
    expect(error).toContain('alert')
    expect(error).toContain('Did you mean one of these?')
  })

  it('includes formatting with bullet points for suggestions', () => {
    const error = formatComponentNotFoundError('buton', availableComponents)
    expect(error).toContain('•')
  })

  it('handles long component names', () => {
    const components = ['very-long-component-name-that-exceeds-twenty-chars']
    const error = formatComponentNotFoundError('verylong', components)
    expect(error).toContain('very-long-component-name-that-exceeds-twenty-chars')
  })
})
