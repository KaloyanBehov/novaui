import { seoConfig } from '@/lib/seo'
import { getPageImage, source } from '@/lib/source'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'

export const revalidate = false
export const alt = 'NovaUI documentation page preview'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params
  const page = source.getPage(slug.slice(0, -1))
  if (!page) notFound()

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        padding: '56px',
        background: 'linear-gradient(135deg, #0f172a 0%, #111827 45%, #09090b 100%)',
        color: '#fafafa',
        fontFamily: 'Inter, sans-serif',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', fontSize: 24, color: '#a5b4fc', fontWeight: 700 }}>{seoConfig.name} Docs</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1 }}>{page.data.title}</div>
        <div style={{ fontSize: 28, color: '#d4d4d8' }}>
          {page.data.description || 'Documentation for NovaUI components and setup.'}
        </div>
      </div>
      <div style={{ display: 'flex', fontSize: 22, color: '#94a3b8' }}>{seoConfig.domain.replace('https://', '')}</div>
    </div>,
    size,
  )
}

export function generateStaticParams() {
  return source.getPages().map(page => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }))
}
