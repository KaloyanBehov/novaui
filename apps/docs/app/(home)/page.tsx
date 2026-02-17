import {
  Blocks,
  Code2,
  Copy,
  Moon,
  Paintbrush,
  ShieldCheck,
  Terminal,
} from 'lucide-react'
import Link from 'next/link'
import { AnimateIn } from '@/components/animate-in'

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      {/* ─── Hero ─── */}
      <section className="relative px-6 pt-24 pb-20 md:pt-36 md:pb-28 text-center max-w-5xl mx-auto">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm font-medium backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
          50+ components available
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-8 duration-700">
          Beautiful UI Components
          <br className="hidden md:block" /> for React Native
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-700 delay-100">
          An open-source component library inspired by shadcn/ui, built on
          NativeWind. Copy components directly into your project — you own the
          code and can customize anything.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-16 duration-700 delay-200">
          <Link
            href="/docs"
            className="h-11 px-8 rounded-lg bg-primary text-primary-foreground font-medium flex items-center justify-center hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/KaloyanBehov/native-ui"
            target="_blank"
            className="h-11 px-8 rounded-lg border border-border bg-background hover:bg-muted/50 font-medium flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          >
            GitHub
          </Link>
        </div>
      </section>

      {/* ─── CLI Banner ─── */}
      <section className="px-6 pb-20">
        <AnimateIn className="max-w-2xl mx-auto rounded-xl border border-border bg-card shadow-lg overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/40">
            <Terminal className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">Terminal</span>
          </div>
          <div className="p-5 font-mono text-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground select-none">$</span>
              <span className="text-foreground">npx novaui-cli init</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground select-none">$</span>
              <span className="text-foreground">npx novaui-cli add button</span>
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* ─── Features Grid ─── */}
      <section className="px-6 py-20 bg-muted/30 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <AnimateIn className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why NovaUI?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build polished cross-platform apps — with
              components you own.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimateIn delay={0}>
              <FeatureCard
                icon={<Blocks className="w-6 h-6" />}
                title="50+ Components"
                description="Buttons, Cards, Dialogs, Forms, Navigation, Data Display — a full design system ready to use."
              />
            </AnimateIn>
            <AnimateIn delay={80}>
              <FeatureCard
                icon={<Paintbrush className="w-6 h-6" />}
                title="NativeWind Powered"
                description="Tailwind CSS classes that work on React Native and Web. Style once, ship everywhere."
              />
            </AnimateIn>
            <AnimateIn delay={160}>
              <FeatureCard
                icon={<Code2 className="w-6 h-6" />}
                title="Type-Safe"
                description="Built with TypeScript from the ground up. Full autocomplete and type safety out of the box."
              />
            </AnimateIn>
            <AnimateIn delay={240}>
              <FeatureCard
                icon={<ShieldCheck className="w-6 h-6" />}
                title="Accessible"
                description="WAI-ARIA patterns, screen reader support, and proper roles built into every component."
              />
            </AnimateIn>
            <AnimateIn delay={320}>
              <FeatureCard
                icon={<Copy className="w-6 h-6" />}
                title="Copy-Paste"
                description="Components are copied into your project. You own the code and can customize anything."
              />
            </AnimateIn>
            <AnimateIn delay={400}>
              <FeatureCard
                icon={<Moon className="w-6 h-6" />}
                title="Dark Mode"
                description="Light and dark themes out of the box with smooth transitions and automatic detection."
              />
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ─── Component Showcase ─── */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <AnimateIn className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Components at a Glance</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real previews using the exact same styling as the React Native
              components.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <AnimateIn delay={0}>
              <ShowcaseCard title="Button">
                <div className="flex flex-wrap gap-2">
                  <button className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
                    Default
                  </button>
                  <button className="inline-flex items-center justify-center rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground">
                    Secondary
                  </button>
                  <button className="inline-flex items-center justify-center rounded-md border bg-background px-3 py-1.5 text-xs font-medium">
                    Outline
                  </button>
                  <button className="inline-flex items-center justify-center rounded-md bg-destructive px-3 py-1.5 text-xs font-medium text-white">
                    Destructive
                  </button>
                </div>
              </ShowcaseCard>
            </AnimateIn>

            <AnimateIn delay={80}>
              <ShowcaseCard title="Avatar">
                <div className="flex items-center -space-x-2">
                  <div className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-background">
                    <img src="https://github.com/shadcn.png" alt="" className="aspect-square h-full w-full" />
                  </div>
                  <div className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-background">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                      <span className="text-xs font-medium text-muted-foreground">AB</span>
                    </div>
                  </div>
                  <div className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-background">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                      <span className="text-xs font-medium text-muted-foreground">CD</span>
                    </div>
                  </div>
                  <div className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-background">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                      <span className="text-xs font-medium text-muted-foreground">+3</span>
                    </div>
                  </div>
                </div>
              </ShowcaseCard>
            </AnimateIn>

            <AnimateIn delay={160}>
              <ShowcaseCard title="Badge">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary text-primary-foreground">
                    Default
                  </span>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">
                    Secondary
                  </span>
                  <span className="inline-flex items-center rounded-full border border-destructive/50 px-2.5 py-0.5 text-xs font-semibold text-destructive">
                    Destructive
                  </span>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                    Outline
                  </span>
                </div>
              </ShowcaseCard>
            </AnimateIn>

            <AnimateIn delay={240}>
              <ShowcaseCard title="Card">
                <div className="rounded-xl border border-border bg-card shadow-sm shadow-black/5 w-full">
                  <div className="flex flex-col space-y-1 p-3">
                    <span className="text-sm font-semibold leading-none tracking-tight text-foreground">
                      Project Alpha
                    </span>
                    <span className="text-xs text-muted-foreground">Last updated 2h ago</span>
                  </div>
                </div>
              </ShowcaseCard>
            </AnimateIn>

            <AnimateIn delay={300}>
              <ShowcaseCard title="Input">
                <div className="w-full flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-foreground">Email</span>
                  <div className="h-9 w-full rounded-md border border-input bg-background px-3 flex items-center">
                    <span className="text-xs text-muted-foreground">you@example.com</span>
                  </div>
                </div>
              </ShowcaseCard>
            </AnimateIn>

            <AnimateIn delay={380}>
              <ShowcaseCard title="Switch">
                <div className="flex items-center gap-3">
                  <div className="relative h-6 w-11 rounded-full bg-primary p-0.5">
                    <div className="h-5 w-5 rounded-full bg-primary-foreground shadow-sm translate-x-5 transition-transform" />
                  </div>
                  <span className="text-xs text-foreground">Enabled</span>
                </div>
              </ShowcaseCard>
            </AnimateIn>

            <AnimateIn delay={460}>
              <ShowcaseCard title="Skeleton">
                <div className="flex items-center gap-3 w-full">
                  <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-muted" />
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="h-3 w-3/4 animate-pulse rounded-md bg-muted" />
                    <div className="h-3 w-1/2 animate-pulse rounded-md bg-muted" />
                  </div>
                </div>
              </ShowcaseCard>
            </AnimateIn>

            <AnimateIn delay={540}>
              <ShowcaseCard title="Alert">
                <div className="relative w-full rounded-lg border border-border bg-background text-foreground p-3">
                  <span className="text-xs font-medium leading-none tracking-tight text-foreground">
                    Heads up!
                  </span>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                    You can add components using the CLI.
                  </p>
                </div>
              </ShowcaseCard>
            </AnimateIn>
          </div>

          <AnimateIn delay={600} className="text-center mt-10">
            <Link
              href="/docs/components/button"
              className="text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              Browse all 50+ components &rarr;
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ─── Code Preview ─── */}
      <section className="px-6 py-24 bg-muted/30 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimateIn className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-6">Developer Experience First</h2>
              <p className="text-lg text-muted-foreground mb-8">
                A simple, intuitive API that feels familiar. Add components with
                the CLI, customize with Tailwind classes, and ship.
              </p>

              <div className="space-y-4">
                <CheckItem text="Semantic component naming" />
                <CheckItem text="Props compatible with standard React Native" />
                <CheckItem text="Dark mode ready out of the box" />
                <CheckItem text="No heavy runtime dependencies" />
                <CheckItem text="CLI to scaffold and add components" />
              </div>
            </AnimateIn>

            <AnimateIn delay={150} className="order-1 lg:order-2">
              <div className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs text-muted-foreground">App.tsx</span>
                </div>
                <div className="p-6 overflow-x-auto">
                  <pre className="text-sm font-mono leading-relaxed">
                    <span className="text-purple-400">import</span>
                    {' { '}
                    <span className="text-blue-400">Button</span>
                    {' } '}
                    <span className="text-purple-400">from</span>{' '}
                    <span className="text-green-400">&apos;novaui-components&apos;</span>
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
                    <span className="text-orange-300">label</span>
                    {'='}
                    <span className="text-green-400">&quot;Get Started&quot;</span>
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
                    <span className="text-blue-400">{'/>'}</span>
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
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <AnimateIn delay={0}>
            <StatItem value="50+" label="Components" />
          </AnimateIn>
          <AnimateIn delay={100}>
            <StatItem value="TS" label="TypeScript" />
          </AnimateIn>
          <AnimateIn delay={200}>
            <StatItem value="MIT" label="License" />
          </AnimateIn>
          <AnimateIn delay={300}>
            <StatItem value="RN + Web" label="Platforms" />
          </AnimateIn>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-6 py-20 border-t border-border bg-muted/30">
        <AnimateIn className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to build?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Get started with NovaUI in minutes. Add beautiful, accessible
            components to your React Native app.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/docs"
              className="h-11 px-8 rounded-lg bg-primary text-primary-foreground font-medium flex items-center justify-center hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
            >
              Get Started
            </Link>
            <Link
              href="https://github.com/KaloyanBehov/native-ui"
              target="_blank"
              className="h-11 px-8 rounded-lg border border-border bg-background hover:bg-muted/50 font-medium flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            >
              GitHub
            </Link>
          </div>
        </AnimateIn>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-8 border-t border-border text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} NovaUI. Released under the MIT License.</p>
      </footer>
    </main>
  )
}

/* ─── Helper Components ─── */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="h-full p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors shadow-sm">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

function ShowcaseCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="h-full rounded-xl border border-border bg-card p-5 flex flex-col gap-3 shadow-sm hover:border-primary/30 transition-colors">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {title}
      </span>
      <div className="flex items-center justify-center min-h-[60px]">{children}</div>
    </div>
  )
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} className="w-3 h-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <span className="text-foreground/80">{text}</span>
    </div>
  )
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  )
}
