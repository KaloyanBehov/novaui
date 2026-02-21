import CodePreview from '@/components/sections/code-preview';
import CtaSection from '@/components/sections/cta-section';
import FeaturesGrid from '@/components/sections/features-grid';
import Hero from '@/components/sections/hero';
import QuickLinks from '@/components/sections/quick-links';
import Showcase from '@/components/sections/showcase';
import StatsSection from '@/components/sections/stats-section';
import { TypingTerminal } from '@/components/typing-terminal';
import { seoConfig } from '@/lib/seo';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'React Native UI Components Library',
  description:
    'Build polished cross-platform apps with NovaUI, an open-source React Native UI component library with 50+ components inspired by shadcn/ui.',
  alternates: {
    canonical: '/',
  },
  keywords: seoConfig.keywords,
  openGraph: {
    type: 'website',
    title: seoConfig.title,
    description: seoConfig.description,
    url: seoConfig.domain,
    images: ['/nova-og.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.title,
    description: seoConfig.description,
    images: ['/nova-og.webp'],
  },
};

export default function HomePage() {
  const homePageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: seoConfig.title,
    description: seoConfig.description,
    url: seoConfig.domain,
    isPartOf: {
      '@type': 'WebSite',
      name: seoConfig.name,
      url: seoConfig.domain,
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden relative">
      <Script
        id="ld-home-webpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />
      <Hero />
      <section className="px-6 pb-20 md:pb-24">
        <TypingTerminal />
      </section>
      <StatsSection />
      <FeaturesGrid />
      <Showcase />
      <CodePreview />
      <QuickLinks />
      <CtaSection />
    </div>
  );
}
