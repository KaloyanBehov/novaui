// @ts-nocheck
import defaultMdxComponents from 'fumadocs-ui/mdx'
import type { MDXComponents } from 'mdx/types'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import { ComponentPreview } from '@/components/ui/component-preview'
import { AccordionPreview } from '@/components/previews/accordion-preview'
import { AlertDialogPreview } from '@/components/previews/alert-dialog-preview'
import { DrawerPreview } from '@/components/previews/drawer-preview'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Tab,
    Tabs,
    ComponentPreview,
    AccordionPreview,
    AlertDialogPreview,
    DrawerPreview,
    ...components,
  }
}
