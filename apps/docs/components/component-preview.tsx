'use client'

import React from 'react'

interface ComponentPreviewProps {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
}

/**
 * ComponentPreview - A wrapper component for displaying React Native components in MDX docs
 * 
 * This component provides a styled container for React Native component demos
 * that will be rendered using react-native-web in the browser.
 */
export function ComponentPreview({
  children,
  className = '',
  title,
  description,
}: ComponentPreviewProps) {
  return (
    <div className={`component-preview ${className}`}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold mb-1">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className="border rounded-lg p-6 bg-card">
        <div className="flex items-center justify-center min-h-[100px]">
          {children}
        </div>
      </div>
    </div>
  )
}

/**
 * ComponentDemo - A simpler wrapper for inline component demos
 */
export function ComponentDemo({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`inline-flex items-center justify-center p-4 border rounded-md bg-card ${className}`}>
      {children}
    </div>
  )
}
