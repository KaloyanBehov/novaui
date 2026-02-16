'use client'

/** @jsxImportSource nativewind */
import React from 'react'
import { Button } from '@packages/components/ui/button'

/**
 * Button Demo Components for MDX documentation
 * These components demonstrate various Button variants and use cases
 */

export function ButtonDefaultDemo() {
  return <Button label="Default Button" />
}

export function ButtonDestructiveDemo() {
  return <Button variant="destructive" label="Delete" />
}

export function ButtonOutlineDemo() {
  return <Button variant="outline" label="Outline Button" />
}

export function ButtonSecondaryDemo() {
  return <Button variant="secondary" label="Secondary Button" />
}

export function ButtonGhostDemo() {
  return <Button variant="ghost" label="Ghost Button" />
}

export function ButtonLinkDemo() {
  return <Button variant="link" label="Link Button" />
}

export function ButtonSizesDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
      <Button size="sm" label="Small" />
      <Button size="default" label="Default" />
      <Button size="lg" label="Large" />
    </div>
  )
}

export function ButtonVariantsDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
      <Button variant="default" label="Default" />
      <Button variant="destructive" label="Destructive" />
      <Button variant="outline" label="Outline" />
      <Button variant="secondary" label="Secondary" />
      <Button variant="ghost" label="Ghost" />
      <Button variant="link" label="Link" />
    </div>
  )
}

export function ButtonLoadingDemo() {
  return <Button label="Loading..." isLoading />
}

export function ButtonDisabledDemo() {
  return <Button label="Disabled" disabled />
}
