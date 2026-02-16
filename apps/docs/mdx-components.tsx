// @ts-nocheck
import defaultMdxComponents from 'fumadocs-ui/mdx'
import type { MDXComponents } from 'mdx/types'
import { ComponentPreview, ComponentDemo } from './components/component-preview'
import { Button } from './components/mdx-button-wrapper'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ComponentPreview,
    ComponentDemo,
    Button,
    ...components,
  }
}
