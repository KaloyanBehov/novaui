import { getGtagId, organizationJsonLd, seoConfig, toAbsoluteUrl, websiteJsonLd } from '@/lib/seo'
import { Analytics } from '@vercel/analytics/next'
import { RootProvider } from 'fumadocs-ui/provider/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Inter } from 'next/font/google'
import Script from 'next/script'
import './global.css'

const inter = Inter({
  subsets: ['latin'],
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

const gtagId = getGtagId()
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.domain),
  title: {
    default: seoConfig.title,
    template: '%s | NovaUI ',
  },
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: seoConfig.domain,
    title: seoConfig.title,
    description: seoConfig.description,
    siteName: seoConfig.name,
    images: [
      {
        url: toAbsoluteUrl(seoConfig.ogImage),
        width: 1200,
        height: 630,
        alt: 'NovaUI React Native UI library',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.title,
    description: seoConfig.description,
    creator: seoConfig.xHandle,
    images: [toAbsoluteUrl(seoConfig.ogImage)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: gscVerification
    ? {
        google: gscVerification,
      }
    : undefined,
  category: 'technology',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
}

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={geist.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Script
          id="ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />

        <RootProvider>{children}</RootProvider>
        <Analytics />
      </body>
    </html>
  )
}
