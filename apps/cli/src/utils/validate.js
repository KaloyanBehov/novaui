export function assertValidComponentConfig(componentName, componentConfig) {
  if (!componentConfig || typeof componentConfig !== 'object') {
    throw new Error(`Registry entry for "${componentName}" is invalid.`)
  }

  const { files, dependencies } = componentConfig
  if (!Array.isArray(files) || files.some(file => typeof file !== 'string' || file.trim() === '')) {
    throw new Error(`Registry entry for "${componentName}" must include a valid "files" array.`)
  }

  if (
    dependencies !== undefined &&
    (!Array.isArray(dependencies) || dependencies.some(dep => typeof dep !== 'string' || dep.trim() === ''))
  ) {
    throw new Error(`Registry entry for "${componentName}" has an invalid "dependencies" array.`)
  }
}
