'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface AlertDialogPreviewProps {
  triggerLabel?: string
  triggerVariant?: 'default' | 'destructive' | 'outline'
  title: string
  description: string
  cancelLabel?: string
  actionLabel?: string
  actionVariant?: 'default' | 'destructive'
  className?: string
}

export function AlertDialogPreview({
  triggerLabel = 'Open Dialog',
  triggerVariant = 'outline',
  title,
  description,
  cancelLabel = 'Cancel',
  actionLabel = 'Continue',
  actionVariant = 'default',
  className,
}: AlertDialogPreviewProps) {
  const [open, setOpen] = useState(false)

  const triggerClasses = cn(
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
    triggerVariant === 'default' && 'bg-primary text-primary-foreground hover:bg-primary/90',
    triggerVariant === 'destructive' && 'bg-destructive text-white hover:bg-destructive/90',
    triggerVariant === 'outline' && 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
  )

  return (
    <>
      <button className={triggerClasses} onClick={() => setOpen(true)}>
        {triggerLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 animate-in fade-in-0"
            onClick={() => setOpen(false)}
          />
          <div
            className={cn(
              'z-50 w-[90%] max-w-lg gap-4 border border-border bg-background p-6 shadow-lg rounded-lg animate-in fade-in-0 zoom-in-95',
              'flex flex-col',
              className
            )}
          >
            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold text-foreground">{title}</span>
              <span className="text-sm text-muted-foreground">{description}</span>
            </div>
            <div className="flex flex-row items-center justify-end gap-2">
              <button
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                {cancelLabel}
              </button>
              <button
                className={cn(
                  'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
                  actionVariant === 'default' && 'bg-primary text-primary-foreground hover:bg-primary/90',
                  actionVariant === 'destructive' && 'bg-destructive text-white hover:bg-destructive/90'
                )}
                onClick={() => setOpen(false)}
              >
                {actionLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
