import {
  Blocks,
  Code2,
  Copy,
  Moon,
  Paintbrush,
  ShieldCheck,
} from 'lucide-react'
import Link from 'next/link'
import { AnimateIn } from '@/components/animate-in'
import { LandingShowcase } from '@/components/landing-showcase'
import { TypingTerminal } from '@/components/typing-terminal'

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
        <TypingTerminal />
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
        <div className="max-w-7xl mx-auto">
          <AnimateIn className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Components at a Glance</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Interactive examples using the exact same styling as the React
              Native components. Try them out.
            </p>
          </AnimateIn>

          <AnimateIn>
            <LandingShowcase />
          </AnimateIn>

          <AnimateIn delay={200} className="text-center mt-10">
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
