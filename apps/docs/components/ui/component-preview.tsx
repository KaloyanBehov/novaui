import { cn } from '@/lib/utils'

interface ComponentPreviewProps {
  children: React.ReactNode
  className?: string
}

/**
 * A styled container for rendering component previews inline in MDX.
 * Wrap any HTML/Tailwind recreation of your RN component inside this.
 */
export function ComponentPreview({ children, className }: ComponentPreviewProps) {
  return (
    <div
      className={cn(
        'not-prose flex min-h-[150px] items-center justify-center rounded-xl border bg-fd-background p-8 my-4',
        className
      )}
    >
      {children}
    </div>
  )
}
