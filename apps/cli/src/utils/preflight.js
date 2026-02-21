import fs from 'node:fs'
import path from 'node:path'
import pc from 'picocolors'

/**
 * Pre-flight checks to ensure the project environment is ready for NovaUI
 */

export function checkPackageJson(cwd) {
  const pkgPath = path.join(cwd, 'package.json')
  if (!fs.existsSync(pkgPath)) {
    throw new Error('package.json not found. Please run this command in a valid Node.js project.')
  }
  
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    return pkg
  } catch (error) {
    throw new Error('package.json is invalid or cannot be parsed.')
  }
}

export function checkReactNativeProject(pkg) {
  const deps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  }
  
  if (!deps['react-native'] && !deps['expo']) {
    console.log('')
    console.log(pc.yellow('  ⚠  Warning: react-native or expo not found in dependencies.'))
    console.log(pc.dim('     NovaUI is designed for React Native projects.'))
    console.log('')
  }
}

export function checkBabelConfig(cwd) {
  const babelPaths = [
    path.join(cwd, 'babel.config.js'),
    path.join(cwd, 'babel.config.json'),
    path.join(cwd, '.babelrc'),
    path.join(cwd, '.babelrc.js'),
  ]
  
  for (const babelPath of babelPaths) {
    if (fs.existsSync(babelPath)) {
      return babelPath
    }
  }
  
  return null
}

export function checkNativeWindInBabel(cwd) {
  const babelPath = checkBabelConfig(cwd)
  
  if (!babelPath) {
    console.log('')
    console.log(pc.yellow('  ⚠  Warning: babel.config.js not found.'))
    console.log(pc.dim('     NativeWind requires Babel configuration.'))
    console.log('')
    return false
  }
  
  try {
    const content = fs.readFileSync(babelPath, 'utf-8')
    const hasNativeWind = content.includes('nativewind/babel') || content.includes('"nativewind/babel"')
    
    if (!hasNativeWind) {
      console.log('')
      console.log(pc.yellow('  ⚠  Warning: NativeWind not detected in Babel config.'))
      console.log(pc.dim('     Add "nativewind/babel" to your Babel plugins:'))
      console.log('')
      console.log(pc.cyan('     module.exports = {'))
      console.log(pc.cyan('       plugins: ["nativewind/babel"],'))
      console.log(pc.cyan('     }'))
      console.log('')
      console.log(pc.dim('     See: https://www.nativewind.dev/docs/getting-started/installation'))
      console.log('')
      return false
    }
    
    return true
  } catch (error) {
    console.log('')
    console.log(pc.yellow('  ⚠  Warning: Could not read babel.config.js'))
    console.log('')
    return false
  }
}

export function checkReactNativeVersion(pkg) {
  const deps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  }
  
  const rnVersion = deps['react-native']
  if (rnVersion) {
    const versionMatch = rnVersion.match(/(\d+)\.(\d+)/)
    if (versionMatch) {
      const [, major, minor] = versionMatch
      const majorNum = parseInt(major, 10)
      const minorNum = parseInt(minor, 10)
      
      if (majorNum < 0 || (majorNum === 0 && minorNum < 72)) {
        console.log('')
        console.log(pc.yellow('  ⚠  Warning: React Native version is below 0.72'))
        console.log(pc.dim('     NovaUI requires React Native >= 0.72'))
        console.log('')
        return false
      }
    }
  }
  
  return true
}

export function checkNativeWindVersion(pkg) {
  const deps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  }
  
  const nwVersion = deps['nativewind']
  if (!nwVersion) {
    console.log('')
    console.log(pc.yellow('  ⚠  Warning: NativeWind not found in package.json'))
    console.log(pc.dim('     NovaUI requires NativeWind >= 4.0'))
    console.log(pc.dim('     Install: npm install nativewind'))
    console.log(pc.dim('     See: https://www.nativewind.dev/docs/getting-started/installation'))
    console.log('')
    return false
  }
  
  // Check if version 4 or higher
  const versionMatch = nwVersion.match(/(\d+)/)
  if (versionMatch) {
    const [, major] = versionMatch
    const majorNum = parseInt(major, 10)
    
    if (majorNum < 4) {
      console.log('')
      console.log(pc.yellow('  ⚠  Warning: NativeWind version is below 4.0'))
      console.log(pc.dim('     NovaUI requires NativeWind >= 4.0'))
      console.log(pc.dim('     Upgrade: npm install nativewind@latest'))
      console.log('')
      return false
    }
  }
  
  return true
}

/**
 * Run all pre-flight checks before init command
 */
export function runInitPreflightChecks(cwd) {
  const pkg = checkPackageJson(cwd)
  checkReactNativeProject(pkg)
  checkNativeWindVersion(pkg)
  checkNativeWindInBabel(cwd)
  checkReactNativeVersion(pkg)
}

/**
 * Run minimal pre-flight checks before add command
 */
export function runAddPreflightChecks(cwd) {
  const pkg = checkPackageJson(cwd)
  return pkg
}
