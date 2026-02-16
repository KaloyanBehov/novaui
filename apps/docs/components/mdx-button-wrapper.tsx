'use client'

import dynamic from 'next/dynamic'

/**
 * Wrapper component that dynamically loads Button only on client side
 * This prevents Next.js from parsing react-native on the server
 */
export const Button = dynamic(
  () => import('./mdx-button').then(mod => ({ default: mod.Button })),
  {
    ssr: false,
    loading: () => null,
  }
)
