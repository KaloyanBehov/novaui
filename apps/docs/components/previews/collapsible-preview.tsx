'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface CollapsiblePreviewProps {
  title: string
  items: string[]
  defaultOpen?: boolean
  className?: string
}

export function CollapsiblePreview({
  title,
  items,
  defaultOpen = false,
  className,
}: CollapsiblePreviewProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={cn('w-full max-w-sm', className)}>
      <div className="flex items-center justify-between space-x-4 px-4">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <button
          className="inline-flex items-center justify-center rounded-md border border-input bg-background p-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn('transition-transform duration-200', open && 'rotate-180')}
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
          <span className="sr-only">Toggle</span>
        </button>
      </div>

      {items.length > 0 && (
        <div className="rounded-md border border-border px-4 py-3 text-sm text-foreground mt-2">
          {items[0]}
        </div>
      )}

      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="flex flex-col gap-2 mt-2">
          {items.slice(1).map((item, i) => (
            <div key={i} className="rounded-md border border-border px-4 py-3 text-sm text-foreground">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
