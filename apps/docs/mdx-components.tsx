// @ts-nocheck
import defaultMdxComponents from 'fumadocs-ui/mdx'
import type { MDXComponents } from 'mdx/types'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import { ComponentPreview } from '@/components/ui/component-preview'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Tab,
    Tabs,
    ComponentPreview,
    ...components,
  }
}
