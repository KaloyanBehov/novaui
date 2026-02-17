'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface DrawerPreviewProps {
  triggerLabel?: string
  triggerVariant?: 'default' | 'outline'
  title: string
  description?: string
  children?: React.ReactNode
  footerButtons?: { label: string; variant?: 'default' | 'outline' }[]
  className?: string
}

export function DrawerPreview({
  triggerLabel = 'Open Drawer',
  triggerVariant = 'outline',
  title,
  description,
  children,
  footerButtons,
  className,
}: DrawerPreviewProps) {
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

  return (
    <>
      <button className={triggerClasses} onClick={() => setOpen(true)}>
        {triggerLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/80 animate-in fade-in-0"
            onClick={() => setOpen(false)}
          />
          <div
            className={cn(
              'relative z-50 bg-background flex h-auto flex-col rounded-t-[10px] border border-border max-h-[96%]',
              'animate-in slide-in-from-bottom duration-300',
              className
            )}
          >
            <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
            <div className="p-4">
              <div className="grid gap-1.5 p-4 text-center sm:text-left">
                <span className="text-lg font-semibold leading-none tracking-tight text-foreground">{title}</span>
                {description && (
                  <span className="text-sm text-muted-foreground">{description}</span>
                )}
              </div>

              {children && (
                <div className="p-4">{children}</div>
              )}

              {footerButtons && footerButtons.length > 0 && (
                <div className="mt-auto flex flex-col gap-2 p-4">
                  {footerButtons.map((btn, i) => (
                    <button
                      key={i}
                      className={cn(
                        'inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
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
        </div>
      )}
    </>
  )
}
