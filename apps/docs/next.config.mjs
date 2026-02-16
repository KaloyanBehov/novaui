import { createMDX } from 'fumadocs-mdx/next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Exclude react-native and components from server component bundling
  // This prevents Next.js from parsing these packages on the server side
  serverComponentsExternalPackages: [
    'react-native',
    'novaui-components',
    '@packages/components',
  ],
  transpilePackages: [
    'lucide-react',
    'nativewind',
    'react-native-css-interop',
    'react-native-web',
  ],
  // Next.js 16 uses Turbopack in dev by default. Mirror aliases here so
  // `react-native` never resolves to its Flow-typed entrypoint.
  turbopack: {
    resolveAlias: {
      'react-native': 'react-native-web',
      'react-native/Libraries/Image/AssetRegistry':
        'react-native-web/dist/exports/Image/AssetRegistry',
      '@packages/components': path.resolve(__dirname, '../../packages/components/src'),
      'novaui-components': path.resolve(__dirname, '../../packages/components/src'),
    },
    resolveExtensions: ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  webpack: (config, { isServer }) => {
    // Configure webpack to handle react-native-web and monorepo paths
    // IMPORTANT: Apply alias on BOTH server and client to prevent parsing react-native source
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
      'react-native/Libraries/Image/AssetRegistry':
        'react-native-web/dist/exports/Image/AssetRegistry',
      '@packages/components': path.resolve(__dirname, '../../packages/components/src'),
      'novaui-components': path.resolve(__dirname, '../../packages/components/src'),
    }

    // Add support for .web.js extensions
    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ]

    // Don't externalize react-native on server - let the alias handle it
    // This ensures react-native-web is used everywhere

    return config
  },
  async rewrites() {
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/llms.mdx/docs/:path*',
      },
    ]
  },
}

export default withMDX(config)
