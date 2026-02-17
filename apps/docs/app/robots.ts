import { seoConfig } from '@/lib/seo'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/api/', '/private/', '/.well-known/'],
      },
    ],
    sitemap: `${seoConfig.domain}/sitemap.xml`,
    host: seoConfig.domain,
  }
}
