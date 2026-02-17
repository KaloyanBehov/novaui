'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface SheetPreviewProps {
  triggerLabel?: string
  triggerVariant?: 'default' | 'outline'
  title: string
  description?: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  children?: React.ReactNode
  className?: string
}

export function SheetPreview({
  triggerLabel = 'Open Sheet',
  triggerVariant = 'outline',
  title,
  description,
  side = 'right',
  children,
  className,
}: SheetPreviewProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const triggerClasses = cn(
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
    triggerVariant === 'default' && 'bg-primary text-primary-foreground hover:bg-primary/90',
    triggerVariant === 'outline' && 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
  )

  const getSideClasses = () => {
    switch (side) {
      case 'top':
        return 'inset-x-0 top-0 border-b animate-in slide-in-from-top duration-300'
      case 'bottom':
        return 'inset-x-0 bottom-0 border-t animate-in slide-in-from-bottom duration-300'
      case 'left':
        return 'inset-y-0 left-0 h-full w-3/4 max-w-sm border-r animate-in slide-in-from-left duration-300'
      case 'right':
      default:
        return 'inset-y-0 right-0 h-full w-3/4 max-w-sm border-l animate-in slide-in-from-right duration-300'
    }
  }

  return (
    <>
      <button className={triggerClasses} onClick={() => setOpen(true)}>
        {triggerLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/80 animate-in fade-in-0"
            onClick={() => setOpen(false)}
          />
          <div
            className={cn(
              'absolute z-50 gap-4 bg-background p-6 shadow-lg',
              getSideClasses(),
              className
            )}
          >
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={() => setOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              <span className="sr-only">Close</span>
            </button>
            <div className="flex flex-col space-y-2 text-center sm:text-left">
              <span className="text-lg font-semibold text-foreground">{title}</span>
              {description && (
                <span className="text-sm text-muted-foreground">{description}</span>
              )}
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  )
}
