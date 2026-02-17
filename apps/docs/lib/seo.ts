const siteUrl = 'https://www.novaui.org';

export const seoConfig = {
  name: 'NovaUI',
  title: 'NovaUI - React Native UI Components Built with NativeWind',
  description:
    'NovaUI is an open-source React Native UI library inspired by shadcn/ui, built with NativeWind. Copy components into your app and ship faster.',
  domain: siteUrl,
  ogImage: '/og',
  xHandle: '@novaui',
  githubUrl: 'https://github.com/KaloyanBehov/novaui',
  keywords: [
    'react native ui library',
    'react native components',
    'nativewind ui components',
    'shadcn for react native',
    'react native design system',
    'cross-platform ui components',
    'novaui',
  ],
};

export function toAbsoluteUrl(path = '/') {
  return new URL(path, seoConfig.domain).toString();
}

export function getGtagId() {
  const value = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return value && value.trim().length > 0 ? value.trim() : null;
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seoConfig.name,
    url: seoConfig.domain,
    logo: toAbsoluteUrl('/icon.png'),
    sameAs: [seoConfig.githubUrl],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoConfig.name,
    url: seoConfig.domain,
    description: seoConfig.description,
    publisher: {
      '@type': 'Organization',
      name: seoConfig.name,
      url: seoConfig.domain,
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
}) {
  const now = new Date().toISOString();

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': toAbsoluteUrl(input.path),
    },
    url: toAbsoluteUrl(input.path),
    author: {
      '@type': 'Organization',
      name: seoConfig.name,
      url: seoConfig.domain,
    },
    publisher: {
      '@type': 'Organization',
      name: seoConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: toAbsoluteUrl('/icon.png'),
      },
    },
    datePublished: now,
    dateModified: now,
  };
}
