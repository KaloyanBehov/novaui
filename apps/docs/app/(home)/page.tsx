import {
  ArrowRight,
  Blocks,
  BookOpen,
  Code2,
  Copy,
  Github,
  Layers,
  Moon,
  Paintbrush,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import Script from 'next/script'
import { AnimateIn } from '@/components/animate-in'
import { LandingShowcase } from '@/components/landing-showcase'
import { TypingTerminal } from '@/components/typing-terminal'
import { seoConfig, toAbsoluteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'React Native UI Library with NativeWind Components',
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
    images: [toAbsoluteUrl('/og')],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.title,
    description: seoConfig.description,
    images: [toAbsoluteUrl('/og')],
  },
}

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
  }

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      <Script
        id="ld-home-webpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />

      {/* ─── Hero ─── */}
      <section className="relative px-6 pt-28 pb-20 md:pt-40 md:pb-32 text-center">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-50" />

        <div className="max-w-5xl mx-auto">
          {/* Announcement Badge */}
          <AnimateIn>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium backdrop-blur-sm mb-8 group hover:border-primary/40 transition-colors cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-foreground/80">50+ components available</span>
              <Sparkles className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </AnimateIn>

          {/* Headline */}
          <AnimateIn delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
                Beautiful UI Components
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                for React Native
              </span>
            </h1>
          </AnimateIn>

          {/* Subheadline */}
          <AnimateIn delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              An open-source component library inspired by{' '}
              <span className="text-foreground font-medium">shadcn/ui</span>, built with{' '}
              <span className="text-foreground font-medium">NativeWind</span>. Copy components
              directly into your project — you own the code.
            </p>
          </AnimateIn>

          {/* CTA Buttons */}
          <AnimateIn delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/docs"
                className="group h-12 px-8 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="https://github.com/KaloyanBehov/novaui"
                target="_blank"
                rel="noopener noreferrer"
                className="group h-12 px-8 rounded-xl border border-border bg-background/50 backdrop-blur-sm hover:bg-muted/80 hover:border-border/80 font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </Link>
            </div>
          </AnimateIn>

          {/* Trust Indicators */}
          <AnimateIn delay={400}>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span>MIT Licensed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>TypeScript First</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                <span>iOS, Android &amp; Web</span>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ─── CLI Banner ─── */}
      <section className="px-6 pb-20">
        <TypingTerminal />
      </section>

      {/* ─── Features Grid ─── */}
      <section className="px-6 py-24 bg-gradient-to-b from-muted/50 to-muted/20 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <AnimateIn className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
              Why NovaUI?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to ship faster
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Production-ready components that you own. No runtime dependencies,
              no vendor lock-in.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimateIn delay={0}>
              <FeatureCard
                icon={<Blocks className="w-5 h-5" />}
                title="50+ Components"
                description="Buttons, Cards, Dialogs, Forms, Navigation, Data Display — a complete design system."
                gradient="from-blue-500/20 to-cyan-500/20"
                iconColor="text-blue-500"
              />
            </AnimateIn>
            <AnimateIn delay={50}>
              <FeatureCard
                icon={<Paintbrush className="w-5 h-5" />}
                title="NativeWind Powered"
                description="Tailwind CSS classes that work on React Native and Web. Style once, ship everywhere."
                gradient="from-pink-500/20 to-rose-500/20"
                iconColor="text-pink-500"
              />
            </AnimateIn>
            <AnimateIn delay={100}>
              <FeatureCard
                icon={<Code2 className="w-5 h-5" />}
                title="TypeScript First"
                description="Built with TypeScript from the ground up. Full autocomplete and type safety included."
                gradient="from-indigo-500/20 to-purple-500/20"
                iconColor="text-indigo-500"
              />
            </AnimateIn>
            <AnimateIn delay={150}>
              <FeatureCard
                icon={<ShieldCheck className="w-5 h-5" />}
                title="Accessible"
                description="WAI-ARIA patterns, screen reader support, and proper roles in every component."
                gradient="from-emerald-500/20 to-green-500/20"
                iconColor="text-emerald-500"
              />
            </AnimateIn>
            <AnimateIn delay={200}>
              <FeatureCard
                icon={<Copy className="w-5 h-5" />}
                title="Copy &amp; Customize"
                description="Components live in your codebase. You own them and can modify anything."
                gradient="from-orange-500/20 to-amber-500/20"
                iconColor="text-orange-500"
              />
            </AnimateIn>
            <AnimateIn delay={250}>
              <FeatureCard
                icon={<Moon className="w-5 h-5" />}
                title="Dark Mode Ready"
                description="Light and dark themes with smooth transitions and automatic system detection."
                gradient="from-violet-500/20 to-purple-500/20"
                iconColor="text-violet-500"
              />
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ─── Component Showcase ─── */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <AnimateIn className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
              Component Library
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See components in action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interactive examples with the exact same styling as the React
              Native components. Try them out.
            </p>
          </AnimateIn>

          <AnimateIn>
            <LandingShowcase />
          </AnimateIn>

          <AnimateIn delay={200} className="text-center mt-12">
            <Link
              href="/docs/components/button"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4"
            >
              Browse all 50+ components
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ─── Code Preview ─── */}
      <section className="px-6 py-24 bg-gradient-to-b from-muted/30 to-transparent border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimateIn className="order-2 lg:order-1">
              <span className="inline-block text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
                Developer Experience
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Built for productivity
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                A familiar API that just works. Add components with the CLI,
                style with Tailwind, and ship confidently.
              </p>

              <div className="space-y-4">
                <CheckItem text="Semantic, intuitive component naming" />
                <CheckItem text="Props compatible with React Native standards" />
                <CheckItem text="Dark mode with zero configuration" />
                <CheckItem text="No runtime dependencies or bloat" />
                <CheckItem text="CLI to scaffold and add components instantly" />
              </div>

              <div className="mt-8">
                <Link
                  href="/docs/getting-started"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
                >
                  Read the setup guide
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimateIn>

            <AnimateIn delay={150} className="order-1 lg:order-2">
              <div className="rounded-2xl border border-border bg-card shadow-2xl shadow-black/10 dark:shadow-black/30 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="ml-2 text-xs text-muted-foreground font-medium">App.tsx</span>
                </div>
                <div className="p-5 md:p-6 overflow-x-auto bg-gradient-to-br from-card to-muted/20">
                  <pre className="text-sm font-mono leading-relaxed">
                    <span className="text-purple-400">import</span>
                    {' { '}
                    <span className="text-blue-400">Button</span>
                    {' } '}
                    <span className="text-purple-400">from</span>{' '}
                    <span className="text-green-400">&apos;@/components/ui&apos;</span>
                    {'\n\n'}
                    <span className="text-purple-400">export default function</span>{' '}
                    <span className="text-blue-400">App</span>
                    {'() {\n'}
                    {'  '}
                    <span className="text-purple-400">return</span>
                    {' (\n'}
                    {'    '}
                    <span className="text-blue-400">{'<Button'}</span>
                    {'\n'}
                    {'      '}
                    <span className="text-orange-300">variant</span>
                    {'='}
                    <span className="text-green-400">&quot;default&quot;</span>
                    {'\n'}
                    {'      '}
                    <span className="text-orange-300">size</span>
                    {'='}
                    <span className="text-green-400">&quot;lg&quot;</span>
                    {'\n'}
                    {'      '}
                    <span className="text-orange-300">onPress</span>
                    {'={() => '}
                    <span className="text-yellow-300">console</span>
                    {'.'}
                    <span className="text-blue-300">log</span>
                    {'('}
                    <span className="text-green-400">&quot;Pressed!&quot;</span>
                    {')}'}
                    {'\n'}
                    {'    '}
                    <span className="text-blue-400">{'>'}</span>
                    {'\n'}
                    {'      Get Started\n'}
                    {'    '}
                    <span className="text-blue-400">{'</Button>'}</span>
                    {'\n'}
                    {'  );\n'}
                    {'}'}
                  </pre>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <AnimateIn delay={0}>
              <StatItem
                value="50+"
                label="Components"
                icon={<Layers className="w-5 h-5" />}
              />
            </AnimateIn>
            <AnimateIn delay={75}>
              <StatItem
                value="100%"
                label="TypeScript"
                icon={<Code2 className="w-5 h-5" />}
              />
            </AnimateIn>
            <AnimateIn delay={150}>
              <StatItem
                value="MIT"
                label="Open Source"
                icon={<BookOpen className="w-5 h-5" />}
              />
            </AnimateIn>
            <AnimateIn delay={225}>
              <StatItem
                value="3"
                label="Platforms"
                icon={<Zap className="w-5 h-5" />}
              />
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ─── Quick Links ─── */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <AnimateIn>
            <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Popular Documentation</h2>
                  <p className="text-muted-foreground">
                    Jump into the most-visited pages to get started quickly.
                  </p>
                </div>
                <Link
                  href="/docs"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4 shrink-0"
                >
                  View all docs
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <QuickLink href="/docs/getting-started" label="Getting Started" tag="Setup" />
                <QuickLink href="/docs/components/button" label="Button" tag="Component" />
                <QuickLink href="/docs/components/dialog" label="Dialog" tag="Component" />
                <QuickLink href="/docs/components/input" label="Input" tag="Component" />
                <QuickLink href="/docs/components/select" label="Select" tag="Component" />
                <QuickLink href="/docs/components/navigation-menu" label="Navigation Menu" tag="Component" />
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative px-6 py-24 border-t border-border overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/50 to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />

        <AnimateIn className="max-w-3xl mx-auto text-center relative">
          <span className="inline-block text-sm font-semibold text-primary mb-4 uppercase tracking-wider">
            Get Started Today
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Build your next app with NovaUI
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Ship beautiful, accessible React Native apps faster. One CLI command
            to add any component.
          </p>

          {/* Terminal Preview */}
          <div className="inline-flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3 mb-10 font-mono text-sm">
            <span className="text-muted-foreground">$</span>
            <span>npx novaui add button</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-green-500">Done!</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/docs"
              className="group h-12 px-8 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25"
            >
              Start Building
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="https://github.com/KaloyanBehov/novaui"
              target="_blank"
              rel="noopener noreferrer"
              className="group h-12 px-8 rounded-xl border border-border bg-background/80 backdrop-blur-sm hover:bg-muted/80 font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Github className="w-4 h-4" />
              Star on GitHub
            </Link>
          </div>
        </AnimateIn>
      </section>

      {/* ─── Footer ─── */}
      <footer className="px-6 py-12 border-t border-border bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Logo & Copyright */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 font-semibold text-lg">
                <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-xs font-bold">N</span>
                </div>
                NovaUI
              </div>
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} NovaUI. MIT License.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link
                href="/docs"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Documentation
              </Link>
              <Link
                href="/docs/components/button"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Components
              </Link>
              <Link
                href="https://github.com/KaloyanBehov/novaui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </Link>
              <Link
                href="/llms.txt"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                llms.txt
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

/* ─── Helper Components ─── */

function FeatureCard({
  icon,
  title,
  description,
  gradient,
  iconColor,
}: {
  icon: React.ReactNode
  title: string
  description: string
  gradient?: string
  iconColor?: string
}) {
  return (
    <div className="group h-full p-6 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
      {/* Subtle gradient on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient || 'from-primary/10 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      <div className="relative">
        <div
          className={`w-11 h-11 rounded-lg bg-muted flex items-center justify-center ${iconColor || 'text-primary'} mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
        <h3 className="text-base font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 rounded-full bg-green-500/15 flex items-center justify-center text-green-500 shrink-0">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} className="w-3 h-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <span className="text-foreground/90">{text}</span>
    </div>
  )
}

function StatItem({
  value,
  label,
  icon,
}: {
  value: string
  label: string
  icon?: React.ReactNode
}) {
  return (
    <div className="relative p-6 rounded-xl border border-border bg-card text-center group hover:border-primary/30 transition-colors">
      {icon && (
        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
          {icon}
        </div>
      )}
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-sm text-muted-foreground mt-1 font-medium">{label}</div>
    </div>
  )
}

function QuickLink({
  href,
  label,
  tag,
}: {
  href: string
  label: string
  tag: string
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-3 p-3 rounded-lg border border-border bg-background/50 hover:bg-muted/50 hover:border-primary/30 transition-all"
    >
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
          {tag}
        </span>
        <span className="font-medium text-sm">{label}</span>
      </div>
      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
    </Link>
  )
}
