import { ArrowRight, Layout, Palette, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';
import { AnimateIn } from '../animate-in';

const Hero = () => {
  return (
    <section className="relative px-6 pt-32 pb-24 md:pt-48 md:pb-32 text-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary/5 via-transparent to-transparent opacity-50" />

      {/* Animated Blobs */}
      <div className="absolute top-0 left-1/4 -z-10 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] opacity-30 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] opacity-20 animate-pulse-slow [animation-delay:2s]" />

      <div className="max-w-4xl mx-auto relative">
        {/* Announcement Badge */}
        <AnimateIn>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium backdrop-blur-sm mb-10 group hover:border-primary/40 transition-all cursor-default shadow-sm hover:shadow-primary/5 hover:bg-primary/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-foreground/90 font-medium">NovaUI v1.1.3 is now live</span>
            <Sparkles className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </AnimateIn>

        {/* Headline */}
        <AnimateIn delay={100}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-8 text-balance">
            <span className="bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Ship React Native apps,{' '}
            </span>
            <span className="relative inline-block">
              <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent italic pe-2">
                faster.
              </span>
            </span>
          </h1>
        </AnimateIn>

        {/* Subheadline */}
        <AnimateIn delay={200}>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed px-4 font-normal text-balance">
            A curated collection of beautifully designed, cross-platform UI components. Built with{' '}
            <span className="text-foreground font-medium">NativeWind</span>. Open source and yours
            to customize. Inspired by <span className="text-foreground font-medium">shadcn/ui</span>
          </p>
        </AnimateIn>

        {/* CTA Buttons */}
        <AnimateIn delay={300}>
          <div className="flex flex-col sm:row gap-5 justify-center items-center">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6">
              <Link
                href="/docs"
                className="group relative h-14 px-8 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/docs/components/button"
                className="group h-14 px-8 rounded-xl border border-border bg-background/50 backdrop-blur-md hover:bg-muted font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] text-foreground shadow-sm"
              >
                <Layout className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                Browse Components
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-4 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary" /> Ready to use
              </div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-primary" /> Highly customizable
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
};

export default Hero;
