'use client'

/** @jsxImportSource nativewind */
import { Button as ButtonComponent } from '@packages/components/ui/button'
import type { ButtonProps } from '@packages/components/ui/button'

/**
 * Client-side component registry for MDX
 * All React Native components should be registered here
 */
export const MDXComponentsRegistry = {
  Button: (props: ButtonProps) => <ButtonComponent {...props} />,
}
