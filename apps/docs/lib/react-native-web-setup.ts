/**
 * React Native Web Setup
 * 
 * This file sets up react-native-web to work properly in the Next.js environment.
 * Import this file in your app layout or root component.
 */

if (typeof window !== 'undefined') {
  // Set up React Native Web environment
  // This ensures proper polyfills and compatibility
  require('react-native-web/dist/exports/StyleSheet/validate').default = () => {}
}

// Export a setup function that can be called if needed
export function setupReactNativeWeb() {
  if (typeof window !== 'undefined') {
    // Additional setup can go here if needed
  }
}
