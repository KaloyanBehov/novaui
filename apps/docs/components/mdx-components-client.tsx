'use client'

/** @jsxImportSource nativewind */
import { Button as ButtonComponent } from '@packages/components/ui/button'
import type { ButtonProps } from '@packages/components/ui/button'

/**
 * Client-side Button component for MDX
 * This is only loaded on the client side to avoid server-side parsing issues
 */
export function Button(props: ButtonProps) {
  return <ButtonComponent {...props} />
}
