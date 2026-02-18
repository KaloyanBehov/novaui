import { AnimateIn } from '@/components/animate-in'
import { LandingShowcase } from '@/components/landing-showcase'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const Showcase = () => {
  return (
    <section className="relative px-6 py-28 md:py-36 overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-0 right-1/4 -z-10 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[150px] opacity-25" />
      
      <div className="max-w-7xl mx-auto relative">
        <AnimateIn className="text-center mb-20">
          <span className="inline-block text-sm font-semibold text-primary mb-4 uppercase tracking-[0.2em]">
            Interactive Showcase
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight">Experience components <span className="text-primary italic">live</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-normal leading-relaxed">
            Every component in our library is built for performance and pixel-perfection. 
            Try them out directly in your browser.
          </p>
        </AnimateIn>

        <AnimateIn className="relative z-10">
          <div className="absolute -inset-4 bg-linear-to-b from-primary/5 to-transparent rounded-[2.5rem] -z-10 blur-2xl opacity-50" />
          <LandingShowcase />
        </AnimateIn>

        <AnimateIn delay={300} className="text-center mt-16">
          <Link
            href="/docs/components/button"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-muted/50 hover:bg-muted border border-border/50 hover:border-primary/40 text-base font-semibold transition-all hover:scale-105"
          >
            Browse all 50+ components
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Showcase
