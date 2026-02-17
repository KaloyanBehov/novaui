// @ts-nocheck
import { LLMCopyButton, ViewOptions } from '@/components/ai/page-actions'
import { gitConfig } from '@/lib/layout.shared'
import { getPageImage, source } from '@/lib/source'
import { articleJsonLd, breadcrumbJsonLd, seoConfig, toAbsoluteUrl } from '@/lib/seo'
import { getMDXComponents } from '@/mdx-components'
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const MDX = page.data.body
  const breadcrumbItems = [
    { name: 'Docs', path: '/docs' },
    ...page.slugs.map((segment, index) => {
      const label = segment
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
      const path = `/docs/${page.slugs.slice(0, index + 1).join('/')}`
      return { name: label, path }
    }),
  ]
  const pagePath = page.url
  const schemas = [
    breadcrumbJsonLd(breadcrumbItems),
    articleJsonLd({
      title: page.data.title,
      description: page.data.description,
      path: pagePath,
    }),
  ]

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <Script
        id={`ld-docs-${page.slugs.join('-') || 'index'}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
        <ViewOptions
          markdownUrl={`${page.url}.mdx`}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
        <div className="mt-10 border-t pt-6">
          <h2 className="text-base font-semibold">Continue reading</h2>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/docs/getting-started" className="text-primary underline-offset-4 hover:underline">
              Getting Started
            </Link>
            <Link href="/docs/components/button" className="text-primary underline-offset-4 hover:underline">
              Components Overview
            </Link>
            <Link href="/docs/components/dialog" className="text-primary underline-offset-4 hover:underline">
              Popular: Dialog
            </Link>
            <Link href="/docs/seo-playbook" className="text-primary underline-offset-4 hover:underline">
              SEO Playbook
            </Link>
          </div>
        </div>
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()
  const imageUrl = toAbsoluteUrl(getPageImage(page).url)

  return {
    title: `${page.data.title}`,
    description: page.data.description,
    keywords: [
      page.data.title,
      'NovaUI docs',
      'react native components',
      'nativewind components',
    ],
    alternates: {
      canonical: page.url,
    },
    openGraph: {
      type: 'article',
      siteName: `${seoConfig.name} Docs`,
      title: page.data.title,
      description: page.data.description,
      url: toAbsoluteUrl(page.url),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${page.data.title} - NovaUI Docs`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.data.title} | ${seoConfig.name} Docs`,
      description: page.data.description,
      images: [imageUrl],
      creator: seoConfig.xHandle,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
