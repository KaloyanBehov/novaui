'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface DialogPreviewProps {
  triggerLabel?: string
  triggerVariant?: 'default' | 'outline'
  title: string
  description?: string
  showCloseButton?: boolean
  footerButtons?: { label: string; variant?: 'default' | 'outline' }[]
  className?: string
}

export function DialogPreview({
  triggerLabel = 'Open Dialog',
  triggerVariant = 'outline',
  title,
  description,
  showCloseButton = true,
  footerButtons,
  className,
}: DialogPreviewProps) {
  const [open, setOpen] = useState(false)

  const triggerClasses = cn(
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
    triggerVariant === 'default' && 'bg-primary text-primary-foreground hover:bg-primary/90',
    triggerVariant === 'outline' && 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
  )

  return (
    <>
      <button className={triggerClasses} onClick={() => setOpen(true)}>
        {triggerLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 z-50 animate-in fade-in-0"
            onClick={() => setOpen(false)}
          />
          <div
            className={cn(
              'z-50 w-full max-w-lg gap-4 rounded-lg border border-border bg-background p-6 shadow-lg animate-in fade-in-0 zoom-in-95',
              'relative flex flex-col',
              className
            )}
          >
            {showCloseButton && (
              <button
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => setOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            )}
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
              <span className="text-lg font-semibold leading-none tracking-tight text-foreground">{title}</span>
              {description && (
                <span className="text-sm text-muted-foreground">{description}</span>
              )}
            </div>
            {footerButtons && footerButtons.length > 0 && (
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                {footerButtons.map((btn, i) => (
                  <button
                    key={i}
                    className={cn(
                      'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
                      btn.variant === 'outline'
                        ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
