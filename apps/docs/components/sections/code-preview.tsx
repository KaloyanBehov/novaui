import { AnimateIn } from '@/components/animate-in'
import CheckItem from '@/components/common/check-item'
import { ArrowRight, Terminal } from 'lucide-react'
import Link from 'next/link'

const CodePreview = () => {
  return (
    <section className="relative px-6 py-28 md:py-36 overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute bottom-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] opacity-30 animate-pulse-slow" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <AnimateIn className="order-2 lg:order-1 relative">
            <div className="absolute -left-10 top-0 w-1 h-full bg-linear-to-b from-primary/50 to-transparent rounded-full opacity-20" />
            
            <span className="inline-block text-sm font-semibold text-primary mb-4 uppercase tracking-[0.2em]">
              Developer Experience
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold mb-8 tracking-tight italic">Built for <span className="text-primary underline decoration-primary/20 underline-offset-8 font-bold">productivity</span></h2>
            <p className="text-xl text-muted-foreground mb-10 font-normal leading-relaxed">
              A familiar API that just works. Copy-paste components directly, 
              style them with Tailwind, and ship confidently with zero friction.
            </p>

            <div className="space-y-6 mb-12">
              <CheckItem text="Semantic, intuitive component architecture" />
              <CheckItem text="Props compatible with React Native standards" />
              <CheckItem text="Automatic dark mode detection" />
              <CheckItem text="No complex runtime dependencies" />
              <CheckItem text="CLI for instant component scaffolding" />
            </div>

            <Link
              href="/docs/getting-started"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-muted/50 hover:bg-muted border border-border/50 hover:border-primary/40 text-base font-semibold transition-all hover:scale-105"
            >
              Read the setup guide
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </AnimateIn>

          <AnimateIn delay={200} className="order-1 lg:order-2">
            <div className="relative group">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-primary/10 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative rounded-[1.5rem] border border-border/50 bg-card/80 backdrop-blur-md shadow-2xl overflow-hidden group-hover:border-primary/30 transition-colors duration-500">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-muted/40">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <div className="h-4 w-px bg-border/50 mx-2" />
                    <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-widest">App.tsx</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                    Typescript
                  </div>
                </div>
                <div className="p-8 md:p-10 overflow-x-auto bg-linear-to-br from-transparent to-primary/5">
                  <pre className="text-sm md:text-base font-mono leading-[1.8] tracking-tight">
                    <span className="text-purple-400">import</span>
                    {' { '}
                    <span className="text-blue-400 font-semibold">Button</span>
                    {' } '}
                    <span className="text-purple-400">from</span>{' '}
                    <span className="text-green-400">&apos;@/components/ui&apos;</span>
                    {'\n\n'}
                    <span className="text-purple-400">export default function</span>{' '}
                    <span className="text-blue-400 font-semibold italic">App</span>
                    {'() {\n'}
                    {'  '}
                    <span className="text-purple-400">return</span>
                    {' (\n'}
                    {'    '}
                    <span className="text-blue-400 font-semibold">{'<Button'}</span>
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
                    <span className="text-orange-300 italic">onPress</span>
                    {'={() => '}
                    <span className="text-yellow-300">console</span>
                    {'.'}
                    <span className="text-blue-300">log</span>
                    {'('}
                    <span className="text-green-400">&quot;Pressed!&quot;</span>
                    {')}'}
                    {'\n'}
                    {'    '}
                    <span className="text-blue-400 font-semibold">{'>'}</span>
                    {'\n'}
                    {'      Get Started\n'}
                    {'    '}
                    <span className="text-blue-400 font-semibold">{'</Button>'}</span>
                    {'\n'}
                    {'  );\n'}
                    {'}'}
                  </pre>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

export default CodePreview
