import { getThemeCssContent } from './src/themes/index.js';

console.log('Testing themes...\n');

try {
  // Test default theme (should use bundled)
  console.log('1. Default theme (bundled):');
  const defaultTheme = await getThemeCssContent('default');
  console.log('   Length:', defaultTheme.length, 'chars');
  console.log('   Contains @tailwind:', defaultTheme.includes('@tailwind base'));
  
  // Test ocean theme (fetched from GitHub)
  console.log('\n2. Ocean theme (from GitHub):');
  process.env.NOVAUI_BRANCH = 'dev';
  const oceanTheme = await getThemeCssContent('ocean');
  console.log('   Length:', oceanTheme.length, 'chars');
  console.log('   Contains @tailwind:', oceanTheme.includes('@tailwind base'));
  
  console.log('\n✓ All themes loaded successfully!');
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
