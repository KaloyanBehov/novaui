import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { toAbsoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = source.getPages();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: toAbsoluteUrl('/'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: toAbsoluteUrl('/docs'),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: toAbsoluteUrl('/docs/getting-started'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const docsEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: toAbsoluteUrl(page.url),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: page.url.includes('/getting-started') ? 0.95 : 0.8,
  }));

  const uniqueEntries = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of [...staticEntries, ...docsEntries]) {
    uniqueEntries.set(entry.url, entry);
  }

  return Array.from(uniqueEntries.values());
}
