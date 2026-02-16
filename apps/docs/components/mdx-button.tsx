'use client'

/** @jsxImportSource nativewind */
import { Button as ButtonComponent } from '@packages/components/ui/button'
import type { ButtonProps } from '@packages/components/ui/button'

/**
 * Client component wrapper for Button to use in MDX files
 * This ensures Button can use React hooks like useState
 */
export function Button(props: ButtonProps) {
  return <ButtonComponent {...props} />
}
