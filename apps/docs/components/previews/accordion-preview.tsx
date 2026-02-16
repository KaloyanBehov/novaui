'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

interface AccordionItem {
  trigger: string
  content: string
}

interface AccordionPreviewProps {
  items: AccordionItem[]
  type?: 'single' | 'multiple'
  collapsible?: boolean
  defaultValue?: string | string[]
  className?: string
}

export function AccordionPreview({
  items,
  type = 'single',
  collapsible = true,
  defaultValue,
  className,
}: AccordionPreviewProps) {
  const [value, setValue] = useState<string | string[]>(() => {
    if (defaultValue) return defaultValue
    return type === 'multiple' ? [] : ''
  })

  const handleToggle = (itemValue: string) => {
    if (type === 'single') {
      setValue(value === itemValue && collapsible ? '' : itemValue)
    } else {
      const current = Array.isArray(value) ? value : []
      setValue(
        current.includes(itemValue)
          ? current.filter((v) => v !== itemValue)
          : [...current, itemValue]
      )
    }
  }

  const isExpanded = (itemValue: string) =>
    Array.isArray(value) ? value.includes(itemValue) : value === itemValue

  return (
    <div className={cn('w-full max-w-md flex flex-col gap-2', className)}>
      {items.map((item, i) => {
        const itemId = `item-${i}`
        const expanded = isExpanded(itemId)

        return (
          <div key={itemId} className="border-b border-border">
            <button
              onClick={() => handleToggle(itemId)}
              className="flex w-full flex-row items-center justify-between py-4 text-left transition-all"
            >
              <span className="text-sm font-medium text-foreground">
                {item.trigger}
              </span>
              <ChevronDown
                size={18}
                className={cn(
                  'text-muted-foreground shrink-0 transition-transform duration-200',
                  expanded && 'rotate-180'
                )}
              />
            </button>
            <div
              className={cn(
                'grid transition-all duration-200 ease-in-out',
                expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-4 pt-0">
                  <span className="text-sm text-muted-foreground">
                    {item.content}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
