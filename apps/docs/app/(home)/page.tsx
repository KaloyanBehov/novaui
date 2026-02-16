// import { Monitor, Palette, ShieldCheck, Smartphone, Type, Zap } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-20 md:pt-32 md:pb-28 text-center max-w-5xl mx-auto">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm font-medium backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
          v1.0 is now available
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-8 duration-700">
          Build Universal Apps <br className="hidden md:block" /> with NovaUI
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-700 delay-100">
          A comprehensive, accessible, and customizable UI library for React Native and Web. Powered by NativeWind for
          seamless styling across platforms.
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

      {/* Features Section */}
      <section className="px-6 py-20 bg-muted/30 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why NovaUI?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with modern development in mind, offering everything you need to build top-tier cross-platform
              applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* <FeatureCard
              icon={<Monitor className='w-6 h-6' />}
              title='Universal'
              description='Write once, run everywhere. Optimized for both React Native and Web environments.'
            />
            <FeatureCard
              icon={<Type className='w-6 h-6' />}
              title='Type-Safe'
              description='Built with TypeScript. Enjoy full autocomplete and type safety out of the box.'
            />
            <FeatureCard
              icon={<Palette className='w-6 h-6' />}
              title='Customizable'
              description='Styled with NativeWind. Easily customize themes and styles using Tailwind classes.'
            />
            <FeatureCard
              icon={<ShieldCheck className='w-6 h-6' />}
              title='Accessible'
              description='Follows WAI-ARIA patterns to ensure your app is accessible to everyone.'
            />
            <FeatureCard
              icon={<Smartphone className='w-6 h-6' />}
              title='Mobile First'
              description='Designed with mobile interactions in mind for a native-like feel.'
            />
            <FeatureCard
              icon={<Zap className='w-6 h-6' />}
              title='Performant'
              description="Lightweight components that don't bloat your bundle size."
            /> */}
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="px-6 py-24 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold mb-6">Developer Experience First</h2>
            <p className="text-lg text-muted-foreground mb-8">
              NovaUI provides a simple, intuitive API that feels familiar to React developers. Copy-paste components or
              import them directly—it's your choice.
            </p>

            <div className="space-y-4">
              <CheckItem text="Semantic component naming" />
              <CheckItem text="Props compatible with standard React Native" />
              <CheckItem text="Dark mode ready" />
              <CheckItem text="No heavy runtime dependencies" />
            </div>
          </div>

          <div className="order-1 lg:order-2 rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="text-sm font-mono leading-relaxed">
                <span className="text-purple-400">import</span> {'{'} Button {'}'}{' '}
                <span className="text-purple-400">from</span> <span className="text-green-400">'@novaui/ui'</span>;
                {'\n\n'}
                <span className="text-purple-400">export default function</span>{' '}
                <span className="text-blue-400">App</span>() {'{'}
                {'\n'} <span className="text-purple-400">return</span> ({'\n'}{' '}
                <span className="text-blue-400">{'<Button'}</span>
                {'\n'} <span className="text-orange-300">variant</span>=
                <span className="text-green-400">"default"</span>
                {'\n'} <span className="text-orange-300">size</span>=<span className="text-green-400">"lg"</span>
                {'\n'} <span className="text-orange-300">onPress</span>={'{'}(){' '}
                <span className="text-purple-400">={'>'}</span> <span className="text-yellow-300">console</span>.
                <span className="text-blue-300">log</span>(<span className="text-green-400">"Pressed!"</span>){'}'}
                {'\n'} <span className="text-blue-400">{'>'}</span>
                {'\n'} Click me
                {'\n'} <span className="text-blue-400">{'</Button>'}</span>
                {'\n'} );
                {'\n'}
                {'}'}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} NovaUI. Released under the MIT License.</p>
      </footer>
    </main>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors shadow-sm">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
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
